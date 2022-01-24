<template>
	<ul v-if="images.length" class="insta-feed" :style="{ '--cols': count, '--mobile-cols': mobileCols, '--gap': gap }">
		<li class="insta-feed__box" v-for="(photo, index) in this.images" :key="index">
			<a :href="photo.permalink" target="__blank">
				<img
					class="insta-feed__image lazyload"
					:data-src="photo.media_url"
					:alt="`Ilán Vivanco's Instagram photo from ${new Date(photo.timestamp).toDateString()}`"
					onerror="this.parentNode.parentNode.classList.add('error');"
				/>
				<div class="insta-feed__hashtags">{{ getHashtags(photo.caption) }}</div>
			</a>
		</li>
	</ul>
</template>

<script>
import instagramPhotos from '~/static/data/instagram'
import axios from 'axios'

export default {
	name: 'FeedInstagram',
	props: {
		count: {
			type: Number,
			default: 4,
		},
		offset: {
			type: Number,
			default: 0,
		},
		gap: {
			type: Number,
			default: 5,
		},
	},
	data() {
		return {
			images: [],
		}
	},
	async mounted() {
		try {
			const photos = await axios({
				method: 'GET',
				url: 'api/instagram',
			}).then((response) => response.data)

			this.images = [...photos.data].splice(this.offset, this.count)
		} catch (error) {
			console.error(error)
		}
	},
	computed: {
		mobileCols() {
			return Math.ceil(this.count / 2)
		},
	},
	methods: {
		getHashtags(caption) {
			const WORD_LIMIT = 2
			const hashtags = caption
				.split(' ')
				.filter((el) => el[0] == '#')
				.splice(0, WORD_LIMIT)

			return hashtags.join(' ')
		},
		getSrcSet(photos) {
			return photos.map((photo) => `${photo.src} ${photo.config_width}w`).join(',')
		},
	},
}
</script>

<style lang="scss" scoped>
.insta-feed {
	margin: 0;
	margin-bottom: calc(var(--gap, 0) * 1px);
	padding: 0;
	display: grid;
	list-style: none;
	gap: calc(var(--gap, 0) * 1px);
	grid-template-columns: repeat(var(--cols), 1fr);
	grid-auto-rows: 120px;

	@include breakpoint('small') {
		grid-auto-rows: 105px;
		grid-template-columns: repeat(var(--mobile-cols), 1fr);
	}

	// Trick for making the grid squared
	&::before {
		content: '';
		width: 0;
		padding-bottom: 100%;
		grid-row: 1 / 1;
		grid-column: 1 / 1;
	}

	& > *:first-child {
		grid-row: 1 / 1;
		grid-column: 1 / 1;
	}

	&__box {
		position: relative;
		cursor: pointer;
		transition: all ease-in-out 0.2s;
		overflow: hidden;

		&::before {
			content: '';
			background: $color-blue-dark;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			position: absolute;
			display: block;
			opacity: 0.08;
			transition: all ease-in-out 0.2s;
			z-index: 1;
			pointer-events: none;
		}

		&::after {
			content: '';
			background: url('~assets/images/svg/social/instagram.svg');
			top: 50%;
			left: 50%;
			width: 1.5rem;
			height: 1.5rem;
			transform: translate(-50%, -50%);
			position: absolute;
			display: block;
			opacity: 0;
			transition: all ease-in-out 0.3s;
			filter: saturate(0) brightness(0) opacity(0.1);
			z-index: 1;
			pointer-events: none;
		}

		&:not(.error):hover {
			&::before {
				opacity: 0.7;
				// mix-blend-mode: multiply;
			}

			&::after {
				filter: saturate(0) brightness(5);
				opacity: 0.7;
				transition: all ease-in-out 0.3s;
			}

			.insta-feed__image {
				transform: scale(1.08);
				transition: all ease 0.8s;
			}

			.insta-feed__hashtags {
				opacity: 0.9;
			}
		}

		&.error {
			@keyframes loadingOpacity {
				0% {
					opacity: 0.3;
				}
				50% {
					opacity: 0.9;
				}
				100% {
					opacity: 0.3;
				}
			}

			img {
				display: none;
			}

			&::before {
				opacity: 0.08;
			}

			&::after {
				opacity: 0.9;
				filter: saturate(0) brightness(0) opacity(0.1);
				animation: loadingOpacity 2s infinite;
			}
		}
	}

	&__image {
		width: 100%;
		height: 100%;
		object-fit: cover;
		transition: all ease 0.6s;
		position: relative;
	}

	&__hashtags {
		position: absolute;
		bottom: 8%;
		color: white;
		z-index: 1;
		font-size: 0.6rem;
		text-align: center;
		padding: 0 1rem;
		opacity: 0;
		line-height: 1.4;
		transition: all ease 0.4s;
		width: 100%;
	}
}
</style>
