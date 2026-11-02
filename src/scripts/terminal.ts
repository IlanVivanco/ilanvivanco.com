// Terminal del hero: tres escenas que se escriben solas y rotan.
// Sin dependencias. Se pausa con su botón, fuera de pantalla o con la pestaña oculta.

type Tok = [cls: string, text: string]
type Line = { t: Tok[]; mode?: 'type' | 'print'; wait?: number; speed?: number; bar?: number; kind?: 'add' | 'del' }
type Scene = { id: string; lines: Line[] }

const P = (path: string): Tok[] => [
	['pr', '$ '],
	['m', `${path} `],
]
const C = (hash: string, year: string, msg: string, head = false): Line => ({
	t: [['y', '* '], ['h', hash], ...(head ? ([['br', ' (HEAD)']] as Tok[]) : []), ['m', ` ${year} `], ['v', msg]],
	mode: 'print',
	wait: head ? 420 : 170,
})

const scenes: Scene[] = [
	{
		id: 'ilan.ts',
		lines: [
			{
				t: [
					['k', 'const'],
					['v', ' ilan = {'],
				],
				speed: 22,
			},
			{
				t: [
					['v', '  '],
					['p', 'rol'],
					['v', ': '],
					['s', "'CTO @ EpicDevs'"],
					['v', ','],
				],
				speed: 22,
			},
			{
				t: [
					['v', '  '],
					['p', 'base'],
					['v', ': '],
					['s', "'Santander, ES'"],
					['v', ','],
				],
				speed: 22,
			},
			{
				t: [
					['v', '  '],
					['p', 'desde'],
					['v', ': '],
					['n', '2005'],
					['v', ','],
				],
				speed: 22,
			},
			{
				t: [
					['v', '  '],
					['p', 'stack'],
					['v', ': ['],
					['s', "'WP'"],
					['v', ', '],
					['s', "'Vue'"],
					['v', ', '],
					['s', "'Astro'"],
					['v', ', '],
					['s', "'Node'"],
					['v', '],'],
				],
				speed: 18,
			},
			{
				t: [
					['v', '  '],
					['p', 'remoto'],
					['v', ': '],
					['k', 'true'],
					['v', ','],
				],
				speed: 22,
			},
			{
				t: [
					['v', '  '],
					['p', 'combustible'],
					['v', ': ['],
					['s', "'mate'"],
					['v', ', '],
					['s', "'café'"],
					['v', '],'],
				],
				speed: 22,
			},
			{ t: [['v', '};']], speed: 22 },
			{ t: [['v', '']], mode: 'print', wait: 120 },
			{
				t: [
					['v', 'ilan.'],
					['f', 'contactar'],
					['v', '();'],
					['c', ' // ¿hacemos algo juntos?'],
				],
				speed: 30,
			},
		],
	},
	{
		id: 'git log',
		lines: [
			{ t: [...P('~/ilan'), ['w', 'git log --oneline carrera']], speed: 38 },
			C('e4b9a07', '2026', 'IA: agentes, MCP y QA', true),
			C('c81f2d4', '2021', 'Construye Mundo: Drupal→WP'),
			C('a1f3c2e', '2020', 'CTO y socio en EpicDevs'),
			C('5d0e9b3', '2020', 'WP Offload Media (Delicious)'),
			C('9b2e7d1', '2018', 'Lidero un equipo de 15'),
			C('71ac4f0', '2016', 'Explore & Share: migración'),
			C('47c0a9f', '2015', 'WordPress a escala, EE. UU.'),
			C('b26e1d8', '2013', 'Backends en PHP y MySQL'),
			C('3e8f1b2', '2010', 'Descubro WordPress'),
			C('6f3b0c5', '2008', 'login: de un .txt a MySQL'),
			C('2c7d4e9', '2008', 'De Flash a PHP y JavaScript'),
			C('0d1a2b3', '2005', 'init: diseño, fotos y <table>'),
			{ t: [['m', '(END)']], mode: 'print', wait: 500 },
			{ t: [['v', '']], mode: 'print', wait: 250 },
			{ t: [...P('~/ilan'), ['w', 'git switch -c tu-proyecto']], speed: 45 },
			{
				t: [
					['m', "Switched to a new branch '"],
					['br', 'tu-proyecto'],
					['m', "'"],
				],
				mode: 'print',
				wait: 380,
			},
			{ t: [...P('~/ilan'), ['w', 'git commit -m "init"']], speed: 50 },
			{ t: [['c', '# ¿lo escribimos juntos?']], mode: 'print', wait: 420 },
		],
	},
	{
		id: 'claude',
		lines: [
			{ t: [...P('~/ilan'), ['w', 'claude -p "bajá el LCP de la home"']], speed: 38 },
			{
				t: [
					['f', '  • '],
					['v', 'Leyendo src/pages/index.astro…'],
				],
				mode: 'print',
				wait: 520,
			},
			{
				t: [
					['f', '  • '],
					['v', 'LCP actual: '],
					['o', '3,4 s'],
					['m', ' en mobile'],
				],
				mode: 'print',
				wait: 620,
			},
			{ t: [['m', '  ✎ index.astro']], mode: 'print', wait: 520 },
			{
				t: [
					['o', '- '],
					['v', '<img src="hero.jpg">'],
				],
				mode: 'print',
				wait: 380,
				kind: 'del',
			},
			{
				t: [
					['ok', '+ '],
					['v', '<img src="hero.avif" fetchpriority="high">'],
				],
				mode: 'print',
				wait: 300,
				kind: 'add',
			},
			{
				t: [
					['ok', '+ '],
					['v', '<link rel="preload" as="image" …>'],
				],
				mode: 'print',
				wait: 200,
				kind: 'add',
			},
			{
				t: [
					['ok', '  ✓ '],
					['v', 'LCP '],
					['o', '3,4 s'],
					['m', ' → '],
					['y', '1,2 s'],
					['m', ' · tests ok'],
				],
				mode: 'print',
				wait: 750,
			},
			{ t: [['v', '']], mode: 'print', wait: 200 },
			{ t: [...P('~/ilan'), ['w', 'git commit -m "perf: hero AVIF"']], speed: 40 },
		],
	},
]

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

export function initTerminal(root: HTMLElement) {
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
		const cursor = '<span class="t-cursor"></span>'
		const scrollEnd = () => {
			if (body) body.scrollTop = body.scrollHeight
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
