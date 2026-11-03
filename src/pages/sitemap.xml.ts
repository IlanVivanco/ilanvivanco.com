import type { APIRoute } from 'astro'
import { publicPages } from '../data/pages'
import { site } from '../data/site'

export const GET: APIRoute = () => {
	const urls = publicPages
		.filter((p) => !p.noindex)
		.map((p) => `<url><loc>${new URL(p.path, site.url).href}</loc><lastmod>${p.updated}</lastmod></url>`)
		.join('')
	return new Response(
		`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`,
		{ headers: { 'Content-Type': 'application/xml' } }
	)
}
