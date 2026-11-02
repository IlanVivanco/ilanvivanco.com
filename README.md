# ilanvivanco.com

Sitio personal de Ilán Vivanco, hecho con Astro. Es un sitio estático, en modo oscuro, con la paleta del sitio anterior.

> Para trabajar en el sitio leé primero **`CLAUDE.md`** (reglas, presupuestos, verificación) y **`DESIGN.md`** (sistema de diseño).

## Comandos

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # genera /dist
npm run preview  # sirve /dist en local
npm run qa       # build + axe WCAG 2.2 AA + overflow + consola (desktop y mobile)
npx playwright install chromium   # una vez, para el QA
```

Requiere Node 22.23 o superior (lo pide Astro 7).

## Estructura

```
src/
  data/site.ts       config global: email, endpoint del form, redes, nav, áreas de foco y stats
                     (los stats marcados `approx` son estimaciones por orden de magnitud)
  data/cv.ts         experiencia, stack, formación, idiomas
  data/projects.ts   portfolio (imagen opcional por proyecto)
  styles/global.css  tokens de color/tipo, botones, tarjetas, animaciones base
  scripts/ui.ts      revelado (Motion mini), glow/perspectiva de tarjetas por proximidad, header
  scripts/terminal.ts terminal del hero: 3 escenas que se escriben solas
  layouts/Base.astro head, SEO, JSON-LD, speculation rules
  components/        Header, Footer, Logo, Fn (->titulo();), Icon, ProjectCard, Terminal, Stats
  pages/             /, /curriculum, /portfolio, /contacto, /sobre-mi, 404, sitemap.xml
public/
  fonts/             Space Grotesk + Fira Code (variables, subset latin)
  img/               foto, workspace y capturas de proyectos (webp)
  favicon.svg, og.png, robots.txt
```

Las rutas son las mismas que en el sitio anterior, así que no hacen falta redirects.

## Pendiente antes de publicar

1. `src/data/site.ts` → `email`: reemplazar `[tu@email.com]`.
2. `src/data/site.ts` → `formEndpoint`: URL de Formspree, Basin o una función propia. Si queda vacío, el formulario abre el cliente de correo con el mensaje armado.
3. Subir el CV en PDF a `public/ilan-vivanco-cv.pdf`.
4. Sumar proyectos recientes de EpicDevs en `projects.ts`. La captura va en `public/img/projects/<slug>.webp` (960×600).

## Performance

- Cero frameworks en el cliente. Unos 7 KB gz de JS en la home (Motion `mini` sobre WAAPI, terminal y tarjetas en vanilla TS).
- CSS inline en cada página (`inlineStylesheets: 'always'`), sin requests bloqueantes.
- Fuentes self-hosted con preload, solo el subset latin.
- Speculation Rules para precargar páginas, y View Transitions entre páginas sin JS (`@view-transition`): el header queda fijo, la pastilla del nav se desliza y el contenido entra desde abajo.
- Respeta `prefers-reduced-motion`. Si el JS no carga, todo se muestra igual.
- Lighthouse en local: 100 en Performance, Accesibilidad, Best Practices y SEO (mobile y desktop).
- axe-core (WCAG 2.2 AA + best practices): 0 violaciones en todas las páginas, en desktop y mobile, incluidos los estados abiertos del portfolio y los errores del formulario.

## Deploy

Funciona en cualquier hosting estático. En Netlify, Vercel o Cloudflare Pages: build command `npm run build`, output `dist`. Con `build.format: 'file'`, `/contacto` se sirve desde `contacto.html`, y estos hosts lo resuelven solos.
