// Todo lo que un mail de NHSS necesita: import { Layout, Image, Text, Footer, Disclaimer, utm } from '…/brands/nhss/index.ts'
import { createKit } from '../../components/kit.ts'
import brand from './brand.ts'

export const { Layout, Image, Text, utm } = createKit(brand)
export { brand }
export { Footer, type FooterProps } from './footer.ts'
export { Disclaimer, LEGAL_ENTITY, type DisclaimerProps } from './disclaimer.ts'
