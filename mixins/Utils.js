export default {
	methods: {
		snakeCase(text) {
			return text.replace(/[\s]/, '_').toLowerCase()
		}
	}
}
