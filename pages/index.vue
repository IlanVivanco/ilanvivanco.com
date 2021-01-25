<template>
	<div class="container about">
		<el-row align="middle" :gutter="30">
			<el-col :span="24" class="about__intro">
				<span class="intro">{{ this.$t('index.copy.intro') }}</span>
				<h1>{{ this.$t('index.copy.name') }}</h1>
				<h2>{{ this.$t('index.copy.position') }}</h2>
				<p class="lead">{{ this.$t('index.copy.lead') }}</p>
			</el-col>
		</el-row>

		<el-row :gutter="30" type="flex" class="mb4">
			<el-col :span="15" class="about__info">
				<section-title :title="this.$t('index.titles.about')" type="h2" />
				<p v-for="(paragraph, i) in this.$t('index.copy.about')" :key="i">{{ paragraph }}</p>
			</el-col>

			<el-col :span="9" class="about__insta-feed">
				<section-title :title="this.$t('index.titles.latest_pictures')" type="h2" />
				<feed-instagram :count="10" />
			</el-col>
		</el-row>

		<el-row :gutter="30" type="flex">
			<el-col :span="24" class="about__info">
				<section-title :title="this.$t('index.titles.history')" type="h2" />
				<p v-for="(paragraph, i) in this.$t('index.copy.history')" :key="i">{{ paragraph }}</p>
			</el-col>
		</el-row>
	</div>
</template>

<script>
import Transitions from '@/mixins/Transitions'
import SectionTitle from '@/components/global/SectionTitle'
import FeedInstagram from '@/components/FeedInstagram'

export default {
	name: 'Index',
	scrollToTop: false,
	head() {
		return {
			title: 'My Index title',
		}
	},
	components: { SectionTitle, FeedInstagram },
	mixins: [Transitions],
}
</script>

<style lang="scss">
.about__intro {
	@extend .mb4;
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

.about__info {
	p {
		line-height: 1.4;
	}
}
</style>
