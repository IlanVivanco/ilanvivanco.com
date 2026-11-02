// Interacciones con movimiento normal: el análisis de páginas de check.mjs usa movimiento reducido y no las ejercita.
const STAT_INTERVAL = 5600

async function checkFilter(browser, base, log) {
	const page = await browser.newPage({ viewport: { width: 1280, height: 800 } })
	await page.goto(`${base}/portfolio`, { waitUntil: 'networkidle' })
	const state = () =>
		page.evaluate(() => ({
			arg: document.querySelector('[data-cmd-arg]').textContent,
			pressed: document.querySelector('.filter[aria-pressed="true"]').dataset.filter,
			count: document.querySelector('[data-count]').textContent,
			rows: [...document.querySelectorAll('[data-item]')].filter((li) => !li.hidden).length,
		}))
	const total = (await state()).rows

	await page.locator('[data-filter="Migración"]').click()
	await page.waitForTimeout(900)
	const one = await state()
	log(one.rows < total && String(one.rows) === one.count, `filtro: muestra ${one.rows} de ${total} proyectos`)

	await page.locator('[data-filter=""]').click()
	await page.waitForTimeout(900)
	// Dos clicks seguidos: gana el último
	await page.evaluate(() => {
		document.querySelector('[data-filter="Migración"]').click()
		document.querySelector('[data-filter=""]').click()
	})
	await page.waitForTimeout(900)
	const raced = await state()
	log(
		raced.pressed === '' && raced.arg === '' && raced.rows === total,
		`filtro: el último click gana (${raced.rows} filas)`
	)
	await page.close()
}

async function checkStats(browser, base, log) {
	const page = await browser.newPage({ viewport: { width: 1280, height: 800 } })
	await page.goto(`${base}/`, { waitUntil: 'networkidle' })
	const dot = page.locator('[data-screen-btn="0"]')
	const onFirst = () => dot.getAttribute('aria-pressed').then((v) => v === 'true')
	await dot.scrollIntoViewIfNeeded()
	await page.keyboard.press('Tab')
	await dot.focus()
	const box = await page.locator('.stats-grid').boundingBox()
	await page.mouse.move(box.x + 20, box.y + 20)
	await page.waitForTimeout(100)
	await page.mouse.move(2, 2)
	await page.waitForTimeout(STAT_INTERVAL + 600)
	const focused = await dot.evaluate((el) => el.matches(':focus-visible'))
	log(focused && (await onFirst()), 'stats: el foco de teclado pausa, aunque el mouse entre y salga')
	await dot.evaluate((el) => el.blur())
	await page.waitForTimeout(STAT_INTERVAL + 600)
	log(!(await onFirst()), 'stats: sin foco ni mouse vuelve a rotar')
	await page.close()
}

async function checkMenu(browser, base, axeSource, axeTags, log) {
	const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true })
	const page = await ctx.newPage()
	await page.goto(`${base}/`, { waitUntil: 'networkidle' })
	const opener = page.locator('.bar .menu-btn')
	const inMenu = () => page.evaluate(() => !!document.activeElement?.closest('#mobile-menu'))
	await opener.click()
	await page.waitForTimeout(450)
	log(await inMenu(), 'menú: al abrirlo, el foco entra')

	await page.addScriptTag({ content: axeSource })
	const violations = await page.evaluate(async (tags) => {
		const r = await window.axe.run(document, { runOnly: { type: 'tag', values: tags } })
		return r.violations.map((v) => `${v.id}: ${v.nodes[0].target.join(' ')}`)
	}, axeTags)
	log(violations.length === 0, `menú abierto: axe ${violations.length ? violations.join(' | ') : 'ok'}`)

	const focusable = await page.locator('#mobile-menu a, #mobile-menu button').count()
	const behind = []
	for (let i = 0; i < focusable + 3; i++) {
		await page.keyboard.press('Tab')
		const leaked = await page.evaluate(() => {
			const el = document.activeElement
			return el && el !== document.body && !el.closest('#mobile-menu') ? el.outerHTML.slice(0, 60) : null
		})
		if (leaked) behind.push(leaked)
	}
	log(behind.length === 0, `menú: Tab no llega al contenido de atrás${behind.length ? ': ' + behind[0] : ''}`)

	await page.keyboard.press('Escape')
	await page.waitForTimeout(450)
	const closed = await page.evaluate(() => ({
		open: document.querySelector('#mobile-menu').matches(':popover-open'),
		inert: document.querySelector('main').inert,
		onOpener: document.activeElement === document.querySelector('.bar .menu-btn'),
	}))
	log(!closed.open && !closed.inert && closed.onOpener, 'menú: Esc lo cierra, y el foco vuelve al botón')
	await ctx.close()
}

export async function runInteractionChecks(browser, base, axeSource, axeTags, log) {
	await checkFilter(browser, base, log)
	await checkStats(browser, base, log)
	await checkMenu(browser, base, axeSource, axeTags, log)
}
