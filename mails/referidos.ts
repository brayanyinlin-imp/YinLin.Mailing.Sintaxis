import {
  Disclaimer,
  Footer,
  Image,
  Layout,
  Text,
  utm,
} from "#brands/nhss";

const u = utm({ campaign: "20nov_activos_referidos" });
const redirect = u.link("/mi-cuenta/chances");

export default Layout({
  subject: "Tu amigo se suscribió y te regalamos 10 chances",
  preheader: "Tu amigo se suscribió al Plan Opulencia usando tu código",
  body: [
    Image({
      src: "NHSSV2_TU_AMIGO_SE_SUSCRIBIO_Y_TE_REGALO_10_CHANCES_BANNER.png",
      alt: "Tu amigo se suscribió y te regalamos 10 chances",
      href: redirect,
    }),
    Text({
      html: "Tu amigo se suscribió al Plan Opulencia usando tu código {{ReferralCode}}",
      padding: [10, 10],
    }),
    Footer(),
    Disclaimer(),
  ],
});
