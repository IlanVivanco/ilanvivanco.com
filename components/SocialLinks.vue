<template>
	<ul class="social-links">
		<li v-for="(social, i) in socials" :key="i" class="social-links__item">
			<el-tooltip effect="dark" placement="bottom" :content="social.name" :open-delay="200">
				<a :href="social.link" target="_blanck">
					<img :src="social.logo" :alt="social.name" class="social-links__logo" />
				</a>
			</el-tooltip>
		</li>
	</ul>
</template>

<script>
import socials from '@/locales/general/socials'

export default {
	name: 'SocialLinks',
	data() {
		return {
			socials: [],
		}
	},
	mounted() {
		this.socials = socials
	},
}
</script>

<style lang="scss" scoped>
.social-links {
	padding: 0;
	margin: 0;
	list-style: none;

	&__item {
		display: inline-block;

		&:not(:last-child) {
			margin-right: 1em;
		}
	}

	&__logo {
		width: 1.5em;
	}
}
</style>
