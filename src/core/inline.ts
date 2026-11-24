/**
 * Pasa el CSS del <style> a atributos style="" con juice.
 * Algunos clientes eliminan el <style> (webmails, reenvíos, Outlook en ciertas versiones):
 * con el CSS inline el mail se ve igual aunque se pierda el <head>.
 */
import juice from 'juice'
import type { Html } from './html.ts'

export const inlineCss = (html: Html): Html =>
  juice(html, {
    // Se conserva el <style>: el @import de fuentes, @media, :hover y las variantes por cliente
    // (gmail:, …) no se pueden inlinear, y los clientes que leen el <style> usan las clases.
    removeStyleTags: false,
    // Las utilidades de Tailwind llevan !important: se mantiene también inline.
    preserveImportant: true,
    // Los anchos, altos y bgcolor de tablas e imágenes ya los ponen los componentes.
    applyWidthAttributes: false,
    applyHeightAttributes: false,
    applyAttributesTableElements: false,
    // Los {{…}} de Handlebars los protege juice por defecto (codeBlocks.HBS).
  })
