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
			</el-col>

			<el-col :span="8" class="resume-section__aside">
				<aside class="resume-section__aside-wrapper">
					<div class="resume-section__group">
						<section-header :title="cv.headers.languages" :icon="cv.icons.languages" />
						<div>
							Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi in minus cumque quia, iusto deserunt
							incidunt excepturi.
						</div>
					</div>

					<div class="resume-section__group">
						<section-header :title="cv.headers.skills" :icon="cv.icons.skills" />
						<div>
							Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi in minus cumque quia, iusto deserunt
							incidunt excepturi.
						</div>
					</div>

					<div class="resume-section__group">
						<section-header :title="cv.headers.courses" :icon="cv.icons.courses" />
						<div>
							Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi in minus cumque quia, iusto deserunt
							incidunt excepturi.
						</div>
					</div>

					<div class="resume-section__group">
						<section-header :title="cv.headers.hobbies" :icon="cv.icons.hobbies" />
						<div>
							Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi in minus cumque quia, iusto deserunt
							incidunt excepturi.
						</div>
					</div>
				</aside>
			</el-col>
		</el-row>
	</section>
</template>

<script>
import CvHeader from '@/components/cv/CvHeader'
import Positions from '@/components/cv/Positions'
import SectionHeader from '@/components/cv/SectionHeader'
import Studies from '@/components/cv/Studies'

export default {
	name: 'CV',
	components: {
		CvHeader,
		Positions,
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
