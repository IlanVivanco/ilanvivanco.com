<template>
	<div class="container">
		<header class="main-header">
			<section-title :title="this.$t('contact_me.titles.section')" :description="this.$t('contact_me.copy.lead')" />
		</header>

		<section class="main-content mt4">
			<el-row :gutter="30" type="flex">
				<el-col :span="10" :push="14" class="data-wrapper">
					<p>{{ $t('contact_me.copy.intro') }}</p>

					<ul class="contact-info-list">
						<li class="contact-info-list__item">
							<i :class="$t('cv.icons.email')"></i>
							<a @mouseover="addMailto"><span v-html="obfuscatedEmail"></span></a>
						</li>
						<li class="contact-info-list__item">
							<i :class="$t('cv.icons.phone')"></i>
							<a @mouseover="addTel"><span v-html="obfuscatedPhone"></span></a>
						</li>
					</ul>
				</el-col>

				<el-col :span="14" :pull="10" class="form-wrapper">
					<contact-form />
				</el-col>
			</el-row>
		</section>
	</div>
</template>

<script>
import Transitions from '~/mixins/Transitions'
import SectionTitle from '~/components/global/SectionTitle'
import ContactForm from '~/components/ContactForm'

export default {
	name: 'ContactMe',
	scrollToTop: false,
	methods: {
		addMailto(e) {
			e.currentTarget.href = `mailto:${this.$t('cv.data.email')}`
		},
		addTel(e) {
			e.currentTarget.href = `tel:${this.$t('cv.data.phone').replace(/[\s\(\)]/g, '')}`
		},
	},
	computed: {
		obfuscatedEmail(e) {
			return this.$t('cv.data.email')
				.split('')
				.map((i) => i + `<i style="display:none">no-no</i>`)
				.join('')
		},
		obfuscatedPhone(e) {
			return this.$t('cv.data.phone')
				.split('')
				.map((i) => i + `<i style="display:none">no-no</i>`)
				.join('')
		},
	},
	nuxtI18n: {
		paths: {
			es: '/contacto',
			en: '/contact-me',
		},
	},
	components: { SectionTitle, ContactForm },
	mixins: [Transitions],
}
</script>

<style lang="scss" scoped>
.main-content .el-row {
	@include breakpoint('medium') {
		display: block;
	}
}

.form-wrapper,
.data-wrapper {
	@include breakpoint('medium') {
		width: 100%;
		right: 0;
		left: 0;
		margin-bottom: 3rem;
	}
}

.reverse {
	unicode-bidi: bidi-override;
	direction: rtl;
}

.contact-info-list {
	padding: 0;
	list-style: none;
	margin: 1.5rem 0;

	a {
		text-decoration: none;
		color: $color-blue-dark;
		white-space: nowrap;

		&:hover {
			text-decoration: underline;
		}
	}
}
</style>
