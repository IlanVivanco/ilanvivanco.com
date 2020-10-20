<template>
	<section class="resume-section">
		<cv-header></cv-header>

		<el-row align="middle" :gutter="30">
			<el-col :span="16" class="resume-section__main">
				<div class="resume-section__group">
					<section-header :title="cv.headers.positions" :icon="cv.icons.positions" />
					<positions :data="cv.data.positions" />
				</div>

				<div class="resume-section__group">
					<section-header :title="cv.headers.education" :icon="cv.icons.education" />
					<studies :data="cv.data.education" />
				</div>

				<div class="resume-section__group">
					<section-header :title="cv.headers.tech" :icon="cv.icons.tech" />
					<icons-grid :data="cv.data.tech" size="medium" />
				</div>
			</el-col>

			<el-col :span="8" class="resume-section__aside">
				<aside class="resume-section__aside-wrapper">
					<div class="resume-section__group">
						<section-header :title="cv.headers.skills" :icon="cv.icons.skills" />
						<ratings :data="cv.data.skills" />
					</div>

					<div class="resume-section__group">
						<section-header :title="cv.headers.courses" :icon="cv.icons.courses" />
						<studies :data="cv.data.courses" />
					</div>

					<div class="resume-section__group">
						<section-header :title="cv.headers.languages" :icon="cv.icons.languages" />
						<ratings :data="cv.data.languages" />
					</div>

					<div class="resume-section__group">
						<section-header :title="cv.headers.hobbies" :icon="cv.icons.hobbies" />
						<cloud :data="cv.data.hobbies" />
					</div>
				</aside>
			</el-col>
		</el-row>
	</section>
</template>

<script>
import Cloud from '@/components/cv/Cloud'
import CvHeader from '@/components/cv/CvHeader'
import IconsGrid from '@/components/cv/IconsGrid'
import Positions from '@/components/cv/Positions'
import Ratings from '@/components/cv/Ratings'
import SectionHeader from '@/components/cv/SectionHeader'
import Studies from '@/components/cv/Studies'

export default {
	name: 'CV',
	components: {
		Cloud,
		CvHeader,
		IconsGrid,
		Positions,
		Ratings,
		SectionHeader,
		Studies,
	},
	computed: {
		cv() {
			return this.$t('cv')
		},
	},
}
</script>

<style lang="scss" scoped>
.resume-section {
	font-size: 0.9rem;

	&__main {
		@include breakpoint('medium') {
			width: 60%;
		}

		@include breakpoint('small') {
			width: 100%;
		}
	}

	&__aside {
		@include breakpoint('medium') {
			width: 40%;
		}

		@include breakpoint('small') {
			width: 100%;
		}
	}

	&__aside-wrapper {
		@include breakpoint('small') {
			display: flex;
			flex-wrap: wrap;
		}
	}

	&__group {
		margin-bottom: 2em;

		@include breakpoint('small') {
			width: 100%;

			.resume-section__aside & {
				width: calc((100% - 2em) / 2);
				margin-bottom: 1em;

				&:nth-child(2n-1) {
					margin-right: 2em;
				}
			}
		}

		@include breakpoint('tiny') {
			.resume-section__aside & {
				width: 100%;

				&:nth-child(1n) {
					margin-right: 0;
				}
			}
		}
	}
}
</style>
