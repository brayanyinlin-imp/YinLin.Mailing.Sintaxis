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

const u = utm({ campaign: "automatizado_referidos_inactivos" });
const suscripciones = u.link("/suscripciones?plans=opu");

const BLOB = "https://stnohaysinsuerteprod.blob.core.windows.net/mailing";

export default Layout({
  subject: "🎉 ¡Hermanito, ganaste 10 chances gracias a tu amigo!",
  preheader: "Tu referido se suscribió con tu código de referidos🍀",
  body: [
    Image({
      src: "NHSSV2_TU_AMIGO_SE_SUSCRIBIO_BANNER.png",
      alt: "Tu amigo se suscribió",
      href: suscripciones,
    }),
    Text({
      html: "Hola {{ReferrerName}},",
      variant: "highlight",
      size: 20,
      padding: [10, 5],
    }),
    Text({
      html: (
        <>
          Alguien se acaba de suscribir usando tu código al Plan Opulencia
          usando tu código{" "}
          <span class="fw-700 text-primary">
            <strong>
              <b>
                <Var name="ReferralCode" />
              </b>
            </strong>
          </span>  🎉
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
            <td align="center" style="padding:10px 15px 10px 30px">
              <img
                src={`${BLOB}/NHSSV2_10_CHANCES_ICON.png`}
                width={50}
                alt="10 chances"
                style="display:block;border:0"
              />
            </td>
            <td style="padding:10px 20px 10px 10px">
              <p class="font-main fs-16" style="margin:0;color:#ffffff">
                ¡Eso significa que ganaste 10 chances para el
              </p>
              <p class="font-main fs-16 fw-700" style="margin:0;color:#defdbb">
                <Var name="PrizeName" />
              </p>
            </td>
          </tr>
        </table>
      ),
    }),
    Text({ html: "Sigue compartiendo tu código y gana más chances:" }),
    // Tarjeta con borde: código de referido + ícono de copiar
    Image({
      src: "NHSSV2_PERO_HAY_UN_DETALLE_ASSET.png",
      width: "60%",
      alt: "Pero hay un detalle. Tu suscripción está inactiva y tus chances aún no pueden activarse",
      padding: [10, 10],
      href: suscripciones,
    }),
    Image({
      src: "NHSSV2_IR_A_LA_WEB_BUTTON.png",
      alt: "Botón Ver mis chances",
      width: 183,
      href: suscripciones,
      padding: [10, 15],
    }),
    Text({
      html: "En caso tengas alguna duda contáctanos a:",
      variant: "note",
      padding: [0, 15],
    }),
    Raw({
      name: "tarjeta-chances-ganadas",
      padding: [0, 20],
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
            <td align="center" style="padding:10px 15px 10px 30px">
              <a
                href="mailto:soporte@nohaysinsuerte.com"
                class="bg-secondary rounded-dm font-main text-[#FFFFFF]"
              >
                soporte@nohaysinsuerte.com
              </a>
            </td>
          </tr>
        </table>
      ),
    }),
    Footer(),
    Disclaimer(),
  ],
});
