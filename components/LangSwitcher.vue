<template>
	<div class="lang-switcher" v-if="!isContentPage">
		<el-tooltip v-for="locale in availableLocales" :key="locale.code" :content="locale.name" placement="bottom">
			<img @click="changeLocale(locale.code)" v-bind="responsiveImageAttr(locale.icon)" :alt="`locale.name flag`" class="flag" />
		</el-tooltip>
	</div>
</template>

<script>
export default {
	name: 'LangSwitcher',
	methods: {
		changeLocale(lang) {
			this.$router.push(this.switchLocalePath(lang))
		},
	},
	data() {
		return {
			locales: null,
		}
	},
	created() {
		this.locales = this.$i18n.locales
	},
	computed: {
		isContentPage() {
			return this.$route.name?.includes('slug')
		},
		availableLocales() {
			return this.locales.filter((locale) => locale.code !== this.$i18n.locale)
		},
	},
}
</script>

<style lang="scss">
.lang-switcher {
	position: fixed;
	right: 0;
	top: 0;
	padding: 0.5rem;
	color: $color-grayscale-6;
	text-transform: uppercase;
	z-index: 1;

	@include breakpoint('medium') {
		right: 1vw;
	}

	@include breakpoint('small') {
		top: 65px;
	}

	.flag {
		width: 20px;
		height: 20px;
		cursor: pointer;
		transition: all ease 0.4s;

		&:not(:last-child) {
			margin-right: 0.5rem;
		}

		&:hover {
			transform: scale(1.1);
		}
	}
}
</style>
