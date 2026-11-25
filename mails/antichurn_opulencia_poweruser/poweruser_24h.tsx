// Migración de templates/antichurn_opulencia_poweruser/poweruser_24h.html
import { Disclaimer, Footer, Image, Layout, Text, utm } from "#brands/nhss";

const u = utm({ campaign: "01oct_a_antichurnopulencia_poweruser15chances" });
const renovar = u.link("/mi-cuenta/renovar-suscripcion");

export default Layout({
  // TODO: la plantilla no tenía asunto; confirmar.
  subject: "{{name}}, renueva tu Plan Opulencia y te regalamos 15 chances",
  preheader:
    "Mañana puede ser tarde… renueva hoy y entrar a tu siguiente depa 🚗",
  body: [
    Image({
      src: "NHSSV2_TU_SUSCRIPCION_ESTA_POR_VENCER_BANNER.png",
      alt: "Tu suscripción está por vencer",
      href: renovar,
    }),
    Image({
      src: "NHSSV2_TE_REGALAMOS_15_CHANCES_TITULO.png",
      alt: "Te regalamos 15 chances",
      width: "80%",
      href: renovar,
      padding: [20, 10],
    }),
    Text({
      html: "Hola {{name}}",
      variant: "primary",
      size: 18,
      padding: [10, 0],
    }),
    Text({ html: "No te pierdas de esta promo:", size: 18, padding: [10, 0] }),
    Text({
      html: (
        <>
          Renueva ahora <b>tu Plan Opulencia</b> y{" "}
          <b>te regalamos chances en estos premiazos:</b>
        </>
      ),
      size: 18,
      padding: [10, 10],
    }),
    Image({
      src: "NHSSV2_BIGPRIZE_ANTICHURN_DECEMBER.png",
      alt: "Gran sorteo del 31 de diciembre: Gana el primer departamento amoblado en Miraflores más un bono de 10 chances de regalo. Haz clic para participar y consultar las bases.",
      width: "80%",
      href: renovar,
      padding: [10, 20],
    }),
    Image({
      src: "NHSSV2_ANTICHURN_ASSET_04_NOV.png",
      alt: "Sorteo del 26 de noviembre: Acumula 5 chances adicionales para ganar una camioneta BMW X3 20 Confort sDrive 2027 en color Gris Metalizado. Haz clic para participar.",
      width: "60%",
      href: renovar,
      padding: [10, 10],
    }),
    Image({
      src: "NHSSV2_ASI_DE_FACIL_POWERUSER_OPULENCIA_NOVEMBER.png",
      alt: "Pasos para participar: Renueva tu plan usando Yape o Tarjeta para recibir 10 chances adicionales para el departamento de diciembre y 5 chances adicionales para el sorteo del BMW. Haz clic aquí para renovar.",
      href: renovar,
      padding: [20, 20],
    }),
    Image({
      src: "NHSSV2_TU_PUEDES_SER_UNO_DE_NUESTROS_SUERTUDOS_ANTICHURN.png",
      alt: "Tú puedes ser uno de estos suertudos",
      href: renovar,
      padding: [20, 20],
    }),
    Image({
      src: "NHSS_HASTA_MANIANA.png",
      alt: "Apura, solo tienes hasta mañana para aprovechar esta oportunidad",
      width: "80%",
      href: renovar,
      padding: [0, 20],
    }),
    Image({
      src: "NHSSV2_RENOVAR_AHORA_BUTTON.png",
      alt: "Botón Renovar ahora",
      width: 245,
      href: renovar,
      padding: [0, 20],
    }),
    Text({
      html: "🔒 Es rápido, seguro y toma menos de 1 minuto",
      variant: "note",
      padding: [0, 30],
    }),
    Footer({
      href: "https://drive.google.com/file/d/1EVqhlGDw2ZxOxuZzy1Jv-g940denFZ-o/view",
    }),
    Disclaimer({
      extra: [
        "La promo solo incluye renovación en plan opulencia.",
        "Recuerda, adquirir más chances no asegura que ganarás. Sólo aumenta tus probabilidades de ganar.",
      ],
    }),
  ],
});
