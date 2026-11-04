# DESIGN.md — ilanvivanco.com

Guía de diseño del sitio. Todo componente nuevo tiene que poder explicarse con lo que está acá. Si algo nuevo no encaja, primero se actualiza este documento y después se implementa.

## 1. Principios

1. **Ingeniero, no agencia.** El sitio habla como un CTO: preciso, sobrio, con guiños de consola. Nada de marketing genérico.
2. **Modo oscuro, paleta propia.** Navy profundo de fondo y los colores del isotipo (amarillo, teal, slate, naranja) como acentos. Sin degradados decorativos.
3. **Movimiento con propósito.** Todo se mueve un poco y nada distrae. Cada animación responde a algo: entrar en pantalla, hover, cambio de estado o navegación.
4. **Rendimiento como feature.** Lighthouse 99+ en las 4 categorías, 7,5 KB de JS propio en la home y cero frameworks en el cliente. Si un efecto rompe eso, no va.
5. **Accesible por defecto.** WCAG 2.2 AA, 0 violaciones de axe, teclado completo y `prefers-reduced-motion` respetado siempre.

## 2. Color

Tokens en `src/styles/global.css` (`:root`). No usar hex sueltos en componentes salvo los marcados abajo.

| Token | Valor | Uso | Contraste sobre `--bg` |
|---|---|---|---|
| `--bg` | `#0A111F` | fondo de página | — |
| `--bg-raised` | `#0F1829` | tarjetas | — |
| `--surface` | `#142036` | hover de filas, chips de ícono | — |
| `--surface-hi` | `#1A2944` | pastilla activa del nav | — |
| `--line` | `#22314F` | separadores, bordes de tarjetas | decorativo |
| `--line-hi` | `#34466B` | bordes en hover, bordes de imagen | decorativo |
| `--line-strong` | `#5B6E95` | **bordes de controles** (inputs, botones outline, toggles) | 3.7:1 ✓ UI |
| `--text` | `#F4F9FC` | títulos, texto principal | 17.8:1 |
| `--text-soft` | `#C3CDDF` | párrafos, ledes, nombres de proyecto en reposo | 11.8:1 |
| `--muted` | `#8E9CB8` | meta, labels mono, placeholders | 6.8:1 |
| `--yellow` / `--yellow-hi` | `#D8BD2D` / `#FFE356` | acento principal: CTA, activo, cursores, sufijos de stats | 10.1:1 |
| `--teal` / `--teal-hi` | `#2C979F` / `#55C9D1` | acento secundario: `->`, `?`, `✓`, "en vivo", props de código | 9.6:1 (hi) |
| `--orange` / `--orange-hi` | `#CC4F2D` / `#EE7650` | `()` de títulos, keywords, errores, líneas eliminadas en diffs | 6.6:1 (hi) |
| `--violet` | `#B9A4FF` | números en código (solo en la terminal) | — |
| `--navy`, `--slate` | `#202E49`, `#475B7D` | paleta original; uso puntual | — |

Reglas:
- **Amarillo = acción o estado activo.** Botón primario, ítem activo, dot del nav, cursor, progreso. No usarlo para decorar.
- El texto sobre amarillo es siempre `#0A111F` (10.1:1).
- Teal para el "lenguaje de consola": prompts, checks, flechas, estado en vivo.
- Naranja solo en la sintaxis de los títulos `->nombre();`, en código y en errores.
- Hex permitidos fuera de tokens: `#070C17` (fondo de terminal y consola) y `#0A111F` (texto sobre amarillo).
- Cualquier color nuevo de texto se mide antes: ≥4.5:1 para texto, ≥3:1 para bordes de controles y texto ≥24px.

## 3. Tipografía

- **Space Grotesk** (variable 300–700), para títulos y texto.
- **Fira Code** (variable 300–700), para todo lo "técnico": labels, meta, chips, terminal, formulario, stats, títulos `->fn();`.
- Self-hosted en `/public/fonts`, solo el subset latin, con `preload`. No agregar Google Fonts ni otras familias.

| Clase / uso | Tamaño | Notas |
|---|---|---|
| `.display` (h1) | `clamp(2.25rem, 4.8vw, 3.75rem)` | `letter-spacing: -0.04em`, `line-height: 1.02` |
| Hero h1 | `clamp(2.125rem, 4vw, 3.25rem)` | junto a la foto |
| `.h2` | `clamp(1.75rem, 3vw, 2.5rem)` | CTA y títulos grandes de sección |
| `.h3` | `clamp(1.25rem, 1.8vw, 1.5rem)` | tarjetas |
| Nombre de proyecto (lista) | `clamp(1.125rem, 1.8vw, 1.5rem)` | `--text-soft` en reposo, `--text` en hover/abierto |
| `.fn` (`->nombre();`) | `clamp(1.125rem, 1.8vw, 1.375rem)` | mono 500, sin ligaduras |
| `.lede` | `clamp(1.0625rem, 1.4vw, 1.1875rem)` | `--text-soft`, máx. 60ch |
| Body | `1.0625rem` / 1.65 | |
| Labels mono | `0.75–0.875rem` | `--muted` |

- Los títulos son **chicos y precisos**, no gigantes. Si un título pide más de 3.75rem, está mal.
- `text-wrap: balance` en títulos y `pretty` en párrafos.
- Números de stats: `font-variant-numeric: tabular-nums`.

## 4. Espaciado, layout y forma

- Contenedor: `--container: 1180px` + `--gutter: clamp(20px, 4vw, 40px)`.
- Secciones: `.section` con `padding-block: clamp(64px, 9vw, 112px)`, separadas por un `border-top: 1px solid var(--line)`.
- Grids con `repeat(auto-fit|auto-fill, minmax(min(Npx, 100%), 1fr))` y `gap`; nunca columnas fijas que se rompan en mobile.
- Radios: tarjetas `--radius: 14px`; botones y chips `999px`; imágenes 12–20px; **la foto del hero es squircle 1:1** (`corner-shape: squircle` con fallback `border-radius: 30%`).
- **Superficies tipo consola (terminal y formulario): sin radios internos.** Foco, hover y selección son rectos.
- Breakpoints usados: `960px` (columnas → 1), `860px` (nav → menú móvil), `820px` (grids de CV y Sobre mí), `640px`, `480px`.
- `scrollbar-gutter: stable` en `html` para que el header no se corra entre páginas.

## 5. Componentes

### Títulos con forma de función
`<Fn name="qué_hago" />` produce `->qué_hago();`, con `->` en teal, `()` en naranja y `;` en muted. Es la firma del sitio desde la versión anterior: va en todos los encabezados de sección y como eyebrow de cada página.

### Botones
- `.btn` (outline) y `.btn-primary` (amarillo). `.btn-sm` para el header.
- **El hover es idéntico en todo el sitio** y se controla solo con variables (`--btn-bg`, `--btn-bd`, `--btn-shadow`). Ningún estilo local puede pisar color, fondo o borde de un `.btn` (usar `a:not(.btn)` en estilos de prosa).
- Primario en hover: `--yellow-hi`, elevación de 1px y halo suave. Al presionar, `scale(0.97)`.

### Flechas (consistencia)
- `↗` (`arrow-up-right`) **rota 45°** en hover/focus, en botones, links y tarjetas.
- `→` (`arrow-right`) se desplaza 3px. `download` baja 2px.
- Los íconos son SVG inline de [Lucide](https://lucide.dev/icons), copiados uno por uno a `components/Icon.astro` con su mismo nombre y la clase `i-<nombre>`. Trazo de 1,75. Sin emojis ni dependencias de íconos. Los logos de marcas y tecnologías salen de [Simple Icons](https://simpleicons.org), con relleno. Con `title`, el ícono se anuncia al lector de pantalla; sin `title`, es decorativo.

### Link con flecha (`.link-arrow`)
Texto con flecha y el mismo subrayado que `.link` (todos los links de texto, email incluido): línea fina en reposo que se llena de amarillo en hover. Usa `width: fit-content`: nunca se estira dentro de un flex o grid.

### Tarjetas (`.card`)
- Todas tienen tres efectos manejados por `scripts/ui.ts`:
  1. **Glow** interior muy sutil, que sigue al puntero.
  2. **Borde iluminado por proximidad**, en blanco tenue (sin color). Se enciende cuando el mouse se acerca a menos de 170px.
  3. **Perspectiva**: hasta 5° de inclinación y 4px de elevación. Las tarjetas grandes se inclinan menos (escala por tamaño). `data-tilt="off"` la desactiva.
- Solo con puntero fino (`hover: hover`). Sin perspectiva con reduced motion.

### Header y nav
- Sticky. Al hacer scroll gana fondo con blur y borde inferior.
- Nav desktop en una "pista" con borde. Ítem activo: **dot amarillo adelante + la pestaña se ensancha + pastilla `--surface-hi` sin borde**.
- La pastilla tiene `view-transition-name: nav-pill`: entre páginas viaja con resorte y se estira y aplasta en el trayecto. El texto del nav aparece de inmediato; la pastilla se mezcla con `lighten` para no taparlo.
- En mobile: botón de menú sin borde ni fondo (fondo solo en hover, y no en táctil), con `popover` nativo, a pantalla completa, con los links grandes numerados y entrada escalonada.

### Consolas
Terminal, formulario y filtro comparten `.win-frame`, `.win-bar`, `.win-title`, `.win-body` y `.win-cursor` (`global.css`) y `WinControls`: mismo marco, barra, tipografía, padding y cursor. Lo propio de cada una va en su componente.

En pantallas táctiles, al enfocar un campo del formulario, su pregunta sube hasta debajo del header para que el teclado no la tape.

### Terminal del hero (`components/Terminal.astro` + `scripts/terminal.ts`)
- Barra estilo Windows Terminal: pestañas (`ilan.ts`, `git log`, `claude`) con barra de progreso a la izquierda, botón de pausa (solo ícono) y controles de ventana a la derecha (`WinControls`, decorativos). Cuerpo de alto fijo (sin CLS). Sin los 3 dots de Mac.
- **Siempre `~/ilan`** como path.
- Las escenas se "tipean": los prompts aparecen de una y se tipea solo el comando; las salidas se imprimen línea a línea. Hace auto-scroll como una terminal real.
- Se pausa con el botón, fuera de pantalla o con la pestaña oculta. El hover no la pausa.
- Colores de token: keyword naranja, prop/función teal, string amarillo, número violeta, comentario muted en itálica, diff `-` con fondo naranja al 14% y `+` con fondo teal al 16%.
- Contenido real y verificable: la carrera en el `git log` sale del CV.

### Trabajos en la home
Texto, botón al portfolio y un solo proyecto destacado (`featured: true` en `src/data/projects.ts`).

### Stats del home (`components/Stats.astro`)
- **4 pantallas de 4 tarjetas** que rotan juntas: "mi trayectoria, en números", "mis números en el código", "datos que nadie pidió" (la pantalla con humor) y "este sitio, en números". Un valor puede ser texto fijo (`display: '∞'`), que no cuenta. Datos en `src/data/site.ts → statScreens`.
- Transición tipo tablero de aeropuerto: la cifra saliente gira hacia arriba y la nueva entra desde abajo, en cascada de 80ms por tarjeta. Los números cuentan hacia arriba.
- **Los dots van arriba a la derecha** (en mobile, en su propia fila bajo el título), en un lugar fijo. Son a la vez navegación y timer: el activo se estira y se llena con el tiempo restante.
- Sin botón de pausa: pausan el hover, el foco de teclado y salir de pantalla. En táctil, elegir un dot deja de rotar hasta salir de pantalla.
- Cifras estimadas: `approx: true` y prefijo `~` o sufijo `+`. Nunca inventar precisión.

### Tarjeta de proyecto (`components/ProjectCard.astro`)
- Captura 16:10 en reposo: desaturada y oscurecida.
- En hover: color completo, zoom 1.07 y aparece una pastilla amarilla "visitar ↗".
- Debajo: meta mono (fecha y "para EpicDevs" en teal), nombre, descripción y chips.

### Índice del portfolio (`views/Portfolio.astro`)
- **Filtro en una ventana de consola** (`~/ilan/trabajos`), con opciones rectas y sin bordes. Las filas se animan con FLIP, sin View Transition, para no congelar el nav: `$ ls trabajos --type=<tipo>`. Al tocar un filtro, primero se tipea el argumento y después se reordenan las filas con una View Transition local (`html.vt-local`, que no anima el resto de la página). Muestra el conteo y el rango de años.
- **Filas**: año · proyecto · stack · toggle `+`. Sin numeración. En hover, el fondo barre de izquierda a derecha **sin radio**, el nombre se desplaza 10px y el año se pone amarillo.
- **Vista previa flotante** (solo con mouse): ventana con captura y caption `año · nombre`. Sigue al cursor con inercia, rota según la velocidad, la imagen entra desde arriba o abajo según la dirección y hace un zoom lento.
- Las filas son `<details name="trabajos">` (acordeón exclusivo) con apertura animada (`::details-content`).

### Toggle `+` / `−`
Círculo de 32px con borde `--line-strong`. Abierto: fondo amarillo, rota 180° y la cruz pasa a `−`. Se usa en el portfolio y en "Antes de 2015" del CV. No usar `→` para expandir.

### Formulario de contacto: consola CLI
- Estética **casi monocromo**: sin cajas, sin botones de color, sin radios.
- El cuerpo corre `$ ./contacto.sh`.
- Las preguntas usan `?` en teal; la respuesta va después de `›`, que se pone amarillo con foco (ese es el indicador de foco).
- Las respondidas quedan como `✓ pregunta · respuesta` y se pueden editar con un click.
- La barra de arriba muestra la ruta (`~/ilan/contacto`) y los controles de ventana. Los pasos (`nombre › email › tema › mensaje`) van en una barra de estado abajo y aparecen a medida que se llega a cada uno: nunca hay pasos sin visitar a la vista. Se pueden clickear, igual que las líneas del log; para avanzar se valida lo que hay en el medio. ✓ hecho, número en amarillo el actual.
- La pregunta actual se resalta de borde a borde, con fondo `--surface` y filete amarillo.
- El tema se elige con ↑↓ (radios nativos) y Enter; con mouse, el click avanza.
- El mensaje se envía con **Enter** y Shift+Enter agrega línea. El botón es texto plano: `[ enviar ↵ ]`.
- Los errores van en naranja con `✗`. La salida del envío se imprime como log con colores tipo ANSI (`→` violeta, `POST` teal, respuestas en amarillo, estado invertido `200 OK` o `ERROR`) y cierra con una nota con filete. Si el envío falla, el mensaje ofrece el email como alternativa.
- Debajo de la pregunta actual va una línea en muted: "tus datos solo se usan para responderte · privacidad". Desaparece al enviar.
- Sin JS es un formulario normal con todos los campos.

### Email
Display grande con `cursor: copy`. El click copia y muestra una pastilla "copiado" que desaparece sola. **No hay botón "copiar"**: la interacción no se explica. El email **nunca está en texto plano en el HTML**: se guarda ofuscado (`data-mail`) y se arma con JS al cargar.

### Fotos de Instagram (`components/InstagramGrid.astro`)
En "Fuera del código" de `/sobre-mi`: 6 fotos 1:1, en 3 columnas (2 en mobile), desaturadas en reposo y a color con zoom en hover y foco, igual que `ProjectCard`. Debajo, hasta 2 hashtags en mono. Sin carrusel ni JS. Sin fotos, el bloque no se muestra.

### Página legal (`/privacidad`)
Una columna de lectura, máximo 760px, con los mismos tokens. Sin humor ni animaciones. Enlazada desde el footer y el formulario.

### CV para ATS (`components/CvAts.astro`)
Con la identidad del sitio (banda navy, Space Grotesk y Fira Code, línea de tiempo), pero sobre papel blanco y con las reglas de un ATS: una columna, sin tablas ni imágenes, y el color y las formas solo en CSS, sin texto generado.
- Fuentes estáticas de `public/fonts/cv/`: con las variables, Chromium embebe Type 3.
- Sin `position` ni `transform` en bloques con texto: Chromium los escribe al final del PDF y se rompe el orden de lectura.
- No se enlaza desde el sitio: `/curriculum` baja el PDF, sin botón de imprimir.

### Imágenes OG (`scripts/build/og-images.mjs`)
Mismo estilo que `public/og.png`, la imagen de la home: logo, `->función();`, título y subtítulo en amarillo. Una por página, generadas desde `src/data/pages.ts`.

### Chips
Solo para etiquetas de proyectos. El stack de `/curriculum` no usa pastillas, porque parecían links o filtros: arriba, una grilla de íconos de Simple Icons, en un solo color y con `<title>`, y un tooltip con hover, foco o toque que se cierra con Escape; abajo, la lista de texto por categoría, con todo el stack. El PDF usa solo texto.

Mono 0.8125rem, borde `--line-hi` y radio 999px. En el CV entran escalonados.

## 6. Movimiento

| Token | Valor |
|---|---|
| `--ease-out` | `cubic-bezier(0.22, 1, 0.36, 1)`, el default de todo |
| `--ease-spring` | `cubic-bezier(0.34, 1.56, 0.64, 1)`, para toggles, dots y micro-rebotes |
| Resorte del nav | `linear(…)` con overshoot, 0.7s |

- **Revelado**: `[data-reveal]` hace opacity 0→1 y `translate` 14px→0 en 0.7s. Dentro de `[data-reveal-group]`, escalonado cada 70ms. Usa la propiedad `translate`, **no `transform`**, para no pisar la perspectiva de las tarjetas.
- **Transiciones entre páginas**: cross-document View Transitions, sin JS. El header queda fijo, el contenido (`main`, nombre `page`) sale hacia arriba con un poco de blur y entra desde abajo; la pastilla del nav viaja.
- Duraciones: micro 0.2–0.35s; entradas 0.5–0.7s; nada supera 1.1s, salvo los loops de ambiente.
- **Contenido que rota solo** (terminal, stats): siempre con una forma de pausar (WCAG 2.2.2) y pausa fuera de pantalla. Terminal: botón. Stats: hover, foco de teclado y, en táctil, elegir un dot.
- `prefers-reduced-motion: reduce`: sin perspectiva, sin VT, sin tipeo (escena estática), stats con crossfade, duraciones a 0.01ms.
- Librería: **Motion mini** (`motion/mini`, sobre WAAPI). Lo demás es CSS y APIs nativas (IntersectionObserver, View Transitions, popover, `<details>`). No sumar GSAP, Three.js, Lottie ni similares sin una razón que valga su peso.

## 7. Imágenes

- WebP, en tamaños fijos generados al subirlas: retrato `ilan-sq-240/480` (1:1, para el hero), `ilan-480/800` (4:5, para Sobre mí), capturas de proyectos 960×600 en `public/img/projects/<slug>.webp`.
- Siempre con `width`/`height`, `loading="lazy"` fuera del primer viewport y `alt` descriptivo ("Captura de X", "Retrato de…").
- Las capturas de proyectos van desaturadas en reposo y a color en hover. Las fotos personales llevan apenas menos saturación.
- No usar fotos de terceros ni de figuras públicas.

## 8. Voz, copy y humor

**Personal y profesional, con humor.** El sitio tiene que sonar a Ilán: un CTO que sabe lo que hace y no se toma demasiado en serio.

- Español rioplatense con **voseo** ("contame", "escribime", "podés"), en primera persona y con verbos concretos. Sin superlativos vacíos ni "soluciones integrales".
- Labels técnicos en minúscula y mono (`// en números`, `para EpicDevs`, `visita@ilan: ~/ilan`).
- El posicionamiento es **CTO / Director of Engineering**: arquitectura, equipos remotos, WordPress como núcleo, JS moderno, IA en el flujo de ingeniería. No "diseñador".

### Reglas del humor
1. **Los datos son en serio; el humor está en cómo se cuentan.** Toda cifra o anécdota es real. Si es aproximada, se marca (`~`, `+`, `approx`). Nunca inventar datos personales para hacer un chiste.
2. **Un guiño por sección, como máximo.** El humor condimenta: si cada línea es un chiste, deja de funcionar y resta seriedad.
3. **Técnico y autocrítico**: de uno mismo, del oficio y de la historia de la web (tablas, Flash, deploys los viernes). **Nunca** a costa de clientes, colegas, otras tecnologías de forma despectiva ni de quien visita el sitio.
4. **Va en el microcopy**: estados (404, éxito, error), labels, la terminal, los stats, el footer, los remates de párrafo. Los títulos y la información clave quedan claros.
5. **Sin humor en**: el CV para ATS, `/privacidad` y lo legal, los mensajes de error que bloquean una tarea (primero la solución, después el guiño), los `alt` y los textos para lectores de pantalla.
6. **El chiste no reemplaza la información**: "✗ Algo falló. No fue tu culpa (probablemente). Probá de nuevo o escribime por email." Dice qué pasó y qué hacer.
7. Nada de emojis para hacer gracia: el humor está en las palabras.

### Datos reales disponibles para guiños
- Editores probados (12+): Dreamweaver, Notepad, Notepad++, Vim/NeoVim, Nano, Sublime Text, PhpStorm, Atom, VS Code, Cursor, Windsurf, Antigravity.
- Combustible: mate y café. Los dos juntos, solo en el stat de la home; en el resto, uno u otro.
- Más de 5 teclados y un número parecido de mouses. Sigue usando un **MX3 estéticamente destruido que anda perfecto** y se niega a jubilarlo.
- Empezó con Flash, ActionScript, HTML con tablas. **Su primer panel de acceso validaba usuarios contra un .txt**, porque todavía no sabía que existía MySQL.
- 16 años con WordPress (desde 2010). Tema propio de VS Code: Monokai Cotalpa.

### Ejemplos en uso
| Lugar | Texto |
|---|---|
| Hero | "Construyendo para la web desde 2005, cuando todavía se maquetaba con tablas." |
| Stats | Pantalla `// datos que nadie pidió`; "7,5 KB de JavaScript propio en la home (sí, los conté)" |
| Terminal | `combustible: 'mate'`; commits `login: de un .txt a MySQL`, `init: diseño, fotos y <table>` |
| 404 | "Esta página llegó a producción sin tests." / "O el link es viejo, o alguien hizo deploy un viernes." |
| Formulario | "te respondo apenas pueda, mate mediante"; éxito: "Ahora la pelota está de mi lado" |
| Footer | "hecho en Santander con Astro y café" |

## 9. Accesibilidad (checklist por cambio)

- [ ] Elementos reales: `<a href>`, `<button>`, `<label>`+`<input>`, `<details>`. Nunca `div` clickeable.
- [ ] Foco visible: outline amarillo global; en superficies de consola, outline recto o el indicador `›`.
- [ ] Contraste medido (sección 2).
- [ ] Targets ≥ 44px (dots y toggles chicos ≥ 28px, con espacio).
- [ ] `aria-pressed` en toggles, `aria-current` en nav y pasos, `aria-live` para estados que cambian.
- [ ] Contenido animado decorativo con `aria-hidden` + equivalente `sr-only`.
- [ ] `npm run qa` en verde (axe WCAG 2.2 AA, sin scroll horizontal, consola limpia, desktop y mobile).

## 10. No hacer

- Degradados como fondo de sección, glassmorphism por todos lados, emojis como íconos.
- Bordes de color en tarjetas, borde izquierdo de acento.
- Títulos gigantes, más de 2 familias tipográficas.
- Botones "explicativos" para interacciones obvias.
- Pisar estilos de `.btn` desde un contexto local.
- `transform` en animaciones de entrada sobre `.card`.
- Dependencias de UI pesadas o frameworks en el cliente.
