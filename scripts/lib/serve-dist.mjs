// Servidor estático mínimo de dist/ para los scripts que usan Playwright.
// Resuelve las URLs sin extensión igual que Netlify (build.format: 'file').
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { extname, join, normalize } from 'node:path';

const TYPES = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript', '.svg': 'image/svg+xml', '.png': 'image/png', '.webp': 'image/webp', '.woff2': 'font/woff2', '.pdf': 'application/pdf', '.xml': 'application/xml', '.txt': 'text/plain' };

export async function serveDist(dist = 'dist') {
  const server = createServer(async (req, res) => {
    const path = normalize(decodeURIComponent(new URL(req.url, 'http://x').pathname)).replace(/^(\.\.[/\\])+/, '');
    const candidates = path === '/' ? ['index.html'] : [path, `${path}.html`];
    for (const c of candidates) {
      try {
        const body = await readFile(join(dist, c));
        res.writeHead(200, { 'Content-Type': TYPES[extname(c)] ?? 'application/octet-stream' });
        return res.end(body);
      } catch {}
    }
    res.writeHead(404, { 'Content-Type': TYPES['.html'] });
    res.end(await readFile(join(dist, '404.html')).catch(() => 'not found'));
  });
  await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
  return { url: `http://127.0.0.1:${server.address().port}`, close: () => server.close() };
}
