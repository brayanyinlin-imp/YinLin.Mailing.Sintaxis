// Migración de templates/specials/iphone.html
import { campaign, Disclaimer, Footer, Image, Layout, Text } from '../src/components/index.ts'

const c = campaign({ utm: '17nov_b_activos_iphone_2x1' })
const premios = c.link('/premios')

export default Layout({
  subject: 'El iPhone 18 Pro Max llegó con 2x1 en chances',
  preheader: 'Hermanito tienes 2x1 por la compra de chances ¿Qué esperas?',
  body: [
    Image({
      src: 'NHSSV2_EL_NUEVO_IPHONE_18_MAX_PRO_LLEGO_A_NHSS.png',
      alt: 'El nuevo iPhone 18 Pro Max llegó con 2 por 1 en chances este 19 de noviembre.',
      href: premios,
    }),
    Image({
      src: 'NHSSV2_TE_REGALAMOS_2X1_EN_LA_COMPRA_DE_CHANCES_PARA_EL_IPHONE_18_PRO_MAX.png',
      alt: 'Te regalamos 2 por 1 en chances en el iPhone 18 Pro Max del 19 de noviembre.',
      width: '80%',
      href: premios,
      padding: [20, 10],
    }),
    Image({
      src: 'NHSSV2_19_DE_NOVIEMBRE_IPHONE_18_PRO_MAX.png',
      alt: 'Premio iPhone 18 Pro Max del sorteo del 19 de noviembre',
      width: '80%',
      href: premios,
      padding: [10, 20],
    }),
    Text({ variant: 'note', html: 'Promoción válida hasta el 19 de noviembre a las 11:59 am' }),
    Image({
      src: 'NHSSV2_RECUERDA_EL_MINIMO_DE_CHANCES_QUE_PUEDES_COMPRAR.png',
      alt: 'Recuerda: el mínimo de chances que puedes comprar con este beneficio son 10 soles y el máximo son 300 soles.',
      width: '80%',
      href: premios,
      padding: [20, 20],
    }),
    Image({ src: 'NHSSV2_QUIERO_MI_2X1_BUTTON.png', alt: 'Botón Quiero mi 2 por 1', width: 211, href: premios, padding: [0, 20] }),
    Image({
      src: 'NHSSV2_DISEÑO_POTENCIA_Y_TODO_LO_QUE_QUIERES.png',
      alt: 'Diseño, potencia y todo lo que quieres en un solo premio. Más potencia, mejores fotos y una experiencia única',
      href: premios,
      padding: [0, 20],
    }),
    Text({ variant: 'highlight', html: '¿Ya te viste estrenándolo?' }),
    Text({ html: 'Aprovecha esta promo y suma más chances', padding: [0, 20] }),
    Image({ src: 'NHSSV2_AUMENTAR_CHANCES_BUTTON.png', alt: 'Botón Aumentar chances', width: 295, href: premios, padding: [0, 20] }),
    Footer(),
    Disclaimer({
      extra: [
        'Promoción válida hasta el 19 de noviembre a las 11:59 am.',
        'Recuerda, adquirir más chances no garantiza ganar; solo aumenta tus probabilidades.',
      ],
    }),
  ],
})
