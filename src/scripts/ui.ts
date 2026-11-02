// Animaciones sutiles con Motion mini (animate sobre WAAPI) + APIs nativas.
import { animate } from 'motion/mini';

const root = document.documentElement;
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
const finePointer = matchMedia('(hover: hover) and (pointer: fine)').matches;
const ease = [0.22, 1, 0.36, 1] as const;

function onView(el: Element, cb: () => void, margin = '0px 0px -12% 0px') {
  const io = new IntersectionObserver(
    (entries) => {
      if (entries.some((e) => e.isIntersecting)) {
        io.disconnect();
        cb();
      }
    },
    { rootMargin: margin },
  );
  io.observe(el);
}

/* 1. Revelado al entrar en pantalla. Usa `translate` (no `transform`) para no pisar la perspectiva de las tarjetas. */
function reveal(el: HTMLElement, delay: number) {
  el.classList.add('is-revealing');
  const anim = animate(el, { opacity: [0, 1], translate: ['0 14px', '0 0'] }, { duration: 0.7, ease, delay });
  const done = () => {
    el.classList.add('is-in');
    el.classList.remove('is-revealing');
    el.style.removeProperty('opacity');
    el.style.removeProperty('translate');
  };
  Promise.resolve((anim as any).finished ?? anim).then(done, done);
}

function setupReveal() {
  const all = document.querySelectorAll<HTMLElement>('[data-reveal]');
  if (reduce) {
    all.forEach((el) => el.classList.add('is-in'));
    return;
  }
  document.querySelectorAll<HTMLElement>('[data-reveal-group]').forEach((group) => {
    const items = [...group.querySelectorAll<HTMLElement>('[data-reveal]')];
    items.forEach((el) => (el.dataset.grouped = ''));
    onView(group, () => items.forEach((el, i) => reveal(el, i * 0.07)));
  });
  all.forEach((el) => {
    if (el.dataset.grouped !== undefined) return;
    onView(el, () => reveal(el, Number(el.dataset.delay || 0)));
  });
}

/* 2. Tarjetas: glow que sigue al puntero, borde que se ilumina por proximidad
      y una perspectiva sutil en todas. Las tarjetas grandes se inclinan menos. */
function setupCards() {
  if (!finePointer) return;
  const R = 170; // radio de proximidad en px
  const MAX = reduce ? 0 : 5; // grados máximos de inclinación
  let px = -1e5;
  let py = -1e5;
  let raf = 0;
  const clamp = (n: number) => Math.max(-0.5, Math.min(0.5, n));

  const frame = () => {
    raf = 0;
    document.querySelectorAll<HTMLElement>('.card').forEach((c) => {
      const r = c.getBoundingClientRect();
      if (r.bottom < -R || r.top > innerHeight + R) return;
      const dx = Math.max(r.left - px, 0, px - r.right);
      const dy = Math.max(r.top - py, 0, py - r.bottom);
      const dist = Math.hypot(dx, dy);
      const inside = dist === 0;
      const near = Math.max(0, 1 - dist / R);

      c.style.setProperty('--mx', `${(px - r.left).toFixed(1)}px`);
      c.style.setProperty('--my', `${(py - r.top).toFixed(1)}px`);
      c.style.setProperty('--glow', near.toFixed(3));
      c.classList.toggle('is-hover', inside);

      if (MAX && c.dataset.tilt !== 'off') {
        const size = Math.max(r.width, r.height);
        const k = (inside ? 1 : near * 0.35) * Math.min(1, Math.max(0.3, 380 / size));
        const nx = clamp((px - r.left) / r.width - 0.5);
        const ny = clamp((py - r.top) / r.height - 0.5);
        c.style.setProperty('--rx', `${(-ny * MAX * k).toFixed(2)}deg`);
        c.style.setProperty('--ry', `${(nx * MAX * k).toFixed(2)}deg`);
        c.style.setProperty('--lift', inside ? `${(-4 * Math.min(1, 380 / size)).toFixed(1)}px` : '0px');
        c.classList.toggle('is-tracking', near > 0);
      }
    });
  };
  const schedule = () => {
    if (!raf) raf = requestAnimationFrame(frame);
  };
  addEventListener('pointermove', (e) => { px = e.clientX; py = e.clientY; schedule(); }, { passive: true });
  addEventListener('scroll', schedule, { passive: true });
  document.documentElement.addEventListener('pointerleave', () => { px = py = -1e5; schedule(); });
}

/* 3. Header con fondo al hacer scroll. */
function setupHeader() {
  const header = document.querySelector<HTMLElement>('[data-header]');
  if (!header) return;
  let ticking = false;
  const update = () => {
    header.toggleAttribute('data-scrolled', scrollY > 8);
    ticking = false;
  };
  addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } }, { passive: true });
  update();
}

/* 4. Cerrar el menú móvil al elegir un link. */
function setupMenu() {
  const menu = document.getElementById('mobile-menu') as (HTMLElement & { hidePopover?: () => void }) | null;
  menu?.addEventListener('click', (e) => {
    if ((e.target as HTMLElement).closest('a')) menu.hidePopover?.();
  });
}

setupReveal();
setupCards();
setupHeader();
setupMenu();
root.classList.add('ui-ready');
