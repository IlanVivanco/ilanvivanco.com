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
					<section-header :title="cv.headers.studies" :icon="cv.icons.studies" />
					<studies :data="cv.data.education" />
				</div>

				<div class="resume-section__group">
					<section-header :title="cv.headers.stack" :icon="cv.icons.stack" />
					<icons-grid :data="cv.data.stack" size="medium" />
				</div>
			</el-col>

			<el-col :span="8" class="resume-section__aside">
				<aside class="resume-section__aside-wrapper">
					<div class="resume-section__group">
						<section-header :title="cv.headers.languages" :icon="cv.icons.languages" />
						<ratings :data="cv.data.languages" />
					</div>

					<div class="resume-section__group">
						<section-header :title="cv.headers.skills" :icon="cv.icons.skills" />
						<ratings :data="cv.data.skills" />
					</div>

					<div class="resume-section__group">
						<section-header :title="cv.headers.courses" :icon="cv.icons.courses" />
						<studies :data="cv.data.courses" />
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
}

.resume-section__group {
	margin-bottom: 2em;
}
</style>
