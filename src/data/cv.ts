// Currículum. Fuente: LinkedIn (2026) + CV del sitio anterior.
// Una sola fuente para /curriculum y para el CV apto para ATS (/cv/<idioma> → PDF).

export type Role = {
	title: string
	start: string // YYYY-MM
	end?: string // YYYY-MM; sin `end`, sigue vigente
	place?: string // se muestra en /curriculum junto al período
	highlights: string[] // en /curriculum, un párrafo; en el PDF, una lista
}
export type Job = {
	org: string
	formerly?: string
	meta?: string
	url?: string
	location?: string // solo para el PDF, si el rol no tiene `place`
	roles: Role[]
}
export type EarlierJob = { org: string; title: string; start: string; end: string; location: string; text: string }
export type Education = { org: string; title: string; period: string }
export type Cv = {
	summary: string
	experience: Job[]
	earlier: EarlierJob[]
	stack: { group: string; items: string[] }[]
	education: Education[]
	languages: { name: string; level: string }[]
}

// Textos del CV para ATS, por idioma. Encabezados estándar: un ATS los reconoce por el nombre.
export type CvLabels = {
	htmlLang: string
	title: string
	location: string
	present: string
	headings: {
		summary: string
		experience: string
		skills: string
		education: string
		languages: string
	}
}

const es: Cv = {
	summary:
		'Dirijo la ingeniería de EpicDevs, donde construimos y operamos plataformas web para empresas de tecnología, universidades y ONG. Defino la arquitectura, los procesos y los estándares técnicos, y coordino a un equipo remoto en varios países.',

	experience: [
		{
			org: 'EpicDevs',
			formerly: 'Networks That Matter',
			meta: 'Antes Networks That Matter · Remoto',
			url: 'https://epicdevs.com',
			roles: [
				{
					title: 'CTO / Director of Engineering · Socio',
					start: '2020-09',
					place: 'Santander, España',
					highlights: [
						'Arquitectura técnica, procesos de ingeniería y estrategia tecnológica de las plataformas de los clientes, y liderazgo de un equipo remoto distribuido.',
						'Foco en WordPress como núcleo, JavaScript moderno, IA en el flujo de trabajo (agentes de código, MCP, QA asistido), integraciones, migraciones y rendimiento.',
					],
				},
				{
					title: 'Lead Full-stack WordPress Developer · Project Manager',
					start: '2018-03',
					end: '2020-09',
					place: 'Puerto Madryn, Argentina',
					highlights: [
						'Lideré un equipo de 15 personas construyendo plataformas, themes y plugins de WordPress para clientes de EE. UU.',
						'Combiné desarrollo con planificación técnica: arquitectura, integraciones, alcance, tiempos y coordinación entre diseño, ingeniería y stakeholders.',
					],
				},
				{
					title: 'Full-stack WordPress Developer',
					start: '2015-06',
					end: '2018-03',
					place: 'Puerto Madryn, Argentina',
					highlights: [
						'Plataformas, themes y plugins a medida para clientes internacionales, de frontend a backend: migraciones y arquitecturas CMS escalables.',
					],
				},
			],
		},
		{
			org: 'Construye Mundo ONGD',
			meta: 'Voluntariado · Remoto',
			location: 'Voluntariado · Remoto',
			roles: [
				{
					title: 'WordPress Developer',
					start: '2021-04',
					highlights: [
						'Migración del sitio de Drupal a WordPress para mejorar la gestión y la accesibilidad.',
						'Desarrollo, actualizaciones y administración del contenido.',
					],
				},
			],
		},
		{
			org: 'Delicious Brains',
			location: 'Remoto',
			roles: [
				{
					title: 'Software Developer',
					start: '2020-04',
					end: '2020-08',
					highlights: [
						'Trabajo sobre WP Offload Media (Pro y Lite), el plugin que lleva los medios de WordPress a almacenamiento en la nube, con foco en la experiencia de usuario.',
						'Soporte técnico y contenido del blog del producto.',
					],
				},
			],
		},
		{
			org: 'Explore & Share',
			meta: 'Part-time',
			location: 'Remoto',
			roles: [
				{
					title: 'Senior Web Developer y Team Leader',
					start: '2016-12',
					end: '2018-08',
					highlights: [
						'Desarrollo y mantenimiento de explore-share.com.',
						'Migración a WordPress desde la plataforma anterior, theme y plugins a medida.',
					],
				},
			],
		},
		{
			org: 'Freelance',
			meta: 'Remoto',
			location: 'Remoto',
			roles: [
				{
					title: 'Full-stack Developer independiente',
					start: '2006-10',
					highlights: [
						'Sitios a medida, plataformas CMS y soluciones digitales para agencias y clientes directos.',
						'Desarrollo en PHP, CMS a medida y los primeros proyectos en WordPress que después crecieron a plataformas grandes.',
					],
				},
			],
		},
	],

	// Antes de 2015 (del CV anterior). En /curriculum se muestra plegado y solo con años.
	earlier: [
		{
			org: 'Magissim',
			title: 'Senior Web Developer y diseñador gráfico',
			start: '2014-08',
			end: '2018-04',
			location: 'Remoto',
			text: 'Sitios para el mercado europeo con WordPress, PrestaShop y Laravel.',
		},
		{
			org: 'Activar Comunicación',
			title: 'Web developer y diseñador',
			start: '2013-04',
			end: '2014-06',
			location: 'Buenos Aires, Argentina',
			text: 'Backends a medida en PHP y MySQL; sitios en WordPress.',
		},
		{
			org: 'Mendióroz Design',
			title: 'Diseñador gráfico',
			start: '2011-05',
			end: '2013-04',
			location: 'Buenos Aires, Argentina',
			text: 'Señalética, documentación técnica, ilustración 3D y proyectos web.',
		},
		{
			org: 'Exastudio',
			title: 'Junior Web Developer',
			start: '2008-09',
			end: '2010-05',
			location: 'Buenos Aires, Argentina',
			text: 'Primeros sitios complejos, piezas publicitarias e identidades corporativas.',
		},
		{
			org: 'NewPrint',
			title: 'Diseñador gráfico',
			start: '2007-05',
			end: '2008-07',
			location: 'Buenos Aires, Argentina',
			text: 'Preimpresión y atención a clientes.',
		},
		{
			org: 'Gilardoni & Asoc.',
			title: 'Diseñador gráfico y web, ayudante de fotografía',
			start: '2005-06',
			end: '2007-05',
			location: 'Buenos Aires, Argentina',
			text: 'Retoque de imagen y los primeros sitios en HTML y CSS.',
		},
	],

	stack: [
		{
			group: 'Plataforma',
			items: [
				'WordPress',
				'Multisite',
				'WooCommerce',
				'Gutenberg',
				'Elementor',
				'ACF',
				'JetEngine',
				'Gravity Forms',
				'Yoast',
				'Beaver Builder',
				'Divi',
				'PHP',
				'MySQL',
				'Laravel',
				'Composer',
			],
		},
		{
			group: 'Otros CMS',
			items: ['Craft CMS', 'Drupal', 'Hugo', 'PrestaShop'],
		},
		{
			group: 'Frontend',
			items: [
				'JavaScript / TypeScript',
				'HTML5',
				'CSS3',
				'Vue',
				'Nuxt',
				'React',
				'Astro',
				'jQuery',
				'Tailwind CSS',
				'Sass',
			],
		},
		{
			group: 'Backend e integraciones',
			items: ['Node.js', 'REST APIs', 'n8n', 'Salesforce', 'Shopify', 'Stripe', 'PayPal', 'HubSpot', 'Supabase'],
		},
		{
			group: 'IA',
			items: [
				'IA generativa',
				'Agentes de código',
				'Claude',
				'Codex',
				'MCP',
				'QA asistido por IA',
				'Automatizaciones',
			],
		},
		{
			group: 'Infra y flujo',
			items: [
				'Git',
				'GitHub Actions',
				'CI/CD',
				'Docker',
				'Bash',
				'Cloudflare',
				'AWS',
				'WP Engine',
				'Pressable',
				'Kinsta',
				'Pantheon',
				'Netlify',
				'Vercel',
				'Railway',
			],
		},
		{
			group: 'Equipo',
			items: ['Liderazgo de ingeniería', 'Equipos remotos', 'Planificación técnica', 'Notion', 'Slack'],
		},
		{ group: 'Diseño', items: ['Photoshop', 'Illustrator', 'InDesign', 'Adobe XD'] },
	],

	education: [
		{ org: 'Escuela de Fotografía Creativa Andy Goldstein', title: 'Técnico en Fotografía', period: '2007 – 2009' },
		{
			org: 'Escuelas Técnicas Raggio',
			title: 'Técnico en Comunicación Publicitaria y Diseñador Gráfico',
			period: '2001 – 2006',
		},
	],

	languages: [
		{ name: 'Español', level: 'Nativo' },
		{ name: 'Inglés', level: 'Fluido oral y escrito' },
	],
}

// Íconos del stack en /curriculum: nombre tal como figura en `stack` → ícono de Icon.astro. Los ítems "A / B" se separan.
// Lo que no está acá queda solo en la lista de texto, que siempre muestra todo el stack.
export const stackIcons: Record<string, string> = {
	'WordPress': 'wordpress',
	'PHP': 'php',
	'MySQL': 'mysql',
	'Laravel': 'laravel',
	'JavaScript': 'javascript',
	'TypeScript': 'typescript',
	'HTML5': 'html5',
	'CSS3': 'css',
	'Vue': 'vuedotjs',
	'Nuxt': 'nuxt',
	'React': 'react',
	'Astro': 'astro',
	'jQuery': 'jquery',
	'Tailwind CSS': 'tailwindcss',
	'Sass': 'sass',
	'Node.js': 'nodedotjs',
	'n8n': 'n8n',
	'Stripe': 'stripe',
	'PayPal': 'paypal',
	'HubSpot': 'hubspot',
	'MCP': 'modelcontextprotocol',
	'Git': 'git',
	'GitHub Actions': 'githubactions',
	'Docker': 'docker',
	'Bash': 'gnubash',
	'Cloudflare': 'cloudflare',
	'AWS': 'amazonwebservices',
	'WP Engine': 'wpengine',
	'Pantheon': 'pantheon',
	'Netlify': 'netlify',
}

// `en` se suma en la Fase 2. El generador del PDF toma los idiomas de acá.
export const cv: { es: Cv; en?: Cv } = { es }

export const cvLabels: { es: CvLabels; en?: CvLabels } = {
	es: {
		htmlLang: 'es',
		title: 'CTO / Director of Engineering',
		location: 'Santander, España',
		present: 'Actualidad',
		headings: {
			summary: 'Resumen',
			experience: 'Experiencia profesional',
			skills: 'Habilidades',
			education: 'Educación',
			languages: 'Idiomas',
		},
	},
}

const months = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic']
const monthName = (ym: string) => {
	const [y, m] = ym.split('-').map(Number)
	return `${months[m - 1]} ${y}`
}

// Para /curriculum: "sep 2020 – hoy" y, en los cargos viejos, "2014 – 2018".
export const period = (r: { start: string; end?: string }) =>
	`${monthName(r.start)} – ${r.end ? monthName(r.end) : 'hoy'}`
export const yearPeriod = (r: { start: string; end: string }) => `${r.start.slice(0, 4)} – ${r.end.slice(0, 4)}`

// Para el PDF: un único formato, "09/2020 – Actualidad".
const numeric = (ym: string) => `${ym.slice(5, 7)}/${ym.slice(0, 4)}`
export const atsPeriod = (r: { start: string; end?: string }, present: string) =>
	`${numeric(r.start)} – ${r.end ? numeric(r.end) : present}`
