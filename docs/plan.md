# Plan de implementación

> **Fecha:** 2026-11-23 · **Rama actual:** `feat/tsx-raw`
> **Detalle de diseño:** [propuesta-componentes.md](propuesta-componentes.md), [propuesta-multimarca.md](propuesta-multimarca.md) y [tsx-y-raw.md](tsx-y-raw.md)

Une las fases de las dos propuestas en un solo orden. La parte multimarca va **antes de los compuestos**, para que estos nazcan sin una marca fija.

| # | Fase | Estado | Depende de |
|---|---|---|---|
| 1 | Núcleo | ✅ Hecha (PR #1) | — |
| 2 | Validaciones | ⏳ Pendiente | 1 |
| 3 | Marca configurable (extraer NHSS) | ✅ Hecha | 1 |
| 4 | `Switch` por segmento | ✅ Hecha | 3 |
| 5 | Componentes compuestos | ⏳ Pendiente (`Raw` ✅) | 3 |
| 6 | Segunda marca: TuCambista | ⏳ Pendiente | 3, 4 · decisiones M3–M6 |
| 7 | Migración de templates recurrentes | ⏳ Pendiente | 2, 5 · decisión P1 / M1 |

La fase 2 no depende de nada pendiente; las fases 4, 5 y 6 ya pueden empezar.

**Fuera de fase, ya hecho:** mails en subcarpetas de `mails/` (antes `examples/`), aliases de import (`#brands/nhss`, `#core/…`) y soporte `.tsx` con `Raw` y `Var` ([tsx-y-raw.md](tsx-y-raw.md)) y utilidades de Tailwind con el preset de email de Maizzle ([tailwind.md](tailwind.md)).

---

## Fase 1 · Núcleo ✅

**Entregable:** `core/` (`html`, `campaign`, `styles`), `base.css`, `Layout`, `Image`, `Text`, `Footer`, `Disclaimer`, `build.ts` y servidor `pnpm dev` con hot reload.

**Listo cuando:** `iphone` e `inactivos` se regeneran y se ven igual que el original. Además se migró `referidos`.

## Fase 2 · Validaciones

**Entregable:** `src/validate.ts`, que revisa cada HTML generado. El build y `pnpm dev` (barra roja) fallan ante cualquier error.

| Regla | Evita |
|---|---|
| La salida compila con Handlebars *(ya existe)* | `{{email}` mal cerrado |
| UTM válida *(ya existe, en `campaign`)* | Espacios o tildes en `utm_campaign` |
| Todo `href` empieza con `https://` o `mailto:` | Links vacíos, `#` o placeholders |
| Toda `<img>` tiene `alt` y `src` https | Imágenes sin texto si el cliente las bloquea |
| Sin `<svg>` inline | Íconos que Gmail y Outlook no muestran |
| Solo clases definidas en el CSS | Clases inexistentes, como `fw-100` |
| Peso < 102 KB | Que Gmail corte el mensaje |

**Opcionales:** preheader ≤ 90 caracteres, `alt` repetido entre imágenes distintas, aviso si no hay ningún link personalizado.

**Listo cuando:** cada regla tiene un caso que hace fallar el build y los tres ejemplos actuales pasan.

## Fase 3 · Marca configurable ✅

**Entregable:** `core/brand.ts` (`defineBrand`) y `brands/nhss/` con su configuración, `Footer`, `Disclaimer` y `styles.css`. `base.css` se divide en `common.css` y el CSS de la marca. `Image` y `Layout` leen la marca del mail en vez de valores fijos. `campaign()` pasa a ser `utm({ campaign, ...params })`, con los query params como objeto (ver [propuesta-multimarca.md §6](propuesta-multimarca.md)).

**Listo cuando:** `iphone`, `inactivos` y `referidos` generan **exactamente el mismo HTML** que hoy (se compara byte a byte). ✔ Verificado: el `<body>` es idéntico y el `<style>` tiene las mismas reglas, en otro orden.

## Fase 4 · `Switch`

**Entregable:** `Switch({ on, cases, default })`, que genera la cadena `{{#equals}}…{{else equals}}…{{else}}…{{/equals}}` y envuelve solo lo que cambia. Resuelve **P4** (variantes A/B). Ver [propuesta-multimarca.md §8](propuesta-multimarca.md).

**Listo cuando:** un mail de NHSS con `type` A/B se arma con `Switch` y compila en Handlebars. ✔ Verificado: renderizado con Handlebars y un helper `equals`, cada `type` (A, B y otro) ve solo su bloque, también después de juice. Vista previa por segmento en `pnpm dev` con `?type=A`.

## Fase 5 · Componentes compuestos

**Entregable:** componentes armados con los de base, sin lógica de tablas repetida:

| Componente | Para qué |
|---|---|
| `Columns` | Grillas de 2–3 columnas; un item con `span: 2` ocupa la fila |
| `Card` / `BenefitCard` | Tarjeta de beneficio: imagen, texto, nota y código |
| `IconText` | Ícono PNG + texto (reemplaza los `<svg>`) |
| `CodeBadge` | "CÓDIGO: {{lukerscode}}" con fondo |
| `Button` | Botón HTML y `mailto:` (decisión **P3** frente a PNG) |
| `Spacer` | Espacios verticales sueltos |
| `Raw` ✅ | HTML a mano para piezas únicas (string en `.ts`, JSX en `.tsx`); el build avisa si se repite en otro mail. Ver [tsx-y-raw.md](tsx-y-raw.md) |

**Listo cuando:** `aniversario_grupo_1` y `renovacion_anticipada` se regeneran con componentes y se ven igual. Si solo cambian datos entre grupos, se resuelve **P5**.

## Fase 6 · TuCambista

**Entregable:** `brands/tucambista/` (configuración, `Footer` con bloque de marca y legal SBS/RUC, `styles.css`). `u.link()` suma `tracking: false` (`clicktracking="off"`); `content` y `params` ya existen. Las validaciones revisan contra los assets y clases de la marca del mail.

**Antes de empezar, decidir:** M3 (`utm_content` obligatorio), M4 (alcance de `clicktracking`), M5 (logo en `cdn.tucambista.pe`), M6 (carpeta de `cupon.html`).

**Listo cuando:** `fide.html` y `cupon.html` se regeneran, se ven igual y corrigen los errores de nivel y UTM detectados.

## Fase 7 · Migración

**Entregable:** templates recurrentes como componentes: semanal, newsletter, birthday y antichurn (NHSS), y los recurrentes de TuCambista.

**Antes de empezar, decidir:** **P1 / M1** (dónde viven los mails y cómo se evita acumular código de un solo uso) y **M2** (nombre del repo compartido).

**Listo cuando:** cada template migrado reemplaza al HTML original en el flujo de envío.

---

## Decisiones pendientes

| # | Tema | Bloquea |
|---|---|---|
| P1 / M1 | Dónde viven los mails (por marca, por fecha, fuera del repo) | Fase 7 |
| P2 | ~~Inlinear CSS~~ ✅ `juice` en el build (`src/core/inline.ts`); se conserva el `<style>` | Resuelto |
| P3 | Botones PNG o HTML | Fase 5 (`Button`) |
| P4 | Variantes A/B | Resuelta por la Fase 4 |
| P5 | `aniversario_grupo_1/2/3` como un mail parametrizado | Fase 5 |
| M2 | Nombre del repo / paquete compartido | Fase 7 |
| M3–M6 | Detalles de TuCambista | Fase 6 |
