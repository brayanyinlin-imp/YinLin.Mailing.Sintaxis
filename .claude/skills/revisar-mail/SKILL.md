---
name: revisar-mail
description: Revisa una plantilla de mailing HTML (templates/**) antes de enviarla. Verifica compatibilidad con clientes de correo, links y UTMs, variables de personalización, imágenes, preheader, footer legal y ortografía. Úsala cuando el usuario pida "revisar", "validar" o "checklist" de un mail, o antes de un envío.
argument-hint: <ruta del template, o vacío para revisar los modificados en git>
---

# Revisión de mails

Revisa plantillas HTML de email del proyecto. Es **solo lectura**: reporta hallazgos, no edites salvo que el usuario lo pida.

## Alcance

- Si hay argumento, revisa ese archivo.
- Si no, revisa los `templates/**/*.html` con cambios (`git diff --name-only` + `git ls-files -m -o --exclude-standard templates`).
- Para cada archivo lee el HTML completo, no solo el diff. Si hay diff, úsalo además para priorizar lo que cambió.

## Checklist

### 1. Estructura y compatibilidad (Gmail / Outlook / Apple Mail)
- Tiene `<!DOCTYPE html>`, `<html lang="es">`, `<meta charset>` y `<title>` no vacío.
- Layout con `<table>` (`role="presentation"`, `cellpadding/cellspacing/border="0"`), ancho máx. 600px.
- Sin `<svg>` inline, `position`, `flex`/`grid`, `var()` ni JS: Gmail y Outlook no los soportan. Los íconos deben ser PNG hospedados.
- `@import` de fuentes con fallback (`sans-serif`); no depender de la fuente web.
- Estilos críticos inline (las clases en `<style>` pueden perderse en algunos clientes).
- Fuerza modo claro (`color-scheme`, `supported-color-schemes`) y no hay texto sobre fondos que se inviertan mal en dark mode.
- Peso estimado del HTML < 102 KB (Gmail recorta el mensaje por encima).

### 2. Links y tracking
- Todos los `href` empiezan con `https://`; ninguno vacío, `#` o con placeholder.
- Los links de CTA llevan `utm_source`, `utm_medium` y `utm_campaign`; el `utm_campaign` sigue la convención del resto de templates (p. ej. `23oct_d_...`), **sin tildes, espacios ni caracteres especiales**.
- Mismo UTM en todos los links del mismo mail; los links del footer (redes, T&C, ayuda) no necesitan `utm_campaign`.
- Todo link a la web que pida sesión/personalización lleva las variables que usan los otros templates (`{{email}}`, `{{internalId}}`). Señala links del mismo bloque que unos las tengan y otros no.
- Banner, título y botón que apuntan al mismo destino son coherentes entre sí.
- Fecha/campaña en el UTM coincide con el contenido del mail (no quedó el de una campaña anterior).

### 3. Variables de personalización
- Todas las `{{variables}}` usadas son del set conocido del proyecto. Busca con grep las existentes en otros templates antes de marcar una como desconocida.
- No hay llaves mal cerradas (`{{email}`, `{ {email}}`) ni variables dentro de atributos sin codificar.
- Hay un fallback razonable si el texto depende de un nombre o dato que puede venir vacío.

### 4. Imágenes
- Todo `<img>` tiene `src` absoluto `https://` (blob de `stnohaysinsuerteprod`), `width` y `alt`.
- `alt` descriptivo en imágenes con texto o CTA (el mail debe entenderse con imágenes bloqueadas). `alt=""` solo si es decorativa; señálalo si una imagen con texto lo tiene vacío.
- `display:block` y `border:0` en imágenes; las clickeables dentro de `<a>`.
- Si el nombre del archivo lleva `?version=N`, verifica que el versionado sea intencional.
- Verifica que las URLs responden (opcional, `curl -sI`) cuando el usuario lo pida.

### 5. Preheader
- Existe, es relevante, ≤ ~90 caracteres, y complementa el asunto sin repetirlo.
- Va oculto (`display:none`, `font-size:0`, etc.) y seguido del relleno `&zwnj;&nbsp;` para que el cliente no muestre texto del cuerpo.

### 6. Footer y legal
- Footer 1 (logo + redes) con los tres links: Instagram, TikTok, WhatsApp.
- Texto de soporte y "no responder", T&C y Ayuda presentes.
- Link de baja `.../desuscribirse?email={{email}}` presente y funcional.
- Razón social y año (`© 2026`) correctos para la fecha del envío.
- Si hay promoción/sorteo, el disclaimer específico está incluido.

### 7. Copy
- Ortografía, tildes, concordancia y signos de apertura (`¿ ¡`) en español neutro/peruano.
- Tono consistente con el footer (tú vs usted: el proyecto usa mayormente "tú"; señala mezclas).
- Textos que contradicen imágenes (fechas, montos, premios) o promesas legales delicadas: márcalos para validación humana, no los "corrijas".

## Formato del reporte

Responde en español, breve y accionable. Por archivo:

```
## templates/ruta/archivo.html — <OK | CON OBSERVACIONES | BLOQUEANTE>

🔴 Bloqueantes (no enviar así)
- L123 · descripción del problema → arreglo sugerido

🟡 Importantes
- ...

🔵 Menores / sugerencias
- ...
```

Reglas:
- Cita siempre línea (`archivo:línea`) y el fragmento problemático.
- 🔴 = rompe el mail, link roto, variable mal escrita, falta baja/legal. 🟡 = afecta deliverability, tracking o accesibilidad. 🔵 = estilo y copy.
- Si no hay hallazgos en una categoría, omítela. Si todo está bien, di "OK para enviar" y qué verificaste.
- No inventes problemas: si no puedes verificar algo (p. ej. que una imagen exista), dilo como "no verificado".
- Termina con un resumen de una línea (conteo por severidad) y pregunta si quieres que aplique los arreglos.
