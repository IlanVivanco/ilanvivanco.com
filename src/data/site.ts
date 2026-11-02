// Datos globales del sitio. Lo que está entre [corchetes] hay que completarlo.

export const site = {
	name: 'Ilán Vivanco',
	title: 'Ilán Vivanco — CTO en EpicDevs',
	description:
		'CTO en EpicDevs. Arquitectura de plataformas web, WordPress, JavaScript moderno e IA aplicada a la ingeniería. Construyendo para la web desde 2005, desde Santander.',
	url: 'https://ilanvivanco.com',
	locale: 'es_ES',
	location: 'Santander, Cantabria',

	// Contacto
	email: 'ilanvivanco@gmail.com',
	// Nombre del form en Netlify Forms: si cambia, cambian las notificaciones y el historial de envíos.
	formName: 'contact-form',

	// Lo genera `npm run cv:pdf` en cada build.
	cvPdf: '/cv/ilan-vivanco-cv-es.pdf',

	socials: [
		{ label: 'LinkedIn', icon: 'linkedin', href: 'https://www.linkedin.com/in/ilanvivanco/' },
		{ label: 'GitHub', icon: 'github', href: 'https://github.com/IlanVivanco' },
		{ label: 'Instagram', icon: 'instagram', href: 'https://www.instagram.com/ilanvivanco/' },
		{ label: 'X', icon: 'x', href: 'https://x.com/IlanVivanco' },
		{ label: 'EpicDevs', icon: 'epicdevs', href: 'https://epicdevs.com' },
	],

	nav: [
		{ label: 'Hola', href: '/' },
		{ label: 'Mi CV', href: '/curriculum' },
		{ label: 'Trabajos', href: '/portfolio' },
		// En desktop lo cubre el botón Hablemos del header.
		{ label: 'Contacto', href: '/contacto', mobileOnly: true },
	],
}

// Áreas de foco (de LinkedIn).
export const focus = [
	{
		title: 'Arquitectura de plataformas web',
		text: 'Cómo se construye una plataforma para que siga siendo rápida y mantenible a medida que crece, con WordPress como núcleo.',
		tag: 'wordpress',
	},
	{
		title: 'JavaScript moderno',
		text: 'Vue, React, Astro y Node.js para interfaces, herramientas internas y sitios que vuelan.',
		tag: 'js',
	},
	{
		title: 'IA en el flujo de ingeniería',
		text: 'Agentes de código, integraciones MCP y QA asistido por IA dentro del día a día del equipo.',
		tag: 'ai',
	},
	{
		title: 'Integraciones y migraciones',
		text: 'APIs, sincronización de datos y migraciones complejas desde Drupal, Hugo, Craft o plataformas a medida.',
		tag: 'api',
	},
	{
		title: 'Liderazgo de equipos remotos',
		text: 'Procesos, estándares y acompañamiento para que un equipo repartido por el mundo entregue bien.',
		tag: 'team',
	},
]

// Stats del home: 3 pantallas de 4 tarjetas que rotan juntas.
// `approx: true` = estimación por orden de magnitud (ajustala cuando quieras).
// Fuentes: GitHub REST (nov 2026): ~7.750 commits y 211 PRs. Lighthouse/axe/peso: build de este sitio.
// `display` muestra un texto fijo en lugar de contar (por ejemplo ∞).
export type Stat = {
	value: number
	display?: string
	prefix?: string
	suffix?: string
	label: string
	approx?: boolean
}
export const statScreens: { title: string; items: Stat[] }[] = [
	{
		title: 'mi trayectoria, en números',
		items: [
			{ value: 21, label: 'años construyendo para la web' },
			{
				value: 11,
				suffix: '+',
				label: 'años liderando ingeniería en EpicDevs',
			},
			{ value: 20, suffix: '+', label: 'personas del equipo que lideré' },
			{ value: 3, label: 'mercados: Europa, EE. UU. y Latam' },
		],
	},
	{
		title: 'mis números en el código',
		items: [
			{ value: 7.7, prefix: '~', suffix: 'k', label: 'commits en GitHub' },
			{ value: 200, suffix: '+', label: 'pull requests' },
			{ value: 100, suffix: '+', label: 'sitios en producción', approx: true },
			{
				value: 1,
				prefix: '~',
				suffix: 'M',
				label: 'líneas de código escritas',
				approx: true,
			},
		],
	},
	{
		title: 'datos que nadie pidió',
		items: [
			{
				value: 12,
				suffix: '+',
				label: 'editores probados, de Dreamweaver a Antigravity',
			},
			{ value: 16, label: 'años peleándome (y amigándome) con WordPress' },
			{ value: 0, display: '∞', label: 'mates y cafés. Ambos. En serio.' },
			{ value: 1, label: 'MX3 estéticamente destruido que se niega a morir' },
		],
	},
	{
		title: 'este sitio, en números',
		items: [
			{ value: 100, label: 'en Lighthouse, en las 4 categorías' },
			{
				value: 7.5,
				suffix: ' KB',
				label: 'de JavaScript propio en la home (sí, los conté)',
			},
			{ value: 0, label: 'errores de accesibilidad (axe, WCAG 2.2)' },
			{ value: 0.4, suffix: ' s', label: 'de LCP en desktop' },
		],
	},
]
