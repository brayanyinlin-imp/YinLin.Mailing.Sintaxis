import { table, type Html } from '../../core/html.ts'
import brand from './brand.ts'

export const LEGAL_ENTITY = 'NO HAY SIN SUERTE - Dame Tu Plata S.A.C.'

export interface DisclaimerProps {
  /** Líneas propias de la promo (vigencia, condiciones). Van antes del texto legal fijo. */
  extra?: string[]
  /** Año del ©. Por defecto, el año en que se genera el mail. */
  year?: number
}

/** Disclaimer legal. El link de baja, la razón social y el © no se pueden omitir. */
export const Disclaimer = ({ extra = [], year = new Date().getFullYear() }: DisclaimerProps = {}): Html => {
  const lines = [
    ...extra,
    'Si prefieres no recibir más correos nuestros, puedes hacer ' +
      `<a href="${brand.site}/desuscribirse?email={{email}}" target="_blank" style="color:#00ffff;text-decoration:underline">clic aquí</a>`,
    'Te pedimos que no respondas a este correo. Si tienes alguna pregunta, no dudes en escribirnos a nuestra cuenta de Instagram',
    '@nohaysinsuerte o enviar un correo electrónico a soporte@nohaysinsuerte.com',
    `Este mensaje fue enviado por ${LEGAL_ENTITY}`,
    `Todos los derechos reservados. © ${year}.`,
  ]
  const paragraphs = lines.map((l) => `<p class="disclaimer-item">${l}</p>`).join('')
  return table(`<tr><td style="padding:13px 12px">${paragraphs}</td></tr>`, '#6c1297')
}
