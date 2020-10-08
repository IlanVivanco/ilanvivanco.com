<template>
	<div>
		<LangSwitcher />
		<div class="page">
			<div class="container main-container">
				<el-row align="middle" type="flex">
					<el-col :span="1" class="navbar">
						<div class="navbar__inner">
							<main-nav />
						</div>
					</el-col>
					<el-col :span="7" class="sidebar">
						<div class="sidebar__inner">
							<main-sidebar />
						</div>
					</el-col>
					<el-col :span="16" class="main">
						<Nuxt class="main__inner" />
					</el-col>
				</el-row>
			</div>
		</div>
	</div>
</template>

<script>
import LangSwitcher from '@/components/LangSwitcher'
import MainSidebar from '@/components/MainSidebar'
import MainNav from '@/components/global/Nav'

export default {
	name: 'DefaultLayout',
	components: { LangSwitcher, MainNav, MainSidebar },
	transition: { mode: '' },
}
</script>

<style lang="scss" scoped>
.page {
	width: 100vw;
	height: 100vh;
	display: flex;
	align-items: center;
	justify-content: center;

	.main-container {
		width: 100%;
		max-width: 1200px;
	}
}

.navbar {
	width: 64px;
	align-self: flex-start;
	margin-top: 2.5vh;

	&__inner {
		@include border-radius();

		overflow: hidden;
	}
}

.sidebar {
	padding-left: 1rem;
	position: relative;
	z-index: 1;

	&::before {
		@include border-radius();

		content: '';
		position: absolute;
		width: 95%;
		height: 100%;
		top: -3%;
		left: -5%;
		background: rgba(white, 0.03);
		z-index: -1;
		filter: blur(3px);
	}

	&__inner {
		@include border-radius();

		height: 80vh;
		position: relative;
		overflow: hidden;
		background: $color-grayscale-1;
		text-align: center;
		box-shadow: 5px 0px 10px 2px rgba(black, 0.1), 5px 0px 5px rgba(black, 0.05);
	}
}

.main {
	@include border-radius(right);

	height: 75vh;
	overflow: hidden;

	&__inner {
		height: 75vh;
		overflow-y: auto;
		overflow-x: hidden;
		padding: 2rem;
		background: $color-grayscale-1;
	}

	::-webkit-scrollbar {
		width: 0.5rem;
	}

	::-webkit-scrollbar-track {
		background: $color-grayscale-4;
	}

	::-webkit-scrollbar-thumb {
		@include border-radius();
		background: $color-blue-dark;
	}
}
</style>
