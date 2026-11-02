// @ts-check
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://ilanvivanco.com',
  trailingSlash: 'never',
  build: {
    // Todo el CSS va inline: cero requests bloqueantes en el primer render.
    inlineStylesheets: 'always',
    format: 'file',
  },
  compressHTML: true,
});
