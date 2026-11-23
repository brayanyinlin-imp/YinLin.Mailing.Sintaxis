import { Disclaimer, Footer, Image, Layout, Text, utm } from "#brands/nhss";

const u = utm({ campaign: "23nov_b_antichurndiciembre_fomo" });
const renovar = u.link("/mi-cuenta/renovar-suscripcion");

export default Layout({
  subject: "🚨 Hermanito, ¡tus 20 chances están por irse!",
  preheader:
    "⏰ Renueva anticipadamente tu Plan Opulencia y no dejes pasar tus 20 chances para el depa de Miraflores.",
  body: [
    Image({
      src: "NHSSV2_HERMANITO_SE_TE_ACABA_EL_TIEMPO_BANNER.png",
      alt: "Hermanito se te acaba el tiempo",
      href: renovar,
    }),
    Image({
      src: "NHSSV2_TUS_20_CHANCES_DE_REGALO_TITULO.png",
      alt: "Tus 20 chances de regalo",
      width: "90%",
      href: renovar,
      padding: [10, 10],
    }),
    Image({
      src: "NHSSV2_MAS_20_CHANCES_2DO_DEPA_ASSET.png",
      alt: "20 chances en el segundo depa amoblado en miraflores con cochera",
      width: "70%",
      href: renovar,
      padding: [20, 20],
    }),
    Text({
      variant: "body",
      html: (
        <>
          <strong>Renueva anticipadamente tu Plan Opulencia</strong> y recibe{" "}
          <strong>20 chances de regalo</strong> para el 2do departamento
          amoblado en Miraflores + cochera del{" "}
          <strong>31 de diciembre del 2026. 🏠</strong>
        </>
      ),
    }),
    Text({
      variant: "highlight",
      html: "🔥 ¡NO DEJES QUE SE TE ESCAPEN!",
      padding: [20, 10],
    }),
    Image({
      src: "NHSSV2_APURA_SOLO_TIENES_HASTA_30_NOV_ASSET.png",
      alt: "¡Apura! Solo tienes hasta el jueves 30 de Noviembre a las 11:59pm para aprovechar esta promoción",
      width: "80%",
      href: renovar,
      padding: [0, 20],
    }),
    Image({
      src: "NHSSV2_QUIERO_MIS_20_CHANCES_BUTTON.png",
      alt: "Boton quiero mis 20 chances",
      width: 360,
      href: renovar,
      padding: [0, 20],
    }),
    Text({
      variant: "body",
      html: (
        <>
          <span class="fw-700 text-secondary">Recuerda:</span> Al renovar
          anticipadamente no pierdes los días que aún tienes vigentes de tu
          suscripción.
        </>
      ),
      padding: [0, 20],
    }),
    Text({
      variant: "note",
      html: "Promoción sujeta a términos y condiciones. Revísalos en la web.",
      padding: [0, 20],
    }),
    Footer({
      href: "https://drive.google.com/file/d/1KSFssa06-W7oc6d1Y-6cP1u_dDmXPzou/view?usp=sharing",
    }),
    Disclaimer({
      extra: [
        "El mínimo de chances que puedes comprar con este beneficio son S/. 20 y el máximo de S/.300. Disponible para una sola compra.",
        "Recuerda, adquirir más chances no asegura que ganarás. Sólo aumenta tus probabilidades de ganar."
      ],
    }),
  ],
});
