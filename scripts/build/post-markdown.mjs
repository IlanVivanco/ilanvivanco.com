// Plugin de Markdown para los posts: lo que el Markdown no sabe expresar y las reglas del sitio piden.
// Links: `.link`, y los externos en otra pestaña. Imágenes: tamaño, srcset y lazy, con las variantes de project-images.mjs.
import sharp from 'sharp'

const SRC = /^\/img\/blog\//
const CHART = /\/(rangos|versionado)[^/]*\.webp$/

const sized = async (src) => {
	const { width, height } = await sharp(`public${src}`).metadata()
	const srcset = [480, 720].map((w) => `${src.replace(/\.webp$/, `-${w}.webp`)} ${w}w`)
	return { width, height, srcset: [...srcset, `${src} ${width}w`].join(', ') }
}

export const postMarkdown = {
	name: 'post-markdown',
	element: {
		filter: ['a', 'img'],
		async visit(node, ctx) {
			const props = node.properties ?? {}
			if (node.tagName === 'a') {
				ctx.setProperty(node, 'className', ['link'])
				if (!/^https?:/.test(String(props.href))) return
				ctx.setProperty(node, 'target', '_blank')
				ctx.setProperty(node, 'rel', 'noopener')
				ctx.appendChild(node, {
					type: 'element',
					tagName: 'span',
					properties: { className: ['sr-only'] },
					children: [{ type: 'text', value: ' (abre en otra pestaña)' }],
				})
				return
			}
			const src = String(props.src)
			if (!SRC.test(src)) return
			const { width, height, srcset } = await sized(src)
			const chart = CHART.test(src)
			ctx.setProperty(node, 'width', width)
			ctx.setProperty(node, 'height', height)
			ctx.setProperty(node, 'srcSet', srcset)
			ctx.setProperty(
				node,
				'sizes',
				chart ? '(max-width: 800px) 720px, 760px' : '(max-width: 800px) calc(100vw - 40px), 760px'
			)
			// `![alt](src "eager")`: la imagen visible al cargar, que en desktop puede ser el LCP.
			if (props.title === 'eager') ctx.setProperty(node, 'title', null)
			else ctx.setProperty(node, 'loading', 'lazy')
			ctx.setProperty(node, 'decoding', 'async')
			// Con ancho mínimo y scroll propio, el texto del gráfico se lee también en mobile.
			if (chart)
				ctx.wrapNode(node, {
					type: 'element',
					tagName: 'span',
					properties: {
						className: ['post-chart'],
						tabIndex: 0,
						role: 'group',
						ariaLabel: 'Gráfico, con scroll horizontal en pantallas chicas',
					},
					children: [],
				})
		},
	},
}
