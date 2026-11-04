// Genera variantes de cada captura de public/img/projects para el srcset. Solo recrea las que faltan o quedaron viejas.
import { readdir, stat } from 'node:fs/promises'
import sharp from 'sharp'

const DIR = 'public/img/projects'
const WIDTHS = [480, 720]
const isVariant = (f) => WIDTHS.some((w) => f.endsWith(`-${w}.webp`))
const mtime = (f) =>
	stat(f).then(
		(s) => s.mtimeMs,
		() => 0
	)

let made = 0
for (const file of (await readdir(DIR, { recursive: true })).filter((f) => f.endsWith('.webp') && !isVariant(f))) {
	const source = `${DIR}/${file}`
	for (const width of WIDTHS) {
		const target = source.replace(/\.webp$/, `-${width}.webp`)
		if ((await mtime(target)) >= (await mtime(source))) continue
		await sharp(source).resize({ width }).webp({ quality: 75 }).toFile(target)
		made++
	}
}
console.log(`✓ Capturas: ${made} variantes nuevas`)
