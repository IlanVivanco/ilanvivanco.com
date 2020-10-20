import Vue from 'vue'

export default ({ app }, inject) => {
	const eventHub = new Vue();
	inject('eventHub', eventHub)
}
