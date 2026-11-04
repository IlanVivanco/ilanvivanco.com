import { defineCollection } from 'astro:content'
import { glob } from 'astro/loaders'
import { z } from 'astro/zod'

const day = z.string().regex(/^\d{4}-\d{2}-\d{2}$/)

// Valida el front matter: src/data/posts.ts lo lee por su cuenta para lo que corre fuera de Astro.
export const collections = {
	blog: defineCollection({
		loader: glob({ pattern: '*.md', base: './src/content/blog' }),
		schema: z.object({
			title: z.string(),
			subtitle: z.string(),
			description: z.string(),
			date: day,
			updated: day,
			image: z.string().startsWith('/img/blog/'),
			imageAlt: z.string(),
			ctaTitle: z.string(),
			ctaLabel: z.string(),
		}),
	}),
}
