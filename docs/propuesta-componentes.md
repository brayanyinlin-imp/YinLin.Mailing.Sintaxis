# Propuesta: estandarización de mailings con componentes

> **Estado:** v2, con las decisiones acordadas · **Fecha:** 2026-11-19
> **Avance:** Fase 1 implementada. Se genera con `pnpm build` (salida en `dist/`). Los mails están en `mails/` (antes `examples/`); la organización por marca queda pendiente de P1.
> **Plan vigente:** [plan.md](plan.md) (reemplaza la numeración de fases del §10).
> **Extensión:** uso por varias marcas (TuCambista) en [propuesta-multimarca.md](propuesta-multimarca.md).
> **Base del análisis:** los 55 templates de `templates/`; en detalle `specials/iphone.html`, `semanal/inactivos.html`, `segmentados_especiales/aniversario_grupo_1.html` y la carpeta `specials/`.

## 1. Objetivo

Dejar de construir cada mail copiando y pegando unas 600–770 líneas de HTML. Cada mail se arma combinando **componentes reutilizables**, que encapsulan las reglas de compatibilidad de los clientes de correo. Así el equipo se ocupa solo del contenido y el resultado es consistente y validable.

**Fuera de alcance por ahora:**
- El envío. Esta propuesta llega hasta generar el HTML final.
- El inlining de CSS.
- La forma de almacenar los mails a largo plazo.

Los dos últimos están en la sección 9.

## 2. Diagnóstico

| Hallazgo | Dato |
|---|---|
| Estructura | Todos los mails son una pila de bloques `<table>` dentro de `<div class="mainDiv">` |
| Bloques fijos copiados | Head + `<style>`, preheader, Footer 1, Footer 2 y Disclaimer están en los 55 templates; el footer es idéntico en todos |
| Bloque dominante | Imagen con link (banners, títulos, premios); los botones son PNG (96 `*_BUTTON.png`) |
| `<style>` | 45 clases repetidas en los 55 archivos (unos 4.7 KB cada uno), de las cuales **unas 30 no se usan nunca**; `fw-100` y `w-4/5` se usan sin estar definidas |
| Extensiones de estilo | 4 templates (aniversario 1/2/3 y renovacion_anticipada) agregan un set tipo Tailwind para tarjetas; `pt-30`, `box-470`, `fs-24` y `fs-30` son casos sueltos |
| Links | La URL del CTA se repite hasta 7 veces por mail. Hay UTMs con espacios o tildes, UTMs heredados de campañas anteriores, y links del mismo mail que unas veces llevan `email`/`internalId` y otras no |
| Compatibilidad | Padding puesto con clases sobre `<table>`, que Outlook ignora; `<svg>` inline en 4 specials; ningún template tiene `<!DOCTYPE>` ni `<title>` |

## 3. Principios

1. **El mail contiene solo contenido.** Estructura, estilos y legales salen de los componentes.
2. **Dos fases de templating.** El build resuelve componentes, estilos y links. La plataforma de envío resuelve `{{email}}`, `{{internalId}}`, `{{name}}`, `{{#equals}}`…, que el build deja **intactos**. Por eso los componentes no son Handlebars.
3. **Sin dependencias nuevas.** Se usa lo que ya está en el repo: TypeScript, `tsx` para ejecutar y `handlebars` para validar la salida.
4. **Salida equivalente a la actual.** El HTML generado sigue siendo tablas, con el mismo aspecto que hoy.

## 4. Estructura del proyecto

```
src/
  core/
    html.ts            # primitivos: table(), row(), esc(), asset()
    campaign.ts        # campaign({ utm }) → c.link(), c.url()
    styles.ts          # arma el <style> a partir de las capas
  components/
    base/              # Nivel 1
      layout.ts  image.ts  text.ts  button.ts  spacer.ts  footer.ts  disclaimer.ts
    composite/         # Nivel 2
      card.ts  benefit-card.ts  columns.ts  icon-text.ts  code-badge.ts
    raw.ts             # Nivel 3: vía de escape
    index.ts
  styles/
    base.css           # tokens + utilidades comunes (limpias)
    cards.css          # CSS propio de los componentes de tarjeta
  build.ts             # genera dist/*.html
  validate.ts          # validaciones de la salida
dist/                  # HTML final (ignorado en git)
```

## 5. Componentes

Un componente es **una función que recibe props tipadas y devuelve un fragmento `<table>`**. Lo que exige la compatibilidad queda escrito una sola vez dentro del componente:
- `role="presentation"`, `cellpadding`, `cellspacing` y `border` en `0`;
- el padding en el `<td>`, no en el `<table>`;
- `font-size:0` en las celdas de imagen y `display:block` en las imágenes.

### 5.1 Tres niveles

| Nivel | Qué es | Ejemplos |
|---|---|---|
| **1. Base** | Bloques atómicos | `Layout`, `Image`, `Text`, `Button`, `Spacer`, `Footer`, `Disclaimer` |
| **2. Compuestos** | Se arman con los de nivel 1, sin repetir lógica de tablas | `Card`, `BenefitCard`, `Columns`, `IconText`, `CodeBadge` |
| **3. `Raw`** | HTML a mano para una pieza realmente única | Cualquier pieza que aparece una sola vez |

**Regla de crecimiento:** si un `Raw` aparece en un segundo mail, se convierte en componente. El catálogo crece según el uso real.

`Raw` sigue dentro de `Layout`, conserva `Footer` y `Disclaimer` obligatorios y pasa por las mismas validaciones.

### 5.2 Catálogo inicial

| Componente | Props principales | Reemplaza a |
|---|---|---|
| `Layout` | `subject`, `preheader`, `css?`, `body` | `<!DOCTYPE>`, head, `<style>`, preheader y contenedor de 600 px |
| `Image` | `src`, `alt`, `width`, `href?`, `padding?` | Banners, títulos-imagen, premios, botones PNG |
| `Text` | `html`, `variant`, `size?`, `box?`, `padding?` | Párrafos centrados, destacados y notas en cursiva |
| `Button` | `label`, `href`, `bg?` | Botón HTML y `mailto:` (antichurn_diciembre) |
| `Spacer` | `height` | Paddings sueltos |
| `Footer` | — | Footer 1 + Footer 2 |
| `Disclaimer` | `extra?: string[]` | Disclaimer legal con link de baja y © |
| `Columns` | `items`, `cols?`, `gap?`; un item `{ span: 2 }` ocupa la fila completa | Grillas de aniversario y renovacion_anticipada |
| `Card` / `BenefitCard` | `img`, `alt`, `href`, `text`, `code` | Tarjetas de beneficio con `{{lukerscode}}`, `{{ihopcode}}`… |
| `IconText` | `icon` (PNG), `html` | Fila ícono + texto que hoy usa `<svg>` (llenado_ubicacion, depa_miraflores_activos…) |
| `CodeBadge` | `code` | "CÓDIGO: {{…}}" con fondo |

### 5.3 Anatomía

```ts
// src/components/base/image.ts
export interface ImageProps {
  src: string                       // archivo del blob o URL https
  alt: string                       // obligatorio
  width?: number | `${number}%`     // '100%' | '80%' | 211 (px)
  href?: string                     // de c.link() / c.url()
  padding?: [top: number, bottom: number]
}

export const Image = ({ src, alt, width = '100%', href, padding = [0, 0] }: ImageProps): Html => {
  const w = typeof width === 'number' ? `${width}px` : width
  const img = `<img src="${asset(src)}" width="${width}" alt="${esc(alt)}"
    style="display:block;border:0;width:${w};max-width:100%;height:auto;margin:0 auto">`
  return table(row(href ? `<a href="${href}" target="_blank">${img}</a>` : img, padding, 'font-size:0;line-height:0'))
}
```

Un componente compuesto se arma con otros:

```ts
// src/components/composite/benefit-card.ts
export const BenefitCard = ({ img, alt, href, text, note = 'Único consumo.', code }: BenefitCardProps): Html =>
  Card([
    Image({ src: img, alt, width: 180, href }),
    Text({ html: text, box: 'auto', padding: [8, 0] }),
    Text({ html: note, box: 'auto', variant: 'strong' }),
    CodeBadge({ code }),
  ])
```

## 6. Links: `campaign({ utm })`

> **Reemplazado** por `utm({ campaign })`, con los query params como objeto y el dominio según la marca. Ver [propuesta-multimarca.md §6](propuesta-multimarca.md).

El UTM lo define quien arma el mail. El método solo construye las URLs:

```ts
const c = campaign({ utm: '17nov_b_activos_iphone_2x1' })

c.link('/premios')                              // returnUrl + utm_* + email + internalId
c.link('/beneficios', { personalized: false })  // sin email/internalId
c.url('https://docs.google.com/forms/...')      // externo, sin modificar
c.url('mailto:soporte@nohaysinsuerte.com')
```

`c.link('/premios')` genera:
`https://jorgitoluna.com/iniciar-sesion?returnUrl=%2Fpremios&utm_source=newsletter&utm_medium=email&utm_campaign=17nov_b_activos_iphone_2x1&email={{email}}&internalId={{internalId}}`

**Validación:** el `utm` no puede tener espacios, tildes ni caracteres especiales. El build falla si los tiene.

## 7. Estilos: capas inyectadas en `<style>`

Por ahora **no se inlinea** (ver sección 9). El CSS se separa en archivos y el build lo inyecta en el `<style>` del `<head>`. Es lo mismo que hacen hoy los templates, pero con una sola fuente.

```
styles/base.css         siempre
styles/<componente>.css solo si el mail usa ese componente (p. ej. cards.css con BenefitCard)
Layout({ css })         extensión puntual del mail
        ▼
<style> base + componentes usados + extensión </style>
```

```ts
// src/core/styles.ts (sin dependencias)
const read = (f: string) => readFileSync(new URL(`../styles/${f}`, import.meta.url), 'utf-8')

export const buildStyles = (usedComponentCss: Set<string>, extra = ''): string =>
  [read('base.css'), ...[...usedComponentCss].map(read), extra].filter(Boolean).join('\n')
```

Para saber qué componentes se usaron, cada componente con CSS propio se registra al renderizar (`useCss('cards.css')`). El `Layout` recoge ese registro al final.

**Reglas:**
- `base.css` contiene solo clases que se usan. Se eliminan las ~30 muertas y se definen las que faltaban.
- **Los tokens van como valores literales.** Los clientes de correo no soportan `var(--color)`.
- **Tipografía y color van por clase**, como hoy. **Lo estructural va inline dentro del componente**: padding en `<td>`, `display:block`, anchos. No necesita dependencias y protege lo que más se rompe si un cliente elimina el `<style>`.
- **Prioridad:** `base.css`, luego CSS del componente, luego `Layout({ css })`, y al final el `style=""` del componente.
- **El build avisa si un mail usa una clase que no existe en ninguna capa**, como `fw-100` hoy.

Ejemplo de extensión puntual:

```ts
Layout({
  subject: 'Navidad NHSS',
  preheader: '…',
  css: `.badge-navidad { background:#c8102e; color:#ffffff; padding:4px 8px; }`,
  body: [ Text({ html: '<span class="badge-navidad">Solo hoy</span> 2x1 en chances' }), /* … */ ],
})
```

## 8. Ejemplo completo: `aniversario_grupo_1.html`

Hoy son 771 líneas.

```ts
const c = campaign({ utm: '11nov_a_activos_aniversario_grupo1' })

export default Layout({
  subject: 'Gracias por ser parte de nuestra historia',
  preheader: 'Tú eres parte de nuestra historia y no podíamos celebrar sin agradecerte. 🎁',
  body: [
    Image({ src: 'NHSSV2_TU_ERES_PARTE_DE_NUESTRA_HISTORIA_BANNER.png', alt: 'Tú eres parte de nuestra historia', href: c.link('/premios') }),
    Image({ src: 'NHSSV2_GRACIAS_POR_SER_PARTE_DE_NUESTRA_HISTORIA_TITULO.png', alt: 'Gracias por ser parte de nuestra historia',
            width: '80%', href: c.link('/premios'), padding: [20, 10] }),

    Text({ size: 18, html: '¡NHSS cumple un año más y queremos celebrarlo contigo! … 🥹💜' }),
    Text({ size: 18, html: 'Hoy queremos agradecerte por ser parte de esta historia y por ayudarnos a seguir creciendo.' }),
    Text({ size: 18, variant: 'primary', html: '🎁 ¡Por eso, tenemos estos regalos para ti!', padding: [10, 20] }),

    Columns({ gap: 8, items: [
      BenefitCard({ img: 'NHSSV2_LUKERS_50_OFF_BENEFIT.png', alt: '50% de descuento en Lukers', href: c.link('/beneficios'),
                    text: 'Presenta este código en Lukers tiendas', code: '{{lukerscode}}' }),
      BenefitCard({ img: 'NHSSV2_APPLEBEES_20_OFF_BENEFIT.png', alt: 'Applebees + IHOP', href: c.link('/beneficios'),
                    text: 'Presenta este código en las tiendas de IHOP.', code: '{{ihopcode}}' }),
      { span: 2, content: BenefitCard({ img: 'NHSSV2_TRUEDENT_CLEANING_FREE.png', alt: 'Truedent, 1 limpieza dental gratuita',
                    href: c.link('/beneficios'), text: 'Presenta este código en una de las sedes de Truedent.', code: '{{truedentcode}}' }) },
    ]}),

    Text({ html: '💜 Porque los grandes logros no se construyen solos, se construyen con personas como tú.', padding: [10, 0] }),
    Text({ size: 18, variant: 'highlight', html: '¡Sigamos haciendo historia juntos! 🍀', padding: [10, 20] }),

    Footer(),
    Disclaimer(),
  ],
})
```

## 9. Pendientes por decidir

| # | Tema | Contexto |
|---|---|---|
| **P1** | **Acumulación de código de mailings** | Si cada envío es un archivo `.ts`, el repo acumula cientos de definiciones de un solo uso. Opciones a evaluar: archivar por fecha, tratar los mails como datos (JSON) fuera del repo, o versionar solo plantillas reutilizables (semanal, birthday, antichurn) y que lo puntual viva en otro lugar. |
| **P2** | **Inlinear CSS** | Algunos clientes eliminan el `<style>`. Hoy el riesgo existe igual que en los templates actuales y se mitiga poniendo lo estructural inline en los componentes. La solución completa (por ejemplo, `juice` en el transform) agrega una dependencia y se pospone. |
| P3 | Botones PNG o HTML | Los PNG mantienen el diseño, pero se pierden si el cliente bloquea imágenes. `Image` y `Button` conviven mientras tanto. |
| P4 | Variantes A/B (`{{#equals type}}`) | Pueden quedarse como hoy, resueltas en el envío, o generarse como dos HTML. |
| P5 | `aniversario_grupo_1/2/3` | Si solo cambian datos, podrían ser un mail parametrizado (sin verificar). |

## 10. Plan de implementación

| Fase | Entregable | Criterio de "listo" |
|---|---|---|
| **1. Núcleo** | `core/` (html, campaign, styles), `base.css` limpio, `Layout`, `Image`, `Text`, `Footer`, `Disclaimer`, `build.ts` | `iphone.html` y `inactivos.html` regenerados y visualmente equivalentes al original |
| **2. Validaciones** | `validate.ts`: Handlebars compila, `https` en los links, `alt` en cada `<img>`, sin `<svg>`, UTM válido, clases conocidas, peso < 102 KB | El build falla ante cualquiera de estos errores |
| **3. Compuestos** | `Columns`, `Card`, `BenefitCard`, `IconText`, `CodeBadge`, `Button`, `Raw` | `aniversario_grupo_1.html` y `renovacion_anticipada.html` regenerados |
| **4. Migración** | Templates recurrentes (semanal, newsletter, birthday, antichurn) | Depende de la decisión sobre P1 |

## 11. Hallazgos colaterales (para corregir ya en los templates actuales)

- **Correo de soporte mal escrito:** `specials/antichurn_diciembre.html:503` dice `soporte@nohaysinsuerte.como`.
- **`<svg>` inline**, que Gmail y Outlook no muestran: `llenado_ubicacion.html`, `depa_miraflores_activos.html`, `antichurn_diciembre.html` y `mailing_alianzas.html`.
- **UTMs heredados de otras campañas:**
  - `mailing_alianzas.html` usa `08JUN_B_ACTIVOS_AUMENTA_CHANCES`.
  - `renovacion_anticipada.html` mezcla dos UTMs y uno lleva tilde.
- **Typo en un `alt` de `iphone.html`:** "iphone 18 prox maxllego".
- **Trato inconsistente en el Footer 2:** usa "usted" y el resto del mail usa "tú".
