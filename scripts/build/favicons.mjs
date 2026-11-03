// Genera los favicons en PNG e ICO desde public/favicon.svg. Se versionan: correr solo si cambia el logo.
import { readFile, writeFile } from 'node:fs/promises'
import sharp from 'sharp'

const svg = await readFile('public/favicon.svg')
const BG = '#0A111F'

// Logo centrado; con fondo donde el sistema no admite transparencia (iOS, íconos instalables).
const icon = async (size, { bg, scale }) => {
	const logo = await sharp(svg, { density: 1200 })
		.resize({ width: Math.round(size * scale) })
		.png()
		.toBuffer()
	return sharp({
		create: { width: size, height: size, channels: 4, background: bg ?? { r: 0, g: 0, b: 0, alpha: 0 } },
	})
		.composite([{ input: logo }])
		.png({ compressionLevel: 9 })
		.toBuffer()
}

await writeFile('public/apple-touch-icon.png', await icon(180, { bg: BG, scale: 0.68 }))
await writeFile('public/icon-192.png', await icon(192, { bg: BG, scale: 0.68 }))
await writeFile('public/icon-512.png', await icon(512, { bg: BG, scale: 0.68 }))

// ICO con los PNG adentro, que los navegadores actuales leen sin problema.
const sizes = [16, 32, 48]
const pngs = await Promise.all(sizes.map((s) => icon(s, { scale: 1 })))
const header = Buffer.alloc(6 + 16 * sizes.length)
header.writeUInt16LE(1, 2)
header.writeUInt16LE(sizes.length, 4)
let offset = header.length
sizes.forEach((s, i) => {
	const entry = 6 + 16 * i
	header.writeUInt8(s, entry)
	header.writeUInt8(s, entry + 1)
	header.writeUInt16LE(1, entry + 4)
	header.writeUInt16LE(32, entry + 6)
	header.writeUInt32LE(pngs[i].length, entry + 8)
	header.writeUInt32LE(offset, entry + 12)
	offset += pngs[i].length
})
await writeFile('public/favicon.ico', Buffer.concat([header, ...pngs]))
console.log('✓ Favicons')
