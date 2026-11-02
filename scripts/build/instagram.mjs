// Copia los últimos posts de Instagram al sitio, desde el feed JSON de Behold, que maneja la API y el token.
// Si el feed falla, el build sigue y /sobre-mi se publica sin la grilla.
import { mkdir, rm, writeFile } from 'node:fs/promises'
import sharp from 'sharp'
import { site } from '../../src/data/site.ts'
import { parsePost } from '../lib/instagram-post.mjs'

const FEED = process.env.INSTAGRAM_FEED_URL ?? site.instagramFeed
const IMG_DIR = 'public/img/instagram'
const DATA_FILE = 'src/data/instagram.generated.json'
const SIZE = 480
const TIMEOUT = 15_000

const get = async (url) => {
	const res = await fetch(url, { signal: AbortSignal.timeout(TIMEOUT) })
	if (!res.ok) throw new Error(`${res.status} en ${new URL(url).hostname}`)
	return res
}

const posts = []
await rm(IMG_DIR, { recursive: true, force: true })
await mkdir(IMG_DIR, { recursive: true })
try {
	const feed = await (await get(FEED)).json()
	for (const p of feed.posts.map(parsePost).filter(Boolean).slice(0, 6)) {
		try {
			const photo = Buffer.from(await (await get(p.image)).arrayBuffer())
			const file = `${p.id}.webp`
			await sharp(photo).resize(SIZE, SIZE, { fit: 'cover' }).webp({ quality: 72 }).toFile(`${IMG_DIR}/${file}`)
			posts.push({ src: `/img/instagram/${file}`, url: p.url, date: p.date, alt: p.alt, tags: p.tags })
		} catch (error) {
			console.warn(`Instagram: se omite el post ${p.id} (${error.message})`)
		}
	}
	console.log(`✓ Instagram: ${posts.length} fotos`)
} catch (error) {
	console.warn(`Instagram: sin grilla en este build (${error.message})`)
}
await writeFile(DATA_FILE, `${JSON.stringify(posts, null, '\t')}\n`)
