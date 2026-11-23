import type { Brand } from '../core/brand.ts'
import { createUtm } from '../core/utm.ts'
import { createImage } from './base/image.ts'
import { createLayout } from './base/layout.ts'
import { Text } from './base/text.ts'

/**
 * Componentes base atados a una marca. Cada marca lo expone desde su index.ts,
 * así un mail importa todo de su marca y no puede mezclar assets, estilos ni links de otra.
 */
export const createKit = (brand: Brand) => ({
  brand,
  Layout: createLayout(brand),
  Image: createImage(brand),
  Text,
  utm: createUtm(brand),
})
