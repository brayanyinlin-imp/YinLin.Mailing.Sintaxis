import { box as boxTable, row, table, type Html, type Padding } from '../../core/html.ts'

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

/** Párrafo centrado dentro de una caja de ancho fijo. */
export const Text = ({ html, variant = 'body', size, box = 440, padding = [0, 0] }: TextProps): Html => {
  const fs = size ?? (variant === 'note' ? 14 : 16)
  const cell = `<tr><td align="center" class="font-main fs-${fs} ${variantClass[variant]}" style="text-align:center">${html}</td></tr>`
  return table(row(boxTable(cell, box), padding))
}
