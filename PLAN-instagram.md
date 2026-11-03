# Instagram (Fase 1B)

**Estado: implementado.**

## Cómo funciona

1. [Behold](https://behold.so/docs/json-feeds) conecta la cuenta `@ilanvivanco` y maneja la API de Instagram y el token. El plan gratis da hasta 6 posts en una URL JSON (`site.instagramFeed`).
2. En cada build, `scripts/build/instagram.mjs` lee esa URL, baja las fotos a `public/img/instagram/` como WebP de 480 px y genera `src/data/instagram.generated.json`. Nada de esto se versiona.
3. `components/InstagramGrid.astro` las muestra en "Fuera del código", en `/sobre-mi`, con link al post y hasta 2 hashtags. Es HTML estático: el navegador no contacta a Instagram ni a Behold, y no suma JS.
4. `netlify/functions/rebuild.mjs` regenera el sitio una vez por semana.

Las fotos se publican solas, sin revisión. Por eso no se muestra el caption: podría nombrar a alguien de la familia.

Si Behold o Instagram fallan, el build sigue y `/sobre-mi` se publica sin la grilla, hasta el próximo build.

## Rebuild semanal

Usa el build hook de `main` guardado en la variable `REBUILD_HOOK_URL` de Netlify. Sin ella, la función no hace nada y las fotos solo se actualizan con cada deploy.

## Si cambia Behold

Si el plan gratis deja de servir, solo hay que reemplazar `site.instagramFeed` por otra fuente y adaptar `scripts/build/instagram.mjs`. La cuenta tiene que seguir siendo profesional: Instagram no da API para cuentas personales.
