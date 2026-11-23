# Tailwind para email (`@maizzle/tailwindcss`)

> **Estado:** implementado · **Fecha:** 2026-11-23
> **Relacionado:** [tsx-y-raw.md](tsx-y-raw.md), [plan.md](plan.md) (P2: inlinear CSS, pendiente)

## Para qué

Utilidades de Tailwind en el HTML escrito a mano (`Raw`, JSX dentro de `html`) con CSS que entienden los clientes de correo. Los componentes no cambian.

```tsx
Raw({
  name: 'tarjeta-codigo',
  html: (
    <div class="bg-primary/80 rounded-lg px-6 py-4 sm:px-2 font-legal text-white text-[18px]">
      CÓDIGO: <Var name="lukerscode" />
    </div>
  ),
})
```

## Cómo funciona

`Layout()` junta las clases de todos los `class=""` del mail y genera solo esas utilidades, al final del `<style>`:

1. **Tailwind 4 + preset de Maizzle**, con `theme(inline)`: colores en hex, medidas en px y valores literales (sin `var()`).
2. **Lightning CSS**: `padding-inline` → `padding-left/right`, `calc(4px * 4)` → `16px`, opacidades → `rgba()`.
3. **Limpieza** ([src/core/tailwind.ts](../src/core/tailwind.ts)): resuelve los `var(--tw-*)` que quedan, quita `@property` y los colores `lab()`/`oklch()`, pasa `text-decoration-line` a `text-decoration` y vuelve a poner comillas a las fuentes.

Es la misma receta que usa el framework Maizzle, sin postcss. Si queda un `var()` sin resolver, el build falla.

Tailwind se compila de nuevo en cada mail (~15 ms): su compilador acumula clases entre llamadas, y así un mail no hereda las de otro. Por eso `Layout()` devuelve una promesa, que `build.ts` espera; en los mails `export default Layout({…})` no cambia.

## Tema por marca

Cada marca define sus colores y fuentes en `src/brands/<marca>/theme.css` (campo `theme` de `defineBrand`):

```css
@theme {
  --color-primary: #6c1297;   /* → text-primary, bg-primary, border-primary… */
  --font-main: "Radio Canada Big", Arial, sans-serif;   /* → font-main */
}
```

Se suma al tema del preset: paleta de Tailwind en hex (`text-red-500`), espaciado de 4px (`px-4` = 16px) y tamaños en px (`text-sm` = 14px).

## Lo que aporta el preset

| | |
|---|---|
| Breakpoints desktop-first en px | `sm:` = `max-width: 600px`, `xs:` = 430px |
| `hover:` con `:hover` | sin `@media (hover)`, que los clientes no soportan |
| Variantes por cliente | `gmail:`, `outlook-mac:`, `yahoo:`, `ios:`, `ogsc:`… (por eso `<body class="body">`) |
| Utilidades de Outlook | `mso-hide-all` y el resto de `mso-*` |
| `!important` en todas las utilidades | ganan a los estilos inline de los componentes |

## Reglas

- **Tablas para el layout, Tailwind para el estilo.** `flex`, `grid`, `gap-*` y `m-*` compilan, pero Outlook no los soporta.
- **No definir en `common.css` o `styles.css` clases con nombre de utilidad de Tailwind**: la de Tailwind lleva `!important` y gana. Por eso se quitaron `pt-*`/`pb-*` de `common.css` (eran de 5–30px; en Tailwind `pt-10` = 40px).
- Las clases propias (`fs-16`, `fw-700`, `font-italic`, `footer-text`) siguen funcionando. Tailwind ignora las que no reconoce.
- **El CSS va en el `<style>`, no inline.** Si un cliente elimina el `<style>`, se pierde. Pasarlo a inline es P2 (`juice`), pendiente.

## Dependencias (todas de desarrollo)

`tailwindcss`, `@tailwindcss/node`, `@tailwindcss/oxide`, `@maizzle/tailwindcss`, `lightningcss`.
