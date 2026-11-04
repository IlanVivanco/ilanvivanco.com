// @ts-check
import { defineConfig } from 'astro/config'
import { satteri } from '@astrojs/markdown-satteri'
import { postMarkdown } from './scripts/build/post-markdown.mjs'

export default defineConfig({
	site: 'https://ilanvivanco.com',
	trailingSlash: 'never',
	i18n: {
		locales: ['es', 'en'],
		defaultLocale: 'es',
		routing: { prefixDefaultLocale: false },
	},
	build: {
		// Todo el CSS va inline: cero requests bloqueantes en el primer render.
		inlineStylesheets: 'always',
		format: 'file',
	},
	compressHTML: true,
	markdown: { processor: satteri({ hastPlugins: [postMarkdown] }) },
})
