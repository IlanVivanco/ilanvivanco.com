// Portfolio. `image` es opcional: poné la captura en /public/projects/ y su ruta acá.

export type Project = {
	slug: string
	name: string
	url?: string
	date: string // YYYY-MM
	client?: string // para quién se hizo
	description: string
	tags: string[]
	featured?: boolean // el que se destaca en la home
	image?: string // por defecto /img/projects/<slug>.webp
}

export const projects: Project[] = [
	{
		slug: 'construye-mundo',
		name: 'Construye Mundo',
		url: 'https://construyemundo.org/',
		date: '2021-04',
		description:
			'Migración del sitio de la ONGD de Drupal a WordPress para simplificar la gestión y mejorar la accesibilidad. Desarrollo y mantenimiento continuo.',
		tags: ['WordPress', 'Migración', 'Drupal'],
	},
	{
		slug: 'explo',
		name: 'Explo.org',
		url: 'https://www.explo.org/',
		date: '2020-10',
		client: 'EpicDevs',
		description:
			'Renovación del theme existente con nuevas funcionalidades, optimización general de rendimiento y plugin de sincronización de datos con una API externa.',
		tags: ['WordPress', 'WP Plugin', 'API', 'Rendimiento'],
	},
	{
		slug: 'camunda',
		name: 'Camunda',
		url: 'https://camunda.com/',
		date: '2020-08',
		client: 'EpicDevs',
		description:
			'Sitio corporativo en WordPress y plugin para importar páginas y posts desde Markdown del sitio anterior, hecho en Hugo.',
		tags: ['WordPress', 'WP Plugin', 'Gutenberg', 'Migración', 'Team lead'],
		featured: true,
	},
	{
		slug: 'sumtotal',
		name: 'SumTotal',
		url: 'https://www.sumtotal.com/',
		date: '2019-02',
		client: 'EpicDevs',
		description:
			'Sitio corporativo en WordPress con importación y adaptación de la base de datos existente. Manejo del equipo.',
		tags: ['WordPress', 'Migración', 'Team lead'],
	},
	{
		slug: 'skillsoft',
		name: 'Skillsoft',
		url: 'https://www.skillsoft.com/',
		date: '2018-10',
		client: 'EpicDevs',
		description:
			'Desarrollo integral en WordPress, migración de la base de datos anterior y plugin para importar catálogos externos en XML.',
		tags: ['WordPress', 'WP Plugin', 'Migración', 'Team lead'],
	},
	{
		slug: 'play2fund',
		name: 'Play2Fund',
		url: 'https://www.play2fund.com/',
		date: '2018-10',
		client: 'EpicDevs',
		description:
			'Plataforma en WordPress desde cero con plugins para pagos divididos en PayPal, chat en eventos y streaming.',
		tags: ['WordPress', 'WP Plugin', 'WooCommerce', 'Team lead'],
	},
	{
		slug: 'explore-share',
		name: 'Explore & Share',
		url: 'https://www.explore-share.com/',
		date: '2018-06',
		description:
			'Migración a WordPress desde una plataforma a medida, theme propio y plugins para manejar y sincronizar datos.',
		tags: ['WordPress', 'WP Plugin', 'Migración'],
	},
	{
		slug: 'brennan',
		name: 'Brennan Consulting',
		url: 'https://www.brennanconsults.com/',
		date: '2017-02',
		client: 'EpicDevs',
		description: 'Implementación de un diseño de terceros en un theme de WordPress a medida.',
		tags: ['WordPress', 'WP Theme'],
	},
	{
		slug: 'ewb',
		name: 'Engineers Without Borders',
		url: 'https://www.ewb-usa.org/',
		date: '2016-10',
		client: 'EpicDevs',
		description:
			'Ampliación del theme existente, nuevas secciones y optimización de tiempos de carga. Mantenimiento.',
		tags: ['WordPress', 'Rendimiento'],
	},
	{
		slug: 'evergage',
		name: 'Evergage',
		url: 'https://www.evergage.com/',
		date: '2016-04',
		client: 'EpicDevs',
		description: 'Desarrollo integral en WordPress con un theme a medida creado desde cero.',
		tags: ['WordPress', 'WP Theme'],
	},
	{
		slug: 'boston-standard',
		name: 'Boston Standard Company',
		url: 'https://www.bostonstandardplumbing.com/',
		date: '2016-02',
		client: 'EpicDevs',
		description: 'Sitio corporativo en WordPress y mantenimiento.',
		tags: ['WordPress', 'WP Theme'],
	},
	{
		slug: 'altura',
		name: 'Altura Periodontics',
		url: 'https://www.yourdentalimplants.com/',
		date: '2015-11',
		client: 'EpicDevs',
		description: 'Diseño y programación de un theme de WordPress a medida.',
		tags: ['WordPress', 'WP Theme'],
	},
]

const months = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic']
export const formatDate = (ym: string) => {
	const [y, m] = ym.split('-').map(Number)
	return `${months[m - 1]} ${y}`
}

export const imageFor = (p: Project) => p.image ?? `/img/projects/${p.slug}.webp`
// Las variantes las genera scripts/build/project-images.mjs. La original mide 960 px.
export const imageVariant = (p: Project, width: 480 | 720) => imageFor(p).replace(/\.webp$/, `-${width}.webp`)
export const imageSrcset = (p: Project) =>
	`${imageVariant(p, 480)} 480w, ${imageVariant(p, 720)} 720w, ${imageFor(p)} 960w`

export const allTags = [...new Set(projects.flatMap((p) => p.tags))]
