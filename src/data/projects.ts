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
