import type { Query } from './query.ts'

/** Destino de un link: ruta en el sitio de la marca y query params propios (p. ej. returnUrl). */
export interface LinkTarget {
  path: string
  query?: Query
}

/** Todo lo que distingue a un negocio. Los componentes base no conocen ninguna marca: la reciben de aquí. */
export interface Brand {
  /** Identificador corto: "nhss", "tucambista". */
  id: string
  /** Dominio sin "/" final: "https://jorgitoluna.com". */
  site: string
  /** Base de las imágenes en el blob, con "/" final. */
  assets: string
  /** utm_source y utm_medium de todos los links de la marca. */
  utm: { source: string; medium: string }
  /** Cómo llega un link a `path` (directo, o pasando por el login con returnUrl). */
  link: (path: string) => LinkTarget
  /** Params que identifican al destinatario; se agregan a los links personalizados. Vacío si la marca no los usa. */
  personalization: Query
  /** CSS de la marca (fuentes, paleta y bloques propios). Se inyecta antes de common.css. */
  styles: URL
}

const SITE = /^https:\/\/[^/]+$/

/** Valida la configuración de una marca al cargarla. */
export const defineBrand = (brand: Brand): Brand => {
  if (!SITE.test(brand.site)) throw new Error(`marca "${brand.id}": site debe ser https://dominio, sin "/" final`)
  if (!brand.assets.startsWith('https://') || !brand.assets.endsWith('/')) {
    throw new Error(`marca "${brand.id}": assets debe empezar con https:// y terminar en "/"`)
  }
  return brand
}
