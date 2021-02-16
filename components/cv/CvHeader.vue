<template>
	<header class="header">
		<el-row align="middle" :gutter="30">
			<el-col :span="16" class="header__person">
				<div class="header__person-wrapper">
					<div class="header__image">
						<img src="~/assets/images/ilan-vivanco.jpg" :alt="cv.data.name" />
					</div>
					<div class="header__data">
						<h1>{{ cv.data.name }}</h1>
						<h2>{{ cv.data.job_title }}</h2>
					</div>
				</div>
			</el-col>

			<el-col :span="8" class="header__metadata">
				<ul class="header__metadata-list">
					<li class="header__metadata-list-item"><i :class="cv.icons.location"></i>{{ cv.data.location }}</li>
					<li class="header__metadata-list-item">
						<i :class="cv.icons.email"></i>
						<span v-html="obfuscatedEmail"></span>
					</li>
					<li class="header__metadata-list-item">
						<i :class="cv.icons.phone"></i>
						<span v-html="obfuscatedPhone"></span>
					</li>
					<li class="header__metadata-list-item">
						<i :class="cv.icons.age"></i>{{ formattedDob }} {{ yearsOld }}
					</li>
				</ul>
			</el-col>
		</el-row>
	</header>
</template>

<script>
import moment from 'moment'
import es_cv from '~/locales/es/cv'
import en_cv from '~/locales/en/cv'

export default {
	name: 'CVHeader',
	computed: {
		cv() {
			return this.$t('cv')
		},
		formattedDob() {
			moment.locale(this.$i18n.locale)

			return moment(this.cv.data.birth_date).format('L')
		},
		yearsOld() {
			moment.locale(this.$i18n.locale)

			let dob = moment(this.cv.data.birth_date)
			let today = moment()
			let age = today.diff(dob, 'years')

			return `(${age} ${this.cv.age})`
		},
		obfuscatedEmail(e) {
			return this.cv.data.email
				.split('')
				.map((i) => i + `<i style="display:none">no-no</i>`)
				.join('')
		},
		obfuscatedPhone(e) {
			return this.cv.data.phone
				.split('')
				.map((i) => i + `<i style="display:none">no-no</i>`)
				.join('')
		},
	},
}
</script>

<style lang="scss" scoped>
.header {
	margin-bottom: 3rem;

	@include breakpoint('medium') {
		margin-bottom: 2em;
	}

	&__person {
		@include breakpoint('medium') {
			width: 100%;
			margin-bottom: 2em;
		}

		@include breakpoint('tiny') {
			display: none;
		}
	}

	&__person-wrapper {
		display: flex;
		align-items: center;
	}

	&__image {
		width: 90px;
		height: 90px;
		border-radius: 50%;
		overflow: hidden;
		box-shadow: 0 0 0 3px $color-blue-dark;
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

	&__metadata {
		@include breakpoint('medium') {
			width: 100%;
		}
	}

	&__metadata-list {
		padding: 0;
		list-style: none;
		color: $color-blue-dark;

		@include breakpoint('medium') {
			display: flex;
			flex-wrap: wrap;
		}
	}

	&__metadata-list-item {
		@include breakpoint('medium') {
			width: 50%;
			padding-right: 0.5em;
		}

		@include breakpoint('tiny') {
			width: 100%;
			padding-right: 0;
		}

		i {
			margin-right: 0.5em;
		}
	}
}
</style>
