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
				width: image.width,
				height: image.height,
				sizes: image.sizes,
				style: {
					backgroundSize: "cover",
					backgroundImage: 'url("' + image.placeholder + '")',
				}
			}
		},
	},
}
