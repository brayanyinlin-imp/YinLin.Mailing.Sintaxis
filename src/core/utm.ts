import type { Brand } from './brand.ts'
import { toQuery, type Query, type QueryValue } from './query.ts'

/** Solo letras sin tilde, números y "_": evita UTMs como "13OCT_B_ACTIVOS_iphone 2x1" o "cumpleaños". */
const VALID_CAMPAIGN = /^[A-Za-z0-9_]+$/

/** Las arma utm(); nadie puede sobrescribirlas con params propios. */
const RESERVED = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content'] as const

export interface UtmConfig {
  /** utm_campaign tal cual, p. ej. "17nov_b_activos_iphone_2x1". */
  campaign: string
  /** Params propios que van en todos los links del mail, p. ej. utm_media_content: "Aqui estan los premios". */
  [param: string]: QueryValue
}

export interface LinkOptions {
  /** utm_content de este link, para saber qué elemento se clicó ("banner", "cta"). */
  content?: string
  /** Params propios solo de este link, p. ej. { pc: 'EXPOCHINA' }. */
  params?: Query
  /** Agrega los params de personalización de la marca (email, internalId). Por defecto: true. */
  personalized?: boolean
}

export interface Utm {
  readonly campaign: string
  /** Link al sitio de la marca con UTMs, params propios y personalización. */
  link(path: string, options?: LinkOptions): string
  /** Link externo o mailto, sin modificar. */
  url(href: string): string
}

const assertCustom = (where: string, custom: Query, taken: Query, owner: string): void => {
  for (const key of Object.keys(custom)) {
    if ((RESERVED as readonly string[]).includes(key)) {
      throw new Error(`${where}: "${key}" lo arma utm(); usa campaign o content`)
    }
    if (key in taken) throw new Error(`${where}: "${key}" ya lo define ${owner} y no se puede sobrescribir`)
  }
}

/** Crea el generador de links de un mail. Se usa desde el kit de la marca: `utm({ campaign })`. */
export const createUtm =
  (brand: Brand) =>
  ({ campaign, ...custom }: UtmConfig): Utm => {
    if (!VALID_CAMPAIGN.test(campaign)) {
      throw new Error(`campaign "${campaign}" inválido: usa solo letras sin tilde, números y "_"`)
    }
    assertCustom('utm()', custom, brand.personalization, 'la marca')

    return {
      campaign,
      link(path, { content, params = {}, personalized = true } = {}) {
        if (!path.startsWith('/')) throw new Error(`link("${path}"): la ruta debe empezar con "/"`)
        const target = brand.link(path)
        const where = `link("${path}")`
        const system: Query = { ...target.query, ...brand.personalization }
        assertCustom(where, custom, target.query ?? {}, 'la marca')
        assertCustom(where, params, system, 'la marca')
        assertCustom(where, params, custom, 'utm({ … })')

        const query: Query = {
          ...target.query,
          utm_source: brand.utm.source,
          utm_medium: brand.utm.medium,
          utm_campaign: campaign,
          utm_content: content,
          ...custom,
          ...(personalized ? brand.personalization : {}),
          ...params,
        }
        return `${brand.site}${target.path}?${toQuery(query)}`
      },
      url(href) {
        if (!/^(https:\/\/|mailto:)/.test(href)) throw new Error(`url("${href}"): debe empezar con https:// o mailto:`)
        return href
      },
    }
  }
