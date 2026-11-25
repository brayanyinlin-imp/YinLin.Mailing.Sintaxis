// Migración de templates/antichurn_achorado_dormidos/7d.html
import { Disclaimer, Footer, Image, Layout, Text, utm } from "#brands/nhss";

const u = utm({ campaign: "01oct_a_antichurnachorado_dormidos15chances" });
const renovar = u.link("/mi-cuenta/renovar-suscripcion");

export default Layout({
  // TODO: la plantilla no tenía asunto; confirmar.
  subject: "Renueva tu Plan Achorado y recibe 10 chances de regalo",
  preheader:
    "Porque renovar también podría venir con llaves 🔑 Te damos 10 chances de regalo.",
  body: [
    Image({
      src: "NHSSV2_FALTAN_7_DÍAS_PARA_QUE_VENZA_TU_PLAN_BANNER.png",
      alt: "Faltan 7 días para que venza tu plan",
      href: renovar,
    }),
    Image({
      src: "NHSSV2_RENUEVA_HOY_EN_PLAN_ACHORADO_NOVEMBER.png",
      alt: "Renueva hoy en Plan Achorado y recibe 10 chances de regalo para ganar el primer departamento amoblado de 71.08 metros cuadrados en Miraflores más cochera, en el sorteo del 31 de diciembre. Haz clic para renovar y participar.",
      width: "60%",
      href: renovar,
      padding: [10, 10],
    }),
    Image({
      src: "NHSSV2_PRIZE_ANTICHURN_DECEMBER.png",
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
      padding: [10, 10],
    }),
    Image({
      src: "NHSSV2_ASI_DE_FACIL_DORMIDOS_OPULENCIA_NOVEMBER.png",
      alt: "Pasos para participar: Renueva tu plan usando Yape o Tarjeta para recibir 10 chances adicionales y participar automáticamente con 5 chances en el sorteo del BMW. Haz clic aquí para renovar.",
      href: renovar,
      padding: [20, 10],
    }),
    Image({
      src: "NHSS_TERMINE_TU_SUSCRIPCION.png",
      alt: "Apura, solo tienes hasta que termine tu suscripción para aprovechar esta oportunidad",
      width: "80%",
      href: renovar,
      padding: [0, 20],
    }),
    Image({
      src: "NHSSV2_RENOVAR_PLAN_BUTTON.png",
      alt: "Botón Renovar plan",
      width: 225,
      href: renovar,
      padding: [0, 10],
    }),
    Text({
      html: "🔒 Es rápido, seguro y toma menos de 1 minuto",
      variant: "note",
      padding: [0, 30],
    }),
    Footer({
      href: "https://drive.google.com/file/d/1rnKrlT53SPzJjcNqeUOKxAGBhP9pATuJ/view",
    }),
    Disclaimer({
      extra: [
        "La promo solo incluye renovación en plan achorado.",
        "Recuerda, adquirir más chances no asegura que ganarás. Sólo aumenta tus probabilidades de ganar.",
      ],
    }),
  ],
});
