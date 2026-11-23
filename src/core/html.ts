/**
 * Primitivos de HTML para email.
 * Todo lo que exige la compatibilidad con clientes de correo (Gmail, Outlook, Apple Mail)
 * vive aquí para que ningún componente tenga que recordarlo.
 */

/** Un fragmento de HTML ya renderizado. */
export type Html = string

export type Width = number | `${number}%`
export type Padding = [top: number, bottom: number]

/** Escapa texto plano para usarlo en un atributo o como contenido. */
export const esc = (s: string): string =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

/** Acepta el nombre de un archivo del blob de la marca (`base`) o una URL https absoluta. */
export const asset = (base: string, src: string): string => (src.startsWith('https://') ? src : base + src)

/** Ancho como valor CSS: 211 → "211px", "80%" → "80%". */
export const cssWidth = (w: Width): string => (typeof w === 'number' ? `${w}px` : w)

const presentation = 'role="presentation" border="0" cellpadding="0" cellspacing="0"'

/** Tabla de presentación a todo el ancho: el ladrillo de cualquier bloque. */
export const table = (rows: Html, bg = '#ffffff'): Html =>
  `<table ${presentation} width="100%" bgcolor="${bg}" style="border-collapse:collapse;background-color:${bg}">${rows}</table>`

/** Tabla de presentación de ancho fijo y centrada (cajas de texto, contenedores). */
export const box = (rows: Html, width: number): Html =>
  `<table ${presentation} width="${width}" align="center" style="border-collapse:collapse;width:${width}px;max-width:100%;margin:0 auto">${rows}</table>`

/**
 * Una fila con una celda centrada.
 * El padding va en el <td>: Outlook lo ignora cuando se pone en <table>.
 */
export const row = (content: Html, padding: Padding = [0, 0], extraStyle = ''): Html =>
  `<tr><td align="center" style="padding:${padding[0]}px 0 ${padding[1]}px;${extraStyle}">${content}</td></tr>`
