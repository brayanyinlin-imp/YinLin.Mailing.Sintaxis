// Migración de templates/semanal/inactivos.html
import { campaign, Disclaimer, Footer, Image, Layout, Text } from '../src/components/index.ts'

const c = campaign({ utm: '09nov_a_inactivos_8_autos_2_depa' })
const suscripciones = c.link('/suscripciones')

export default Layout({
  subject: '8 carros y 2 departamentos desde S/21',
  preheader: 'Desde S/21 por 3 meses, únete al club NHSS y participa por todo lo que se viene. 🍀',
  body: [
    Image({
      src: 'NHSSV2_2_DEPARTAMENTOS_AMOBLADOS_Y_8_AUTOS_DESDE_EL_PLAN_TRIMESTRAL_BANNER.png',
      alt: '2 departamentos amoblados y 8 carros desde el plan trimestral a 21 soles',
      href: suscripciones,
    }),
    Image({
      src: 'NHSSV2_8_CARROS_Y_2_DEPARTAMENTOS_DESDE_21_TITULO.png',
      alt: '¿8 carros y 2 departamentos desde 21 soles?',
      width: '60%',
      href: suscripciones,
      padding: [20, 20],
    }),
    Text({
      box: 360,
      html: 'Este <b>noviembre y diciembre</b> vienen con todo en No Hay Sin Suerte, y tú puedes ser parte.',
      padding: [0, 10],
    }),
    Image({ src: 'NHSSV2_SUSCRIBETE_DESDE_21_SOLES.png', alt: 'Suscríbete desde 21 soles', width: '50%', href: suscripciones, padding: [20, 20] }),
    Text({
      box: 360,
      html: 'Desde nuestro Plan Hermanito (trimestral) podrás participar por los <b>8 carrazos y 2 departamentos que se vienen.</b>',
      padding: [0, 10],
    }),
    Image({ src: 'NHSSV2_3_MESES_DE_BENEFICIOS.png', alt: '3 meses de beneficios', width: '50%', href: suscripciones, padding: [20, 20] }),
    Image({ src: 'NHSSV2_ME_SUMO_PATRON_BUTTON.png', alt: 'Botón Me sumo, patrón', width: 274, href: suscripciones, padding: [10, 10] }),
    Text({ html: '¿Y tú, ya te imaginaste con las llaves en la mano? 🔑', padding: [10, 20] }),
    Image({
      src: 'NHSSV2_NUESTROS_SUERTUDOS_YA_ESTAN_CELEBRANDO_NOVEMBER.png',
      alt: 'Nuestros suertudos ya están celebrando',
      href: suscripciones,
      padding: [10, 10],
    }),
    Footer(),
    Disclaimer(),
  ],
})
