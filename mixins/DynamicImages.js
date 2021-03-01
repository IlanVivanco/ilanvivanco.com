export default {
	methods: {
		responsiveImageAttr(url) {
			if (!url) return;

			const image = require(`~/assets/images/${url}`)

			// Return URL if it's a string
			if (typeof image == 'string') return { src: image };

			return {
				srcset: image.srcSet,
				width: image.width,
				height: image.height,
				style: {
					backgroundSize: "cover",
					backgroundImage: 'url("' + image.placeholder + '")',
				}
			}
		},

		fetchImageAttr(url) {
			if (!url) return;

			const image = require(`~/assets/images/${url}`)

			// Return URL if it's a string
			if (typeof image == 'string') return { src: image };

			return {
				srcset: image.srcSet,
				width: image.width,
				height: image.height,
				images: image.images,
				meta_src: image.images.slice(-1)[0].path,
				style: {
					backgroundSize: "cover",
					backgroundImage: 'url("' + image.placeholder + '")',
				}
			}
		},
	},
}
