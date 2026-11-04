// Idiomas del sitio y textos del layout. Las rutas de cada idioma viven en src/data/pages.ts.
import { es } from './es.ts'

export type Lang = 'es' | 'en'

// `en` se suma con sus páginas: hasta entonces, cualquier idioma cae en español.
const strings = { es }

export const ui = (locale?: string) => strings[locale as keyof typeof strings] ?? strings.es
