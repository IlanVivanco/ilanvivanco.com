# Changelog

## [2.1.1] - 2026-11-03

### Cambiado

- **Formulario en mobile:** al enfocar un campo, la pregunta sube hasta debajo del header para que el teclado no la tape.
- **Foto del hero:** el `sizes` refleja el tamaño real, así mobile baja la versión de 240 px en lugar de la de 480 px.
- **Stats:** el LCP publicado en desktop pasa a 0,3 s, medido en producción.

## [2.1.0] - 2026-11-03

### Agregado

- **`srcset` en las capturas de proyectos, las fotos de Instagram y el escritorio de `/sobre-mi`.** Las variantes de las capturas se generan en cada build (`npm run images`).
- **Favicons:** `favicon.ico`, `apple-touch-icon.png` e íconos con `manifest.webmanifest`.
- **`lastmod` en el sitemap**, desde `updated` en `src/data/pages.ts`.
- **JSON-LD completo:** `Person` como entidad principal, `WebSite`, `ProfilePage`, `ContactPage`, `CollectionPage` con los proyectos y `BreadcrumbList`.

### Cambiado

- **Cabeceras de seguridad y caché:** `nosniff`, `Referrer-Policy`, `Permissions-Policy`, protección contra framing, y caché `immutable` en `/_astro/*`.
- **`ilanvivanco.netlify.app`** redirige al dominio principal.
- **Títulos:** `/curriculum` y `/portfolio` tienen un `<title>` más descriptivo. Los H1 no cambian.
- **Stats:** rotan cada 7,5 s en lugar de 5,6 s, y el LCP publicado en desktop pasa a 0,5 s.
- **Terminal:** el scroll ya no fuerza un reflow por cada tecla.
- **`/privacidad`** pasa a `noindex, follow` y sale del sitemap.
- **Stats:** "11+ años en EpicDevs, 8+ liderando ingeniería" reemplaza a "11+ años liderando ingeniería".
- **Copy:** sin frases repetidas entre páginas y sin el plazo de respuesta en días hábiles. Mate y café juntos solo en el stat de la home.
- **Explore & Share** se escribe igual en el CV y en el portfolio.
- **Links externos:** todos en `https`.

## [2.0.0] - 2026-11-03

Reescritura completa del sitio: de Nuxt 2 a Astro 7 estático, con diseño nuevo. Reemplaza a la versión [1.0.0](https://github.com/IlanVivanco/ilanvivanco.com/tree/v1.0.0).

### Agregado

- **Diseño nuevo**, en modo oscuro, con transiciones entre páginas (View Transitions).
- **Hero con terminal animada**, con tres escenas y botón de pausa.
- **Stats rotativos** en la home, con el tiempo y la navegación integrados en los mismos puntos.
- **Formulario como consola** en `/contacto`, paso a paso y usable por teclado. Sin JS funciona como un formulario común.
- **CV en PDF para ATS**, generado en cada build desde `src/data/cv.ts`: 2 páginas, una columna, texto real en orden de lectura y fuentes embebidas. Se puede descargar, pero no se indexa.
- **`/privacidad`** con la política de privacidad y el aviso legal.
- **Portfolio con filtro** en forma de comando (`$ ls trabajos --type=...`).
- **Fotos de Instagram** en `/sobre-mi`: se copian al sitio en cada build, sin requests a terceros desde el navegador, y un rebuild semanal las mantiene al día.
- **Cloudflare Web Analytics**, sin cookies y sin contar páginas pre-renderizadas.
- **SEO:** sitemap, canonical, JSON-LD e imagen Open Graph por página.
- **Redes con íconos**, en el footer y en el menú móvil, incluidos Instagram, X y EpicDevs.
- **QA automático** en cada PR: accesibilidad con axe, Lighthouse, formulario, interacciones, redirects, peso de JS, email oculto y validación del PDF.
- **Prettier** con una configuración compartida, controlado por el CI.

### Cambiado

- **Stack:** Nuxt 2 pasó a Astro 7, sin frameworks en el cliente. El JS propio de la home pesa unos 7,5 KB gz.
- **Rendimiento:** Lighthouse 99+ en las 4 categorías y CLS 0, medido en local y en el deploy preview.
- **URLs:** las páginas en español son las nuevas rutas públicas (`/curriculum`, `/portfolio`, `/contacto`, `/sobre-mi`). Las viejas redirigen con 301. `/aniversario` se mantiene.
- **Email:** ofuscado en el HTML publicado. Solo el PDF del CV lo lleva en claro.
- **Formulario:** sigue en Netlify Forms, con el mismo `contact-form` y su historial. Suma `tema` y un asunto con el nombre y el tema.
- **CV:** actualizado, con experiencia, stack y formación al día.
- **Proyectos en la home:** un solo proyecto destacado y un acceso al portfolio.

### Eliminado

- **Versión en inglés y blog:** `/en/*` y `/blog*` redirigen a su equivalente en español o a la home. Vuelven en la Fase 2.
- **Google Analytics:** reemplazado por Cloudflare Web Analytics.
- **Feed de Instagram anterior:** dependía de NoCodeAPI, Supabase y una función de Netlify, y ya estaba roto.

[2.1.1]: https://github.com/IlanVivanco/ilanvivanco.com/compare/v2.1.0...v2.1.1
[2.1.0]: https://github.com/IlanVivanco/ilanvivanco.com/compare/v2.0.0...v2.1.0
[2.0.0]: https://github.com/IlanVivanco/ilanvivanco.com/compare/v1.0.0...v2.0.0
