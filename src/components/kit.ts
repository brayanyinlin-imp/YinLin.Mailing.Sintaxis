import type { Brand } from '#core/brand'
import { createTailwind } from '#core/tailwind'
import { createUtm } from '#core/utm'
import { createImage } from './base/image.ts'
import { createLayout } from './base/layout.ts'
import { Raw } from './base/raw.ts'
import { Switch } from './base/switch.ts'
import { Text } from './base/text.ts'
import { Var } from './base/var.ts'

/**
 * Componentes base atados a una marca. Cada marca lo expone desde su index.ts,
 * así un mail importa todo de su marca y no puede mezclar assets, estilos ni links de otra.
 */
export const createKit = (brand: Brand) => ({
  brand,
  Layout: createLayout(brand, createTailwind(brand.theme)),
  Image: createImage(brand),
  Text,
  Raw,
  Switch,
  Var,
  utm: createUtm(brand),
})
