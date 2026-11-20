/**
 * Genera dist/<mail>.html a partir de cada examples/<mail>.ts.
 *   pnpm build            → todos
 *   pnpm build iphone     → solo los que contengan "iphone" en el nombre
 */
import { mkdirSync, readdirSync, writeFileSync } from 'node:fs'
import { basename, join } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { checkHandlebarsTemplate } from './index.ts'

const root = fileURLToPath(new URL('..', import.meta.url))
const srcDir = join(root, 'examples')
const outDir = join(root, 'dist')
const filter = process.argv[2] ?? ''

mkdirSync(outDir, { recursive: true })

const files = readdirSync(srcDir).filter((f) => f.endsWith('.ts') && f.includes(filter))
let failed = 0

for (const file of files) {
  const name = basename(file, '.ts')
  try {
    const mod: { default?: unknown } = await import(pathToFileURL(join(srcDir, file)).href)
    if (typeof mod.default !== 'string') throw new Error('el export default debe ser el resultado de Layout()')

    const out = join(outDir, `${name}.html`)
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
