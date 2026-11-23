/** Valor de un query param. `undefined` se omite al serializar. */
export type QueryValue = string | number | boolean | undefined

/** Query params como objeto. El orden de las claves es el orden en la URL. */
export type Query = Readonly<Record<string, QueryValue>>

/** Expresiones de Handlebars ({{email}}): se resuelven al enviar, así que no se codifican. */
const HANDLEBARS = /(\{\{[^}]*\}\})/

const encode = (value: string): string =>
  value
    .split(HANDLEBARS)
    .map((part) => (HANDLEBARS.test(part) ? part : encodeURIComponent(part)))
    .join('')

/**
 * Serializa un objeto a query string respetando el orden de las claves.
 * No usa URLSearchParams porque codificaría `{{email}}` como `%7B%7Bemail%7D%7D`.
 *
 *   toQuery({ returnUrl: '/premios', email: '{{email}}', vacio: undefined })
 *   → "returnUrl=%2Fpremios&email={{email}}"
 */
export const toQuery = (query: Query): string =>
  Object.entries(query)
    .filter((entry): entry is [string, string | number | boolean] => entry[1] !== undefined)
    .map(([key, value]) => `${encodeURIComponent(key)}=${encode(String(value))}`)
    .join('&')
