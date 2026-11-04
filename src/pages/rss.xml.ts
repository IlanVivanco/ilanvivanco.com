import type { APIRoute } from 'astro'
import { posts } from '../data/posts'
import { site } from '../data/site'

const esc = (v: string) => v.replace(/[&<>]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' })[c]!)

export const GET: APIRoute = () => {
	const items = posts
		.map((p) => {
			const url = new URL(`/blog/${p.slug}`, site.url).href
			const date = new Date(`${p.date}T12:00:00Z`).toUTCString()
			return `<item><title>${esc(p.title)}</title><link>${url}</link><guid>${url}</guid><pubDate>${date}</pubDate><description>${esc(p.description)}</description></item>`
		})
		.join('')
	return new Response(
		`<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>Blog de ${esc(site.name)}</title><link>${new URL('/blog', site.url).href}</link><description>${esc(site.description)}</description><language>es</language>${items}</channel></rss>`,
		{ headers: { 'Content-Type': 'application/xml' } }
	)
}
