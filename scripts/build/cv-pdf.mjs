// Genera el CV en PDF desde /cv/<idioma> del build. Uso: npm run cv:pdf [-- es en]
// Sale a public/cv/ (para los próximos builds y `astro dev`) y a dist/cv/ (para este deploy).
import { copyFile, mkdir } from 'node:fs/promises';
import { chromium } from 'playwright';
import { PDFDocument } from 'pdf-lib';
import { readFile, writeFile } from 'node:fs/promises';
import { cv, cvLabels } from '../../src/data/cv.ts';
import { site } from '../../src/data/site.ts';
import { serveDist } from '../lib/serve-dist.mjs';

const args = process.argv.slice(2);
const langs = args.length ? args : Object.keys(cv);

const server = await serveDist();
const browser = await chromium.launch();
try {
  await mkdir('public/cv', { recursive: true });
  await mkdir('dist/cv', { recursive: true });
  for (const lang of langs) {
    const file = `ilan-vivanco-cv-${lang}.pdf`;
    const page = await browser.newPage();
    const res = await page.goto(`${server.url}/cv/${lang}`, { waitUntil: 'networkidle' });
    if (!res.ok()) throw new Error(`/cv/${lang} respondió ${res.status()}`);
    await page.evaluate(() => document.fonts.ready);
    const title = await page.title();
    await page.pdf({ path: `public/cv/${file}`, format: 'A4', tagged: true, outline: true, printBackground: true, preferCSSPageSize: true });
    await page.close();

    // Chromium solo escribe el título: el resto de los metadatos se agregan acá.
    const pdf = await PDFDocument.load(await readFile(`public/cv/${file}`), { updateMetadata: false });
    pdf.setTitle(title);
    pdf.setAuthor(site.name);
    pdf.setSubject(cvLabels[lang].title);
    pdf.setCreator(site.url);
    await writeFile(`public/cv/${file}`, await pdf.save({ useObjectStreams: false }));

    await copyFile(`public/cv/${file}`, `dist/cv/${file}`);
    console.log(`✓ public/cv/${file}`);
  }
} finally {
  await browser.close();
  server.close();
}
