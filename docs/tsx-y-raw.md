# TSX y `Raw`: HTML a mano dentro del sistema

> **Estado:** implementado · **Fecha:** 2026-11-23
> **Relacionado:** [plan.md](plan.md), [propuesta-componentes.md §5.1](propuesta-componentes.md) (los tres niveles de componentes)

## Para qué

Los componentes (`Image`, `Text`…) se siguen usando como funciones. **TSX es opcional** y sirve para escribir HTML convencional cuando una pieza no tiene componente: en vez de un string, se escribe JSX con autocompletado y con errores detectados por el typecheck.

- Los `.ts` no cambian. Un mail pasa a `.tsx` solo si lo necesita (basta con renombrarlo).
- No hay React ni dependencias nuevas: el runtime propio (`src/jsx/jsx-runtime.ts`) convierte JSX en strings de HTML.

## Ejemplo

```tsx
// examples/aniversario.tsx
import { Disclaimer, Footer, Image, Layout, Raw, Text, Var, utm } from '#brands/nhss'

const u = utm({ campaign: '11nov_a_activos_aniversario_grupo1' })

export default Layout({
  subject: 'Tú eres parte de nuestra historia',
  preheader: '…',
  body: [
    Image({ src: 'NHSSV2_TU_ERES_PARTE_DE_NUESTRA_HISTORIA_BANNER.png', alt: '…', href: u.link('/premios') }),

    // JSX en una prop: igual que un string, con autocompletado
    Text({ html: <>Hola <Var name="name" />, esto es <b>para ti</b></> }),

    // Pieza única sin componente
    Raw({
      name: 'tarjeta-lukers',
      padding: [20, 20],
      html: (
        <>
          <a href={u.link('/beneficios')} target="_blank">
            <img src="https://stnohaysinsuerteprod.blob.core.windows.net/mailing/NHSSV2_LUKERS.png" alt="50% en Lukers" width={180} style="display:block" />
          </a>
          <span class="font-main fw-700 text-primary">CÓDIGO: <Var name="lukerscode" /></span>
        </>
      ),
    }),

    Footer(),
    Disclaimer(),
  ],
})
```

En un `.ts`, el mismo `Raw` recibe un string:

```ts
Raw({ name: 'tarjeta-lukers', html: `<a href="${u.link('/beneficios')}">… {{lukerscode}}</a>` })
```

> Las `<img>` escritas a mano no pasan por `Image`, así que `src` debe ser la **URL completa** del blob.

## `Raw`

| Prop | Uso |
|---|---|
| `name` | Nombre de la pieza en kebab-case (`tarjeta-lukers`). Obligatorio. |
| `html` | String (`.ts`) o JSX (`.tsx`). |
| `padding` | `[arriba, abajo]` en px, como en los demás componentes. |

- Envuelve el contenido en la fila de 600px del mail, así que se alinea con el resto.
- El build lista los `Raw` de cada mail y **avisa si un mismo `name` aparece en dos mails**: es la señal para convertirlo en componente (regla de crecimiento).

```
✔ dist/aniversario.html (18.2 KB) · raw: tarjeta-lukers
⚠ Raw "tarjeta-lukers" se usa en 2 mails (aniversario, renovacion): conviértelo en componente
```

## `Var`

`<Var name="name" />` genera `{{name}}`. En JSX no se puede escribir `{{name}}` directamente porque las llaves se interpretan como código. Dentro de strings (comillas o template literals) se sigue escribiendo `{{name}}` tal cual.

## Reglas del JSX

| Regla | Motivo |
|---|---|
| `class` y `style` como string (`style="padding:20px 0"`) | Es HTML de email, no React: se copia tal cual de un template |
| El texto **no se escapa** | Igual que `Text({ html })`: el contenido lo escribimos nosotros. Para texto externo, usar `esc()` de `#core/html` |
| `false`, `null` y `undefined` no se escriben; los arrays se concatenan | Permite `{condicion && <b>…</b>}` y `.map()` |
| Solo etiquetas útiles en email | `<svg>`, `<div className>`, `<img>` sin `alt` o `<a>` sin `href` **no compilan** |

Etiquetas admitidas: `table`, `tbody`, `thead`, `tr`, `td`, `th`, `div`, `center`, `p`, `span`, `h1`–`h3`, `b`, `strong`, `i`, `em`, `u`, `s`, `small`, `sup`, `sub`, `ul`, `ol`, `li`, `br`, `hr`, `a`, `img`. Atributos de tabla de email: `bgcolor`, `cellpadding`, `cellspacing`, `border`, `align`, `valign`, `width`, `height`, `colspan`, `rowspan`. En `<a>`: `clicktracking="off"`.

## Al pasar un `.ts` a `.tsx`

Dos sintaxis de TypeScript dejan de funcionar en `.tsx` (no aparecen en los mails actuales):

- Aserciones `<Tipo>valor` → escribir `valor as Tipo`.
- Genéricos en arrow functions `<T>(x) => …` → escribir `<T,>(x) => …`.

No puede haber un `x.ts` y un `x.tsx` en la misma carpeta: el build falla.

## Configuración

| Archivo | Cambio |
|---|---|
| `tsconfig.json` | `"jsxImportSource": "#jsx"` |
| `package.json` | Alias `"#jsx/*": "./src/jsx/*.ts"` |
| `src/jsx/jsx-runtime.ts` | Runtime (`jsx`, `jsxs`, `Fragment`) y tipos `JSX` |
| `src/build.ts` | Lee `.ts` y `.tsx`; reporte de `Raw` |
