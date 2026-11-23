/**
 * Runtime JSX propio: convierte JSX en strings de HTML, sin React.
 * Se activa con "jsxImportSource": "#jsx" en tsconfig y solo aplica a archivos .tsx.
 *
 * Reglas:
 * - Un elemento produce un string `Html`, así que sirve en Raw({ html }), Text({ html }) o en body.
 * - El texto NO se escapa (igual que Text({ html: '…' })): el contenido lo escribimos nosotros.
 *   Para texto de origen dudoso, usar esc() de #core/html.
 * - Atributos: `class` y `style` como string (HTML de email, no React). `false`/`undefined` se omiten,
 *   `true` se escribe sin valor. Las comillas dobles en valores se escapan.
 */
import type { Html } from '#core/html'

type Child = Html | number | boolean | null | undefined | readonly Child[]
type AttrValue = string | number | boolean | undefined

/** Etiquetas que no llevan cierre en HTML. */
const VOID = new Set(['area', 'br', 'col', 'hr', 'img', 'input', 'meta', 'link', 'source', 'wbr'])

const renderChildren = (children: Child): Html => {
  if (children === null || children === undefined || typeof children === 'boolean') return ''
  if (Array.isArray(children)) return children.map(renderChildren).join('')
  return String(children)
}

const renderAttrs = (props: Record<string, unknown>): string =>
  Object.entries(props)
    .filter(([key, value]) => key !== 'children' && value !== undefined && value !== false && value !== null)
    .map(([key, value]) => (value === true ? ` ${key}` : ` ${key}="${String(value as AttrValue).replace(/"/g, '&quot;')}"`))
    .join('')

type Component<P> = (props: P) => Html

export function jsx(type: string | Component<any>, props: Record<string, unknown>): Html {
  if (typeof type === 'function') return type(props)
  const open = `<${type}${renderAttrs(props)}>`
  if (VOID.has(type)) return open
  return `${open}${renderChildren(props['children'] as Child)}</${type}>`
}

export const jsxs = jsx

export const Fragment = ({ children }: { children?: Child }): Html => renderChildren(children)

// ── Tipos ────────────────────────────────────────────────────────────────────
// Solo etiquetas y atributos útiles en email. Una etiqueta o atributo fuera de esta lista no compila.

type Align = 'left' | 'center' | 'right'
type Size = number | `${number}` | `${number}%`

interface BaseAttrs {
  children?: Child
  class?: string
  style?: string
  id?: string
  title?: string
  dir?: 'ltr' | 'rtl'
  lang?: string
  role?: string
  'aria-hidden'?: 'true' | 'false'
  'aria-label'?: string
}

interface BlockAttrs extends BaseAttrs {
  align?: Align
}

interface CellAttrs extends BlockAttrs {
  valign?: 'top' | 'middle' | 'bottom'
  width?: Size
  height?: Size
  bgcolor?: string
  colspan?: number
  rowspan?: number
}

interface TableAttrs extends BlockAttrs {
  width?: Size
  height?: Size
  bgcolor?: string
  border?: number | `${number}`
  cellpadding?: number | `${number}`
  cellspacing?: number | `${number}`
}

interface AnchorAttrs extends BaseAttrs {
  /** Usar u.link() o u.url(). */
  href: string
  target?: '_blank'
  rel?: string
  /** Atributo de SendGrid para desactivar el tracking de clics en este link. */
  clicktracking?: 'off'
}

interface ImgAttrs extends Omit<BaseAttrs, 'children'> {
  src: string
  /** Obligatorio: el mail debe entenderse con las imágenes bloqueadas. */
  alt: string
  width?: Size
  height?: Size
  border?: number | `${number}`
  align?: Align
}

export namespace JSX {
  export type Element = Html
  export interface ElementChildrenAttribute {
    children: {}
  }
  export interface IntrinsicElements {
    // Estructura
    table: TableAttrs
    tbody: BaseAttrs
    thead: BaseAttrs
    tr: BlockAttrs
    td: CellAttrs
    th: CellAttrs
    div: BlockAttrs
    center: BaseAttrs
    // Texto
    p: BlockAttrs
    span: BaseAttrs
    h1: BlockAttrs
    h2: BlockAttrs
    h3: BlockAttrs
    b: BaseAttrs
    strong: BaseAttrs
    i: BaseAttrs
    em: BaseAttrs
    u: BaseAttrs
    s: BaseAttrs
    small: BaseAttrs
    sup: BaseAttrs
    sub: BaseAttrs
    ul: BaseAttrs
    ol: BaseAttrs
    li: BaseAttrs
    br: Omit<BaseAttrs, 'children'>
    hr: Omit<BaseAttrs, 'children'>
    // Links e imágenes
    a: AnchorAttrs
    img: ImgAttrs
  }
}
