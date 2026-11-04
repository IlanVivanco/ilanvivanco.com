# ilanvivanco.com

[![Netlify Status](https://api.netlify.com/api/v1/badges/4e9fe96e-7e5a-4c39-9592-093ce60851c5/deploy-status)](https://app.netlify.com/sites/ilanvivanco/deploys)

Sitio personal de Ilán Vivanco: estático, en modo oscuro y sin frameworks en el cliente.

> Para trabajar en el sitio, leé primero **`CLAUDE.md`** (reglas, presupuestos y verificación) y **`DESIGN.md`** (sistema de diseño).

## Stack

- [Astro 7](https://astro.build) con salida estática y CSS inline. Requiere Node 22.23 o superior (ver `.node-version`).
- TypeScript vanilla y Motion mini en el cliente.
- Netlify para el hosting y el formulario (Netlify Forms). Cloudflare Web Analytics para las estadísticas, sin cookies.
- Playwright y axe-core para el QA. Playwright también genera el CV en PDF y las imágenes OG.

## Comandos

```bash
npm install
npx playwright install chromium   # una vez: lo usan el build, el QA y Lighthouse
npm run dev        # http://localhost:4321
npm run build      # astro build + CV en PDF + imágenes OG
npm run cv:pdf     # regenera el PDF sobre el último build
npm run og:images  # regenera las imágenes OG sobre el último build
npm run preview    # sirve dist/
npm run qa         # build + todos los chequeos
npm run lighthouse # Lighthouse en mobile y desktop sobre el último build; no corre en el CI
```

`npm run qa` verifica, en desktop y mobile: axe (WCAG 2.2 AA), scroll horizontal y consola. También comprueba el email ofuscado, el formulario, los redirects, el SEO, el peso de JS, el beacon de analytics y el CV para ATS.

## Dónde se edita cada cosa

| Contenido | Archivo |
|---|---|
| Email, redes, navegación, áreas de foco y stats | `src/data/site.ts` |
| CV: se usa en `/curriculum` y en el PDF | `src/data/cv.ts` |
| Portfolio | `src/data/projects.ts`, con la captura en `public/img/projects/<slug>.webp` |
| Páginas del sitemap y de las imágenes OG | `src/data/pages.ts` |
| Redirects y cabeceras | `netlify.toml` |
| Política de privacidad y aviso legal | `src/views/Privacy.astro` |
| Colores, tipografía y estilos base | `src/styles/global.css` |

El PDF (`public/cv/`) y las imágenes OG (`public/og/`) se generan en cada build y no se versionan.

## Deploy

Cada push a `main` se publica en Netlify, y cada PR genera un deploy preview. La configuración está en `netlify.toml`. El build instala Chromium, porque genera el PDF y las imágenes OG.

| Variable de Netlify | Para qué |
|---|---|
| `PUBLIC_CF_BEACON_TOKEN` | Token de Cloudflare Web Analytics. Sin él, el sitio se publica sin beacon. Los previews nunca lo cargan. |
| `REBUILD_HOOK_URL` | Build hook de `main`, para el rebuild semanal que trae las fotos de Instagram. |

### Fotos de Instagram

[Behold](https://behold.so/docs/json-feeds) conecta `@ilanvivanco` y publica hasta 6 posts en una URL JSON (`site.instagramFeed`). La cuenta tiene que seguir siendo profesional: Instagram no da API para cuentas personales.

- En cada build, `scripts/build/instagram.mjs` baja las fotos a `public/img/instagram/` como WebP de 480 px y genera `src/data/instagram.generated.json`. Nada de esto se versiona.
- `components/InstagramGrid.astro` las muestra en `/sobre-mi` como HTML estático: el navegador no contacta a Instagram ni a Behold.
- Las fotos se publican sin revisión, así que no se muestra el caption: podría nombrar a alguien de la familia.
- Si Behold o Instagram fallan, el build sigue y `/sobre-mi` se publica sin la grilla hasta el próximo build.
- `netlify/functions/rebuild.mjs` regenera el sitio una vez por semana, con el hook `REBUILD_HOOK_URL`. Sin él, las fotos solo se actualizan con cada deploy.

Si el plan gratis de Behold deja de servir, se reemplaza `site.instagramFeed` por otra fuente y se adapta `scripts/build/instagram.mjs`.

### Probar el formulario

`netlify dev` no procesa Netlify Forms (responde 405), así que `npm run qa` simula el POST. Para probarlo de verdad:

1. Abrí `/contacto` en el deploy preview del PR y mandá un mensaje.
2. Comprobá que aparece en Netlify, en **Forms → contact-form**, y que llega la notificación.

## Historial

Los cambios de cada versión están en `CHANGELOG.md`.

El sitio anterior estaba hecho en Nuxt 2. `MIGRATION.md` tiene el inventario de lo que se conservó, se migró y se descartó, y el TODO de la Fase 2.

## Clones locales

- Demo del plugin de Women's Power Gap, con datos de ejemplo: `~/ddev/wpg-demo` (proyecto DDEV `wpg-demo`).
