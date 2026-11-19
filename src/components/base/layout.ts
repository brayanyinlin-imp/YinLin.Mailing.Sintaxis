import { esc, type Html } from '../../core/html.ts'
import { buildStyles } from '../../core/styles.ts'

export interface LayoutProps {
  /** Asunto del correo; también se usa como <title>. */
  subject: string
  /** Texto de vista previa en la bandeja (~90 caracteres). */
  preheader: string
  /** CSS adicional solo para este mail; se agrega después de base.css. */
  css?: string
  body: Html[]
}

/** Relleno tras el preheader para que el cliente no muestre texto del cuerpo en la vista previa. */
const PREHEADER_FILLER = '&zwnj;&nbsp;'.repeat(70)

const hidden = 'display:none;font-size:1px;line-height:1px;max-height:0;max-width:0;opacity:0;overflow:hidden;mso-hide:all'

/** Documento completo: head, estilos, preheader y contenedor de 600px. */
export const Layout = ({ subject, preheader, css = '', body }: LayoutProps): Html => `<!DOCTYPE html>
<html lang="es" xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="x-apple-disable-message-reformatting">
<meta name="color-scheme" content="light">
<meta name="supported-color-schemes" content="light">
<title>${esc(subject)}</title>
<style type="text/css">
${buildStyles(css)}
</style>
</head>
<body style="margin:0;padding:0;background-color:#ffffff">
<div style="${hidden}" aria-hidden="true">${esc(preheader)}</div>
<div style="${hidden}" aria-hidden="true">${PREHEADER_FILLER}</div>
<table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" bgcolor="#ffffff" style="background-color:#ffffff"><tr><td align="center">
<table role="presentation" border="0" cellpadding="0" cellspacing="0" width="600" style="width:600px;max-width:100%"><tr><td>
${body.join('\n')}
</td></tr></table>
</td></tr></table>
</body>
</html>
`
