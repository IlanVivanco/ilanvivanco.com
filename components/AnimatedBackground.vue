<template>
	<div class="bg">
		<canvas class="bg__canvas"></canvas>
	</div>
</template>

<script>
import { gsap } from 'gsap'
import { EasePack } from 'gsap/EasePack'

export default {
	name: 'AnimatedBackground',
	layout: 'bg',
	data() {
		return {}
	},
	mounted() {
		this.bg = document.querySelector('.bg')
		this.canvas = document.querySelector('.bg__canvas')
		this.ctx = this.canvas.getContext('2d')

		this.initBackground()
		this.initAnimation()
		this.addListeners()
	},
	methods: {
		initBackground() {
			this.width = window.innerWidth
			this.height = window.innerHeight
			this.bg.style.height = this.height + 'px'
			this.canvas.width = this.width
			this.canvas.height = this.height

			this.grid = 15
			this.closestPoints = 5
			this.moveOffset = 50
			this.target = { x: this.width / 2, y: this.height / 2 }
			this.drawColor = '154, 223, 228'

			// create points
			this.points = []
			for (let x = 0; x < this.width; x = x + this.width / this.grid) {
				for (let y = 0; y < this.height; y = y + this.height / this.grid) {
					let px = x + (Math.random() * this.width) / this.grid
					let py = y + (Math.random() * this.height) / this.grid
					let p = { x: px, originX: px, y: py, originY: py }
					this.points.push(p)
				}
			}

			// for each point find the closest points
			for (let i = 0; i < this.points.length; i++) {
				let closest = []
				let p1 = this.points[i]

				for (let j = 0; j < this.points.length; j++) {
					let p2 = this.points[j]

					if (p1 != p2) {
						let placed = false

						for (let k = 0; k < this.closestPoints; k++) {
							if (!placed) {
								if (closest[k] == undefined) {
									closest[k] = p2
									placed = true
								}
							}
						}

						for (let k = 0; k < this.closestPoints; k++) {
							if (!placed) {
								if (this.getDistance(p1, p2) < this.getDistance(p1, closest[k])) {
									closest[k] = p2
									placed = true
								}
							}
						}
					}
				}

				p1.closest = closest
			}

			// assign a circle to each point
			for (let i in this.points) {
				let c = new this.Circle(this.points[i], 2 + Math.random() * 2, this)
				this.points[i].circle = c
			}
		},

		addListeners() {
			if (!('ontouchstart' in window)) {
				window.addEventListener('mousemove', this.mouseMove)
			}

			window.addEventListener('resize', this.resetAnimation)
		},

		mouseMove(e) {
			let posx = 0
			let posy = 0

			if (e.pageX || e.pageY) {
				posx = e.pageX
				posy = e.pageY
			} else if (e.clientX || e.clientY) {
				posx = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft
				posy = e.clientY + document.body.scrollTop + document.documentElement.scrollTop
			}

			this.target.x = posx
			this.target.y = posy
		},

		resetAnimation() {
			this.initBackground()
			this.initAnimation()
		},

		initAnimation() {
			this.animate()

			for (let i in this.points) {
				this.shiftPoint(this.points[i])
			}
		},

		animate() {
			this.ctx.clearRect(0, 0, this.width, this.height)

			for (let i in this.points) {
				let distance = this.getDistance(this.target, this.points[i])

				// Set alpha upon distance
				this.points[i].alpha = this.mapDistance(distance)
				this.points[i].circle.alpha = this.mapDistance(distance) * 1.2

				this.drawLines(this.points[i])
				this.points[i].circle.draw()
			}

			requestAnimationFrame(this.animate)
		},

		shiftPoint(p) {
			gsap.to(p, 1 + 1 * Math.random(), {
				x: p.originX - this.moveOffset / 2 + Math.random() * this.moveOffset,
				y: p.originY - this.moveOffset / 2 + Math.random() * this.moveOffset,
				ease: 'circ.easeInOut',
				onComplete: () => {
					this.shiftPoint(p)
				},
			})
		},

		// Canvas manipulation
		drawLines(p) {
			if (!p.alpha) return

			for (let i in p.closest) {
				this.ctx.beginPath()
				this.ctx.moveTo(p.x, p.y)
				this.ctx.lineTo(p.closest[i].x, p.closest[i].y)
				this.ctx.strokeStyle = `rgba(${this.drawColor}, ${p.alpha})`
				this.ctx.stroke()
			}
		},

		// Util
		getDistance(p1, p2) {
			return Math.abs((Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2)) / 1000)
		},

		mapDistance(num) {
			const in_min = 0
			const in_max = 750
			const out_max = 0.1
			const out_min = out_max / 4

			if (num > in_max) return out_min

			return Math.abs(((num - in_min) * (out_min - out_max)) / (in_max - in_min) + out_max)
		},

		Circle(pos, rad, that) {
			this.pos = pos || null
			this.radius = rad || null

			this.draw = function () {
				if (!this.alpha) return

				that.ctx.beginPath()
				that.ctx.arc(this.pos.x, this.pos.y, this.radius, 0, 4 * Math.PI, false)
				that.ctx.fillStyle = `rgba(${that.drawColor}, ${this.alpha})`
				that.ctx.fill()
			}
		},
	},
}
</script>

<style lang="scss" scoped>
.bg {
	position: fixed;
	width: 100%;
	overflow: hidden;

	&::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: linear-gradient(160deg, $color-blue-dark, $color-blue);
		z-index: -1;
	}

	&__canvas {
		height: 100vh;
		width: 100vw;
	}
}
</style>
