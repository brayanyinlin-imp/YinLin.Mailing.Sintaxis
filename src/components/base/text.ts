import { box as boxTable, row, table, type Html, type Padding } from '#core/html'

export type TextVariant = 'body' | 'highlight' | 'primary' | 'note'

export interface TextProps {
  /** HTML inline permitido (<b>, <br>, <span class>), emojis y variables como {{name}}. */
  html: string
  /** body: texto normal · highlight: morado claro en negrita · primary: morado oscuro en negrita · note: cursiva gris. */
  variant?: TextVariant
  /** Tamaño de fuente. Por defecto 16 (14 para note). */
  size?: 14 | 16 | 18 | 20 | 24
  /** Ancho de la caja de texto. Por defecto 440. */
  box?: 360 | 440 | 470
  padding?: Padding
}

const variantClass: Record<TextVariant, string> = {
  body: 'text-main',
  highlight: 'fw-700 text-secondary',
  primary: 'fw-700 text-primary',
  note: 'font-italic text-tertiary',
}

/** Etiquetas de bloque: dentro de un <p> son HTML inválido y el navegador las saca del párrafo, que pierde sus clases. */
const BLOCK_TAG = /<(p|div|table|h[1-6]|ul|ol|center|hr)[\s/>]/i

/** Párrafo centrado dentro de una caja de ancho fijo. */
export const Text = ({ html, variant = 'body', size, box = 440, padding = [0, 0] }: TextProps): Html => {
  const tag = html.match(BLOCK_TAG)
  if (tag) throw new Error(`Text: no admite <${tag[1]}>; el componente ya genera el <p>. Para bloques usa Raw`)
  const fs = size ?? (variant === 'note' ? 14 : 16)
  // margin:0 inline: si el cliente elimina el <style>, el <p> no recupera el margen por defecto.
  const p = `<p class="font-main fs-${fs} ${variantClass[variant]}" style="margin:0;text-align:center">${html}</p>`
  const cell = `<tr><td align="center">${p}</td></tr>`
  return table(row(boxTable(cell, box), padding))
}
