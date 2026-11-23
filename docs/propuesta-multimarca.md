# Propuesta: componentes de mailing para varias marcas

> **Estado:** NHSS extraída como marca y `utm()` implementado (fase 3); TuCambista pendiente · **Fecha:** 2026-11-20
> **Depende de:** [propuesta-componentes.md](propuesta-componentes.md) (Fase 1 implementada)
> **Plan vigente:** [plan.md](plan.md) (los pasos A–D de §11 son las fases 3, 4 y 6, con las validaciones por marca dentro de la 6).
> **Base del análisis:** `templates/tucambista/fide.html` y `templates/superchance/cupon.html` (TuCambista) frente a los templates de NHSS.

## 1. Objetivo

Que los componentes construidos para NHSS sirvan también a los otros negocios de la empresa, empezando por **TuCambista**. Cada marca aporta su configuración y sus bloques propios; la base (estructura, compatibilidad, build y validaciones) es una sola.

**Fuera de alcance por ahora:**
- Implementar la segunda marca. Este documento solo define el diseño.
- Migrar los templates existentes de TuCambista.

## 2. Diagnóstico

Los mails de TuCambista se arman con las mismas piezas que los de NHSS:

| Bloque | NHSS | TuCambista | ¿Se comparte? |
|---|---|---|---|
| Banner, imágenes, botones PNG | `Image` | Igual | ✅ Tal cual |
| Título y párrafos | `Text` | Igual, con otras fuentes y colores | ✅ Variantes semánticas; los colores los pone la marca |
| Contenido por segmento | `{{#equals type "A"}}` | `{{#equals level "FUNDADOR"}}` | ✅ Un componente `Switch` |
| Bloque de marca | Logo + redes (Footer 1) | Logo + "Haz tus operaciones…" + tiendas + T&C | ❌ Propio de cada marca |
| Footer legal | `Disclaimer` | Soporte + Ley Antispam + desuscripción + franja SBS/RUC | ❌ Propio de cada marca |

### 2.1 Lo que hoy está fijo en NHSS

| Archivo | Valor específico de NHSS |
|---|---|
| `src/core/html.ts` | `ASSET_BASE`: `stnohaysinsuerteprod/mailing/` |
| `src/core/campaign.ts` | Dominio `jorgitoluna.com`, login con `returnUrl`, `utm_source=newsletter`, `email` / `internalId` |
| `src/components/base/footer.ts` | Logo, redes, color `#ce83fd`, correo de soporte, links de T&C y Ayuda |
| `src/components/base/disclaimer.ts` | Razón social, desuscripción, color `#6c1297` |
| `src/styles/base.css` | Fuentes (PT Sans, Radio Canada Big) y paleta |

### 2.2 Diferencias de TuCambista

| Tema | NHSS | TuCambista |
|---|---|---|
| Assets | `stnohaysinsuerteprod.blob…/mailing/` | `sttucambistaprod.blob…/mailing/` (y el logo en `cdn.tucambista.pe/mailing/`) |
| Links | `/iniciar-sesion?returnUrl=<path>` + `email` + `internalId` | Directos: `https://tucambista.pe/go/app/operacion` |
| UTMs | `utm_source=newsletter`, `utm_medium=email`, `utm_campaign` | `utm_source=email`, `utm_medium=email`, `utm_campaign` y **`utm_content` por link** |
| Parámetros extra | — | Código promocional: `pc=EXPOCHINA` |
| Variables Handlebars | `{{email}}`, `{{internalId}}`, `{{name}}`, `type` | `{{email}}`, `{{name}}`, `level`, `{{utm_*}}` en la desuscripción |
| Atributos de tracking | — | `clicktracking="off"` en algunos links |
| Fuentes | PT Sans, Radio Canada Big | Albert Sans (títulos), Lexend (texto) |
| Colores | `#2d3543`, `#6c1297`, `#b84fff` | `#2C363D`, `#1D63FF`, `#F9FBFD`, `#49a5f7` |

La plataforma de envío es la misma (Handlebars con el helper `equals`), así que el modelo de dos fases de la propuesta original sigue valiendo.

## 3. Principios

1. **Una marca es configuración y unos pocos bloques propios**, no un fork de los componentes.
2. **Los componentes base no conocen ninguna marca.** Reciben clases semánticas (`text-primary`) y la marca define qué color es.
3. **Un mail importa todo desde su marca** (`brands/<marca>/index.ts`). No se pasa la marca a cada componente y no se pueden mezclar marcas.
4. **Agregar una marca no toca el código de las demás.**

## 4. Estructura ✅ (NHSS implementada)

```
src/
  core/
    html.ts            ← asset(base, src): sin blob fijo
    query.ts           ← toQuery(): objeto → query string
    utm.ts             ← utm({ campaign }) → u.link(), u.url()
    brand.ts           ← defineBrand() y el tipo Brand
    styles.ts          ← CSS de la marca + common.css + css del mail
  components/
    base/              ← Layout, Image, Text (sin marca)
    kit.ts             ← createKit(brand): componentes atados a una marca
  styles/common.css    ← reset, fs-*, fw-*, pt-* / pb-*, box-*
  brands/
    nhss/
      brand.ts         ← configuración
      index.ts         ← lo que importa un mail de NHSS
      footer.ts · disclaimer.ts · styles.css
    tucambista/        ← pendiente (Fase 6)
      brand.ts · index.ts · footer.ts · legal.ts · styles.css
```

### Aliases de import ✅

Definidos en `package.json` (`"imports"`, nativo de Node; TypeScript y tsx los resuelven sin configuración extra):

| Alias | Apunta a | Uso |
|---|---|---|
| `#brands/<marca>` | `src/brands/<marca>/index.ts` | Lo que importa un mail: `import { Layout, Image, utm } from '#brands/nhss'` |
| `#components` | `src/components/index.ts` | Piezas sin marca (`createKit`, tipos) |
| `#components/<ruta>` | `src/components/<ruta>.ts` | `#components/kit`, `#components/base/image` |
| `#core/<módulo>` | `src/core/<módulo>.ts` | `#core/html`, `#core/utm`, `#core/brand` |

Un mail se importa igual sin importar en qué subcarpeta de `examples/` esté. Dentro de una misma carpeta se siguen usando imports relativos (`./brand.ts`).

## 5. La marca

```ts
// src/brands/nhss/brand.ts (implementado)
export default defineBrand({
  id: 'nhss',
  site: 'https://jorgitoluna.com',
  assets: 'https://stnohaysinsuerteprod.blob.core.windows.net/mailing/',
  utm: { source: 'newsletter', medium: 'email' },
  link: (path) => ({ path: '/iniciar-sesion', query: { returnUrl: path } }),
  personalization: { email: '{{email}}', internalId: '{{internalId}}' },
  styles: new URL('./styles.css', import.meta.url),
})

// src/brands/tucambista/brand.ts (propuesto)
export default defineBrand({
  id: 'tucambista',
  site: 'https://tucambista.pe',
  assets: 'https://sttucambistaprod.blob.core.windows.net/mailing/',
  utm: { source: 'email', medium: 'email' },
  link: (path) => ({ path }),     // links directos
  personalization: {},
  styles: new URL('./styles.css', import.meta.url),
})
```

| Campo | Para qué |
|---|---|
| `site` | Dominio de todos los links (`https://…`, sin `/` final) |
| `assets` | Blob de las imágenes. `Image` resuelve `src` contra él |
| `utm` | `utm_source` y `utm_medium` de la marca |
| `link(path)` | A dónde apunta un link: directo, o por el login con `returnUrl` |
| `personalization` | Params del destinatario que se agregan a los links personalizados |
| `styles` | CSS de la marca: fuentes, paleta y bloques propios |

Cada marca expone su kit:

```ts
// src/brands/nhss/index.ts
export const { Layout, Image, Text, utm } = createKit(brand)
export { Footer } from './footer.ts'
export { Disclaimer } from './disclaimer.ts'
```

## 6. Links: `utm()` ✅

Reemplaza a `campaign()`. La URL se arma desde un **objeto de query params** y se serializa al final con `toQuery()`.

```ts
import { utm } from '#brands/nhss'

const u = utm({
  campaign: '22nov_activos_premios',            // utm_campaign
  utm_media_content: 'Aqui estan los premios',   // params propios: van en todos los links
})

u.link('/premios')
u.link('/premios', { content: 'banner' })                    // utm_content de este link
u.link('/premios', { params: { pc: 'EXPOCHINA', ref: 42 } }) // params solo de este link
u.link('/premios', { personalized: false })                  // sin email/internalId
u.url('https://wa.link/1fdxoi')                              // externo o mailto, sin tocar
```

`u.link('/premios')` genera, en este orden:

```
https://jorgitoluna.com/iniciar-sesion
  ?returnUrl=%2Fpremios                      ← brand.link()
  &utm_source=newsletter&utm_medium=email    ← brand.utm
  &utm_campaign=22nov_activos_premios        ← campaign
  &utm_media_content=Aqui%20estan%20los%20premios   ← params de utm({ … })
  &email={{email}}&internalId={{internalId}} ← brand.personalization
```

**`toQuery()`** respeta el orden de las claves, omite los `undefined` y codifica los valores **salvo las expresiones `{{…}}`**, que Handlebars resuelve al enviar. Por eso no usa `URLSearchParams`.

**Reglas** (el build falla si se rompen):

| Regla | Ejemplo que falla |
|---|---|
| `campaign` solo admite `[A-Za-z0-9_]` | `campaign: 'cumpleaños'` |
| `path` empieza con `/` | `u.link('premios')` |
| `utm_source`, `utm_medium`, `utm_campaign` y `utm_content` solo los arma `utm()` | `utm({ campaign, utm_source: 'x' })`, `params: { utm_content: 'x' }` |
| No se sobrescriben params de la marca | `params: { email: 'x' }`, `utm({ campaign, returnUrl: '/x' })` |
| Un param de `utm({ … })` no se repite en `params` | `params: { utm_media_content: 'otro' }` |

Cualquier otro param (incluidos `utm_*` propios como `utm_media_content` o `utm_term`) se permite sin tocar el código.

**Pendiente para TuCambista:** la opción `tracking: false` (`clicktracking="off"`, decisión M4).

## 7. Estilos ✅

`base.css` se dividió en dos capas:

| Capa | Contenido |
|---|---|
| `brands/<marca>/styles.css` | `@import` de fuentes, `font-main`, `font-legal`, paleta (`text-main`, `text-primary`, `text-secondary`, `text-tertiary`…) y bloques propios (`footer-text`, `disclaimer-item`) |
| `styles/common.css` | Reset, `font-italic`, `fw-*`, `fs-*`, `pt-*` / `pb-*`, `box-*` |

Orden de inyección: **marca → común → `css` del mail**. La marca va primero porque su `@import` debe ser la primera regla. `Text({ variant: 'primary' })` produce `text-primary` en ambas marcas; en NHSS es `#6c1297` y en TuCambista sería `#1D63FF`.

## 8. `Switch`: contenido por segmento

Genera la cadena `{{#equals}}…{{else}}…{{/equals}}` que hoy se escribe a mano. Sirve para el `type` de NHSS y el `level` de TuCambista.

```ts
Switch('level', {
  FUNDADOR: Image({ src: 'card_fundador.png', alt: 'Nivel Fundador', href: u.link(op, { content: 'escudo' }) }),
  MAGNATE:  Image({ src: 'card_magnate.png',  alt: 'Nivel Magnate',  href: u.link(op, { content: 'escudo' }) }),
  DIRECTOR: Image({ src: 'card_director.png', alt: 'Nivel Director', href: u.link(op, { content: 'escudo' }) }),
})
```

- Se envuelve **solo lo que cambia**, no el `<body>` entero. `fide.html` hoy repite el mail completo tres veces (892 líneas, 45 KB).
- Si se necesita en varios puntos del mail, se escribe un `Switch` por bloque o se arma el cuerpo con un `.map()` sobre los niveles.
- Relación con **P4** (variantes A/B): `Switch` es la forma estándar de resolverlas en el envío.

## 9. Ejemplo: `fide.html` con componentes

```ts
import { Image, Layout, Switch, Text, utm } from '#brands/tucambista'

const u = utm({ campaign: 'bienvenida_society' })
const op = '/go/app/operacion'

const LEVELS = { FUNDADOR: 'Fundador', MAGNATE: 'Magnate', DIRECTOR: 'Director' }
const byLevel = (fn: (key: string, label: string) => string) =>
  Switch('level', Object.fromEntries(Object.entries(LEVELS).map(([k, v]) => [k, fn(k.toLowerCase(), v)])))

export default Layout({
  subject: '¡Bienvenido a TuCambista Society!',
  preheader: 'Descubre tu nivel y todo lo que puedes disfrutar desde hoy.',
  body: [
    byLevel((k, v) => Image({ src: `banner_${k}.png`, alt: `TuCambista Society: nivel ${v}`, href: u.link(op, { content: 'banner' }) })),
    Text({ variant: 'title', html: '¡Bienvenido a TuCambista Society {{name}}! 🎉' }),
    Text({ html: '<b>Desde hoy, cambiar también te recompensa 💛</b><br>Acumula puntos con tus operaciones y disfruta beneficios pensados para ti.' }),
    byLevel((k, v) => Text({ html: `Tu nivel en Society es: <b>${v}</b>` }) +
      Image({ src: `card_${k}.png`, alt: `Tarjeta de nivel ${v}`, width: 218, href: u.link(op, { content: 'escudo' }) })),
    Text({ html: 'Estos beneficios ya son tuyos 👀', padding: [30, 10] }),
    byLevel((k, v) => Image({ src: `beneficios_${k}.png`, alt: `Beneficios del nivel ${v}`, width: '70%', href: u.link(op, { content: 'beneficios' }) })),
    Text({ html: '<b>¿Quieres llegar al siguiente nivel?</b><br>Sigue acumulando puntos con tus operaciones y descubre lo que puedes desbloquear.', padding: [30, 20] }),
    Image({ src: 'ver_mis_beneficios_button.png', alt: 'Botón Ver mis beneficios', width: 250, href: u.link(op, { content: 'cta_beneficios' }), padding: [0, 30] }),
  ],
})
```

Con esto, las imágenes por nivel se arman a partir del nombre del nivel. Así desaparecen los errores de §11 (tarjeta y UTM de Fundador en otros niveles).

## 10. Pendientes por decidir

| # | Tema | Contexto |
|---|---|---|
| M1 | Dónde viven los mails de cada marca | Se suma a **P1**. Opciones: `mails/<marca>/…` en este repo, o un repo por marca que importe los componentes como paquete. |
| M2 | Nombre del repo / paquete | `YinLin.Mailing.Sintaxis` pasaría a ser compartido. |
| M3 | `utm_content` obligatorio | TuCambista lo usa en cada link; ¿se exige en esa marca o queda opcional? |
| M4 | `clicktracking="off"` | Es un atributo del proveedor de envío. Confirmar si aplica a todos los links de TuCambista o solo a algunos. |
| M5 | Logo en otro host | `tc_logo_white_rounded.png` sale de `cdn.tucambista.pe` y no del blob. ¿Se mueve al blob o la marca admite dos bases? |
| M6 | Carpeta de `cupon.html` | Está en `templates/superchance/`, pero es de TuCambista (Superchance es de NHSS). |

## 11. Plan

Se intercala con las fases de la propuesta original: conviene hacerlo **antes de la Fase 3** (compuestos), para que los compuestos ya nazcan sin marca fija.

| Paso | Entregable | Criterio de "listo" |
|---|---|---|
| **A. Extraer NHSS** ✅ | `core/brand.ts`, `brands/nhss/`, `common.css`, `utm()`; `Image` y `Layout` leen la marca | `iphone`, `inactivos` y `referidos` generan **exactamente** el mismo HTML que hoy |
| **B. `Switch`** | Componente + validación de que las ramas compilen en Handlebars | Un ejemplo de NHSS con `type` A/B |
| **C. TuCambista** | `brands/tucambista/` con `Footer` y estilos; opción `tracking` en `u.link` | `fide.html` y `cupon.html` regenerados y visualmente equivalentes |
| **D. Validaciones por marca** | La Fase 2 valida contra los assets y clases de la marca del mail | Una clase o asset de otra marca hace fallar el build |

## 12. Hallazgos en los templates de TuCambista

**`tucambista/fide.html`**
- **DIRECTOR muestra la tarjeta de Fundador:** usa `card_fundador.png` (línea 671).
- **MAGNATE y DIRECTOR se miden como Fundador:** los links de escudo y CTA llevan `utm_campaign=bienvenida_fundador` (líneas 384, 439, 670 y 725).
- **UTM heredada de otra campaña:** la imagen de beneficios usa `CHURN_ALTO2B_AGOSTO2026` en los tres niveles (líneas 125, 411 y 697).
- **Atributo mal escrito:** `heigh="209"` (líneas 99, 385 y 671).
- **`<title>` vacío** y el `<body>` repetido dentro de los `{{#equals}}`.

**`superchance/cupon.html`**
- Está en la carpeta de otra marca (ver M6).
- **Sin preheader:** el `<span>` oculto está vacío.
- "Ver los **terminos** y condiciones" sin tilde, y `margin:20PX` en mayúsculas.
- Define clases (`.basicText`, `.greeting`, fuentes Ubuntu y Rubik) que no se usan.

**Ambos**
- Ninguna imagen tiene `alt`.
- La estructura se arma con `<div>` y márgenes en `<p>`, que Outlook no respeta. Las tablas no llevan `role="presentation"`.
