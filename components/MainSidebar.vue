<template>
	<aside class="about-me">
		<header class="about-me__image">
			<img src="/images/ilan-vivanco-duo-yellow.jpg" alt="Ilán Vivanco" />
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
}
</script>

<style lang="scss">
.el-tooltip {
	outline: none;
}

.about-me__image {
	position: relative;
	overflow: hidden;
	padding-top: calc(100% / 4 * 3);

	@media screen and (max-width: $small-desktop-break) {
		padding-top: calc(100% / 16 * 9);
	}

	img {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		object-fit: cover;
		z-index: 0;
	}
}

.about-me__data {
	padding: 1rem;
}

.about-me__footer {
	position: absolute;
	right: 0;
	left: 0;
	bottom: 1.5em;
	text-align: center;
}
</style>
