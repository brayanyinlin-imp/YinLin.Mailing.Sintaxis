import type { Html } from '#core/html'

/** Nombre de variable de Handlebars: name, lukerscode, user.firstName. */
const VALID_NAME = /^[A-Za-z_][A-Za-z0-9_]*(\.[A-Za-z_][A-Za-z0-9_]*)*$/

export interface VarProps {
  name: string
}

/**
 * Variable de la plataforma de envío: <Var name="name" /> → {{name}}.
 * En JSX no se puede escribir {{name}} directamente (se interpreta como código).
 * En strings (.ts o props con comillas) se sigue escribiendo {{name}} tal cual.
 */
export const Var = ({ name }: VarProps): Html => {
  if (!VALID_NAME.test(name)) throw new Error(`Var "${name}": nombre de variable inválido`)
  return `{{${name}}}`
}
