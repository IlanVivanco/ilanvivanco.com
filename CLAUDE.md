# CLAUDE.md — ilanvivanco.com

Sitio personal de Ilán Vivanco (CTO / Director of Engineering en EpicDevs, Santander). Astro estático, modo oscuro, pensado para rendir al máximo y ser accesible. **Antes de tocar UI, leé `DESIGN.md`**: es la fuente de verdad visual y de interacción.

## Stack

- **Astro 7** (salida estática, `build.format: 'file'`, CSS inline), Node ≥ 22.23.
- Sin frameworks en el cliente. JS: **Motion mini** (`motion/mini`) + TS vanilla.
- Fuentes self-hosted (Space Grotesk, Fira Code) en `public/fonts`.
- Deploy: Netlify (ver `netlify.toml`).
- QA: Playwright + axe-core (`scripts/qa/check.mjs`). CI en GitHub Actions: formato, build y QA en cada PR. Lighthouse se corre en local (`npm run lighthouse`), no en el CI.
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
npm run lighthouse # Lighthouse en mobile y desktop sobre el último build
npm run psi        # PageSpeed Insights sobre producción (PSI_API_KEY en .env); npm run psi -- /contacto para una página
npx playwright install chromium   # una vez: lo usan el build, el QA y Lighthouse
```

## Estructura

```
src/
  data/site.ts        config global: email, form, redes, nav, áreas de foco, statScreens
  data/cv.ts          experiencia, stack, formación, idiomas (fuente de /curriculum y del PDF)
  data/pages.ts       páginas públicas: alimenta el sitemap, el JSON-LD y las imágenes OG; idioma y ruta alternativa de cada una
  data/projects.ts    portfolio: filas y case studies (portada en public/img/projects/<slug>.webp, capturas en <slug>/)
  i18n/               textos de las páginas, del layout y de los scripts del cliente, por idioma, y `byLang` para los datos
  styles/global.css   tokens, base, botones, tarjetas, flechas, View Transitions, print
  scripts/ui.ts       revelado, tarjetas (glow, proximidad, perspectiva), header, menú
  scripts/terminal.ts motor de la terminal del hero; las escenas van en terminal-<idioma>.ts
  lib/schema.ts       JSON-LD: Person, WebSite y el tipo de cada página
  layouts/Base.astro  <head>, SEO, speculation rules, header y footer
  components/         Header, Footer, LangSwitch, Socials, MailLink, InstagramGrid, WinControls, Logo, Fn, Icon, ProjectCard, Terminal, Stats, Analytics, CvAts
  pages/              rutas de una línea: /, /curriculum, /portfolio, /portfolio/<slug>, /blog, /blog/<slug>, /contacto, /sobre-mi, /privacidad, /cv, /en/cv, 404, sitemap.xml
  views/              cuerpo de cada página: Home, Resume, Portfolio, Study, Blog, Post, Contact, About, Privacy, NotFound
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
   - CLS ≤ 0,1. Con la fuente en caché da 0; si llega tarde, un párrafo puede cambiar de renglón (hasta ~0,01).
   - `npm run qa` en verde.
   - **Lighthouse se mide en local, no en el CI:** `npm run lighthouse` antes de pushear o, como tarde, antes de mergear, si el cambio toca performance, assets, JS, CSS o el markup de una página. El 99+ se confirma en producción con `npm run psi` después del merge: desde una máquina propia, Cloudflare inyecta un script que baja Best Practices a 81.
3. **Accesibilidad:** elementos semánticos reales, foco visible, contraste medido con los tokens, `prefers-reduced-motion` respetado, contenido que rota con forma de pausarlo (WCAG 2.2.2). Checklist en `DESIGN.md §9`.
4. **Animaciones de entrada con la propiedad `translate`**, nunca `transform`, sobre elementos que puedan ser `.card` (la perspectiva usa `transform`).
5. **Botones:** nunca pisar `.btn` desde estilos locales. En prosa, usar `a:not(.btn)`.
6. **Dependencias:** no sumar librerías de UI ni de animación sin justificar su peso contra el presupuesto. Primero CSS y APIs nativas (View Transitions, popover, `<details>`, IntersectionObserver). Los íconos de Lucide y los logos de Simple Icons se copian de a uno a `components/Icon.astro`, sin sumar los paquetes.
7. **Imágenes:** WebP con tamaño fijo, `width`/`height` siempre, `loading="lazy"` fuera del primer viewport, `alt` descriptivo.
8. **Copy y humor:** español rioplatense con voseo, primera persona, con signos de apertura (`¿`, `¡`), sin raya larga ni frases hechas, posicionamiento de liderazgo técnico, con humor técnico y autocrítico (un guiño por sección, como máximo; reglas en `DESIGN.md §8`). Las cifras y anécdotas son reales o se marcan como aproximadas (`approx: true`, `~`, `+`). Nunca inventar datos, anécdotas ni clientes. Sin humor en el CV para ATS ni en lo legal. En inglés, el mismo tono cercano y con humor: inglés de EE. UU., primera persona (`I`) y contracciones (reglas en `DESIGN.md §8`).
9. **Rutas:** las URLs públicas son contrato (`/`, `/curriculum`, `/portfolio`, `/contacto`, `/sobre-mi`, más lo que defina `netlify.toml`). Cambiar una ruta implica un redirect 301. Si cambia una página pública, se actualiza `src/data/pages.ts`, y su fecha `updated` (el `lastmod` del sitemap) se cambia en el bump de versión. `es` va sin prefijo y `en` en `/en/...`. El mapa de rutas entre idiomas vive en `pages.ts` (`alternate`), porque Astro no traduce slugs. Ningún slug puede ser `es` ni `en`: Astro busca el idioma en todos los segmentos de la ruta. `/privacidad` existe solo en español.
10. **La terminal del hero usa siempre `~/ilan`.** El contenido de las escenas sale del CV real.
11. **Privacidad:** el email nunca va en texto plano en el HTML (usar `encodeMail`/`decodeMail` de `src/lib/mail.ts`). Solo el PDF del CV lo lleva en claro. Sin nombres de familiares en el sitio. Analytics solo sin cookies (Cloudflare Web Analytics): sin GA y sin banner. La única cookie es `cf_clearance`, de seguridad de Cloudflare, y figura en `/privacidad`: si cambia la configuración de Cloudflare, revisar ese texto.
12. **Formulario:** el `name` del form (`contact-form`) y sus campos (`name`, `email`, `tema`, `message`, `subject`, `fake`) coinciden con los de Netlify. `data-step` usa el mismo nombre que el campo. Con JS, `subject` se arma con el nombre y el tema. Netlify titula cada campo con su `<label>`: por eso es oculto y corto, y la pregunta visible se asocia con `aria-labelledby`.
13. **Prettier y espacios:** el plugin de Astro separa elementos en línea, y esos espacios se ven. Lo que deba quedar pegado va en un contenedor `display: flex` o con `<!-- prettier-ignore -->`.
14. **CSS:** no usar `-webkit-backdrop-filter` junto a `backdrop-filter`: el minificador deja solo el prefijado y Chrome pierde el blur.
15. **Links externos:** siempre con `target="_blank" rel="noopener"` (lo valida el QA).
16. **CV:** `/curriculum` y el PDF salen de `src/data/cv.ts`. El PDF se edita en `components/CvAts.astro`, con una columna y máximo 2 páginas: el QA valida orden de lectura y fuentes. Reglas en `DESIGN.md`.

## Voz

Para editar prosa con `/humanizar` (se invoca a mano). Estas reglas mandan sobre `.claude/skills/humanizar/SKILL.md`, y la base sigue en la regla 8 y en `DESIGN.md §8`.

- **Registro:** rioplatense con voseo, `¿` y `¡`, comillas rectas, sin raya larga. En los correos manda `~/.claude/identity.md`.
- **Vocabulario:** clichés de marketing afuera; modismos rioplatenses adentro ("manos atadas", "en carne propia").
- **Alcance:** modo archivo solo sobre prosa de `.md`; para `src/data/*.ts`, modo pegado. Quedan fuera el microcopy, los stats, el CV para ATS y los legales.
- **Permiso:** lo publicado o aprobado se edita solo con OK de Ilán.
- **Contenido:** solo los datos, opiniones y anécdotas que ya están en el texto. Esto pisa el permiso de la skill para agregar opiniones.
- **Se conservan:** `alt`, texto de links, títulos, citas, listas con sus etiquetas, y remates y guiños según `DESIGN.md §8`.

Muestra de cómo escribe Ilán:

> También hay que admitir que a más de uno le costó horrores sacarse esa manera de trabajar de la cabeza. Hemos tenido largas sesiones internas tratando de descular quién había editado qué, por qué había 4 branches sin mergear e infinidad de cambios en prod que no figuraban en el repo. Lo que a corto plazo parece fácil y rápido, a la larga te trae "merge conflicts" y dolores de cabeza.
>
> No fue gratis. Había una discusión de fondo en el equipo: ¿no era mejor Gutenberg? ¿Quién busca "programador en Elementor"? Y los updates también traían sorpresas. En agosto de 2022, una versión nueva nos rompió íconos en un sitio y, en otro, alguien terminó editando el core del plugin para salir del paso. Sí, ya sé. Por eso, después, un update limpio fue un lanzamiento en sí mismo.
>
> La línea entre un developer profesional y uno amateur se está difuminando, es inevitable. Me parece genial, y me parece peligroso, por lo mismo que decía el tío Ben: "un gran poder conlleva una gran responsabilidad".
>
> Lo mismo que te permite crear 3 tarjetas te permite romper todo el sitio. Sin una guía clara detrás, se puede generar mucha basura inconsistente, muy rápido.
>
> Sacando mi lado nerd: tampoco existe el anillo único para gobernarlos a todos. Hay muchas maneras de lograr un objetivo. Por eso mi foco hoy no está en elegir la herramienta ganadora, sino en acercarle a cada cliente la que necesita para hacer su trabajo más rápido y eficiente, pero bien. Con su intención, su voz y su estética. Usar el LLM como una herramienta más, poderosa, pero nada más.
>
> Microcopy del sitio, como referencia de humor: "Esta página llegó a producción sin tests." / "O el link es viejo, o alguien hizo deploy un viernes." / "7,5 KB de JavaScript propio en la home (sí, los conté)".

## Voz en inglés

Para editar prosa en inglés con `/humanizer` (se invoca a mano). Estas reglas mandan sobre `.claude/skills/humanizer/SKILL.md`, y la base sigue en la regla 8 y en `DESIGN.md §8`.

- **Registro:** inglés de EE. UU., primera persona (`I`) y contracciones, cercano y con humor técnico. Comillas rectas y sin raya larga.
- **Alcance:** los mismos límites que en español: modo archivo solo sobre prosa de `.md`; para `src/i18n/en.ts` y `src/data/*.ts`, modo pegado. Quedan fuera el microcopy, los stats, el CV para ATS y los legales.
- **Permiso y contenido:** los mismos que en "Voz": lo publicado o aprobado se edita solo con OK de Ilán, y solo con los datos, opiniones y anécdotas que ya están en el texto.
- **Se conservan:** `alt`, texto de links, títulos, citas, listas con sus etiquetas, y remates y guiños según `DESIGN.md §8`.

Todavía no hay una muestra escrita por Ilán en inglés. Hasta entonces, la referencia es el copy que aprobó: "My job is making sure today's technical decisions don't become tomorrow's problems." / "It's aesthetically destroyed, but it works perfectly, so it stays." / "This page shipped to production without tests."

## Verificación antes de dar algo por terminado

0. `npm run format` (tabs de 3, sin punto y coma, comillas simples, 120 columnas; lo controla el CI).
1. `npm run build` sin errores ni warnings nuevos.
2. `npm run qa` en verde.
3. Revisión visual en 1440 px y 390 px, con interacciones: hover de tarjetas, filtro del portfolio, formulario completo por teclado, cambio de página.
4. Si se tocó JS: medir el peso gz de `dist/_astro/*.js` y del JS inline de la home.
5. Si se tocó performance, assets, JS, CSS o markup: `npm run lighthouse`, con la página afectada en `lighthouserc.json`. Comprobar con `npm run psi` después del merge.

## Git

- Ramas descriptivas (`feat/...`, `fix/...`), commits chicos en imperativo y en español o inglés de forma consistente dentro de un PR.
- **Sin atribución de IA en commits ni PRs:** nada de `Co-Authored-By` de asistentes ni links a sesiones.
- **Bump de versión:** se actualizan `package.json`, `package-lock.json` y `CHANGELOG.md`, y `updated` en `src/data/pages.ts` en cada página cuyo contenido cambió desde la versión anterior. Los rebuilds no tocan el `lastmod`.
- No commitear `dist/`, `.astro/`, `node_modules/` ni secretos (`.env`).

## Pendientes conocidos

- **Case studies en inglés:** hoy `/en/portfolio/:slug` redirige a `/en/portfolio`.
- Tema de Prism `monokai-cotalpa` cuando un post lleve bloques de código.
- **Muestra de Ilán en inglés:** sumarla a "Voz en inglés" cuando haya un texto suyo que se pueda publicar.
