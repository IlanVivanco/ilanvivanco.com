import type { APIRoute } from 'astro'
import { hreflangFor, publicPages } from '../data/pages'
import { site } from '../data/site'

export const GET: APIRoute = () => {
	const urls = publicPages
		.filter((p) => !p.noindex)
		.map((p) => {
			const links = hreflangFor(p.path)
				.map((h) => `<xhtml:link rel="alternate" hreflang="${h.lang}" href="${new URL(h.path, site.url).href}"/>`)
				.join('')
			return `<url><loc>${new URL(p.path, site.url).href}</loc><lastmod>${p.updated}</lastmod>${links}</url>`
		})
		.join('')
	return new Response(
		`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">${urls}</urlset>`,
		{ headers: { 'Content-Type': 'application/xml' } }
	)
}
