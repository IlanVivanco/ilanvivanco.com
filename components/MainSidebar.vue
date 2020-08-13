<template>
	<aside class="about-me">
		<div class="about-me__image">
			<img src="/images/ilan-vivanco.jpg" alt="Ilán Vivanco" />
		</div>
		<div class="about-me__data">
			<div class="about-me__title">
				<h1>Ilán Vivanco</h1>
				<h2>Web developer</h2>
			</div>
			<ul class="about-me__social">
				<li>Twitter</li>
				<li>Instagram</li>
			</ul>
			<footer class="about-me__footer">
				<nuxt-link :to="localePath('index')">
					Download CV
				</nuxt-link>
				<nuxt-link :to="localePath('contact-me')">
					Contactame
				</nuxt-link>
			</footer>
		</div>
	</aside>
</template>

<script>
export default {
	name: 'MainSidebar',
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
	// padding-top: calc(((100vh - 100%) / 2) + (100% / 16 * 9));

	img {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		object-fit: cover;
		z-index: 0;
	}

	&::before,
	&::after {
		content: '';
		position: absolute;
		display: block;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 50px;
		background: $color-grayscale-1;
		z-index: 1;
	}

	&::before {
		transform: rotate(10deg) translate(-50px, 40px);
	}

	&::after {
		transform: rotate(-10deg) translate(50px, 40px);
	}
}

.about-me__data {
	padding: 1rem;
}
</style>
