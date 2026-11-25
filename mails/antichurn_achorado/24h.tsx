// Migración de templates/antichurn_achorado/24h.html
import { Disclaimer, Footer, Image, Layout, Text, utm } from "#brands/nhss";

const u = utm({ campaign: "01oct_a_antichurnachorado_normal" });
const renovar = u.link("/mi-cuenta/renovar-suscripcion");

export default Layout({
  // TODO: la plantilla no tenía asunto; confirmar.
  subject: "Hermanit@, renueva tu Plan Achorado y te regalamos chances",
  preheader:
    "Renueva hoy y sigue participando por todos los premiazos de noviembre y diciembre",
  body: [
    Image({
      src: "NHSS_RENUEVA_TU_SUSCRIPCION_BANNER.png",
      alt: "Renueva tu suscripción",
      href: renovar,
    }),
    Image({
      src: "NHSSV2_RENUEVA_Y_TE_REGALAMOS_CHANCES.png",
      alt: "Renueva y te regalamos chances",
      width: "60%",
      href: renovar,
      padding: [20, 10],
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
          <b>RENUEVA</b> tu Plan Achorado y te damos por la compra de chances{" "}
          <b>10 chances en el 1er depa de diciembre y 5 chances en el BMW:</b>
        </>
      ),
      padding: [10, 30],
    }),
    Image({
      src: "NHSSV2_PREMIOS_DEL_31_DE_DICIEMBRE_ACHORADO_NORMAL.png",
      alt: "Gran sorteo del 31 de diciembre: Gana el primer departamento amoblado en Miraflores más un bono de 10 chances de regalo. Haz clic para participar y consultar las bases.",
      width: "70%",
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
    Text({
      html: (
        <>
          El 2x1 aplica cuando compras chances <b>durante la promo.</b>
        </>
      ),
      padding: [0, 10],
    }),
    Text({ html: "Así funciona:", variant: "highlight" }),
    Text({ html: "👉 Compras 30 chances", padding: [10, 0] }),
    Text({ html: "👉 Recibes 60 chances", padding: [0, 30] }),
    Image({
      src: "NHSSV2_NUESTROS_SUERTUDOS_YA_ESTAN_CELEBRANDO_NOVEMBER.png",
      alt: "Nuestros suertudos ya están celebrando",
      width: 440,
      href: renovar,
      padding: [0, 20],
    }),
    Image({
      src: "NHSS_HASTA_MANIANA.png",
      alt: "Apura, solo tienes hasta mañana para aprovechar esta oportunidad",
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
      href: "https://drive.google.com/file/d/1p1ZhlvfMy8o7z2x6A5I3Amxir1pd0jMU/view",
    }),
    Disclaimer({
      extra: [
        "Recuerda, adquirir más chances no asegura que ganarás. Sólo aumenta tus probabilidades de ganar.",
      ],
    }),
  ],
});
