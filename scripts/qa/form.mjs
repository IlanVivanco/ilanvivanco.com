// Recorre la consola de /contacto por teclado con Netlify simulado: el POST real se prueba en el deploy preview.
const answer = async (page, selector, value) => {
  await page.locator(selector).fill(value);
  await page.keyboard.press('Enter');
};

async function submit(ctx, base, status) {
  const page = await ctx.newPage();
  const posts = [];
  await page.route(`${base}/`, (route) => {
    if (route.request().method() !== 'POST') return route.continue();
    posts.push({ type: route.request().headers()['content-type'], body: route.request().postData() });
    return route.fulfill({ status, body: '' });
  });
  await page.goto(`${base}/contacto`, { waitUntil: 'networkidle' });
  await answer(page, '#f-name', 'Ada Lovelace');
  await answer(page, '#f-email', 'ada@example.com');
  await page.locator('input[name=tema]:checked').focus();
  await page.keyboard.press('Enter');
  await answer(page, '#f-msg', 'Mensaje de prueba');
  return { page, posts };
}

export async function runFormChecks(ctx, base, email, log) {
  const ok = await submit(ctx, base, 200);
  await ok.page.getByText('200 OK').waitFor({ timeout: 5000 });
  const sent = new URLSearchParams(ok.posts[0]?.body ?? '');
  log(ok.posts.length === 1 && ok.posts[0].type === 'application/x-www-form-urlencoded', 'form: un POST urlencoded a /');
  log(sent.get('form-name') === 'contact-form' && sent.get('name') === 'Ada Lovelace' && sent.get('email') === 'ada@example.com' && sent.get('message') === 'Mensaje de prueba' && !!sent.get('tema') && sent.get('fake') === '', 'form: campos del POST');
  await ok.page.close();

  const failed = await submit(ctx, base, 500);
  const link = failed.page.locator('[data-out] a[href^="mailto:"]');
  await link.waitFor({ timeout: 5000 });
  log((await link.textContent()) === email, 'form: si falla, ofrece el email');
  await failed.page.close();
}
