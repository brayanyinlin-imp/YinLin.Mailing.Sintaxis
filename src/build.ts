/**
 * Genera dist/<ruta>.html a partir de cada mails/<ruta>.ts o .tsx, incluidas las subcarpetas.
 * La estructura se replica: mails/tucambista/fide.ts → dist/tucambista/fide.html
 *   pnpm build              → todos
 *   pnpm build iphone       → solo los que contengan "iphone" en la ruta
 *   pnpm build tucambista/  → solo los de esa carpeta
 *   pnpm build --no-inline  → sin pasar el CSS a style="" (para comparar o depurar)
 */
import { mkdirSync, readdirSync, writeFileSync } from 'node:fs'
import { dirname, join, sep } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { rawUsage } from '#components/base/raw'
import { inlineCss } from '#core/inline'
import { checkHandlebarsTemplate } from './index.ts'

const root = fileURLToPath(new URL('..', import.meta.url))
const srcDir = join(root, 'mails')
const outDir = join(root, 'dist')
const args = process.argv.slice(2)
const inline = !args.includes('--no-inline')
const filter = args.find((a) => !a.startsWith('--')) ?? ''

mkdirSync(outDir, { recursive: true })

// Rutas relativas con "/" (en Windows readdir devuelve "\").
const files = readdirSync(srcDir, { recursive: true, encoding: 'utf-8' })
  .map((f) => f.split(sep).join('/'))
  .filter((f) => /\.tsx?$/.test(f) && f.includes(filter))
  .sort()
let failed = 0

/** Mails en los que aparece cada Raw, para la regla de crecimiento. */
const raws = new Map<string, string[]>()
const names = new Set<string>()

for (const file of files) {
  const name = file.replace(/\.tsx?$/, '')
  try {
    if (names.has(name)) throw new Error(`existen ${name}.ts y ${name}.tsx: deja solo uno`)
    names.add(name)

    rawUsage.length = 0
    const mod: { default?: unknown } = await import(pathToFileURL(join(srcDir, file)).href)
    // Layout() devuelve una promesa (Tailwind compila de forma asíncrona).
    const rendered = await mod.default
    if (typeof rendered !== 'string') throw new Error('el export default debe ser el resultado de Layout()')
    const html = inline ? inlineCss(rendered) : rendered

    const out = join(outDir, `${name}.html`)
    mkdirSync(dirname(out), { recursive: true })
    writeFileSync(out, html)
    if (!checkHandlebarsTemplate(out)) throw new Error('la salida no compila con Handlebars')

    const used = [...new Set(rawUsage)]
    for (const raw of used) raws.set(raw, [...(raws.get(raw) ?? []), name])

    const kb = Buffer.byteLength(html) / 1024
    console.log(`✔ dist/${name}.html (${kb.toFixed(1)} KB)${used.length ? ` · raw: ${used.join(', ')}` : ''}`)
  } catch (e) {
    failed++
    console.error(`✘ ${name}: ${e instanceof Error ? e.message : String(e)}`)
  }
}

for (const [raw, mails] of raws) {
  if (mails.length > 1) console.warn(`⚠ Raw "${raw}" se usa en ${mails.length} mails (${mails.join(', ')}): conviértelo en componente`)
}

if (files.length === 0) console.warn(`Ningún archivo de mails/ coincide con "${filter}"`)
process.exit(failed > 0 ? 1 : 0)
