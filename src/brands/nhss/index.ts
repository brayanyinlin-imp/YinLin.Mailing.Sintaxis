// Todo lo que un mail de NHSS necesita: import { Layout, Image, Text, Raw, Switch, Var, Footer, Disclaimer, utm } from '#brands/nhss'
import { createKit } from '#components/kit'
import brand from './brand.ts'

export const { Layout, Image, Text, Raw, Switch, Var, utm } = createKit(brand)
export { brand }
export { Footer, type FooterProps } from './footer.ts'
export { Disclaimer, LEGAL_ENTITY, type DisclaimerProps } from './disclaimer.ts'
