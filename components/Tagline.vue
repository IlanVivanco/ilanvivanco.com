<template>
	<h2 :class="{ tagline: true, typing: typing }">
		{{ tagline }}
	</h2>
</template>

<script>
export default {
	name: 'Tagline',
	methods: {
		type() {
			if (this.letterIndex < this.taglines[this.wordIndex].length) {
				this.tagline += this.taglines[this.wordIndex][this.letterIndex]
				this.letterIndex++
				this.typing = true
				this.typeTimeout = setTimeout(this.type, this.typeDelay)
			} else {
				this.typing = false
				this.typeTimeout = setTimeout(this.delete, this.wordDelay)
			}
		},
		delete() {
			if (this.letterIndex > 0) {
				this.tagline = this.tagline.substring(0, this.letterIndex - 1)
				this.letterIndex--
				this.typing = true
				this.deleteTimeout = setTimeout(this.delete, this.deleteDelay)
			} else {
				this.typing = false
				this.wordIndex = ++this.wordIndex < this.taglines.length ? this.wordIndex : 0
				this.deleteTimeout = setTimeout(this.type, this.wordDelay)
			}
		},
		reset() {
			clearTimeout(this.typeTimeout)
			clearTimeout(this.deleteTimeout)

			this.currentLocale = this.$i18n.locale
			this.taglines = this.$t('taglines')
			this.tagline = ''
			this.letterIndex = 0
			this.typing = false

			this.type()
		},
	},
	data() {
		return {
			currentLocale: this.$i18n.locale,
			letterIndex: 0,
			wordIndex: 0,
			typeDelay: 150,
			deleteDelay: 75,
			wordDelay: 2000,
			typing: false,
			tagline: '',
			deleteTimeout: null,
			typeTimeout: null,
			taglines: [],
		}
	},
	mounted() {
		this.taglines = this.$t('taglines')
		this.type()
	},
	updated() {
		if (this.currentLocale !== this.$i18n.locale) {
			this.reset()
		}
	},
}
</script>

<style lang="scss" scoped>
.tagline {
	font-family: $code-font;
	font-size: 1.1rem;
	font-weight: normal;
	margin-bottom: 3rem;
	position: relative;
	line-height: 1.2em;
	color: $color-blue-dark;
	padding: 0 1em;
	// text-align: left;

	&::after {
		display: inline-block;
		content: '\00a0 ';
		width: 2px;
		background: $color-blue-dark;
		transform: translateX(-3px);
		animation: blink 800ms infinite;
	}

	&.typing::after {
		animation: none;
	}
}

@keyframes blink {
	30% {
		background: $color-blue-dark;
	}
	50% {
		background: transparent;
	}
	70% {
		background: $color-blue-dark;
	}
}

.social-links {
	padding: 0;
	margin: 0;
	list-style: none;

	&__item {
		display: inline-block;

		&:not(:last-child) {
			margin-right: 1em;
		}
	}

	&__logo {
		width: 1.5em;
	}
}
</style>
