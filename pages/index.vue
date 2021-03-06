<template>
	<div class="container about">
		<header class="main-header">
			<el-row align="middle" :gutter="30">
				<el-col :span="24" class="about__intro">
					<span class="intro">{{ this.$t('index.copy.intro') }}</span>
					<h1>{{ this.$t('index.copy.name') }}</h1>
					<h2>{{ this.$t('index.copy.position') }}</h2>
					<p class="lead">{{ this.$t('index.copy.lead') }}</p>
				</el-col>
			</el-row>
		</header>

		<section class="main-content">
			<el-row :gutter="30" type="flex" class="mb4">
				<el-col :span="24" class="about__info">
					<section-title :title="this.$t('index.titles.about')" type="h2" />
					<div>
						<p v-for="(paragraph, i) in splitAboutParagraphs[0]" :key="`about_${i}`">{{ paragraph }}</p>
						<img class="about__image" v-bind="responsiveImageAttr('ilan-workspace.jpg')" alt="My workspace" />
						<p v-for="(paragraph, i) in splitAboutParagraphs[1]" :key="`about_2_${i}`">{{ paragraph }}</p>
					</div>
				</el-col>
			</el-row>

			<aside class="about__insta-feed mb4">
				<el-row :gutter="30" type="flex">
					<el-col :span="24">
						<instagram-feed :count="6" :gap="2" />
					</el-col>
				</el-row>
			</aside>

			<el-row :gutter="30" type="flex" class="mb4">
				<el-col :span="24" class="history__info">
					<section-title :title="this.$t('index.titles.history')" type="h2" :margin-bottom="true" />
					<div>
						<p v-for="(paragraph, i) in this.$t('index.copy.history')" :key="`history_${i}`">{{ paragraph }}</p>
					</div>
				</el-col>
			</el-row>

			<aside class="about__insta-feed">
				<el-row :gutter="30" type="flex">
					<el-col :span="24">
						<instagram-feed :count="6" :offset="6" :gap="2" />
					</el-col>
				</el-row>
			</aside>
		</section>
	</div>
</template>

<script>
import Transitions from '~/mixins/Transitions'
import SectionTitle from '~/components/global/SectionTitle'
import InstagramFeed from '~/components/InstagramFeed'

export default {
	name: 'Index',
	scrollToTop: false,
	components: { SectionTitle, InstagramFeed },
	mixins: [Transitions],
	computed: {
		splitAboutParagraphs() {
			const [first, ...rest] = this.$t('index.copy.about')
			return [[first], rest]
		},
	},
}
</script>

<style lang="scss">
.about__intro {
	line-height: 1.2;

	h1 {
		line-height: inherit;
	}

	h2 {
		color: $color-blue;
		line-height: inherit;
		font-size: 1.3rem;
	}

	.intro {
		color: $color-teal-dark;
		line-height: inherit;
		font-weight: normal;
		font-size: 0.9rem;
	}

	.lead {
		margin-top: 1rem;
		font-size: 1.1rem;
		font-style: italic;
		line-height: 1.3;
	}
}

.about__image {
	max-width: calc(39% - 1rem);
	max-height: 450px;
	margin-bottom: 1rem;
	margin-left: 1rem;
	float: right;

	@include breakpoint('small') {
		max-width: none;
		max-height: 300px;
		width: 100%;
		margin-left: 0;
		object-fit: cover;
		float: none;
	}
}

.about__info {
	p {
		line-height: 1.4;

		&:first-child {
			float: left;
			width: 61%;

			@include breakpoint('small') {
				width: 100%;
				float: none;
			}
		}
	}
}

.about__insta-feed {
	margin-left: -2rem;
	margin-right: -2rem;

	&:last-child{
		margin-bottom: -2rem;
	}
}
</style>
