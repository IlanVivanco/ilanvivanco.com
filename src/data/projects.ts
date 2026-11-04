// Portfolio. Los case studies (`study`) tienen página propia en /portfolio/<slug>; el resto es una fila del índice.
// Imágenes: portada en public/img/projects/<slug>.webp y el resto en public/img/projects/<slug>/<archivo>.webp.

export type StudyStep = {
	title: string
	text: string
	shot?: string // archivo, sin extensión
}
export type Study = {
	tagline: string
	stack: string[]
	lead: string
	start: string
	steps: StudyStep[]
	figures: string[]
	hero: string
}
export type Project = {
	slug: string
	name: string
	url?: string
	urlLabel?: string
	date: string // YYYY-MM: orden y rango del índice
	period: string // lo que se muestra
	role: string
	description: string
	tags: string[]
	featured?: boolean // el que se destaca en la home
	image?: string // por defecto /img/projects/<slug>.webp
	gallery?: string[] // filas: capturas extra
	galleryNote?: string
	study?: Study
}

export const projects: Project[] = [
	{
		slug: 'skillsoft',
		name: 'Skillsoft',
		date: '2017-11',
		period: '2017 a 2020',
		role: 'Team lead y dev principal. Arquitecto del importador.',
		description:
			'Miles de cursos repartidos en XML de distintos equipos, convertidos en un catálogo en WordPress que recibía datos nuevos cada mes sin duplicar inventario.',
		tags: ['WordPress', 'Migración', 'Integración', 'WP Plugin'],
	},
	{
		slug: 'camunda',
		name: 'Camunda',
		date: '2019-11',
		period: '2019 a 2026',
		role: 'Team lead, arquitecto y contacto técnico',
		description:
			'Migración del sitio de Hugo a WordPress, con importador propio desde Markdown y las URLs del blog conservadas, para que marketing pudiera editar sin depender de desarrollo. Después, varios años ampliando su ecosistema de sitios. En 2026, Camunda pasó a otra plataforma.',
		featured: true,
		tags: ['WordPress', 'Migración', 'WP Plugin'],
	},
	{
		slug: 'como-trabajamos',
		name: 'Cómo trabajamos',
		url: 'https://github.com/IlanVivanco/wp-deployment-action',
		urlLabel: 'Ver la GitHub Action',
		date: '2017-01',
		period: '2017 a hoy',
		role: 'Definí los procesos y guié al equipo',
		description:
			'Lo que hay debajo de todos los proyectos: Git y flujos por entorno, una GitHub Action pública para los deploys, themes y plugins base en cada etapa, conocimiento en Notion y un protocolo de incidentes.',
		tags: ['Procesos', 'Equipo', 'CI/CD'],
		gallery: ['versionado'],
	},
	{
		slug: 'lakefs-dvc',
		name: 'lakeFS y DVC',
		url: 'https://lakefs.io/',
		date: '2025-10',
		period: '2025 a hoy',
		role: 'Arquitectura y estimación en DVC; cuenta y dirección en lakeFS',
		description:
			'Migramos dvc.org de Gatsby a WordPress, con un importador de contenido propio y templates para cada tipo de página. Del mismo cliente heredamos el sitio de lakeFS y lo pusimos a punto: redirecciones, sitemaps, datos estructurados y templates modulares.',
		tags: ['WordPress', 'Migración'],
		gallery: ['lakefs-duo', 'dvc-desk', 'mobile'],
	},
	{
		slug: 'bcbs',
		name: 'Barre Center for Buddhist Studies',
		url: 'https://www.buddhistinquiry.org',
		date: '2024-02',
		period: '2024 a hoy',
		role: 'Tech lead y PM del lado web',
		description:
			'Implementamos el sitio nuevo, con cursos, docentes y programas sincronizados desde Salesforce hacia WordPress. Planificamos la migración del sitio anterior y sumamos calendario con filtros y buscadores.',
		tags: ['WordPress', 'Salesforce', 'Migración', 'Integración'],
		gallery: ['home-duo', 'home-scroll', 'mobile'],
	},
	{
		slug: 'storyblocks',
		name: 'Storyblocks',
		url: 'https://www.storyblocks.com/resources',
		date: '2023-12',
		period: '2023 a 2026',
		role: 'Lead técnico y desarrollo',
		description:
			'Construimos el Resource Center en WordPress, servido bajo /resources del dominio principal mediante un proxy reverso. Planificamos la migración del blog y los casos de estudio, con redirecciones para mantener las URLs.',
		tags: ['WordPress', 'Migración'],
		gallery: ['resources-scroll'],
	},
	{
		slug: 'syndigo',
		name: 'Syndigo',
		url: 'https://syndigo.com/',
		date: '2025-02',
		period: '2025 a hoy',
		role: 'PM y lead, con desarrollo en entregas puntuales',
		description:
			'Coordinamos e implementamos el rediseño sobre un theme propio. Planificamos el nuevo sitemap, sumamos Careers y eventos, y adaptamos el sitio a la localización en varios idiomas.',
		tags: ['WordPress', 'Rediseño', 'Localización'],
		gallery: ['home-duo'],
	},
	{
		slug: 'womens-power-gap',
		name: "Women's Power Gap",
		url: 'https://www.womenspowergap.org/',
		date: '2021-02',
		period: '2021 a 2023',
		role: 'Líder técnico y autor de la tabla dinámica',
		description:
			'Integré una API de datos de terceros con WordPress mediante un plugin propio, con una capa de caché. Armé en Vue un visualizador de tablas dinámico, con búsqueda, que acompañó nuevos reportes a medida que se publicaban.',
		tags: ['WordPress', 'Vue', 'Integración', 'WP Plugin'],
		gallery: ['vue-demo-duo', 'home-desk', 'rankings-desk'],
		galleryNote: 'La tabla se muestra con el plugin real y datos de ejemplo.',
	},
	{
		slug: 'afc-urgent-care',
		name: 'AFC Urgent Care',
		date: '2020-05',
		period: '2020',
		role: 'Developer principal del plugin',
		description:
			'Mi primer proyecto con Vue, en plena pandemia: en dos semanas desarrollé un sistema de turnos integrado por API, para que los pacientes eligieran sede, motivo y horario sin salir del sitio.',
		tags: ['WordPress', 'Vue', 'Integración', 'WP Plugin'],
		gallery: ['wayback-2020-duo', 'wayback-2020-scroll'],
	},
	{
		slug: 'construye-mundo',
		name: 'Construye Mundo',
		url: 'https://construyemundo.org/',
		date: '2021-04',
		period: '2021 a hoy',
		role: 'Autor único, como voluntariado',
		description:
			'Migré el sitio de la ONGD desde Drupal a WordPress, con rediseño completo y una estructura de contenidos nueva. Lo mantengo desde el lanzamiento y sigo en el equipo como voluntario.',
		tags: ['WordPress', 'Migración', 'Rediseño'],
		gallery: ['home-duo', 'home-scroll'],
	},
	{
		slug: 'play2fund',
		name: 'Play2Fund',
		date: '2020-03',
		period: '2020 a 2021, con mantenimiento posterior',
		role: 'Team lead',
		description:
			'Lideré el equipo técnico de una plataforma para financiar conciertos virtuales, planificada y lanzada a contrarreloj durante la pandemia. Sumamos pagos divididos con PayPal, chat en eventos e integraciones de video.',
		tags: ['WordPress', 'WP Plugin', 'Integración'],
		gallery: ['home-duo', 'home-scroll'],
	},
	{
		slug: 'mit-sea-grant',
		name: 'MIT Sea Grant',
		url: 'https://seagrant.mit.edu/',
		date: '2018-03',
		period: '2018 a 2023',
		role: 'Developer principal',
		description:
			'Implementé un sitio institucional a partir de un diseño de terceros, sobre la infraestructura del MIT. Armé el theme y los campos personalizados, planifiqué la importación masiva de noticias y proyectos, y después me ocupé del mantenimiento.',
		tags: ['WordPress', 'Migración'],
		gallery: ['home-duo'],
	},
	{
		slug: 'mobius',
		name: 'Mobius',
		url: 'https://mobiusm.com/',
		date: '2024-12',
		period: '2024 a 2025',
		role: 'Líder técnico y PM',
		description:
			'El sitio de Mobius, que brinda atención médica personalizada y gestión de riesgos médicos a family offices, empresas y programas marítimos. Una estructura simple y clara para un público de alto perfil, sobre un theme propio.',
		tags: ['WordPress', 'Institucional'],
		gallery: ['home-duo'],
	},
	{
		slug: 'monokai-cotalpa',
		name: 'Monokai Cotalpa',
		url: 'https://marketplace.visualstudio.com/items?itemName=ilanvivanco.cotalpa',
		urlLabel: 'Ver en el Marketplace',
		date: '2019-09',
		period: '2019 a hoy',
		role: 'Autor y maintainer',
		description:
			'Mi propia variante de Monokai para VS Code, que mantengo desde 2019. Hace poco la revisé a fondo para corregir errores y cubrir los colores nuevos del editor.',
		tags: ['VS Code', 'Open source', 'Producto propio'],
		gallery: ['sintaxis-php', 'sintaxis-tsx', 'diff', 'source-control', 'paleta-comandos', 'variantes'],
	},
	{
		slug: 'wp-deployment-action',
		name: 'WordPress Deployment Action',
		url: 'https://github.com/marketplace/actions/wordpress-deployment-action',
		urlLabel: 'Ver en el Marketplace',
		date: '2024-10',
		period: '2024 a hoy',
		role: 'Autor y maintainer',
		description:
			'Una GitHub Action pública para desplegar themes y plugins a WordPress por SSH y rsync. Está simplificada para Pressable y WP Engine, pero sirve en cualquier servidor con acceso SSH. La usamos en los proyectos de EpicDevs para que cada merge llegue a producción sin pasos manuales. La sigo manteniendo, aunque casi no necesitó cambios, y eso todavía me sorprende.',
		tags: ['GitHub Actions', 'Open source', 'Producto propio', 'CI/CD'],
	},
	{
		slug: 'forant',
		name: 'Forant',
		url: 'https://forant.io/',
		date: '2026-03',
		period: '2026',
		role: 'Founder y único desarrollador',
		description:
			'Un directorio y comunidad para profesionales internacionales que trabajan en remoto desde Cantabria. Lo planifiqué como producto propio, de la idea a la puesta en línea. Hoy sigue andando, sin desarrollo activo.',
		tags: ['Producto propio', 'TypeScript'],
		gallery: ['home-duo'],
	},
]

export const imageFor = (p: Project) => p.image ?? `/img/projects/${p.slug}.webp`
// Las variantes las genera scripts/build/project-images.mjs. La original mide 960 px.
export const imageVariant = (p: Project, width: 480 | 720) => imageFor(p).replace(/\.webp$/, `-${width}.webp`)
export const imageSrcset = (p: Project) =>
	`${imageVariant(p, 480)} 480w, ${imageVariant(p, 720)} 720w, ${imageFor(p)} 960w`

// Capturas de cada proyecto: 1440 × 900, con las mismas variantes.
export const shotPath = (p: Project, file: string) => `/img/projects/${p.slug}/${file}.webp`
export const shotSrcset = (p: Project, file: string) => {
	const path = shotPath(p, file)
	return `${path.replace(/\.webp$/, '-480.webp')} 480w, ${path.replace(/\.webp$/, '-720.webp')} 720w, ${path} 1440w`
}
const shotKinds: [RegExp, string][] = [
	[/contexto/, 'en una pantalla, sobre un escritorio'],
	[/duo/, 'en desktop y mobile'],
	[/scroll/, 'más abajo en la página'],
	[/mobile/, 'en mobile'],
]
export const shotAlt = (p: Project, file: string) => {
	const kind = shotKinds.find(([re]) => re.test(file))?.[1]
	const page = file.replace(/-(contexto|duo|scroll|desk)$/, '').replace(/-/g, ' ')
	return `Captura de ${p.name}: ${kind ?? page}`
}

export const studies = projects.filter((p) => p.study)
export const allTags = [...new Set(projects.flatMap((p) => p.tags))]
