export default {
	transition(from, to) {
		const transitionName = 'page'

		const stripLocale = (name) => {
			const routeSeperator = '__'
			return name.substring(0, name.indexOf(routeSeperator))
		}

		if (!from || !to || !from.name || !to.name) return transitionName
		return stripLocale(from.name) === stripLocale(to.name) ? '-' : transitionName
	}
}
