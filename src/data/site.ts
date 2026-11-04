// Datos globales del sitio. Lo que cambia con el idioma se pide por `siteText`, `focusFor` y `statsFor`.
import { byLang } from '../i18n/index.ts'

export const site = {
	name: 'Ilán Vivanco',
	url: 'https://ilanvivanco.com',

	// Nombre del form en Netlify Forms: si cambia, cambian las notificaciones y el historial de envíos.
	formName: 'contact-form',

	// Feed JSON de Behold: últimas fotos de Instagram (ver README.md).
	instagramFeed: 'https://feeds.behold.so/jZ5SRhL2JJltCujvFFLS',

	socials: [
		{ label: 'LinkedIn', icon: 'linkedin', href: 'https://www.linkedin.com/in/ilanvivanco/' },
		{ label: 'GitHub', icon: 'github', href: 'https://github.com/IlanVivanco' },
		{ label: 'Instagram', icon: 'instagram', href: 'https://www.instagram.com/ilanvivanco/' },
		{ label: 'X', icon: 'x-brand', href: 'https://x.com/IlanVivanco' },
		{ label: 'EpicDevs', icon: 'epicdevs', href: 'https://epicdevs.com' },
	],
}

// Una dirección por idioma, las dos del dominio. Ofuscadas en el HTML: ver encodeMail.
const emails = { es: 'hola@ilanvivanco.com', en: 'hi@ilanvivanco.com' }
export const emailFor = (locale?: string) => byLang(emails, locale)
export const allEmails = Object.values(emails)

const text = {
	es: {
		title: 'Ilán Vivanco | CTO en EpicDevs',
		description:
			'CTO en EpicDevs. Plataformas web, WordPress, JavaScript e IA en el trabajo diario del equipo. Hago sitios desde 2005 y vivo en Santander.',
		location: 'Santander, Cantabria',
		// Lo genera `npm run cv:pdf` en cada build.
		cvPdf: '/cv/ilan-vivanco-cv-es.pdf',
		nav: [
			{ label: 'Hola', href: '/' },
			{ label: 'Mi CV', href: '/curriculum' },
			{ label: 'Trabajos', href: '/portfolio' },
			{ label: 'Blog', href: '/blog' },
			// En desktop lo cubre el botón Hablemos del header.
			{ label: 'Contacto', href: '/contacto', mobileOnly: true },
		],
	},
	en: {
		title: 'Ilán Vivanco | CTO at EpicDevs',
		description:
			"CTO at EpicDevs. Web platforms, WordPress, JavaScript, and AI in the team's daily work. I've been building websites since 2005, and I live in Santander.",
		location: 'Santander, Cantabria',
		cvPdf: '/cv/ilan-vivanco-cv-en.pdf',
		nav: [
			{ label: 'Hi', href: '/en' },
			{ label: 'Resume', href: '/en/resume' },
			{ label: 'Work', href: '/en/portfolio' },
			// El blog solo está en español.
			{ label: 'Blog', href: '/blog' },
			{ label: 'Contact', href: '/en/contact', mobileOnly: true },
		],
	},
}
export const siteText = (locale?: string) => byLang(text, locale)

// Áreas de foco (de LinkedIn).
const focus = [
	{
		title: 'Arquitectura de plataformas web',
		text: 'WordPress como base y una arquitectura pensada para que sumar cosas no vuelva lento el sitio.',
		tag: 'wordpress',
	},
	{
		title: 'JavaScript moderno',
		text: 'Vue, React, Astro y Node.js para interfaces, herramientas internas y sitios rápidos.',
		tag: 'js',
	},
	{
		title: 'IA en el trabajo diario',
		text: 'Agentes de código, integraciones MCP y QA asistido, metidos en el flujo real del equipo.',
		tag: 'ai',
	},
	{
		title: 'Integraciones y migraciones',
		text: 'APIs, sincronización de datos y migraciones desde Drupal, Hugo, Craft o plataformas a medida.',
		tag: 'api',
	},
	{
		title: 'Liderazgo de equipos remotos',
		text: 'Procesos claros y estándares para que un equipo en varios países entregue bien.',
		tag: 'team',
	},
]

// Stats del home: 4 pantallas de 4 tarjetas que rotan juntas.
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
const statScreens: { title: string; items: Stat[] }[] = [
	{
		title: 'mi trayectoria, en números',
		items: [
			{ value: 21, label: 'años construyendo para la web' },
			{
				value: 11,
				suffix: '+',
				label: 'años en EpicDevs, 8+ liderando ingeniería',
			},
			{ value: 20, suffix: '+', label: 'personas que lideré a lo largo de estos años' },
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
			{ value: 99, suffix: '+', label: 'en Lighthouse, en las 4 categorías' },
			{
				value: 7.5,
				suffix: ' KB',
				label: 'de JavaScript propio en la home (sí, los conté)',
			},
			{ value: 0, label: 'errores de accesibilidad (axe, WCAG 2.2)' },
			{ value: 0.3, suffix: ' s', label: 'de LCP en desktop' },
		],
	},
]

const focusEn: typeof focus = [
	{
		title: 'Web platform architecture',
		text: "WordPress as the base, and an architecture built so that adding things doesn't slow the site down.",
		tag: 'wordpress',
	},
	{
		title: 'Modern JavaScript',
		text: 'Vue, React, Astro, and Node.js for interfaces, internal tools, and fast websites.',
		tag: 'js',
	},
	{
		title: 'AI in daily work',
		text: "Coding agents, MCP integrations, and AI-assisted QA, built into the team's real workflow.",
		tag: 'ai',
	},
	{
		title: 'Integrations and migrations',
		text: 'APIs, data sync, and migrations from Drupal, Hugo, Craft, or custom platforms.',
		tag: 'api',
	},
	{
		title: 'Leading remote teams',
		text: 'Clear processes and standards, so a team spread across several countries ships well.',
		tag: 'team',
	},
]

const statScreensEn: typeof statScreens = [
	{
		title: 'my career, by the numbers',
		items: [
			{ value: 21, label: 'years building for the web' },
			{ value: 11, suffix: '+', label: 'years at EpicDevs, 8+ leading engineering' },
			{ value: 20, suffix: '+', label: "people I've led over these years" },
			{ value: 3, label: 'markets: Europe, the U.S., and Latin America' },
		],
	},
	{
		title: 'my numbers in code',
		items: [
			{ value: 7.7, prefix: '~', suffix: 'k', label: 'commits on GitHub' },
			{ value: 200, suffix: '+', label: 'pull requests' },
			{ value: 100, suffix: '+', label: 'sites in production', approx: true },
			{ value: 1, prefix: '~', suffix: 'M', label: 'lines of code written', approx: true },
		],
	},
	{
		title: 'facts nobody asked for',
		items: [
			{ value: 12, suffix: '+', label: 'editors tried, from Dreamweaver to Antigravity' },
			{ value: 16, label: 'years fighting (and making up) with WordPress' },
			{ value: 0, display: '∞', label: 'mates and coffees. Both. Seriously.' },
			{ value: 1, label: 'aesthetically destroyed MX3 that refuses to die' },
		],
	},
	{
		title: 'this site, by the numbers',
		items: [
			{ value: 99, suffix: '+', label: 'on Lighthouse, in all 4 categories' },
			{ value: 7.5, suffix: ' KB', label: 'of my own JavaScript on the home page (yes, I counted)' },
			{ value: 0, label: 'accessibility errors (axe, WCAG 2.2)' },
			{ value: 0.3, suffix: ' s', label: 'LCP on desktop' },
		],
	},
]

export const focusFor = (locale?: string) => byLang({ es: focus, en: focusEn }, locale)
export const statsFor = (locale?: string) => byLang({ es: statScreens, en: statScreensEn }, locale)
