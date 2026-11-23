import type { Brand } from '#core/brand'
import { createUtm } from '#core/utm'
import { createImage } from './base/image.ts'
import { createLayout } from './base/layout.ts'
import { Raw } from './base/raw.ts'
import { Text } from './base/text.ts'
import { Var } from './base/var.ts'

/**
 * Componentes base atados a una marca. Cada marca lo expone desde su index.ts,
 * así un mail importa todo de su marca y no puede mezclar assets, estilos ni links de otra.
 */
export const createKit = (brand: Brand) => ({
  brand,
  Layout: createLayout(brand),
  Image: createImage(brand),
  Text,
  Raw,
  Var,
  utm: createUtm(brand),
})
