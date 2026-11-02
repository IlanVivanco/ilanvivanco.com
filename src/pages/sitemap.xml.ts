import type { APIRoute } from 'astro';
import { site } from '../data/site';

const pages = ['/', '/curriculum', '/portfolio', '/contacto', '/sobre-mi'];

export const GET: APIRoute = () => {
  const urls = pages
    .map((p) => `<url><loc>${new URL(p, site.url).href}</loc></url>`)
    .join('');
  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`,
    { headers: { 'Content-Type': 'application/xml' } },
  );
};
