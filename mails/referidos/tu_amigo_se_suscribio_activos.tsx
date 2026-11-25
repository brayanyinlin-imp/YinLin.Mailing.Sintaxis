import {
  Disclaimer,
  Footer,
  Image,
  Layout,
  Raw,
  Text,
  Var,
  utm,
} from "#brands/nhss";

const u = utm({ campaign: "automatizado_referidos" });
const chances = u.link("/mi-cuenta/chances");

const BLOB = "https://stnohaysinsuerteprod.blob.core.windows.net/mailing";

export default Layout({
  subject: "🎉 ¡Hermanito, ganaste 10 chances gracias a tu amigo!",
  preheader: "Tu referido se suscribió y tus 10 chances ya están listas🍀",
  body: [
    Image({
      src: "NHSSV2_TU_AMIGO_SE_SUSCRIBIO_Y_TE_REGALO_10_CHANCES_BANNER.png",
      alt: "Tu amigo se suscribió y te regalamos 10 chances",
      href: chances,
    }),
    Text({
      html: "Hola {{ReferrerName}},",
      variant: "highlight",
      size: 20,
      padding: [10, 0],
    }),
    Text({
      html: (
        <>
          Tu amigo se suscribió al Plan Opulencia usando tu código{" "}
          <span class="fw-700 text-primary">
            <strong>
              <b>
                <Var name="ReferralCode" />
              </b>
            </strong>
          </span>
        </>
      ),
    }),

    // Tarjeta morada: ícono de 10 chances + mensaje
    Raw({
      name: "tarjeta-chances-ganadas",
      padding: [20, 20],
      html: (
        <table
          role="presentation"
          border={0}
          cellpadding={0}
          cellspacing={0}
          width="59%"
          align="center"
          bgcolor="#b84fff"
          style="border:1px solid #d7deeb;border-radius:5px;background:#b84fff;margin:0 auto"
        >
          <tr>
            <td align="center" style="padding:10px 10px 10px 20px">
              <img
                src={`${BLOB}/NHSSV2_10_CHANCES_ICON.png`}
                width={40}
                alt="10 chances"
                style="display:block;border:0"
              />
            </td>
            <td style="padding:10px 20px 10px 0">
              <p class="font-main fs-16" style="margin:0;color:#ffffff">
                ¡Ya tienes 10 chances para el
              </p>
              <p class="font-main fs-16 fw-700" style="margin:0;color:#defdbb">
                <Var name="PrizeName" />
              </p>
            </td>
          </tr>
        </table>
      ),
    }),
    Text({ html: "Podrás ver tus chances en la sección" }),
    Text({
      html: `<span class="fw-700"><strong><b>“MI CUENTA” y “MIS CHANCES”</b></strong></span>`,
      variant: "body",
      padding: [0, 20],
    }),
    Image({
      src: "NHSSV2_VER_MIS_CHANCES_BUTTON_V3.png",
      alt: "Botón Ver mis chances",
      width: 259,
      href: chances,
      padding: [10, 20],
    }),
    Text({ html: "Sigue compartiendo tu código y gana más chances:" }),

    // Tarjeta con borde: código de referido + ícono de copiar
    Raw({
      name: "tarjeta-codigo-referido",
      padding: [20, 20],
      html: (
        <table
          role="presentation"
          border={0}
          cellpadding={0}
          cellspacing={0}
          width="45%"
          align="center"
          style="border:1px solid #d7deeb;border-radius:5px;margin:0 auto"
        >
          <tr>
            <td align="center" style="padding:10px 0 10px 20px">
              <p class="font-main fs-16 text-tertiary" style="margin:0">
                Tu código de referido
              </p>
              <p class="font-main fs-16 fw-700 text-secondary" style="margin:0">
                <Var name="ReferralCode" />
              </p>
            </td>
            <td align="center" style="padding:10px 20px 10px 10px">
              <img
                src={`${BLOB}/NHSSV2_COPY_ICON.png`}
                width={40}
                alt="Copiar código"
                style="display:block;border:0"
              />
            </td>
          </tr>
        </table>
      ),
    }),
    Footer(),
    Disclaimer({
      extra: [
        "Recuerda, adquirir más chances no asegura que ganarás. Sólo aumenta tus probabilidades de ganar.",
      ],
    }),
  ],
});
