import { readFileSync } from 'node:fs'
import type { Brand } from './brand.ts'

const common = new URL('../styles/common.css', import.meta.url)

/**
 * Arma el contenido del <style>: CSS de la marca → common.css → extensión puntual del mail.
 * La marca va primero porque trae el @import de sus fuentes, que debe ser la primera regla.
 */
export const buildStyles = (brand: Brand, extra = ''): string =>
  [readFileSync(brand.styles, 'utf-8').trim(), readFileSync(common, 'utf-8').trim(), extra.trim()]
    .filter(Boolean)
    .join('\n\n')
