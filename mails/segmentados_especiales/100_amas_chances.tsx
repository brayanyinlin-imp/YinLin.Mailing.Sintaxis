import { Disclaimer, Footer, Image, Layout, Text, utm } from "#brands/nhss";

const u = utm({ campaign: "24nov_c_activos_100amas" });
const premios = u.link("/premios");
const ganadores = u.link("/ganadores");

export default Layout({
  subject: "😮‍💨 Hermanito, esta semana puede cambiarlo todo...",
  preheader:
    "Un depa, un BMW y una Ford Territory. Tu 2x1 en chances no estará para siempre. 👀",
  body: [
    Image({
      src: "NHSSV2_2X1_EN_TUS_CHANCES_BANNER.png",
      alt: "2x1 en tus chances",
      href: premios,
    }),
    Text({
      html: "{{name}},",
      size: 18,
      padding: [20, 0],
      variant: "primary",
    }),
    Text({
      html: (
        <>
          Aprovecha el{" "}
          <span class="fw-700">
            <strong>
              <b>2x1 en chances</b>
            </strong>
          </span>{" "}
          que compres y aumenta tus probabilidades en estos increíbles premios:
        </>
      ),
      size: 18,
      padding: [10, 10],
    }),
    Image({
      src: "NHSSV2_100_A_MAS_CHANCES_24_NOV_PRIZES.png",
      alt: "Premios: 2do departamento amoblado de 71.08 m² en Miraflores con cochera el 31 de diciembre; BMW X3 20 Confort sDrive 2027 gris metalizado y 2do Ford Territory Trend 1.5 2027 blanco el 26 de noviembre.",
      width: "70%",
      href: premios,
      padding: [20, 20],
    }),
    Image({
      src: "NHSSV2_AUMENTAR_MIS_CHANCES_BUTTON_V3.png",
      alt: "Botón Aumentar mis chances",
      width: 355,
      href: premios,
      padding: [10, 20],
    }),
    Image({
      src: "NHSSV2_NUESTROS_SUERTUDOS_OCTOBER.png",
      alt: "Nuestros suertudos ya están celebrando. Algunos ya manifestaron su suerte",
      href: ganadores,
      padding: [20, 20],
    }),
    Text({
      html: (
        <>
          <span class="text-secondary fw-700">
            <b>
              <strong>Recuerda:</strong>
            </b>
          </span>{" "}
          El mínimo de chances que puedes comprar con este beneficio es de S/.20
          y el máximo de S/.300. 🤑
        </>
      ),
      size: 18,
      padding: [10, 10],
    }),
    Image({
      src: "NHSSV2_HASTA_EL_26_DE_NOV.png",
      alt: "¡Apura! Solo tienes hasta el jueves 26 de Noviembre a las 11:59PM para aprovechar esta oportunidad",
      width: "80%",
      href: premios,
      padding: [0, 20],
    }),
    Image({
      src: "NHSSV2_AUMENTAR_MIS_CHANCES_BUTTON_V3.png",
      alt: "Botón Aumentar mis chances",
      width: 355,
      href: premios,
      padding: [10, 20],
    }),
    Footer({
      href: "https://drive.google.com/file/d/1hQfq_hAwx2dH55KTuKDZaFsyKkzfXor5/view?usp=sharing",
    }),
    Disclaimer({
      extra: [
        "El mínimo de chances que puedes comprar con este beneficio son S/. 20 y el máximo de S/.300.",
        "Disponible para una sola compra.",
        "Recuerda, adquirir más chances no asegura que ganarás. Sólo aumenta tus probabilidades de ganar.",
      ],
    }),
  ],
});
