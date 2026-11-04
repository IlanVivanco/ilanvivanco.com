// Terminal del hero: el motor que escribe las escenas y las rota. Las escenas van aparte, una por idioma,
// para que cada página cargue solo las suyas.
// Sin dependencias. Se pausa con su botón, fuera de pantalla o con la pestaña oculta.

export type Tok = [cls: string, text: string]
export type Line = {
	t: Tok[]
	mode?: 'type' | 'print'
	wait?: number
	speed?: number
	bar?: number
	kind?: 'add' | 'del'
}
export type Scene = { id: string; lines: Line[] }

export const P = (path: string): Tok[] => [
	['pr', '$ '],
	['m', `${path} `],
]
export const C = (hash: string, year: string, msg: string, head = false): Line => ({
	t: [['y', '* '], ['h', hash], ...(head ? ([['br', ' (HEAD)']] as Tok[]) : []), ['m', ` ${year} `], ['v', msg]],
	mode: 'print',
	wait: head ? 420 : 170,
})

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
const tokHtml = (t: Tok[], chars = Infinity) => {
	let out = ''
	let left = chars
	for (const [cls, text] of t) {
		if (left <= 0) break
		const part = text.slice(0, left)
		left -= part.length
		out += cls === 'v' ? esc(part) : `<span class="t-${cls}">${esc(part)}</span>`
	}
	return out
}
const lineLen = (t: Tok[]) => t.reduce((n, [, s]) => n + s.length, 0)
const barHtml = (n?: number) => (n ? ` <span class="t-bar" style="--w:${n}%"></span>` : '')
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms))

export function initTerminal(root: HTMLElement, scenes: Scene[]) {
	const out = root.querySelector<HTMLElement>('[data-term-out]')
	const body = out?.parentElement as HTMLElement | null
	const tabs = [...root.querySelectorAll<HTMLButtonElement>('[data-term-tab]')]
	if (!out || !tabs.length) return

	const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches
	const HOLD = 4200
	let run = 0
	let current = 0
	let visible = true

	let userPaused = false
	const toggle = root.querySelector<HTMLButtonElement>('[data-term-toggle]')
	toggle?.addEventListener('click', () => {
		userPaused = !userPaused
		toggle.setAttribute('aria-pressed', String(userPaused))
	})
	new IntersectionObserver(([e]) => (visible = e.isIntersecting), { threshold: 0.2 }).observe(root)

	const paused = () => userPaused || !visible || document.hidden
	const waitActive = async (id: number) => {
		while (paused() && id === run) await sleep(150)
	}
	const tick = async (ms: number, id: number) => {
		await waitActive(id)
		await sleep(ms)
		return id === run
	}

	const setTab = (i: number) => {
		tabs.forEach((t, k) => {
			t.setAttribute('aria-pressed', String(k === i))
			t.classList.remove('is-holding')
		})
	}

	const cls = (l: Line) => `t-line${l.kind ? ` t-line--${l.kind}` : ''}`
	const renderStatic = (s: Scene) =>
		s.lines.map((l) => `<span class="${cls(l)}">${tokHtml(l.t)}${barHtml(l.bar)}</span>`).join('')

	async function play(i: number) {
		const id = ++run
		current = i
		setTab(i)
		const scene = scenes[i]

		if (reduce) {
			out!.innerHTML = renderStatic(scene)
			return
		}

		out!.classList.add('is-switching')
		await sleep(180)
		out!.innerHTML = ''
		out!.classList.remove('is-switching')

		const done: string[] = []
		const cursor = '<span class="win-cursor"></span>'
		// Se lee el alto al inicio del frame, con el layout limpio, para no forzar un reflow por cada tecla.
		let scrollFrame = 0
		const scrollEnd = () => {
			if (!body || scrollFrame) return
			scrollFrame = requestAnimationFrame(() => {
				scrollFrame = 0
				body.scrollTop = body.scrollHeight
			})
		}
		if (body) body.scrollTop = 0
		for (const line of scene.lines) {
			if (id !== run) return
			scrollEnd()
			if (line.mode === 'print') {
				if (!(await tick(line.wait ?? 200, id))) return
				done.push(`<span class="${cls(line)}">${tokHtml(line.t)}${barHtml(line.bar)}</span>`)
				out!.innerHTML = done.join('') + `<span class="t-line">${cursor}</span>`
				scrollEnd()
				continue
			}
			const len = lineLen(line.t)
			// El prompt aparece de una; solo se "tipea" el comando
			const instant = line.t[0]?.[0] === 'pr' ? lineLen(line.t.filter(([cls]) => cls === 'pr' || cls === 'm')) : 0
			if (instant)
				out!.innerHTML = done.join('') + `<span class="t-line">${tokHtml(line.t, instant)}${cursor}</span>`
			if (instant && !(await tick(350, id))) return
			for (let c = instant + 1; c <= len; c++) {
				if (!(await tick((line.speed ?? 30) + Math.random() * 18, id))) return
				out!.innerHTML = done.join('') + `<span class="t-line">${tokHtml(line.t, c)}${cursor}</span>`
				scrollEnd()
			}
			done.push(`<span class="t-line">${tokHtml(line.t)}</span>`)
			if (!(await tick(90, id))) return
		}
		out!.innerHTML = done.join('') + `<span class="t-line">${cursor}</span>`
		scrollEnd()

		// Pausa con la barra de progreso de la pestaña, y siguiente escena
		tabs[i].classList.add('is-holding')
		tabs[i].style.setProperty('--hold', `${HOLD}ms`)
		let elapsed = 0
		while (elapsed < HOLD) {
			if (id !== run) return
			if (paused()) {
				tabs[i].classList.add('is-paused')
				await waitActive(id)
				tabs[i].classList.remove('is-paused')
			}
			await sleep(100)
			elapsed += 100
		}
		if (id === run) play((i + 1) % scenes.length)
	}

	tabs.forEach((t, i) => t.addEventListener('click', () => play(i)))
	// Arranca cuando el navegador está libre, para no competir con la carga inicial
	const start = () => {
		out.style.opacity = '1'
		play(0)
	}
	if ('requestIdleCallback' in window) (window as any).requestIdleCallback(start, { timeout: 1200 })
	else setTimeout(start, 400)
	return () => run++
}
