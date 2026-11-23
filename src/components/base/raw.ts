import { row, table, type Html, type Padding } from '#core/html'

/** Nombre en kebab-case: identifica la pieza para detectar cuándo conviene volverla componente. */
const VALID_NAME = /^[a-z0-9]+(-[a-z0-9]+)*$/

/** Raws usados al evaluar el mail actual. build.ts lo vacía antes de cada mail y lo lee después. */
export const rawUsage: string[] = []

export interface RawProps {
  /** Nombre de la pieza en kebab-case, p. ej. "tarjeta-lukers". Si se repite en otro mail, el build avisa. */
  name: string
  /** HTML a mano: un string en .ts o JSX en .tsx. */
  html: Html
  padding?: Padding
}

/**
 * Escape para piezas únicas que no tienen componente.
 * Envuelve el HTML en la fila de 600px del mail y queda registrado en el reporte del build.
 * Regla de crecimiento: si el mismo Raw aparece en un segundo mail, se convierte en componente.
 */
export const Raw = ({ name, html, padding = [0, 0] }: RawProps): Html => {
  if (!VALID_NAME.test(name)) throw new Error(`Raw "${name}": el nombre debe ir en kebab-case, p. ej. "tarjeta-lukers"`)
  rawUsage.push(name)
  return table(row(html, padding))
}
