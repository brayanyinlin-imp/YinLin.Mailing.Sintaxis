import { Disclaimer, Footer, Image, Layout, Text, utm } from "#brands/nhss";

const u = utm({ campaign: "19nov_b_activos_top20000" });
const premios = u.link("/premios");
const ganadores = u.link("/ganadores");

export default Layout({
  // TODO: la plantilla no tenía asunto; confirmar.
  subject: "Tu suerte vale el doble: 2x1 en chances",
  preheader:
    "No sabemos cuál elegirías, pero sí que tienes 2x1 en la compra de chances. 🔥",
  body: [
    Image({
      src: "NHSSV2_2X1_EN_TUS_CHANCES_BANNER.png",
      alt: "2x1 en tus chances",
      href: premios,
    }),
    Image({
      src: "NHSSV2_TU_SUERTE_VALE_EL_DOBLE_TITULO.png",
      alt: "Tu suerte vale el doble",
      width: "60%",
      href: premios,
      padding: [20, 10],
    }),
    Text({
      html: "{{name}},",
      variant: "primary",
      size: 18,
      padding: [10, 0],
    }),
    Text({
      html: (
        <>
          ¡Noviembre y diciembre vienen cargados de premiazos! 🚗🏠 Aprovecha
          nuestro{" "}
          <span class="fw-700">
            <strong>
              <b>2x1 en chances</b>
            </strong>
          </span>{" "}
          y duplica tus oportunidades de llevarte los carrazos y departamentos
          que tenemos para ti.
        </>
      ),
      size: 18,
      padding: [0, 10],
    }),
    Image({
      src: "NHSSV2_TOP20000_PRIZES_19_NOV.png",
      alt: "Premios: 2 departamentos amoblados de 71.08 m² en Miraflores con cochera y Mercedes Benz GLC 200 Advanced 2027 plata el 31 de diciembre; BMW X3 20 Confort sDrive 2027 gris metalizado y 1er Ford Territory Trend 1.5 2027 gris el 26 de noviembre.",
      href: premios,
      padding: [20, 20],
    }),
    Image({
      src: "NHSSV2_QUIERO_MIS_CHANCES_BUTTON_V2.png",
      alt: "Botón Quiero mis chances",
      width: 300,
      href: premios,
      padding: [10, 20],
    }),
    Image({
      src: "NHSSV2_NUESTROS_SUERTUDOS_YA_ESTAN_CELEBRANDO_NOVEMBER.png",
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
      href: "https://drive.google.com/file/d/1BNUYs3O9dwowR2KFwBevyjSdiVSK-x_X/view?usp=sharing",
    }),
    Disclaimer({
      extra: [
        "El mínimo de chances que puedes comprar con este beneficio son S/.20 y el máximo de S/.300. Disponible para una sola compra.",
        "Recuerda, adquirir más chances no asegura que ganarás. Sólo aumenta tus probabilidades de ganar.",
      ],
    }),
  ],
});
