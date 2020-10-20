<template>
	<div class="section-skills">
		<div class="section-skills__ref">
			<span>{{ $t('cv.ratings.low') }}</span>
			<span>{{ $t('cv.ratings.medium') }}</span>
			<span>{{ $t('cv.ratings.high') }}</span>
		</div>
		<ul class="section-skills__list">
			<li v-for="(skill, key) in data" :key="key" :class="{ skill: true, spacer: skill.spacer }">
				<template v-if="!skill.spacer">
					<span class="skill__name">{{ skill.name }}</span>
					<ul class="skill__rating">
						<li
							:class="{ skill__star: true, skill__filled: count <= skill.level }"
							v-for="count in 7"
							:key="count"
						></li>
					</ul>
				</template>
			</li>
		</ul>
	</div>
</template>

<script>
export default {
	name: 'Skills',
	props: {
		data: Array,
	},
}
</script>

<style lang="scss" scoped>
.section-skills {
	&__ref {
		text-align: right;
		color: $color-grayscale-5;
		font-size: 0.6rem;
		margin-bottom: 0.2em;
		font-style: italic;

		span:not(:last-child) {
			margin-right: 1em;
		}
	}

	&__list {
		padding: 0;
		margin: 0;
		list-style: none;
	}
}

.skill {
	font-size: 0.8em;
	color: $color-grayscale-7;
	display: flex;
	justify-content: space-between;

	@include breakpoint('medium') {
		font-size: 0.85em;
	}

	@include breakpoint('small') {
		font-size: 0.9em;
	}

	@include breakpoint('tiny') {
		font-size: 1em;
	}

	&.spacer {
		margin-bottom: 1em;
	}

	&__rating {
		padding: 0;
		margin: 0;
		list-style: none;
		display: inline;
	}

	&__star {
		display: inline-block;
		width: 0.85em;
		height: 0.85em;
		content: '';
		border: 1px solid $color-teal-dark;
		background: $color-teal-dark;
		box-shadow: 0 0 0 1px white inset;
		border-radius: 50%;
		opacity: 0.4;
		margin-right: 0.2em;
	}

	&__filled {
		opacity: 1;
	}
}
</style>
