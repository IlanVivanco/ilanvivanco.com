// Escenas de la terminal del hero, en español. El contenido sale del CV real.
import type { Line, Scene, Tok } from './terminal'

const P = (path: string): Tok[] => [
	['pr', '$ '],
	['m', `${path} `],
]
const C = (hash: string, year: string, msg: string, head = false): Line => ({
	t: [['y', '* '], ['h', hash], ...(head ? ([['br', ' (HEAD)']] as Tok[]) : []), ['m', ` ${year} `], ['v', msg]],
	mode: 'print',
	wait: head ? 420 : 170,
})

export const scenes: Scene[] = [
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
					['v', ': '],
					['s', "'mate'"],
					['v', ','],
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
