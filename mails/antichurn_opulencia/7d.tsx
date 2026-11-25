// Migración de templates/antichurn_opulencia/7d.html
import { Disclaimer, Footer, Image, Layout, Text, utm } from "#brands/nhss";

const u = utm({ campaign: "01oct_a_antichurnopulencia_normal" });
const renovar = u.link("/mi-cuenta/renovar-suscripcion");

export default Layout({
  // TODO: la plantilla no tenía asunto; confirmar.
  subject: "Hermanit@, renueva tu Plan Opulencia y te regalamos chances",
  preheader:
    "Porque renovar también podría venir con llaves 🔑 Te damos 10 chances de regalo.",
  body: [
    Image({
      src: "NHSS_RENUEVA_TU_SUSCRIPCION_BANNER.png",
      alt: "Renueva tu suscripción",
      href: renovar,
    }),
    Text({
      html: "¡HOLA HERMANIT@!",
      variant: "primary",
      size: 20,
      padding: [10, 0],
    }),
    Text({
      html: (
        <>
          <b>RENUEVA</b> tu PLAN OPULENCIA y te damos{" "}
          <b>
            10 chances en el 1er depa de diciembre y 5 chances en el BMW del 26
            de noviembre:
          </b>
        </>
      ),
      padding: [10, 30],
    }),
    Image({
      src: "NHSSV2_PREMIO_DEL_31_DE_DICIEMBRE.png",
      alt: "Gran sorteo del 31 de diciembre: Gana el primer departamento amoblado en Miraflores más un bono de 10 chances de regalo. Haz clic para participar y consultar las bases.",
      width: "80%",
      href: renovar,
      padding: [0, 20],
    }),
    Image({
      src: "NHSSV2_ANTICHURN_ASSET_04_NOV.png",
      alt: "Sorteo del 26 de noviembre: Acumula 5 chances adicionales para ganar una camioneta BMW X3 20 Confort sDrive 2027 en color Gris Metalizado. Haz clic para participar.",
      width: "60%",
      href: renovar,
      padding: [0, 20],
    }),
    Image({
      src: "NHSSV2_NUESTROS_SUERTUDOS_YA_ESTAN_CELEBRANDO_NOVEMBER.png",
      alt: "Nuestros suertudos ya están celebrando",
      width: 440,
      href: renovar,
      padding: [0, 20],
    }),
    Image({
      src: "NHSS_TERMINE_TU_SUSCRIPCION.png",
      alt: "Apura, solo tienes hasta que termine tu suscripción para aprovechar esta oportunidad",
      width: "80%",
      href: renovar,
      padding: [0, 20],
    }),
    Image({
      src: "NHSSV2_QUIERO_CHAPAR_ESTA_PROMO_BUTTON.png",
      alt: "Botón Quiero chapar esta promo",
      width: 341,
      href: renovar,
      padding: [0, 20],
    }),
    Footer({
      href: "https://drive.google.com/file/d/18m56bp5DAiXZCBNGBG4Iu9Dfo0kC7bMr/view",
    }),
    Disclaimer({
      extra: [
        "Recuerda, adquirir más chances no asegura que ganarás. Sólo aumenta tus probabilidades de ganar.",
      ],
    }),
  ],
});
