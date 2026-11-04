# Migración de Nuxt 2 a Astro

Inventario del sitio viejo y destino de cada elemento. La referencia del sitio Nuxt es el commit `979ff14` de `main`: todo lo que se borra se puede recuperar desde ahí (`git show 979ff14:<ruta>`).

Destinos: **conservado** (queda igual), **migrado** (pasa al sitio nuevo con cambios) y **descartado** (no pasa, con motivo). Las referencias D1 a D8 apuntan a [Decisiones](#decisiones).

> Este repo es público. Por eso este documento no reproduce datos personales del sitio viejo: se describen sin copiarlos.

## Cómo se auditó

- Lectura completa del repo y del historial de git (`pages/`, `content/`, `static/` y `netlify.toml`, incluidos los archivos borrados).
- Requests al sitio en producción el 2026-11-02 para ver el código de respuesta real de cada URL.
- API de Netlify, solo lectura: configuración del sitio, formularios (metadatos, no los envíos) y nombres de las variables de entorno (no los valores).
- Búsqueda de links en los repos públicos de GitHub y en el índice de Wayback Machine.
- **Sin revisar:** LinkedIn (requiere sesión) y Search Console (sin acceso). En GitHub solo hay links a la raíz del dominio. Wayback solo tiene `/`, `/contacto`, `/curriculum`, `/sobre-mi`, imágenes y assets, y su API estaba caída al repetir la consulta con todos los códigos de estado.

## Lo que la auditoría corrigió

| Se suponía | Lo que encontré |
|---|---|
| `/about`, `/resume` y `/contact` podían estar publicadas | Hoy dan **404**. `nuxtI18n.paths` las generó solo como `/en/about`, `/en/resume` y `/en/contact`. Igual llevan 301, por si hay links viejos. |
| Hay que averiguar qué hay detrás de `INSTAGRAM_URL` | **NoCodeAPI**: el historial tiene `v1.nocodeapi.com/ilanvivanco/instagram/<id>` (commits `dc41335` y `0a244e5`; el id está enmascarado). No leí el valor actual. |
| El feed de Instagram funciona | **Está roto:** `/api/instagram` responde 200 con cuerpo vacío. Sacarlo no quita nada que hoy funcione. |
| Quizás hubo páginas de detalle en el portfolio | `skillsoft` tuvo `has_single: true` hasta el 2021-02-17 (`037d835`), pero no hay rastro de que se publicara. `/portfolio/skillsoft` da 404 y Wayback no la lista. El 301 con comodín lo cubre igual. |
| El sitio se sirve desde Netlify | Delante de Netlify hay **Cloudflare** (`server: cloudflare`, `cf-ray`). Afecta a analytics: ver D7 y las tareas al lanzar. |
| (nuevo) | Hubo una página `pages/contact-me.vue` en versiones viejas. Se suma el 301 de `/contact-me`. |
| (nuevo) | `locales/general/portfolio.js` no se importa en ningún lado: es código muerto. Es la única fuente de los 7 proyectos fuera del portfolio. |
| (nuevo) | `locales/en_US.js` está casi todo en español. Lo único traducido de verdad son `locales/en/positions.js`, `menu.js` y parte de `cv.js`. |

## Rutas y redirects

| URL vieja | Hoy | Destino | Estado |
|---|---|---|---|
| `/` | 200 | `/` | conservado |
| `/sobre-mi` | 200 | `/sobre-mi` | conservado |
| `/curriculum` | 200 | `/curriculum` | conservado |
| `/contacto` | 200 | `/contacto` | conservado |
| `/portfolio` | 200 | `/portfolio` | conservado |
| `/sitemap.xml`, `/robots.txt` | 200 | las mismas URLs | conservado |
| `/aniversario` | 301 | `https://gifrases.ilanvivanco.com/` (301, force) | conservado |
| `/about` | 404 | 301 → `/sobre-mi` | migrado |
| `/resume` | 404 | 301 → `/curriculum` | migrado |
| `/contact`, `/contact-me` | 404 | 301 → `/contacto` | migrado |
| `/cv/es` | (nueva, Fase 2) | 301 → `/cv` | movida: con `es` como idioma por defecto, Astro la marca como 404 |
| `/portfolio/*` | 404 | 301 → `/portfolio` | migrado |
| `/blog`, `/blog/*` | 200 / 404 | 200 / 404 | recuperado |
| `/en` | 200 | 301 → `/` | migrado |
| `/en/about` | 200 | 301 → `/sobre-mi` | migrado |
| `/en/resume` | 200 | 301 → `/curriculum` | migrado |
| `/en/contact` | 200 | 301 → `/contacto` | migrado |
| `/en/portfolio`, `/en/portfolio/*` | 200 / 404 | 301 → `/portfolio` | migrado |
| `/en/blog`, `/en/blog/*` | 200 / 404 | 301 → `/` | migrado |
| `/en/*` (cualquier otra) | 404 | 301 → `/` | migrado |
| `/images/ilan-vivanco-social-card.png` | 200 | 301 → `/og.png` (puede estar en caché de redes) | migrado |
| `/images/ilan-vivanco.jpg` | 200 | 301 → `/img/ilan-800.webp` | migrado |
| `/images/ilan-vivanco-square.jpg` | 200 | 301 → `/img/ilan-sq-480.webp` | migrado |
| `/images/ilan-vivanco-logo.png`, `/images/favicon.png` | 200 | 301 → `/favicon.svg` | migrado |
| `/api/*` | 200 | sin redirect: es un endpoint y se quita | descartado |
| `/js/gtag.js` | 200 | sin redirect: GA4 se elimina | descartado |
| `/_nuxt/*` | 200 | sin redirect: mandar JS a HTML da errores de MIME | descartado |

Notas para implementar:

- Solo `/aniversario` lleva `force`. `/portfolio/*` se implementa como `/portfolio/:slug`, porque el comodín también coincide con `/portfolio` y en `netlify dev` daba 404.
- Hoy `/contacto/` (con barra) responde 200. Con `build.format: 'file'` hay que comprobarlo en el deploy preview y, si cambia, agregar un 301.
- Las imágenes viejas referenciadas en el JSON-LD y en las redes dejan de existir como archivos, por eso llevan 301.

## Infraestructura

| Elemento | Destino | Motivo |
|---|---|---|
| `netlify.toml` | migrado | Build `npm run build`, `publish = "dist"`, `NODE_VERSION`, redirects de arriba. Sin `functions` ni `/api/*`. Pisa los valores viejos de la UI de Netlify (`npm run generate`). |
| `.node-version` (16) | migrado | Pasa a `22.23.4`, con `engines` en `package.json`. |
| `package.json`, `package-lock.json` | migrado | Se reemplazan por los de Astro. Salen Nuxt, Vue, Element UI, GSAP, moment, lodash, Supabase y demás. |
| `nuxt.config.js`, `jsconfig.json` | descartado | Reemplazados por `astro.config.mjs`. |
| `.gitignore` | migrado | Se combina con el del sitio nuevo. |
| `.editorconfig` | migrado | El código nuevo usa 2 espacios, no tabs. |
| `.prettierrc` | descartado | No hay Prettier en el proyecto y su estilo (`semi: false`) no coincide con el código nuevo. |
| `README.md` | migrado | Se reescribe para Astro. Se conserva el badge de Netlify. |
| `plugins/*` (`eventHub`, `element-ui`, `dynamicImageLoader`, `lazySizes`), `mixins/*` (`DynamicImages`, `Transitions`) | descartado | Específicos de Nuxt/Vue. Hoy cubren lo mismo `loading="lazy"` y las View Transitions. |
| Variables de Netlify `INSTAGRAM_URL`, `SUPABASE_URL`, `SUPABASE_KEY` | conservado | No se tocan. Se pueden borrar tras el merge y la decisión de la Fase 1B. |

## Formulario de contacto

| Elemento | Destino | Motivo |
|---|---|---|
| `components/ContactForm.vue` | migrado | La consola de `/contacto` lo reemplaza. |
| Form `contact-form` en Netlify | conservado | **Está activo:** 71 envíos, el último el 2026-11-02. El `name` no cambia. |
| Campos `name`, `email`, `message`, `fake` | conservado | El form nuevo usa `nombre`, `mensaje` y `_gotcha`; se **renombran** a los viejos para no cambiar las notificaciones ni la tabla de envíos. |
| Campo `tema` | migrado | Campo nuevo del diseño aprobado. Aparece como columna adicional en Netlify. |
| Campo `subject` | migrado | Asunto del mail de notificación, con el nombre y el tema. Netlify también lo muestra como una fila. |
| Form `form 1` en Netlify | descartado | Vacío desde 2021 (0 envíos). Borrado el 2026-11-03. |
| Ofuscación de email y teléfono en `pages/contact.vue` | migrado | El email pasa a `src/lib/mail.ts`. El teléfono no se publica (D2). |
| Validaciones y copy con humor (`messages.*`) | descartado | La consola nueva tiene los suyos, ya aprobados. |

## Analytics

| Elemento | Destino | Motivo |
|---|---|---|
| GA4 (`G-7CJGME4GRL`) en `layouts/default.vue` y `static/js/gtag.js` | descartado | Decisión tomada: Cloudflare Web Analytics, sin cookies. La propiedad de GA4 se puede cerrar desde Google. |

## Instagram

| Elemento | Destino | Motivo |
|---|---|---|
| `functions/instagram.js` | descartado | Se replanifica en la Fase 1B. |
| `components/InstagramFeed.vue` | descartado | Ídem. |
| Tabla `options` en Supabase (`instagram`, `instagram_last_run`) | conservado | No se toca desde acá. Se puede eliminar tras la Fase 1B. |

**Cómo funcionaba** (para `PLAN-instagram.md`):

- `/api/instagram` → `/.netlify/functions/instagram`. Si pasó más de un día desde `instagram_last_run`, pedía `limit=12` a `INSTAGRAM_URL` (NoCodeAPI) y guardaba el resultado en Supabase; si no, devolvía lo cacheado.
- `InstagramFeed.vue` guardaba la respuesta en `localStorage` **sin vencimiento**, mostraba `media_url`, `permalink`, `timestamp` y hasta 2 hashtags del `caption`, y usaba un placeholder animado mientras cargaba.
- Se usaba en `pages/index.vue` (dos bloques de 6 fotos, con `offset`) y en `pages/about.vue` (6 fotos). El grid por defecto era de 4 columnas.
- Antes de 2022 los datos se guardaban en `static/data/instagram.json`, durante el build.

## Contenido

| Elemento | Destino | Motivo |
|---|---|---|
| `content/es/portfolio/`: `altura`, `boston-standard-plumbing`, `brennan-consulting`, `camunda`, `engineer-without-borders`, `evergage`, `explo`, `explore-and-share`, `play-2-fund`, `skillsoft`, `sumtotal` | migrado | Los 11 están en `src/data/projects.ts` con la misma fecha y URL. `job_for: NTM` pasa a `client: EpicDevs`. Copy reescrito y aprobado. |
| `content/es/portfolio/portfolio-de-ejemplo.md`, `content/en/portfolio/example-portfolio.md` | descartado | Lorem ipsum, con `show: false`. |
| `content/es/blog/code-tests.md`, `content/es/blog/entrada-de-ejemplo.md`, `content/en/blog/example-post.md` | descartado | Posts de prueba, con `show: false`. |
| `locales/general/portfolio.js` | descartado | Código muerto. Sus 7 proyectos extra quedan en el TODO de abajo. |
| `locales/es_AR.js`: textos de home, sobre mí y demás | migrado | Reescritos en el sitio nuevo. Sin nombres de familiares, como se decidió. |
| `locales/es_AR.js`: `taglines` y `components/Tagline.vue` | descartado | La terminal del hero cumple esa función. Incluían datos familiares. |
| `locales/en_US.js`, `locales/en/menu.js` | descartado | Casi todo en español. Fase 2, recuperable desde `979ff14`. |
| `locales/en/cv.js`, `locales/en/positions.js` | descartado | **Es la única traducción real.** Sirve de base para el CV en inglés de la Fase 2: `git show 979ff14:locales/en/positions.js`. |
| `locales/es/menu.js`, `locales/i18n.config.js`, `locales/es_AR.js`: `meta.*` | migrado | Pasan a `site.nav` y a las props de `Base.astro`. |
| `locales/general/socials.js` | migrado | LinkedIn y GitHub están visibles; Instagram y Twitter van en `sameAs` (D6). |

## CV: `locales/es/*` contra `src/data/cv.ts`

| Dato viejo | En `cv.ts` | Destino | Motivo |
|---|---|---|---|
| `positions.js`: 10 cargos | Todos, reescritos; `earlier` guarda los anteriores a 2015 | migrado | `cv.ts` suma Construye Mundo y divide Networks That Matter/EpicDevs en 3 roles. |
| Meses de inicio y fin de los cargos anteriores a 2015 | Solo años | migrado | El PDF para ATS pide fechas consistentes: se recuperan del CV viejo, sin cambiar lo que muestra `/curriculum`. |
| Inicio en Networks That Matter: `2015-08` | `jun 2015` | migrado | Pasa a `ago 2015` (D3). |
| Freelance: `2005-12` a hoy | `oct 2006 — jun 2020` | migrado | Pasa a `dic 2005 — hoy` (D3). |
| Andy Goldstein: `2007 — 2009` | `2007 — 2010` | migrado | Pasa a `2007 — 2009` (D3). |
| Raggio: título "Diseñador gráfico" | Solo "Técnico en Comunicación Publicitaria" | migrado | Se agrega el título (D3). |
| `courses.js`: Wmedia, Udemy, WesBos, Platzi, Educación IT | Sin equivalente | descartado | Se probó una selección breve y se sacó: una lista de cursos no refleja cómo aprende. |
| `skills.js`: niveles por habilidad | No está | descartado | Las autoevaluaciones numéricas no aportan y no sirven para un ATS. |
| `tech.js`: unas 55 tecnologías con ícono | `stack`, con unas 30, más actuales | migrado | Se suman HTML5, CSS3, jQuery y Bash (D5). El resto (escritorio y herramientas viejas) se descarta. |
| `hobbies.js` | Solo fotografía, viajes, mate y café, en prosa | descartado | La nube de palabras no está en el diseño aprobado. "Fuera del código" cubre lo importante. |
| `data.languages` con niveles numéricos | `languages`: Nativo y Fluido | migrado | Más claro para un ATS. |
| `data.email` | `site.email` | migrado | D1. |
| `data.phone` | No está | descartado | D2. |
| `data.birth_date` | No está | descartado | Dato personal innecesario. No se usa ni en el CV. |
| `data.references`: datos de contacto de un tercero | No está | descartado | Datos personales de otra persona en un repo y sitio públicos. |
| `data.job_title`: "Programador web full stack" | "CTO / Director of Engineering" | migrado | Posicionamiento nuevo. |
| Ubicación por cargo | Solo en los 3 roles de EpicDevs y, dentro de `meta`, en Construye Mundo y Freelance | migrado | D4: se completa en `cv.ts` para el PDF. |

## Componentes y páginas

| Elemento | Destino | Motivo |
|---|---|---|
| `pages/index.vue` | migrado | `src/pages/index.astro`. |
| `pages/about.vue` | migrado | `src/pages/sobre-mi.astro`. |
| `pages/resume.vue`, `components/cv/*` (`Cv`, `CvHeader`, `Positions`, `Studies`, `Ratings`, `IconsGrid`, `Cloud`, `SectionHeader`) | migrado | `src/pages/curriculum.astro`. Salen las calificaciones, la grilla de íconos y la nube de palabras. |
| `pages/contact.vue` | migrado | `src/pages/contacto.astro`. |
| `pages/portfolio/index.vue`, `components/ItemsGrid.vue` | migrado | `src/pages/portfolio.astro` y `ProjectCard.astro`. |
| `pages/portfolio/_slug.vue` | descartado | Sin páginas de detalle reales. 301 a `/portfolio`. |
| `pages/blog/index.vue`, `pages/blog/_slug.vue`, `components/blog/*` (`BlogFooter`, `BlogLangSwitcher`, `BlogThumbnail`, `BlogTitle`) | descartado | Blog en Fase 2. |
| `layouts/default.vue` | migrado | `src/layouts/Base.astro`. El JSON-LD se revisa en la etapa de SEO (`Organization`, `WebSite` y `BreadcrumbList` no pasaron). |
| `layouts/error.vue` | migrado | `src/pages/404.astro`. |
| `components/Logo.vue`, `Nav.vue`, `SocialLinks.vue`, `MainSidebar.vue`, `global/SectionTitle.vue`, `global/BackLink.vue` | migrado | `Logo`, `Header`, `Footer` y `Fn`. El sidebar desaparece del diseño nuevo. |
| `components/LangSwitcher.vue` | descartado | Ya estaba comentado en el layout. Inglés en Fase 2. |
| `components/AnimatedBackground.vue` | descartado | No está en el diseño aprobado, que usa un fondo liso (`DESIGN.md §1`). |

## Assets

| Elemento | Destino | Motivo |
|---|---|---|
| `assets/images/ilan-vivanco.jpg`, `static/images/ilan-vivanco.jpg`, `static/images/ilan-vivanco-square.jpg` | migrado | `public/img/ilan-*.webp`. |
| `assets/images/ilan-workspace.jpg` | migrado | `public/img/workspace-640.webp`. |
| `assets/images/portfolio/`: `altura`, `boston-company`, `brennan`, `camunda`, `evergage`, `ewb`, `explo`, `explore-share`, `play2fund`, `skillsoft`, `sumtotal` | migrado | `public/img/projects/*.webp`. |
| `assets/images/portfolio/`: `ilc`, `kidcity`, `ntm`, `saignite`, `thomson`, `yesware`, `zillion`, `ilan-vivanco` | descartado | Fuera del portfolio nuevo. Fase 2, recuperables desde `979ff14`. |
| `static/images/ilan-vivanco-social-card.png` | migrado | `public/og.png` y OG por página. |
| `static/images/favicon.png`, `assets/images/svg/ilan-vivanco-iso.svg` | migrado | `public/favicon.svg`. |
| `static/images/ilan-vivanco-logo.png`, `assets/images/svg/ilan-vivanco-logo.svg` | migrado | `Logo.astro`. |
| `assets/images/ilan-vivanco-bw.jpg`, `ilan-vivanco-duo-yellow.jpg`, `banner.jpg`, `paisaje.jpg`, `404.png` | descartado | No están en el diseño nuevo. Recuperables desde `979ff14`. |
| `assets/images/blog/*`, `assets/images/global/*`, `assets/images/svg/flag-*.svg`, `assets/images/svg/social/*`, `assets/images/svg/stack/*` | descartado | El diseño nuevo usa íconos inline propios y no tiene blog ni selector de idioma. |
| `assets/css/theme.css`, `assets/css/fonts/*`, `assets/scss/_*.scss`, `assets/scss/main.scss` | descartado | Tema de Element UI y estilos viejos. La paleta está en los tokens de `global.css`. |
| `assets/scss/prism/_prism.scss`, `assets/scss/prism/monokai-cotalpa.scss` | descartado | Fase 2, para el blog. El tema también está en `IlanVivanco/monokai-cotalpa`. |

## Datos personales en el historial público

El sitio nuevo no incluye los nombres de familiares, la fecha de nacimiento, el teléfono ni los datos de la referencia. Pero este repo es **público**, y todo eso sigue en el historial de git y en el sitio actual hasta el merge. Borrar los archivos no lo elimina del historial; se decidió no reescribirlo (D8).

## Decisiones

| # | Decisión | Resultado |
|---|---|---|
| D1 | Email público de `site.email` | La dirección que ya usaba el sitio viejo. Ofuscada en el HTML. |
| D2 | Teléfono | No se publica en el sitio ni en el PDF. |
| D3 | Datos del CV que no coincidían | Se actualiza `cv.ts` con los datos del CV viejo: inicio en ago 2015, freelance desde dic 2005 y en curso, Goldstein 2007–2009 y título "Diseñador gráfico" en Raggio. |
| D4 | Ubicación de los cargos | Remoto: Construye Mundo, Delicious Brains, Explore-Share y Magissim. Buenos Aires, Argentina: Activar, Mendióroz, Exastudio, NewPrint y Gilardoni. |
| D5 | Cursos y palabras clave | Sin cursos en el sitio ni en el PDF. HTML5, CSS3, jQuery y Bash se suman a `stack` como chips. |
| D6 | Instagram y Twitter | Se suman a `sameAs` del JSON-LD, sin cambio visual. |
| D7 | Analytics | Beacon de Cloudflare listo y apagado sin `PUBLIC_CF_BEACON_TOKEN`. El token y la revisión de Cloudflare se ven al lanzar. |
| D8 | Historial de git | Se mantiene este repo, sin reescribir el historial: los datos no son tan sensibles y conserva la conexión con Netlify, los issues y la referencia `979ff14`. |

## Tareas manuales tras el merge

Quedan fuera de este PR porque son cambios en cuentas externas:

- Cloudflare: hecho. Snippet manual activo, Speed Brain apagado y `PUBLIC_CF_BEACON_TOKEN` cargado en Netlify.
- Netlify: `REBUILD_HOOK_URL` cargado. Comprobar el primer rebuild semanal en los logs de la función.
- Netlify: hecho. Sin `INSTAGRAM_URL`, `SUPABASE_URL` ni `SUPABASE_KEY`, y sin `form 1`.
- Supabase: eliminar la tabla `options` o el proyecto.
- NoCodeAPI: dar de baja la integración si no se reutiliza.
- Google Analytics: cerrar la propiedad `G-7CJGME4GRL`.
- Search Console: enviar el sitemap nuevo y revisar los 404 durante unas semanas.
- LinkedIn: revisar si hay links a rutas viejas.

## TODO / Fase 2

- **Sitio en inglés:** i18n de Astro, con `es` por defecto sin prefijo y `en` en `/en/…`. Recupera `/en/about`, `/en/resume`, `/en/contact` y `/en/portfolio` (quitando sus 301) y suma `hreflang`.
- **CV en inglés** con el mismo generador ATS. Base: `git show 979ff14:locales/en/positions.js`.
- **Tema de Prism `monokai-cotalpa` en el blog,** cuando un post lleve bloques de código.
