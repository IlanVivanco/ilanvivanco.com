<template>
	<header class="header-cv-section">
		<el-row align="middle" :gutter="30">
			<el-col :span="16">
				<div class="header-cv">
					<div class="header-cv__image">
						<img src="/images/ilan-vivanco.jpg" :alt="cv.data.name" />
					</div>
					<div class="header-cv__data">
						<h1>{{ cv.data.name }}</h1>
						<h2>{{ cv.data.job_title }}</h2>
					</div>
				</div>
			</el-col>

			<el-col :span="8">
				<ul class="metadata">
					<li class="metadata__item"><i :class="cv.icons.location"></i>{{ cv.data.location }}</li>
					<li class="metadata__item"><i :class="cv.icons.email"></i>{{ cv.data.email }}</li>
					<li class="metadata__item"><i :class="cv.icons.phone"></i>{{ cv.data.phone }}</li>
					<li class="metadata__item"><i :class="cv.icons.age"></i>{{ formatted_dob }} {{ years_old }}</li>
				</ul>
			</el-col>
		</el-row>
	</header>
</template>

<script>
import moment from 'moment'
import es_cv from '@/locales/es/cv'
import en_cv from '@/locales/en/cv'

export default {
	name: 'CVHeader',
	computed: {
		cv() {
			return this.$t('cv')
		},
		formatted_dob() {
			return moment(this.cv.data.birth_date).format(this.cv.date_format)
		},
		years_old() {
			let dob = moment(this.cv.data.birth_date)
			let today = moment()
			let age = today.diff(dob, 'years')

			return `(${age} ${this.cv.age})`
		},
	},
}
</script>

<style lang="scss" scoped>
.header-cv-section {
	margin-bottom: 3rem;
}

.header-cv {
	display: flex;
	align-items: center;

	&__image {
		width: 90px;
		height: 90px;
		border-radius: 50%;
		overflow: hidden;
		box-shadow: 0 0 0 5px $color-blue-dark;
		margin-right: 1.5em;

		@include breakpoint('medium') {
			width: 75px;
			height: 75px;
		}
	}

	&__image img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		object-position: 5%;
	}

	&__data {
		color: $color-blue-dark;
		text-align: right;

		h1 {
			text-align: right;
			font-size: 2.5rem;
			line-height: 1em;
			text-align: inherit;

			@include breakpoint('medium') {
				font-size: 2rem;
			}
		}

		h2 {
			font-size: 1rem;
			font-weight: normal;
			text-align: inherit;
			color: $color-teal-dark;

			@include breakpoint('medium') {
				font-size: 0.9rem;
			}
		}
	}
}

.metadata {
	padding: 0;
	list-style: none;
	color: $color-blue-dark;

	&__item i {
		margin-right: 0.5em;
	}
}
</style>
