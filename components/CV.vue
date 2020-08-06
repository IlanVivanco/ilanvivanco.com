<template>
	<div class="cv">
		<br />
		<pre>
			{{ cv_data }}
		</pre
		>
	</div>
</template>

<script>
import CV from '@/content/cv.js'

export default {
	props: {
		lang: {
			type: String,
			default: 'es',
		},
	},
	computed: {
		cv_data() {
			return CV[this.lang]
		},
	},
}
</script>

<style>
</style>
