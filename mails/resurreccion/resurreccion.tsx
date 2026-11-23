// Resurrección de inactivos: vuelve al Plan Opulencia por S/50
import { Disclaimer, Footer, Image, Layout, Text, utm } from "#brands/nhss";

const u = utm({ campaign: "23nov_a_inactivos_resurreccion1" });
const suscripciones = u.link("/suscripciones");

export default Layout({
  subject: "🏡 2 depas en Miraflores + 8 carrazos… ¿y tú qué esperas?",
  preheader:
    "8 carrazos, 2 depas y tu Plan Opulencia por solo S/50. ¿Regresas? 🔥",
  body: [
    Image({
      src: "NHSSV2_DESDE_EL_PLAN_TRIMESTRAL_BANNER.png",
      alt: "Desde el plan trimestral participa por 2 depas y 8 carrazos, suscríbete.",
      href: suscripciones,
    }),
    Image({
      src: "NHSSV2_HERMANITO_VUELVE_QUE_SE_VIENE_LO_BUENO_V2.png",
      alt: "Hermanito, vuelve que se viene lo bueno. 2 departamentos en diciembre, 8 autos",
      width: "100%",
      href: suscripciones,
      padding: [10, 10],
    }),
    Text({
      variant: "body",
      html: (
        <>
          Este <strong>noviembre y diciembre</strong> vienen con todo en{" "}
          <span class="fw-700 text-secondary">No Hay Sin Suerte</span>, y
          queremos que vuelvas a ser parte☘️
        </>
      ),
    }),
    Image({
      src: "NHSSV2_SOLO_POR_TU_REGRESO_ASSET.png",
      alt: "Solo por tu regreso vuelve al Plan Opulencia por 50 soles",
      width: "60%",
      href: suscripciones,
      padding: [20, 20],
    }),
    Image({
      src: "NHSSV2_DISFRUTA_DE_1_ANIO_ASSET.png",
      alt: "Disfruta 1 año de suscripción, beneficios exclusivos y participa por 2 departamentos y 8 carrazos.",
      width: "50%",
      href: suscripciones,
      padding: [15, 25],
    }),
    Image({
      src: "NHSSV2_ACTIVACIONES_EXCLUSIVAS.png",
      alt: "Activaciones exclusivas durante todo el año",
      width: "95%",
      href: suscripciones,
      padding: [0, 20],
    }),
    Image({
      src: "NHSSV2_RECUERDA_QUE_POR_SER_SUSCRIPTOR_ACTIVO.png",
      alt: "Recuerda que por ser suscriptor activo, participas automáticamente en TODAS las activaciones.",
      width: "60%",
      href: suscripciones,
      padding: [0, 20],
    }),
    Image({
      src: "NHSSV2_VUELVO_CON_TODO_PATRON_BUTTON.png",
      alt: "Botón: vuelvo con todo, patrón",
      width: 360,
      href: suscripciones,
      padding: [0, 20],
    }),
    Text({
      variant: "body",
      html: "Tu próxima gran historia podría comenzar con tu regreso 🔑",
      padding: [0, 20],
    }),
    Text({
      variant: "note",
      html: "Aprovecha esta promo y suma más chances",
      padding: [0, 20],
    }),
    Footer({
      href: "https://drive.google.com/file/d/1_0KsnsasbgeauIr8BvHdTvSMMUKW9qmZ/view?usp=sharing",
    }),
    Disclaimer({
      extra: [
        "Disponible para una sola compra. En la segunda compra del plan anual el pago es de S/ 60",
      ],
    }),
  ],
});
