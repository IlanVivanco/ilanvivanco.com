<template>
	<div class="container">
		<header class="main-header">
			<section-title :title="this.$t('about.titles.more_about_me')" :description="this.$t('contact_me.copy.lead')" />
		</header>

		<main class="main-content">
			<aside class="about__insta-feed mb4">
				<el-row :gutter="30" type="flex">
					<el-col :span="24">
						<instagram-feed :count="6" :gap="2" />
					</el-col>
				</el-row>
			</aside>

			<div>
				<p v-for="(paragraph, i) in this.$t('about.copy.history')" :key="`about_${i}`" v-html="paragraph"></p>
				<img class="about__image" v-bind="responsiveImageAttr('paisaje.jpg')" alt="Interlaken, Switzerland" />
			</div>
		</main>
	</div>
</template>

<script>
import Transitions from '~/mixins/Transitions'
import SectionTitle from '~/components/global/SectionTitle'
import InstagramFeed from '~/components/InstagramFeed'

export default {
	name: 'About',
	scrollToTop: false,
	nuxtI18n: {
		paths: {
			es: '/sobre-mi',
			en: '/about',
		},
	},
	components: { SectionTitle, InstagramFeed },
	mixins: [Transitions],
}
</script>

<style lang="scss" scoped>
.about__image {
	width: 100%;
	min-height: 320px;
	display: block;
	object-fit: cover;
	margin-top: 1.5rem;
}

.about__insta-feed {
	margin-left: -2rem;
	margin-right: -2rem;

	&:first-child {
		margin-top: -2rem;
	}

	&:last-child {
		margin-bottom: -2rem;
	}
}
</style>
