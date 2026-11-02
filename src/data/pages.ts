// Páginas públicas del sitio: alimentan el sitemap y las imágenes OG.
// Las URLs son contrato: cambiar una implica un redirect 301 en netlify.toml.

export type PublicPage = { path: string; slug: string; fn: string; title: string; subtitle: string };

export const publicPages: PublicPage[] = [
  { path: '/', slug: 'home', fn: 'hola_mundo', title: 'Ilán Vivanco', subtitle: 'CTO en EpicDevs' },
  { path: '/curriculum', slug: 'curriculum', fn: 'mi_historial', title: 'Mi CV', subtitle: 'CTO / Director of Engineering' },
  { path: '/portfolio', slug: 'portfolio', fn: 'portfolio', title: 'Trabajos', subtitle: 'Plataformas y sitios en producción' },
  { path: '/sobre-mi', slug: 'sobre-mi', fn: 'más_info_sobre_mí', title: 'Más sobre mí', subtitle: 'De Buenos Aires a Santander' },
  { path: '/contacto', slug: 'contacto', fn: 'contactame', title: '¿Hacemos algo juntos?', subtitle: 'Respondo en uno o dos días hábiles' },
  { path: '/privacidad', slug: 'privacidad', fn: 'privacidad', title: 'Privacidad y aviso legal', subtitle: 'Qué datos se usan y para qué' },
];

// La home usa la imagen original; el resto se genera en el build. Sin página propia (404), la original.
export const ogPath = (path: string) => {
  const page = publicPages.find((p) => p.path === path);
  return !page || page.path === '/' ? '/og.png' : `/og/${page.slug}.png`;
};
