<template>
	<aside class="about-me">
		<header class="about-me__image">
			<img class="about-me__image-img" src="/images/ilan-vivanco-duo-yellow.jpg" alt="Ilán Vivanco" />
			<img
				:src="altBannerImg"
				class="about-me__image-img about-me__image-img--alt animate__animated"
				:class="{ animate__fadeIn: altBannerImg, animate__fadeOut: altBannerLeave }"
			/>
		</header>
		<div class="about-me__data">
			<div class="about-me__title">
				<logo />
				<tagline />
				<social-links />
			</div>

			<footer class="about-me__footer">
				<nuxt-link :to="localePath('index')">
					<el-button type="warning" icon="el-icon-tickets" round>CV</el-button>
				</nuxt-link>
				<nuxt-link :to="localePath('contact-me')">
					<el-button type="primary" icon="el-icon-chat-round" round>Contactame</el-button>
				</nuxt-link>
			</footer>
		</div>
	</aside>
</template>

<script>
import Logo from '@/components/Logo'
import SocialLinks from '@/components/SocialLinks'
import Tagline from '@/components/Tagline'

export default {
	name: 'MainSidebar',
	components: { Logo, SocialLinks, Tagline },
	props: {
		altBannerLeave: Boolean,
		altBannerImg: String,
	},
}
</script>

<style lang="scss">
.el-tooltip {
	outline: none;
}

.about-me {
	@include breakpoint('medium') {
		display: flex;
	}

	@include breakpoint('tiny') {
		flex-wrap: wrap;
		padding: 1.5rem 0;
	}

	&__image {
		position: relative;
		overflow: hidden;
		padding-top: 235px;

		@include breakpoint('medium') {
			padding-top: 40vh; //Same as parent
			width: 50%;
		}

		@include breakpoint('tiny') {
			padding-top: 0;
			width: 120px;
			height: 120px;
			border-radius: 50%;
			overflow: hidden;
			margin: 0 auto;
		}

		&-img {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			object-fit: cover;
			z-index: 0;
			object-position: 30%;

			@include breakpoint('tiny') {
				object-position: 10%;
			}

			&--alt {
				opacity: 0;

				@include breakpoint('tiny') {
					opacity: 0 !important;
				}
			}
		}
	}

	&__data {
		padding: 1rem;
		display: flex;
		flex-flow: column nowrap;
		height: calc(80vh - 235px);

		@include breakpoint('medium') {
			position: relative;
			width: 50%;
			min-width: 280px;
			height: 40vh;
		}

		@include breakpoint('tiny') {
			width: 100%;
			height: auto;
			padding: 0;
		}
	}

	&__footer {
		// position: absolute;
		// right: 0;
		// left: 0;
		// bottom: 1.5em;
		text-align: center;
		margin-top: auto;

		@include breakpoint('tiny') {
			position: static;
		}
	}
}
</style>
