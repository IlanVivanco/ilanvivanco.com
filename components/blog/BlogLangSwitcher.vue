<template>
	<div class="blog-lang-switcher">
		<nuxt-link class="lang-link" v-for="lang in locales" :key="lang.locale" :to="lang.path">
			{{ $t('blog.copy.also_in') }} {{ parseLocale(lang.locale) }}
		</nuxt-link>
	</div>
</template>

<script>
export default {
	name: 'BlogLangSwitcher',
	props: {
		locales: Array,
	},
	methods: {
		parseLocale(locale) {
			const locales = {
				en: 'English',
				es: 'español',
			}
			return locales[locale]
		},
	},
}
</script>

<style lang="scss" scoped>
.blog-lang-switcher {
	--color: #{$color-grayscale-7};
	--color-hover: #{$color-grayscale-3};

	.light & {
		--color: #{$color-grayscale-3};
		--color-hover: #{$color-grayscale-5};
	}

	display: block;
	font-size: 0.8rem;
	font-weight: 400;
	margin-bottom: 0.8em;
	color: var(--color);

	.lang-link {
		text-decoration: none;
		color: var(--color);

		&:hover {
			color: var(--color-hover);
		}
	}
}
</style>
