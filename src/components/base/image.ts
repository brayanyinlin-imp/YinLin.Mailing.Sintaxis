import { asset, cssWidth, esc, row, table, type Html, type Padding, type Width } from '../../core/html.ts'

export interface ImageProps {
  /** Nombre del archivo en el blob o URL https absoluta. */
  src: string
  /** Obligatorio: el mail debe entenderse con las imágenes bloqueadas. */
  alt: string
  /** '100%' (banner), '80%' (fluida) o px (botón PNG). Por defecto '100%'. */
  width?: Width
  /** Link de la campaña: c.link() o c.url(). */
  href?: string
  padding?: Padding
}

/** Banner, título-imagen, premio o botón PNG. */
export const Image = ({ src, alt, width = '100%', href, padding = [0, 0] }: ImageProps): Html => {
  const img =
    `<img src="${asset(src)}" width="${width}" alt="${esc(alt)}" ` +
    `style="display:block;border:0;outline:none;width:${cssWidth(width)};max-width:100%;height:auto;margin:0 auto">`
  const content = href ? `<a href="${href}" target="_blank" style="text-decoration:none">${img}</a>` : img
  return table(row(content, padding, 'font-size:0;line-height:0'))
}
