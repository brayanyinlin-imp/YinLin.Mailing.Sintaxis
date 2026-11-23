/**
 * Servidor de desarrollo con hot reload, sin dependencias.
 *   pnpm dev → http://localhost:5173
 *
 * - Observa src/ y examples/. Ante un cambio, regenera dist/ en un proceso nuevo
 *   (así no hay caché de módulos) y avisa al navegador para que recargue.
 * - El script de recarga se inyecta al servir; los archivos de dist/ quedan limpios.
 * - Si el build falla, el error se muestra encima del mail sin perder la vista.
 */
import { spawn } from 'node:child_process'
import { watch } from 'node:fs'
import { readdir, readFile } from 'node:fs/promises'
import { createServer, type ServerResponse } from 'node:http'
import { join, normalize, sep } from 'node:path'
import { fileURLToPath } from 'node:url'

const PORT = Number(process.env.PORT ?? 5173)
const root = fileURLToPath(new URL('..', import.meta.url))
const distDir = join(root, 'dist')
const clients = new Set<ServerResponse>()

const broadcast = (event: string, data = '') => {
  for (const res of clients) res.write(`event: ${event}\ndata: ${JSON.stringify(data)}\n\n`)
}

// ── Build ────────────────────────────────────────────────────────────────────
let building = false
let pending = false

const build = (): void => {
  if (building) {
    pending = true
    return
  }
  building = true
  const started = Date.now()
  let output = ''
  const child = spawn(process.execPath, ['--import', 'tsx', join(root, 'src', 'build.ts')], { cwd: root })
  child.stdout.on('data', (d) => (output += d))
  child.stderr.on('data', (d) => (output += d))
  child.on('close', (code) => {
    building = false
    const ms = Date.now() - started
    if (code === 0) {
      console.log(`↻ build OK (${ms} ms)`)
      broadcast('reload')
    } else {
      console.error(`✘ build con errores (${ms} ms)\n${output}`)
      broadcast('build-error', output.trim())
    }
    if (pending) {
      pending = false
      build()
    }
  })
}

// ── Watch ────────────────────────────────────────────────────────────────────
let timer: NodeJS.Timeout | undefined
for (const dir of ['src', 'examples']) {
  watch(join(root, dir), { recursive: true }, (_event, file) => {
    if (!file) return
    clearTimeout(timer)
    timer = setTimeout(() => {
      console.log(`· cambio en ${dir}/${file}`)
      build()
    }, 80)
  })
}

// ── Servidor ─────────────────────────────────────────────────────────────────
const CLIENT = `<script>
(() => {
  const es = new EventSource('/__events')
  es.addEventListener('reload', () => location.reload())
  es.addEventListener('build-error', (e) => {
    let box = document.getElementById('__dev-error')
    if (!box) {
      box = document.createElement('pre')
      box.id = '__dev-error'
      box.style.cssText = 'position:fixed;inset:auto 0 0 0;max-height:50vh;overflow:auto;margin:0;padding:12px 16px;background:#2b0b0b;color:#ffb4b4;font:12px/1.5 ui-monospace,monospace;z-index:99999;white-space:pre-wrap'
      document.body.appendChild(box)
    }
    box.textContent = JSON.parse(e.data)
  })
})()
</script>`

const index = async (): Promise<string> => {
  const files = (await readdir(distDir, { recursive: true, encoding: 'utf-8' }).catch(() => []))
    .map((f) => f.split(sep).join('/'))
    .filter((f) => f.endsWith('.html'))
    .sort()

  // Agrupa por carpeta: la raíz primero, luego cada subcarpeta (p. ej. una por marca).
  const groups = new Map<string, string[]>()
  for (const f of files) {
    const folder = f.includes('/') ? f.slice(0, f.lastIndexOf('/')) : ''
    groups.set(folder, [...(groups.get(folder) ?? []), f])
  }
  const sections = [...groups]
    .sort(([a], [b]) => (a === '' ? -1 : b === '' ? 1 : a.localeCompare(b)))
    .map(([folder, list]) => {
      const items = list
        .map((f) => `<li><a href="/${encodeURI(f)}">${f.slice(folder ? folder.length + 1 : 0).replace(/\.html$/, '')}</a></li>`)
        .join('')
      return `${folder ? `<h2>${folder}/</h2>` : ''}<ul>${items}</ul>`
    })
    .join('')

  return `<!DOCTYPE html><html lang="es"><head><meta charset="utf-8"><title>Mailings</title>
<style>body{font:15px system-ui,sans-serif;max-width:600px;margin:40px auto;padding:0 16px}a{color:#6c1297}h2{font-size:15px;margin:24px 0 4px;color:#555}</style></head>
<body><h1>Mailings</h1>${sections || '<ul><li>Sin mails en dist/</li></ul>'}</body></html>`
}

createServer(async (req, res) => {
  const path = decodeURIComponent(new URL(req.url ?? '/', 'http://x').pathname)

  if (path === '/__events') {
    res.writeHead(200, { 'content-type': 'text/event-stream', 'cache-control': 'no-cache', connection: 'keep-alive' })
    res.write(': ok\n\n')
    clients.add(res)
    req.on('close', () => clients.delete(res))
    return
  }

  try {
    const file = join(distDir, normalize(path).replace(/^([/\\])+/, ''))
    if (!file.startsWith(distDir)) throw new Error('fuera de dist/')
    const html = path === '/' ? await index() : await readFile(file, 'utf-8')
    res.writeHead(200, { 'content-type': 'text/html; charset=utf-8', 'cache-control': 'no-store' })
    res.end(html.replace('</body>', `${CLIENT}</body>`))
  } catch {
    res.writeHead(404, { 'content-type': 'text/plain; charset=utf-8' }).end(`No existe ${path}`)
  }
}).listen(PORT, () => {
  console.log(`Mailings en http://localhost:${PORT}  (observando src/ y examples/)`)
  build()
})
