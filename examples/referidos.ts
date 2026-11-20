import { Disclaimer, Footer, Image, Layout } from "../src/components/index.ts";
import { campaign } from "../src/core/campaign.ts";

const c = campaign({ utm: "20nov_activos_referidos" });
const redirect = c.link("/mi-cuenta/chances");

export default Layout({
  subject: "Tu amigo se suscribió y te regalamos 10 chances",
  preheader: "Tu amigo se suscribió al Plan Opulencia usando tu código",
  body: [
    Image({
      src: "NHSSV2_TU_AMIGO_SE_SUSCRIBIO_Y_TE_REGALO_10_CHANCES_BANNER.png",
      alt: "El nuevo iPhone 18 Pro Max llegó con 2 por 1 en chances este 19 de noviembre.",
      href: redirect,
    }),
    Footer(),
    Disclaimer(),
  ],
});
