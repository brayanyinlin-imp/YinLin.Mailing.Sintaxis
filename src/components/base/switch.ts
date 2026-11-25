import type { Html } from '#core/html'

/** Variable de Handlebars: type, level, user.plan. */
const VALID_VARIABLE = /^[A-Za-z_][A-Za-z0-9_]*(\.[A-Za-z_][A-Za-z0-9_]*)*$/
/** Valor de un caso: va entre comillas dobles en la plantilla, así que no puede llevar comillas ni llaves. */
const VALID_VALUE = /^[^"{}\\]+$/

type Content = Html | Html[]

export interface SwitchProps {
  /** Variable de la plataforma de envío por la que se segmenta: "type" (NHSS), "level" (TuCambista). */
  on: string
  /** Contenido por valor de la variable. Solo lo que cambia: uno o varios bloques del body. */
  cases: Record<string, Content>
  /** Contenido si ningún caso coincide. Sin default, esos destinatarios no ven nada en este punto. */
  default?: Content
}

const join = (content: Content): Html => (Array.isArray(content) ? content.join('\n') : content)

/**
 * Contenido por segmento, resuelto por la plataforma al enviar:
 *   Switch({ on: 'type', cases: { A: …, B: … }, default: … })
 *   → {{#equals type "A"}}…{{else equals type "B"}}…{{else}}…{{/equals}}
 * Es la forma encadenada que ya usan las plantillas enviadas (beneficios, bienvenida).
 * Se usa en el body como cualquier otro bloque: envuelve solo lo que cambia, no el mail entero.
 */
export const Switch = ({ on, cases, default: fallback }: SwitchProps): Html => {
  if (!VALID_VARIABLE.test(on)) throw new Error(`Switch: "${on}" no es un nombre de variable válido`)
  const entries = Object.entries(cases)
  if (entries.length === 0) throw new Error(`Switch "${on}": necesita al menos un caso`)
  for (const [value] of entries) {
    if (!VALID_VALUE.test(value)) throw new Error(`Switch "${on}": el valor "${value}" no puede llevar comillas, llaves ni "\\"`)
  }

  const branches = entries.map(
    ([value, content], i) => `{{${i === 0 ? '#' : 'else '}equals ${on} "${value}"}}\n${join(content)}`,
  )
  if (fallback !== undefined) branches.push(`{{else}}\n${join(fallback)}`)
  return `${branches.join('\n')}\n{{/equals}}`
}
