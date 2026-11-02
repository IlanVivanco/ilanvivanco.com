// Normaliza un post del feed de Behold. El feed es contenido de afuera: un post con datos inválidos se omite.
const HASHTAG = /^[\p{L}\p{N}_]+$/u

const isHttps = (url) => {
	try {
		return new URL(url).protocol === 'https:'
	} catch {
		return false
	}
}

export function parsePost(post) {
	const image = post?.sizes?.medium?.mediaUrl
	const id = String(post?.id ?? '').replace(/\D/g, '')
	const time = Date.parse(post?.timestamp)
	if (!id || !isHttps(image) || Number.isNaN(time)) return null
	if (!/^https:\/\/www\.instagram\.com\//.test(post.permalink ?? '')) return null
	return {
		id,
		image,
		url: post.permalink,
		date: new Date(time).toISOString(),
		alt: typeof post.altText === 'string' && post.altText.trim() ? post.altText.trim() : null,
		// Solo hashtags, no el caption: se publica sin revisión y podría nombrar a alguien de la familia.
		tags: (Array.isArray(post.hashtags) ? post.hashtags : []).filter((t) => HASHTAG.test(t)).slice(0, 2),
	}
}
