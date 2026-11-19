import { readFileSync } from 'node:fs'

const read = (file: string): string => readFileSync(new URL(`../styles/${file}`, import.meta.url), 'utf-8')

/**
 * Arma el contenido del <style>: base.css + la extensión puntual del mail.
 * (Fase 3: aquí se sumará el CSS de los componentes compuestos que se usen.)
 */
export const buildStyles = (extra = ''): string => [read('base.css'), extra.trim()].filter(Boolean).join('\n')
