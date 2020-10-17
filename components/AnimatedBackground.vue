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
		return {
			width: null,
			height: null,
			segments: null,
			bg: null,
			canvas: null,
			ctx: null,
			points: null,
			target: null,
			main_color: null,
			animateHeader: true,
		}
	},
	mounted() {
		this.bg = document.querySelector('.bg')
		this.canvas = document.querySelector('.bg__canvas')


		this.width = window.innerWidth
		this.height = window.innerHeight
		this.bg.style.height = this.height + 'px'

		this.canvas.width = this.width
		this.canvas.height = this.height

		this.ctx = this.canvas.getContext('2d')

		this.initHeader()
		this.initAnimation()
		this.addListeners()
	},
	methods: {
		initHeader() {
			this.width = window.innerWidth
			this.height = window.innerHeight
			this.segments = 15
			this.target = { x: this.width / 2, y: this.height / 2 }
			this.main_color = '154, 223, 228'

			// create points
			this.points = []
			for (let x = 0; x < this.width; x = x + this.width / this.segments) {
				for (let y = 0; y < this.height; y = y + this.height / this.segments) {
					let px = x + (Math.random() * this.width) / this.segments
					let py = y + (Math.random() * this.height) / this.segments
					let p = { x: px, originX: px, y: py, originY: py }
					this.points.push(p)
				}
			}

			// for each point find the 5 closest points
			for (let i = 0; i < this.points.length; i++) {
				let closest = []
				let p1 = this.points[i]

				for (let j = 0; j < this.points.length; j++) {
					let p2 = this.points[j]
					if (!(p1 == p2)) {
						let placed = false
						for (let k = 0; k < 5; k++) {
							if (!placed) {
								if (closest[k] == undefined) {
									closest[k] = p2
									placed = true
								}
							}
						}

						for (let k = 0; k < 5; k++) {
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
				let c = new this.Circle(this.points[i], 2 + Math.random() * 2, 'rgba(255,255,255,0.3)', this)
				this.points[i].circle = c
			}
		},

		addListeners() {
			if (!('ontouchstart' in window)) {
				window.addEventListener('mousemove', this.mouseMove)
			}
			window.addEventListener('scroll', this.scrollCheck)
			window.addEventListener('resize', this.resize)
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

		scrollCheck() {
			if (document.body.scrollTop > this.height) this.animateHeader = false
			else this.animateHeader = true
		},

		resize() {
			this.width = window.innerWidth
			this.height = window.innerHeight
			this.bg.style.height = this.height + 'px'
			this.canvas.width = this.width
			this.canvas.height = this.height
		},

		initAnimation() {
			this.animate()
			for (let i in this.points) {
				this.shiftPoint(this.points[i])
			}
		},

		animate() {
			if (this.animateHeader) {
				this.ctx.clearRect(0, 0, this.width, this.height)

				for (let i in this.points) {
					// detect points in range
					if (Math.abs(this.getDistance(this.target, this.points[i])) < 50000) {
						this.points[i].active = 0.1
						this.points[i].circle.active = 0.2
					} else if (Math.abs(this.getDistance(this.target, this.points[i])) < 200000) {
						this.points[i].active = 0.08
						this.points[i].circle.active = 0.1
					} else if (Math.abs(this.getDistance(this.target, this.points[i])) < 500000) {
						this.points[i].active = 0.05
						this.points[i].circle.active = 0.07
					} else {
						this.points[i].active = 0
						this.points[i].circle.active = 0
					}

					this.drawLines(this.points[i])
					this.points[i].circle.draw()
				}
			}

			requestAnimationFrame(this.animate)
		},

		shiftPoint(p) {
			gsap.to(p, 1 + 1 * Math.random(), {
				x: p.originX - 50 + Math.random() * 100,
				y: p.originY - 50 + Math.random() * 100,
				ease: 'circ.easeInOut',
				onComplete: () => {
					this.shiftPoint(p)
				},
			})
		},

		// Canvas manipulation
		drawLines(p) {
			if (!p.active) return

			for (let i in p.closest) {
				this.ctx.beginPath()
				this.ctx.moveTo(p.x, p.y)
				this.ctx.lineTo(p.closest[i].x, p.closest[i].y)
				this.ctx.strokeStyle = `rgba(${this.main_color}, ${p.active})`
				this.ctx.stroke()
			}
		},

		Circle(pos, rad, color, that) {
			let _this = this
			// console.log(this)

			// constructor
			;(function () {
				_this.pos = pos || null
				_this.radius = rad || null
				_this.color = color || null
			})()

			this.draw = function () {
				if (!_this.active) return

				that.ctx.beginPath()
				that.ctx.arc(_this.pos.x, _this.pos.y, _this.radius, 0, 4 * Math.PI, false)
				that.ctx.fillStyle = `rgba(${that.main_color}, ${_this.active})`
				that.ctx.fill()
			}
		},

		// Util
		getDistance(p1, p2) {
			return Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2)
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
}
</style>
