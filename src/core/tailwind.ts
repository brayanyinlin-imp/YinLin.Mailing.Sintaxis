/**
 * Tailwind CSS 4 con el preset de email de Maizzle (@maizzle/tailwindcss).
 *
 * Genera solo las utilidades que aparecen en los class="" del mail y las deja aptas para clientes de correo:
 *   1. Tailwind con theme(inline): los valores del tema salen literales (hex, px), sin var().
 *   2. Lightning CSS: padding-inline → padding-left/right, calc(4px * 4) → 16px, color-mix → rgba.
 *   3. Limpieza: resuelve los var(--tw-*) que quedan, quita @property, colores lab()/oklch(),
 *      pasa text-decoration-line a text-decoration y vuelve a poner comillas a las fuentes.
 * Es la misma receta que usa el framework Maizzle, sin postcss.
 * El preset marca todas las utilidades con !important.
 */
import { compile } from '@tailwindcss/node'
import { transform } from 'lightningcss'
import { basename, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import type { Html } from './html.ts'

/** Recibe el HTML del mail y devuelve el CSS de las utilidades que usa ('' si no usa ninguna). */
export type Tailwind = (html: Html) => Promise<string>

/** Navegador de referencia para Lightning CSS: el más antiguo baja todo a CSS 2/3 clásico. */
const TARGETS = { ie: 11 << 16 }

const MODERN_COLOR = /\b(?:lab|lch|oklab|oklch|color-mix)\(/

/** Clases de todos los atributos class="" del HTML. */
const classesOf = (html: Html): string[] => {
  const found = new Set<string>()
  for (const [, value] of html.matchAll(/\sclass="([^"]*)"/g)) {
    for (const c of value!.split(/\s+/)) if (c) found.add(c)
  }
  return [...found]
}

const lower = (css: string): string =>
  transform({ filename: 'tailwind.css', code: Buffer.from(css), targets: TARGETS }).code.toString()

/** Primer var() de un valor, contando paréntesis para soportar fallbacks anidados. */
const findVar = (value: string) => {
  const start = value.indexOf('var(')
  if (start === -1) return null
  let depth = 1
  let comma = -1
  let i = start + 4
  for (; i < value.length && depth > 0; i++) {
    const ch = value[i]
    if (ch === '(') depth++
    else if (ch === ')') depth--
    else if (ch === ',' && depth === 1 && comma === -1) comma = i
  }
  const end = i // posición después del ")" de cierre
  const name = value.slice(start + 4, comma === -1 ? end - 1 : comma).trim()
  const fallback = comma === -1 ? undefined : value.slice(comma + 1, end - 1).trim()
  return { start, end, name, fallback }
}

/** Resuelve var() con: variable del mismo bloque → initial-value de @property → fallback del var(). */
const resolveVars = (value: string, local: Map<string, string>, initial: Map<string, string>): string => {
  let out = value
  for (let guard = 0; guard < 20; guard++) {
    const v = findVar(out)
    if (!v) return out
    const resolved = local.get(v.name) ?? initial.get(v.name) ?? v.fallback
    if (resolved === undefined) throw new Error(`Tailwind: no se pudo resolver var(${v.name})`)
    out = out.slice(0, v.start) + resolved + out.slice(v.end)
  }
  throw new Error(`Tailwind: var() circular en "${value}"`)
}

/** Limpieza sobre la salida formateada de Lightning CSS (bloques sin anidar, una declaración por línea). */
const cleanup = (css: string): string => {
  const initial = new Map<string, string>()
  const withoutProperties = css.replace(/@property\s+(--[\w-]+)\s*\{([^}]*)\}/g, (_, name: string, body: string) => {
    const value = body.match(/initial-value:\s*([^;]+)/)?.[1]?.trim()
    if (value !== undefined) initial.set(name, value)
    return ''
  })

  // Bloques más internos (sin llaves dentro): son las listas de declaraciones de cada regla.
  return withoutProperties.replace(/\{([^{}]*)\}/g, (_, body: string) => {
    const decls = body.split(';').map((d) => d.trim()).filter(Boolean)
    const local = new Map<string, string>()
    for (const d of decls) {
      const [prop, ...rest] = d.split(':')
      if (prop!.startsWith('--')) local.set(prop!.trim(), rest.join(':').replace(/!important/, '').trim())
    }
    const kept = decls
      .filter((d) => !d.startsWith('--') && !MODERN_COLOR.test(d))
      .map((d) => resolveVars(d, local, initial).replace(/^text-decoration-line:/, 'text-decoration:'))
    return `{ ${kept.join('; ')} }`
  })
}

const GENERIC_FONT = /^(serif|sans-serif|monospace|cursive|fantasy|system-ui|ui-\w+|-apple-system|inherit|initial)$/

/**
 * Lightning CSS quita las comillas de las fuentes ("Radio Canada Big" → Radio Canada Big).
 * Es CSS válido, pero algunos clientes de correo no lo entienden: se vuelven a poner, simples
 * para no romper un style="…" al inlinear.
 */
const quoteFonts = (css: string): string =>
  css.replace(/font-family:\s*([^;}]+?)(\s*!important)?(?=\s*[;}])/g, (_, list: string, important = '') => {
    const fonts = list.split(',').map((f) => {
      const name = f.trim()
      return /\s/.test(name) && !/^['"]/.test(name) && !GENERIC_FONT.test(name) ? `'${name}'` : name
    })
    return `font-family: ${fonts.join(', ')}${important}`
  })

/**
 * Tailwind de una marca. `theme` es el CSS con el @theme de la marca: colores, fuentes.
 * Se compila de nuevo en cada mail (~15 ms): compiler.build() acumula las clases entre llamadas
 * (está pensado para builds incrementales) y un mail heredaría las utilidades de los anteriores.
 */
export const createTailwind = (theme: URL): Tailwind => {
  const themeFile = fileURLToPath(theme)
  const input = `@import "@maizzle/tailwindcss" theme(inline);\n@import "./${basename(themeFile)}" theme(inline);`
  return async (html) => {
    const classes = classesOf(html)
    if (classes.length === 0) return ''
    // polyfills: 0 (Polyfills.None): sin @property ni @layer de compatibilidad para navegadores.
    const compiler = await compile(input, { base: dirname(themeFile), onDependency: () => {}, polyfills: 0 })
    const raw = compiler.build(classes)
    // Segunda pasada: reduce los calc() que aparecen al sustituir variables.
    const css = quoteFonts(lower(cleanup(lower(raw))))
      .replace(/\/\*![\s\S]*?\*\//g, '')
      .trim()
    if (css.includes('var(')) throw new Error('Tailwind: quedó un var() sin resolver en el CSS')
    return css
  }
}
