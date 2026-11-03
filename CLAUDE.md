# CLAUDE.md — ilanvivanco.com

Sitio personal de Ilán Vivanco (CTO / Director of Engineering en EpicDevs, Santander). Astro estático, modo oscuro, pensado para rendir al máximo y ser accesible. **Antes de tocar UI, leé `DESIGN.md`**: es la fuente de verdad visual y de interacción.

## Stack

- **Astro 7** (salida estática, `build.format: 'file'`, CSS inline), Node ≥ 22.23.
- Sin frameworks en el cliente. JS: **Motion mini** (`motion/mini`) + TS vanilla.
- Fuentes self-hosted (Space Grotesk, Fira Code) en `public/fonts`.
- Deploy: Netlify (ver `netlify.toml`).
- QA: Playwright + axe-core (`scripts/qa/check.mjs`). CI en GitHub Actions: build, QA y Lighthouse en cada PR.
- Formulario: Netlify Forms. Analytics: Cloudflare Web Analytics (`PUBLIC_CF_BEACON_TOKEN`, sin cookies).

## Comandos

```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # dist/ + CV en PDF + imágenes OG
npm run instagram  # trae las últimas fotos de Instagram (también corre en el build)
npm run cv:pdf     # regenera el PDF sobre el último build
npm run og:images  # regenera las imágenes OG sobre el último build
npm run preview    # sirve dist/
npm run format     # Prettier: todo el código, con la misma config que el editor
npm run qa         # build + axe, overflow y consola (desktop y mobile) + email, form, redirects, SEO, peso, analytics y CV
npx playwright install chromium   # una vez: lo usan el build y el QA
```

## Estructura

```
src/
  data/site.ts        config global: email, form, redes, nav, áreas de foco, statScreens
  data/cv.ts          experiencia, stack, formación, idiomas (fuente de /curriculum y del PDF)
  data/pages.ts       páginas públicas: alimenta el sitemap, el JSON-LD y las imágenes OG
  data/projects.ts    portfolio (captura en public/img/projects/<slug>.webp)
  styles/global.css   tokens, base, botones, tarjetas, flechas, View Transitions, print
  scripts/ui.ts       revelado, tarjetas (glow, proximidad, perspectiva), header, menú
  scripts/terminal.ts escenas de la terminal del hero
  lib/schema.ts       JSON-LD: Person, WebSite y el tipo de cada página
  layouts/Base.astro  <head>, SEO, speculation rules, header y footer
  components/         Header, Footer, Socials, MailLink, InstagramGrid, WinControls, Logo, Fn, Icon, ProjectCard, Terminal, Stats, Analytics, CvAts
  pages/              /, /curriculum, /portfolio, /contacto, /sobre-mi, /privacidad, /cv/es, 404, sitemap.xml
public/               fonts, img, favicon.svg, og.png, robots.txt (cv/ y og/ se generan, no se versionan)
scripts/build/        fotos de Instagram, variantes de capturas, CV en PDF e imágenes OG
netlify/functions/    rebuild semanal
scripts/qa/           chequeos automáticos
netlify.toml          build, redirects y cabeceras
```

## Reglas de trabajo

1. **El contenido vive en `src/data/`.** Las páginas solo presentan datos. Para sumar un proyecto, un cargo o un stat, se edita el archivo de datos, no el markup.
2. **Presupuestos (no negociables):**
   - Lighthouse 99+ en las 4 categorías, en mobile y desktop.
   - JS propio ≤ 10 KB gz por página (hoy, 7,5 KB en la home). El beacon de Cloudflare es de terceros, pesa unos 10 KB gz y se carga diferido.
   - CLS 0.
   - `npm run qa` en verde.
3. **Accesibilidad:** elementos semánticos reales, foco visible, contraste medido con los tokens, `prefers-reduced-motion` respetado, contenido que rota con forma de pausarlo (WCAG 2.2.2). Checklist en `DESIGN.md §9`.
4. **Animaciones de entrada con la propiedad `translate`**, nunca `transform`, sobre elementos que puedan ser `.card` (la perspectiva usa `transform`).
5. **Botones:** nunca pisar `.btn` desde estilos locales. En prosa, usar `a:not(.btn)`.
6. **Dependencias:** no sumar librerías de UI ni de animación sin justificar su peso contra el presupuesto. Primero CSS y APIs nativas (View Transitions, popover, `<details>`, IntersectionObserver).
7. **Imágenes:** WebP con tamaño fijo, `width`/`height` siempre, `loading="lazy"` fuera del primer viewport, `alt` descriptivo.
8. **Copy y humor:** español rioplatense con voseo, primera persona, con signos de apertura (`¿`, `¡`), sin raya larga ni frases hechas, posicionamiento de liderazgo técnico, con humor técnico y autocrítico (un guiño por sección, como máximo; reglas en `DESIGN.md §8`). Las cifras y anécdotas son reales o se marcan como aproximadas (`approx: true`, `~`, `+`). Nunca inventar datos, anécdotas ni clientes. Sin humor en el CV para ATS ni en lo legal.
9. **Rutas:** las URLs públicas son contrato (`/`, `/curriculum`, `/portfolio`, `/contacto`, `/sobre-mi`, más lo que defina `netlify.toml`). Cambiar una ruta implica un redirect 301. Si cambia una página pública, se actualiza `src/data/pages.ts`, incluida la fecha `updated` (el `lastmod` del sitemap).
10. **La terminal del hero usa siempre `~/ilan`.** El contenido de las escenas sale del CV real.
11. **Privacidad:** el email nunca va en texto plano en el HTML (usar `encodeMail`/`decodeMail` de `src/lib/mail.ts`). Solo el PDF del CV lo lleva en claro. Sin nombres de familiares en el sitio. Analytics solo sin cookies (Cloudflare Web Analytics): sin GA y sin banner. La única cookie es `cf_clearance`, de seguridad de Cloudflare, y figura en `/privacidad`: si cambia la configuración de Cloudflare, revisar ese texto.
12. **Formulario:** el `name` del form (`contact-form`) y sus campos (`name`, `email`, `tema`, `message`, `subject`, `fake`) coinciden con los de Netlify. `data-step` usa el mismo nombre que el campo. Con JS, `subject` se arma con el nombre y el tema. Netlify titula cada campo con su `<label>`: por eso es oculto y corto, y la pregunta visible se asocia con `aria-labelledby`.
13. **Prettier y espacios:** el plugin de Astro separa elementos en línea, y esos espacios se ven. Lo que deba quedar pegado va en un contenedor `display: flex` o con `<!-- prettier-ignore -->`.
14. **CSS:** no usar `-webkit-backdrop-filter` junto a `backdrop-filter`: el minificador deja solo el prefijado y Chrome pierde el blur.
15. **Links externos:** siempre con `target="_blank" rel="noopener"` (lo valida el QA).
16. **CV:** `/curriculum` y el PDF salen de `src/data/cv.ts`. El PDF se edita en `components/CvAts.astro`, con una columna y máximo 2 páginas: el QA valida orden de lectura y fuentes. Reglas en `DESIGN.md`.

## Verificación antes de dar algo por terminado

0. `npm run format` (tabs de 3, sin punto y coma, comillas simples, 120 columnas; lo controla el CI).
1. `npm run build` sin errores ni warnings nuevos.
2. `npm run qa` en verde.
3. Revisión visual en 1440 px y 390 px, con interacciones: hover de tarjetas, filtro del portfolio, formulario completo por teclado, cambio de página.
4. Si se tocó JS: medir el peso gz de `dist/_astro/*.js` y del JS inline de la home.
5. Si se tocó performance o assets: Lighthouse en `/` y en la página afectada.

## Git

- Ramas descriptivas (`feat/...`, `fix/...`), commits chicos en imperativo y en español o inglés de forma consistente dentro de un PR.
- **Sin atribución de IA en commits ni PRs:** nada de `Co-Authored-By` de asistentes ni links a sesiones.
- No commitear `dist/`, `.astro/`, `node_modules/` ni secretos (`.env`).

## Pendientes conocidos

- **Fase 2:** sitio y CV en inglés, blog, y portfolio actualizado con clientes actuales de EpicDevs y capturas nuevas.
