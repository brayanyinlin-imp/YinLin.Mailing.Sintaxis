import { Disclaimer, Footer, Image, Layout, Text, utm } from "#brands/nhss";

const u = utm({ campaign: "23nov_c_activos_nochances_noengaged" });
const premios = u.link("/premios");

export default Layout({
  subject: "🔥 ¡Hermanito, tu primera compra de chances vale X2!",
  preheader:
    "🏠 Aprovecha tu 2x1 en chances para el 2do depa en Miraflores + cochera.",
  body: [
    Image({
      src: "NHSSV2_TU_COMPRA_VALE_X2_BANNER.png",
      alt: "Tu primera compra vale x2",
      href: premios,
    }),
    Text({
      html: "{{name}}, en tu primera compra de chances",
      variant: "primary",
      size: 18,
      padding: [20, 0],
    }),
    Image({
      src: "NHSSV2_RECIBES_EL_DOBLE_POR_EL_MISMO_PRECIO_TITULO.png",
      alt: "Recibes el doble por el mismo precios",
      width: "70%",
      href: premios,
      padding: [10, 10],
    }),
    Image({
      src: "NHSSV2_2X1_EN_CHANCES_2DO_DEPA_ASSET.png",
      alt: "2 por 1 en chances en el segundo depa amoblado en miraflors con cochera",
      width: "70%",
      href: premios,
      padding: [20, 20],
    }),
    Text({
      variant: "body",
      html: (
        <>
          Solo válido para el{" "}
          <span class="fw-700">
            <strong>
              <b>
                2do departamento amoblado de 71.08 m² en Miraflores + cochera
              </b>
            </strong>
          </span>{" "}
          de{" "}
          <span class="fw-700">
            <strong>
              <b>este 31 de diciembre.</b>
            </strong>
          </span>
        </>
      ),
    }),
    Text({
      variant: "highlight",
      html: "🔥 ¡COMPRAS 20 CHANCES Y RECIBES 40!",
      padding: [20, 10],
    }),
    Text({
      variant: "body",
      html: (
        <>
          <span class="fw-700 text-secondary">
            <strong>
              <b>Recuerda:</b>
            </strong>
          </span>{" "}
          Compra mínima S/20 chances y máxima de S/300
        </>
      ),
      padding: [0, 20],
    }),
    Image({
      src: "NHSSV2_COMPRA_TUS_CHANCES_AQUI_BUTTON.png",
      alt: "Boton compra tus chances aquí",
      width: 360,
      href: premios,
      padding: [0, 20],
    }),

    Text({
      variant: "note",
      html: "Promo disponible hasta el 26 de noviembre a las 11:59am",
      padding: [0, 20],
    }),
    Footer({
      href: "https://drive.google.com/file/d/13UPnKcoJweIBG51wX10abw94wbpRxpti/view?usp=sharing",
    }),
    Disclaimer({
      extra: [
        "El mínimo de chances que puedes comprar con este beneficio son S/. 20 y el máximo de S/.300. Disponible para una sola compra.",
        "Recuerda, adquirir más chances no asegura que ganarás. Sólo aumenta tus probabilidades de ganar. ",
      ],
    }),
  ],
});
