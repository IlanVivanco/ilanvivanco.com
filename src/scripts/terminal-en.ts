// Escenas de la terminal del hero, en inglés. El contenido sale del CV real.
import { C, P, type Scene } from './terminal'

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
					['p', 'role'],
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
					['p', 'since'],
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
					['p', 'remote'],
					['v', ': '],
					['k', 'true'],
					['v', ','],
				],
				speed: 22,
			},
			{
				t: [
					['v', '  '],
					['p', 'fuel'],
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
					['f', 'contact'],
					['v', '();'],
					['c', ' // shall we build something?'],
				],
				speed: 30,
			},
		],
	},
	{
		id: 'git log',
		lines: [
			{ t: [...P('~/ilan'), ['w', 'git log --oneline carrera']], speed: 38 },
			C('e4b9a07', '2026', 'AI: agents, MCP, and QA', true),
			C('c81f2d4', '2021', 'Construye Mundo: Drupal→WP'),
			C('a1f3c2e', '2020', 'CTO and partner at EpicDevs'),
			C('5d0e9b3', '2020', 'WP Offload Media (Delicious)'),
			C('9b2e7d1', '2018', 'Leading a team of 15'),
			C('71ac4f0', '2016', 'Explore & Share: migration'),
			C('47c0a9f', '2015', 'WordPress at scale, U.S.'),
			C('b26e1d8', '2013', 'Backends in PHP and MySQL'),
			C('3e8f1b2', '2010', 'Discovering WordPress'),
			C('6f3b0c5', '2008', 'login: from a .txt to MySQL'),
			C('2c7d4e9', '2008', 'From Flash to PHP and JavaScript'),
			C('0d1a2b3', '2005', 'init: design, photos, <table>'),
			{ t: [['m', '(END)']], mode: 'print', wait: 500 },
			{ t: [['v', '']], mode: 'print', wait: 250 },
			{ t: [...P('~/ilan'), ['w', 'git switch -c your-project']], speed: 45 },
			{
				t: [
					['m', "Switched to a new branch '"],
					['br', 'your-project'],
					['m', "'"],
				],
				mode: 'print',
				wait: 380,
			},
			{ t: [...P('~/ilan'), ['w', 'git commit -m "init"']], speed: 50 },
			{ t: [['c', '# shall we write it together?']], mode: 'print', wait: 420 },
		],
	},
	{
		id: 'claude',
		lines: [
			{ t: [...P('~/ilan'), ['w', 'claude -p "lower the home page LCP"']], speed: 38 },
			{
				t: [
					['f', '  • '],
					['v', 'Reading src/pages/index.astro…'],
				],
				mode: 'print',
				wait: 520,
			},
			{
				t: [
					['f', '  • '],
					['v', 'Current LCP: '],
					['o', '3.4 s'],
					['m', ' on mobile'],
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
					['o', '3.4 s'],
					['m', ' → '],
					['y', '1.2 s'],
					['m', ' · tests pass'],
				],
				mode: 'print',
				wait: 750,
			},
			{ t: [['v', '']], mode: 'print', wait: 200 },
			{ t: [...P('~/ilan'), ['w', 'git commit -m "perf: hero AVIF"']], speed: 40 },
		],
	},
]
