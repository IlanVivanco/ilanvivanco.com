// Idiomas del sitio y textos del layout. Las rutas de cada idioma viven en src/data/pages.ts.
import { en } from './en.ts'
import { es } from './es.ts'

export type Lang = 'es' | 'en'

const strings = { es, en }

export const ui = (locale?: string) => strings[locale as keyof typeof strings] ?? strings.es

// Datos con una versión por idioma: hasta que exista la versión en inglés, cae en español.
export const byLang = <T>(map: { es: T; en?: T }, locale?: string): T => map[locale as Lang] ?? map.es
