import { asset, table, type Html } from "../../core/html.ts";
import nhss from "./brand.ts";

const FOOTER_BG = "#ce83fd";

const SOCIAL = [
  {
    name: "Instagram",
    href: "https://www.instagram.com/nohaysinsuerteoficial/",
    icon: "ig-baw.png",
  },
  {
    name: "TikTok",
    href: "https://www.tiktok.com/@nohaysinsuerte",
    icon: "NHSS_ICONO_TIKTOK.png",
  },
  {
    name: "WhatsApp",
    href: "https://whatsapp.com/channel/0029VacopYDLikg74UComi3l",
    icon: "NHSS_ICONO_WHATSAPP.png",
  },
];

const icon = (s: (typeof SOCIAL)[number]): Html =>
  `<td align="center" style="padding:0 10px"><a href="${s.href}" target="_blank"><img src="${asset(nhss.assets, s.icon)}" width="30" alt="${s.name}" style="display:block;border:0"></a></td>`;

export interface FooterProps {
  /** Link de "Términos & condiciones" (p. ej. los T&C de una promo). Por defecto, /terminos-y-condiciones. */
  href?: string;
}

/** Footer 1 (logo + redes) y Footer 2 (soporte, T&C y Ayuda). Idéntico en todos los mails. */
export const Footer = ({
  href = "https://jorgitoluna.com/terminos-y-condiciones"
}: FooterProps = {}): Html => {
  const brand = table(
    `<tr><td align="center" style="padding:15px 0">` +
      `<table role="presentation" border="0" cellpadding="0" cellspacing="0" style="margin:0 auto"><tr>` +
      `<td align="center" style="padding-right:20px;border-right:1px solid #ffffff">` +
      `<a href="https://jorgitoluna.com?utm_source=newsletter&utm_medium=email" target="_blank">` +
      `<img src="${asset(nhss.assets, "NHSS_LOGO.png")}" width="47" height="47" alt="No hay sin suerte" style="display:block;border:0"></a></td>` +
      `<td width="20"></td>` +
      `<td align="center"><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr>${SOCIAL.map(icon).join("")}</tr></table></td>` +
      `</tr></table></td></tr>`,
    FOOTER_BG,
  );

  const link = "color:#ffffff;text-decoration:underline";
  const support = table(
    `<tr><td style="padding:0 12px 21px">` +
      `<p class="footer-text" style="font-size:11px;padding-bottom:5px">Si tiene alguna pregunta por favor enviar un email a <b>soporte@nohaysinsuerte.com</b></p>` +
      `<p class="footer-text" style="font-style:italic;padding-bottom:5px">No responder este correo solo es de comunicaciones.</p>` +
      `<p class="footer-text">` +
      `<a href="${href}" target="_blank" style="${link}">Términos &amp; condiciones</a> | ` +
      `<a href="https://jorgitoluna.com/preguntas-frecuentes" target="_blank" style="${link}">Ayuda</a></p>` +
      `</td></tr>`,
    FOOTER_BG,
  );

  return brand + support;
};
