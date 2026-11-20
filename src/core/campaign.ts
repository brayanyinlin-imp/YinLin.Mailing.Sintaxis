const SITE = 'https://jorgitoluna.com'

/** Solo letras sin tilde, números y "_": evita UTMs como "13OCT_B_ACTIVOS_iphone 2x1" o "cumpleaños". */
const VALID_UTM = /^[A-Za-z0-9_]+$/

export interface CampaignConfig {
  /** utm_campaign tal cual, p. ej. "17nov_b_activos_iphone_2x1". */
  utm: string
}

export interface LinkOptions {
  /** Agrega email e internalId (resueltos por la plataforma al enviar). Por defecto: true. */
  personalized?: boolean
}

export interface Campaign {
  readonly utm: string
  /** Link a la web con login: returnUrl + UTMs (+ email e internalId). */
  link(path: string, options?: LinkOptions): string
  /** Link externo o mailto, sin modificar. */
  url(href: string): string
}

export const campaign = ({ utm }: CampaignConfig): Campaign => {
  if (!VALID_UTM.test(utm)) {
    throw new Error(`utm "${utm}" inválido: usa solo letras sin tilde, números y "_"`)
  }

  return {
    utm,
    link(path, { personalized = true } = {}) {
      if (!path.startsWith('/')) throw new Error(`c.link("${path}"): la ruta debe empezar con "/"`)
      const url =
        `${SITE}/iniciar-sesion?returnUrl=${encodeURIComponent(path)}` +
        `&utm_source=newsletter&utm_medium=email&utm_campaign=${utm}`
      return personalized ? `${url}&email={{email}}&internalId={{internalId}}` : url
    },
    url(href) {
      if (!/^(https:\/\/|mailto:)/.test(href)) throw new Error(`c.url("${href}"): debe empezar con https:// o mailto:`)
      return href
    },
  }
}
