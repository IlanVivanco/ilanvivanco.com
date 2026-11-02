# Plan: feed de Instagram (Fase 1B)

**Estado: esperando aprobación. No hay nada implementado.**

## Recomendación

Una **grilla de 6 fotos en "Fuera del código"**, con las imágenes como archivos propios en WebP. Un workflow semanal trae los posts nuevos y **abre un PR**: la foto se publica cuando lo aprobás. El navegador no hace ninguna request a Instagram, no se suma JavaScript y, si la API falla, el sitio sigue mostrando las últimas fotos.

**Para arrancar necesito tres respuestas:**

1. ¿`@ilanvivanco` es una cuenta profesional (Creator o Business)? Si no lo es, ¿la pasarías a Creator?
2. ¿Aprobás el flujo con PR, o preferís que las fotos se publiquen solas?
3. ¿Te sirven 6 fotos en "Fuera del código"?

## 1. Cómo funcionaba el sitio viejo

- `functions/instagram.js` respondía en `/api/instagram`. Si pasó más de un día desde la última vez, pedía 12 posts a `INSTAGRAM_URL` y los guardaba en Supabase (tabla `options`, filas `instagram` e `instagram_last_run`). Si no, devolvía lo guardado.
- **`INSTAGRAM_URL` apuntaba a [NoCodeAPI](https://nocodeapi.com/)**, según el historial del repo (`v1.nocodeapi.com/ilanvivanco/instagram/<id>`, commits `dc41335` y `0a244e5`). No leí el valor actual.
- `components/InstagramFeed.vue` mostraba `media_url`, `permalink`, `timestamp` y hasta 2 hashtags del `caption`. Guardaba la respuesta en `localStorage` sin vencimiento y usaba un placeholder animado al cargar.
- Se usaba en `pages/index.vue` (dos bloques de 6 fotos) y en `pages/about.vue` (6 fotos). El grid por defecto era de 4 columnas.
- **Hoy está roto:** `/api/instagram` responde 200 con el cuerpo vacío (comprobado el 2026-11-02). La causa más probable es el fin de la Basic Display API (punto 2), pero no lo verifiqué.
- El código sigue en `git show 979ff14:functions/instagram.js`.

## 2. Estado de la API de Instagram

Verificado en la documentación de Meta el 2026-11-02.

| Tema | Estado |
|---|---|
| Basic Display API (la de las cuentas personales) | [Dejó de funcionar el 4 de diciembre de 2024](https://developers.facebook.com/docs/instagram-basic-display-api). |
| API vigente | [Instagram Platform](https://developers.facebook.com/documentation/instagram-platform/overview). Para este caso sirve **Instagram API with Instagram Login**, que no requiere una página de Facebook. La documentación recomienda *Unified Login* para integraciones nuevas: lo confirmo al implementar. |
| Tipo de cuenta | **Solo profesional** (Business o Creator). No hay API oficial para leer una cuenta personal. |
| Permiso y acceso | `instagram_business_basic` con **Standard Access**, que alcanza para [cuentas propias agregadas a la app](https://developers.facebook.com/documentation/instagram-platform/instagram-api-with-instagram-login/business-login). No hace falta App Review ni un flujo de login. |
| Tokens | El token de larga duración [dura 60 días](https://developers.facebook.com/documentation/instagram-platform/instagram-api-with-instagram-login/business-login). [Se renueva](https://developers.facebook.com/documentation/instagram-platform/reference/refresh_access_token) si tiene al menos 24 horas y no venció. **Si vence, no se puede renovar** y hay que generar otro a mano. |
| Datos | [`GET graph.instagram.com/<versión>/me/media`](https://developers.facebook.com/documentation/instagram-platform/reference/instagram-user/media) con `id`, `caption`, `media_type`, `media_url`, `permalink` y `timestamp`. |
| Limitación | `media_url` puede faltar en videos con material con copyright, y es una URL del CDN de Instagram: no conviene enlazarla desde el sitio. Por eso las fotos se descargan. |

**Pendiente de confirmar:** la versión exacta de la API al implementar (la documentación consultada muestra `v26.0`) y las condiciones de la plataforma sobre guardar contenido descargado de una cuenta propia.

## 3. Opciones

| | a) En un workflow, con WebP propios | b) Función con caché (Netlify Blobs) | c) Selección manual, sin API |
|---|---|---|---|
| **Mantenimiento** | Medio: token automático y un PR por semana, si hay fotos nuevas | Medio-alto: función, caché y token | Bajo, pero a mano |
| **Rendimiento** | Máximo: estático, sin JS | Peor: requiere JS, o HTML en servidor | Máximo: estático, sin JS |
| **Privacidad** | Sin terceros en el navegador | Sin terceros, solo si también se hace proxy de las imágenes | Sin terceros en el navegador |
| **Costo** | Gratis | Gratis dentro de los límites de Netlify | Gratis |
| **Si se rompe** | La grilla sigue igual; falla el workflow y te avisa GitHub | La grilla queda vacía o desactualizada | No se puede romper |
| **Cuenta profesional** | Sí | Sí | No |

**Recomiendo la opción (a), con un cambio sobre tu propuesta: el workflow corre aparte del build y abre un PR.** Tiene dos ventajas:

- **Los builds no dependen de Meta.** Si la API falla, el deploy no se entera.
- **Decidís qué se publica.** Los `caption` y las fotos pueden mencionar o mostrar a tu familia, y `CLAUDE.md` prohíbe sus nombres en el sitio. Con publicación automática, un `alt` generado desde el `caption` podría romper esa regla sin que nadie lo vea.

**Si no querés una cuenta profesional, la opción es (c):** los mismos componentes, con las fotos elegidas a mano en `src/data/instagram.ts`.

## 4. Propuesta de diseño

**Dónde:** dentro de "Fuera del código", en `/sobre-mi`, debajo del párrafo sobre viajes y fotografía. La home no lleva feed: el sitio viejo sí lo tenía, pero ahí competiría con los stats y la terminal.

```
Fuera del código
  Viajo con mi esposa y nuestra hija...

  ->últimas_fotos();
  ┌──────┐ ┌──────┐ ┌──────┐      Desktop: 3 × 2
  │      │ │      │ │      │      Mobile:  2 × 3
  └──────┘ └──────┘ └──────┘
  ┌──────┐ ┌──────┐ ┌──────┐
  │      │ │      │ │      │
  └──────┘ └──────┘ └──────┘
  Más fotos en Instagram ↗
```

| Aspecto | Propuesta |
|---|---|
| **Fotos** | 6, en 1:1, WebP de 480 px (unos 25 KB cada una), con `width`, `height` y `loading="lazy"` |
| **Tipos** | Fotos y carruseles (primera imagen). Sin videos |
| **Interacción** | La misma de `ProjectCard`: desaturada en reposo, a color con zoom en hover y foco. Radio de 12 px. Sin JS |
| **Cargando** | No existe: es HTML estático |
| **Error** | No existe en el navegador: si falla la API, quedan las últimas fotos aprobadas |
| **Vacío** | Sin fotos no se muestra el bloque |
| **`alt`** | Primera oración del `caption`, sin hashtags ni menciones, y revisada en el PR. Si no sirve, se escribe a mano |
| **Links** | `<a href={permalink} rel="noopener">`, con un `aria-label` que aclara que abre Instagram y la fecha de la foto |
| **Movimiento** | Sin carrusel ni rotación: nada que requiera pausa (WCAG 2.2.2) |

Peso aproximado: 150 KB de imágenes con carga diferida fuera del primer viewport, y 0 KB de JS.

## 5. Plan de implementación

Estimación total: **1 día de desarrollo**, más unos 30 minutos tuyos en Meta.

| # | Paso | Tiempo |
|---|---|---|
| 1 | **Tuyo:** pasar la cuenta a Creator si hace falta, crear la app en Meta y generar el primer token. Te dejo la guía paso a paso | 30 min |
| 2 | `scripts/instagram/fetch.mjs`: pide los posts y genera `src/data/instagram.json` y los WebP, con `sharp` como dependencia de desarrollo | 2 h |
| 3 | Renovación del token: el workflow lo renueva en cada corrida y lo guarda como secret del repo, lo que requiere un token de GitHub con permiso sobre secrets | 1 h |
| 4 | `.github/workflows/instagram.yml`: corre cada semana, abre un PR si hay fotos nuevas y borra las que salen | 1 h |
| 5 | `src/components/InstagramGrid.astro` en `/sobre-mi` | 2 h |
| 6 | QA: axe, peso, CLS, que no haya requests a Instagram y Lighthouse | 1 h |
| 7 | Limpieza: borrar `INSTAGRAM_URL`, `SUPABASE_*`, la tabla `options` y NoCodeAPI | 15 min |

**Cambios en la documentación:**

- `DESIGN.md §5`: nuevo componente "Grilla de fotos". `DESIGN.md §7`: tamaño y origen de las fotos, y la excepción a "Las fotos personales llevan apenas menos saturación" en reposo.
- `CLAUDE.md`: comando del fetch, flujo con PR, regla de revisar `alt` y fotos antes de aprobar, y qué hacer si vence el token.
- `/privacidad`: sin cambios, porque el navegador no contacta a Instagram al mostrar la grilla.

**Riesgo principal:** si el workflow no corre durante 60 días (GitHub desactiva los workflows programados tras 60 días sin actividad en un repo público), el token vence y hay que generarlo a mano. Mitigación: el workflow avisa cuando falla, y una corrida semanal con renovación deja margen de sobra. Si pasa, las fotos quedan como están y el sitio no se rompe.
