/**
 * Genera dist/<ruta>.html a partir de cada examples/<ruta>.ts, incluidas las subcarpetas.
 * La estructura se replica: examples/tucambista/fide.ts → dist/tucambista/fide.html
 *   pnpm build              → todos
 *   pnpm build iphone       → solo los que contengan "iphone" en la ruta
 *   pnpm build tucambista/  → solo los de esa carpeta
 */
import { mkdirSync, readdirSync, writeFileSync } from 'node:fs'
import { dirname, join, sep } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { checkHandlebarsTemplate } from './index.ts'

const root = fileURLToPath(new URL('..', import.meta.url))
const srcDir = join(root, 'examples')
const outDir = join(root, 'dist')
const filter = process.argv[2] ?? ''

mkdirSync(outDir, { recursive: true })

// Rutas relativas con "/" (en Windows readdir devuelve "\").
const files = readdirSync(srcDir, { recursive: true, encoding: 'utf-8' })
  .map((f) => f.split(sep).join('/'))
  .filter((f) => f.endsWith('.ts') && f.includes(filter))
  .sort()
let failed = 0

for (const file of files) {
  const name = file.replace(/\.ts$/, '')
  try {
    const mod: { default?: unknown } = await import(pathToFileURL(join(srcDir, file)).href)
    if (typeof mod.default !== 'string') throw new Error('el export default debe ser el resultado de Layout()')

    const out = join(outDir, `${name}.html`)
    mkdirSync(dirname(out), { recursive: true })
    writeFileSync(out, mod.default)
    if (!checkHandlebarsTemplate(out)) throw new Error('la salida no compila con Handlebars')

    const kb = Buffer.byteLength(mod.default) / 1024
    console.log(`✔ dist/${name}.html (${kb.toFixed(1)} KB)`)
  } catch (e) {
    failed++
    console.error(`✘ ${name}: ${e instanceof Error ? e.message : String(e)}`)
  }
}

if (files.length === 0) console.warn(`No hay mails en examples/ que coincidan con "${filter}"`)
process.exit(failed > 0 ? 1 : 0)
