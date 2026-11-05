// RSS del blog, por idioma.
import { postPath, postsFor } from '../data/posts'
import { pathFor } from '../data/pages'
import { site, siteText } from '../data/site'
import { ui } from '../i18n'

const esc = (v: string) => v.replace(/[&<>]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' })[c]!)

export const rss = (lang: 'es' | 'en') => {
	const items = postsFor(lang)
		.map((p) => {
			const url = new URL(postPath(p), site.url).href
			const date = new Date(`${p.date}T12:00:00Z`).toUTCString()
			return `<item><title>${esc(p.title)}</title><link>${url}</link><guid>${url}</guid><pubDate>${date}</pubDate><description>${esc(p.description)}</description></item>`
		})
		.join('')
	return new Response(
		`<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>${esc(ui(lang).blog.rss)}</title><link>${new URL(pathFor('/blog', lang), site.url).href}</link><description>${esc(siteText(lang).description)}</description><language>${lang}</language>${items}</channel></rss>`,
		{ headers: { 'Content-Type': 'application/xml' } }
	)
}
