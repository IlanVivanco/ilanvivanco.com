// Currículum. Fuente: LinkedIn (2026) + CV del sitio anterior.
// Una sola fuente para /curriculum y para el CV apto para ATS (/cv y /en/cv → PDF).

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
	formerly: string
	now: string
	months: string[]
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
		{ group: 'Diseño', items: ['Figma', 'Photoshop', 'Illustrator', 'InDesign'] },
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

const stackGroups: Record<string, string> = {
	'Plataforma': 'Platform',
	'Otros CMS': 'Other CMSs',
	'Backend e integraciones': 'Backend and integrations',
	'IA': 'AI',
	'Infra y flujo': 'Infrastructure and workflow',
	'Equipo': 'Team',
	'Diseño': 'Design',
}
const stackItems: Record<string, string> = {
	'IA generativa': 'Generative AI',
	'Agentes de código': 'Coding agents',
	'QA asistido por IA': 'AI-assisted QA',
	'Automatizaciones': 'Automation',
	'Liderazgo de ingeniería': 'Engineering leadership',
	'Equipos remotos': 'Remote teams',
	'Planificación técnica': 'Technical planning',
}

const en: Cv = {
	summary:
		'I lead engineering at EpicDevs, where we build and run web platforms for tech companies, universities, and nonprofits. I set the architecture, processes, and technical standards, and I coordinate a remote team across several countries.',

	experience: [
		{
			org: 'EpicDevs',
			formerly: 'Networks That Matter',
			meta: 'Formerly Networks That Matter · Remote',
			url: 'https://epicdevs.com',
			roles: [
				{
					title: 'CTO / Director of Engineering · Partner',
					start: '2020-09',
					place: 'Santander, Spain',
					highlights: [
						'Technical architecture, engineering processes, and technology strategy for client platforms, leading a distributed remote team.',
						'Focus on WordPress as the core, modern JavaScript, AI in the daily workflow (coding agents, MCP, AI-assisted QA), integrations, migrations, and performance.',
					],
				},
				{
					title: 'Lead Full-stack WordPress Developer · Project Manager',
					start: '2018-03',
					end: '2020-09',
					place: 'Puerto Madryn, Argentina',
					highlights: [
						'Led a team of 15 building WordPress platforms, themes, and plugins for U.S. clients.',
						'Combined development with technical planning: architecture, integrations, scope, timelines, and coordination across design, engineering, and stakeholders.',
					],
				},
				{
					title: 'Full-stack WordPress Developer',
					start: '2015-06',
					end: '2018-03',
					place: 'Puerto Madryn, Argentina',
					highlights: [
						'Custom platforms, themes, and plugins for international clients, from frontend to backend: migrations and scalable CMS architectures.',
					],
				},
			],
		},
		{
			org: 'Construye Mundo ONGD',
			meta: 'Volunteer · Remote',
			location: 'Volunteer · Remote',
			roles: [
				{
					title: 'WordPress Developer',
					start: '2021-04',
					highlights: [
						'Migrated the site from Drupal to WordPress to improve content management and accessibility.',
						'Development, updates, and content administration.',
					],
				},
			],
		},
		{
			org: 'Delicious Brains',
			location: 'Remote',
			roles: [
				{
					title: 'Software Developer',
					start: '2020-04',
					end: '2020-08',
					highlights: [
						'Worked on WP Offload Media (Pro and Lite), the plugin that moves WordPress media to cloud storage, with a focus on user experience.',
						'Technical support and content for the product blog.',
					],
				},
			],
		},
		{
			org: 'Explore & Share',
			meta: 'Part-time',
			location: 'Remote',
			roles: [
				{
					title: 'Senior Web Developer and Team Leader',
					start: '2016-12',
					end: '2018-08',
					highlights: [
						'Development and maintenance of explore-share.com.',
						'Migration to WordPress from the previous platform, with a custom theme and plugins.',
					],
				},
			],
		},
		{
			org: 'Freelance',
			meta: 'Remote',
			location: 'Remote',
			roles: [
				{
					title: 'Independent Full-stack Developer',
					start: '2006-10',
					highlights: [
						'Custom websites, CMS platforms, and digital solutions for agencies and direct clients.',
						'Development in PHP, custom CMSs, and the first WordPress projects, which later grew into large platforms.',
					],
				},
			],
		},
	],

	earlier: [
		{
			org: 'Magissim',
			title: 'Senior Web Developer and Graphic Designer',
			start: '2014-08',
			end: '2018-04',
			location: 'Remote',
			text: 'Websites for the European market with WordPress, PrestaShop, and Laravel.',
		},
		{
			org: 'Activar Comunicación',
			title: 'Web Developer and Designer',
			start: '2013-04',
			end: '2014-06',
			location: 'Buenos Aires, Argentina',
			text: 'Custom backends in PHP and MySQL; WordPress websites.',
		},
		{
			org: 'Mendióroz Design',
			title: 'Graphic Designer',
			start: '2011-05',
			end: '2013-04',
			location: 'Buenos Aires, Argentina',
			text: 'Wayfinding, technical documentation, 3D illustration, and web projects.',
		},
		{
			org: 'Exastudio',
			title: 'Junior Web Developer',
			start: '2008-09',
			end: '2010-05',
			location: 'Buenos Aires, Argentina',
			text: 'First complex websites, advertising pieces, and corporate identities.',
		},
		{
			org: 'NewPrint',
			title: 'Graphic Designer',
			start: '2007-05',
			end: '2008-07',
			location: 'Buenos Aires, Argentina',
			text: 'Prepress and client service.',
		},
		{
			org: 'Gilardoni & Asoc.',
			title: 'Graphic and Web Designer, Photography Assistant',
			start: '2005-06',
			end: '2007-05',
			location: 'Buenos Aires, Argentina',
			text: 'Image retouching and the first websites in HTML and CSS.',
		},
	],

	// Las marcas quedan como en `es`, porque stackIcons las busca por nombre. Lo genérico se traduce y queda como texto.
	stack: es.stack.map((g) => ({
		group: stackGroups[g.group] ?? g.group,
		items: g.items.map((item) => stackItems[item] ?? item),
	})),

	education: [
		{
			org: 'Escuela de Fotografía Creativa Andy Goldstein',
			title: 'Photography Technician',
			period: '2007 – 2009',
		},
		{
			org: 'Escuelas Técnicas Raggio',
			title: 'Technician in Advertising Communication and Graphic Designer',
			period: '2001 – 2006',
		},
	],

	languages: [
		{ name: 'Spanish', level: 'Native' },
		{ name: 'English', level: 'Fluent, spoken and written' },
	],
}

// Íconos del stack en /curriculum: nombre tal como figura en `stack` → ícono de Icon.astro. Los ítems "A / B" se separan.
// Lo que no está acá queda solo en la lista de texto, que siempre muestra todo el stack.
export const stackIcons: Record<string, string> = {
	'WordPress': 'wordpress',
	'Gutenberg': 'gutenberg',
	'Elementor': 'elementor',
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
	'Tailwind CSS': 'tailwindcss',
	'Node.js': 'nodedotjs',
	'n8n': 'n8n',
	'Salesforce': 'salesforce',
	'Shopify': 'shopify',
	'Stripe': 'stripe',
	'HubSpot': 'hubspot',
	'Supabase': 'supabase',
	'Claude': 'claude',
	'Codex': 'openai',
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
	'Railway': 'railway',
	'Figma': 'figma',
}

// El generador del PDF toma los idiomas de acá.
export const cv: { es: Cv; en: Cv } = { es, en }

export const cvLabels: { es: CvLabels; en: CvLabels } = {
	es: {
		htmlLang: 'es',
		title: 'CTO / Director of Engineering',
		location: 'Santander, España',
		present: 'Actualidad',
		formerly: 'antes',
		now: 'hoy',
		months: ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'],
		headings: {
			summary: 'Resumen',
			experience: 'Experiencia profesional',
			skills: 'Habilidades',
			education: 'Educación',
			languages: 'Idiomas',
		},
	},
	en: {
		htmlLang: 'en',
		title: 'CTO / Director of Engineering',
		location: 'Santander, Spain',
		present: 'Present',
		formerly: 'formerly',
		now: 'present',
		months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
		headings: {
			summary: 'Summary',
			experience: 'Professional Experience',
			skills: 'Skills',
			education: 'Education',
			languages: 'Languages',
		},
	},
}

const monthName = (ym: string, months: string[]) => {
	const [y, m] = ym.split('-').map(Number)
	return `${months[m - 1]} ${y}`
}

// Para /curriculum: "sep 2020 – hoy" y, en los cargos viejos, "2014 – 2018".
export const period = (r: { start: string; end?: string }, lang: 'es' | 'en' = 'es') => {
	const { months, now } = cvLabels[lang]
	return `${monthName(r.start, months)} – ${r.end ? monthName(r.end, months) : now}`
}
export const yearPeriod = (r: { start: string; end: string }) => `${r.start.slice(0, 4)} – ${r.end.slice(0, 4)}`

// Para el PDF: un único formato, "09/2020 – Actualidad".
const numeric = (ym: string) => `${ym.slice(5, 7)}/${ym.slice(0, 4)}`
export const atsPeriod = (r: { start: string; end?: string }, present: string) =>
	`${numeric(r.start)} – ${r.end ? numeric(r.end) : present}`
