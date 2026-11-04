import { defineCollection } from 'astro:content'
import { glob } from 'astro/loaders'

// Solo el cuerpo de cada post: los metadatos están en src/data/posts.ts.
export const collections = {
	blog: defineCollection({ loader: glob({ pattern: '*.md', base: './src/content/blog' }) }),
}
