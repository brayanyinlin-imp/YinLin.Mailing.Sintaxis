// Migración de templates/specials/iphone.html
import { Disclaimer, Footer, Image, Layout, Text, utm } from "#brands/nhss";

const u = utm({ campaign: "24nov_d_activos_playstation" });
const premios = u.link("/premios");

export default Layout({
  subject: "📱 El Playstation 5 llegó con 2x1 en chances 👀",
  preheader: "Hermanito tienes 2x1 por la compra de chances ¿Qué esperas?",
  body: [
    Image({
      src: "NHSSV2_2X1_EN_CHANCES_PARA_EL_PS5_24_NOV_BANNER.png",
      alt: "2 por 1 en chances para el playstation 5 este 26 de noviembre",
      href: premios,
    }),
    Image({
      src: "NHSSV2_TE_REGALAMOS_2X1_EN_EL_PLAYSTATION_5_DEL_26_NOV_TITULO.png",
      alt: "Te regalamos 2 por 1 en el playstation 5 del 26 de noviembre",
      width: "80%",
      href: premios,
      padding: [20, 10],
    }),
    Image({
      src: "NHSSV2_26_DE_NOVIEMBRE_PREMIO.png",
      alt: "Este 26 de noviembre 2 por 1 en un playstation 5 con un juego",
      width: "70%",
      href: premios,
      padding: [10, 20],
    }),
    Image({
      src: "NHSSV2_RECUERDA_EL_MINIMO_DE_CHANCES_QUE_PUEDES_COMPRAR.png",
      alt: "Recuerda: el mínimo de chances que puedes comprar con este beneficio son 10 soles y el máximo son 300 soles.",
      width: "70%",
      href: premios,
      padding: [20, 20],
    }),
    Image({
      src: "NHSSV2_QUIERO_MI_2X1_BUTTON.png",
      alt: "Botón Quiero mi 2 por 1",
      width: 211,
      href: premios,
      padding: [0, 20],
    }),
    Footer({
      href: "https://drive.google.com/file/d/12RBprIbdvsGAqNiL4PQTc2KJ9BUfyQ_a/view?usp=sharing",
    }),
    Disclaimer({
      extra: [
        "Promoción válida hasta el 26 de noviembre a las 11:59 am.",
        "Recuerda, adquirir más chances no garantiza ganar; solo aumenta tus probabilidades.",
      ],
    }),
  ],
});
