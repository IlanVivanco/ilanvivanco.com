<template>
	<ul v-if="images.length" class="insta-feed" :style="{ '--cols': count, '--mobile-cols': mobileCols, '--gap': gap }">
		<li class="insta-feed__box" v-for="(photo, index) in this.images" :key="index">
			<a :href="`https://www.instagram.com/p/${photo.node.shortcode}/`" target="__blank">
				<img
					class="insta-feed__image"
					:src="photo.node.thumbnail_resources[0].src"
					:srcset="getSrcSet(photo.node.thumbnail_resources)"
					:alt="photo.node.accessibility_caption"
				/>
				<div class="insta-feed__hashtags">{{ getHashtags(photo) }}</div>
			</a>
		</li>
	</ul>
</template>

<script>
import instagramData from '~/static/data/instagram'

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
	mounted() {
		this.images = [...instagramData.data].splice(this.offset, this.count)
	},
	computed: {
		mobileCols() {
			return Math.ceil(this.count / 2)
		},
	},
	methods: {
		getHashtags(item) {
			const WORD_LIMIT = 2
			const caption = item.node.edge_media_to_caption.edges[0].node.text
			const hashtags = caption
				.split(' ')
				.filter((el) => el[0] == '#')
				.splice(0, WORD_LIMIT)

			return hashtags.join(' ')
		},
		getSrcSet(photos){
			return photos.map(photo => `${photo.src} ${photo.config_width}w`).join(',');
		}
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
	grid-auto-rows: 1fr;

	@include breakpoint('small') {
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
			opacity: 0;
			mix-blend-mode: multiply;
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
			filter: brightness(10);
			z-index: 1;
			pointer-events: none;
		}

		&:hover {
			&::before {
				opacity: 0.7;
			}

			&::after {
				opacity: 0.9;
				transition: all ease-in-out 0.3s 0.1s;
			}

			.insta-feed__image {
				transform: scale(1.08);
				transition: all ease 0.8s;
			}

			.insta-feed__hashtags {
				opacity: 0.9;
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
