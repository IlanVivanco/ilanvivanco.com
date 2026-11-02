// Currículum. Fuente: LinkedIn (2026) + CV del sitio anterior.

export const summary =
  'Lidero la ingeniería en EpicDevs, donde construimos y operamos plataformas web para empresas de tecnología, universidades y ONG. Mi trabajo es la arquitectura y el equipo detrás: decidir cómo se construye una plataforma, mantenerla rápida y mantenible mientras crece, y ayudar a un equipo repartido por el mundo a entregarla bien.';

export type Role = { title: string; period: string; place?: string; text: string };
export type Job = { org: string; meta?: string; url?: string; roles: Role[] };

export const experience: Job[] = [
  {
    org: 'EpicDevs',
    meta: 'Antes Networks That Matter · Remoto',
    url: 'https://epicdevs.com',
    roles: [
      {
        title: 'CTO / Director of Engineering · Socio',
        period: 'sep 2020 — hoy',
        place: 'Santander, España',
        text: 'Arquitectura técnica, procesos de ingeniería y estrategia tecnológica de las plataformas de los clientes, y liderazgo de un equipo remoto distribuido. Foco en WordPress como núcleo, JavaScript moderno, IA en el flujo de trabajo (agentes de código, MCP, QA asistido), integraciones, migraciones y rendimiento.',
      },
      {
        title: 'Lead Full-stack WordPress Developer · Project Manager',
        period: 'mar 2018 — sep 2020',
        place: 'Puerto Madryn, Argentina',
        text: 'Lideré un equipo de 15 personas construyendo plataformas, themes y plugins de WordPress para clientes de EE. UU. Combiné desarrollo con planificación técnica: arquitectura, integraciones, alcance, tiempos y coordinación entre diseño, ingeniería y stakeholders.',
      },
      {
        title: 'Full-stack WordPress Developer',
        period: 'jun 2015 — mar 2018',
        place: 'Puerto Madryn, Argentina',
        text: 'Plataformas, themes y plugins a medida para clientes internacionales, de frontend a backend: migraciones y arquitecturas CMS escalables.',
      },
    ],
  },
  {
    org: 'Construye Mundo ONGD',
    meta: 'Freelance · Remoto',
    roles: [
      {
        title: 'WordPress Developer',
        period: 'abr 2021 — hoy',
        text: 'Migración del sitio de Drupal a WordPress para mejorar la gestión y la accesibilidad. Desarrollo, actualizaciones y administración del contenido.',
      },
    ],
  },
  {
    org: 'Delicious Brains',
    roles: [
      {
        title: 'Software Developer',
        period: 'abr 2020 — ago 2020',
        text: 'Trabajo sobre WP Offload Media (Pro y Lite), el plugin que lleva los medios de WordPress a almacenamiento en la nube, con foco en la experiencia de usuario. Soporte técnico y contenido del blog del producto.',
      },
    ],
  },
  {
    org: 'Explore-Share',
    meta: 'Part-time',
    roles: [
      {
        title: 'Senior Web Developer y Team Leader',
        period: 'dic 2016 — ago 2018',
        text: 'Desarrollo y mantenimiento de explore-share.com. Migración a WordPress desde la plataforma anterior, theme y plugins a medida.',
      },
    ],
  },
  {
    org: 'Freelance',
    meta: 'Buenos Aires · Remoto',
    roles: [
      {
        title: 'Full-stack Developer independiente',
        period: 'oct 2006 — jun 2020',
        text: 'Sitios a medida, plataformas CMS y soluciones digitales para agencias y clientes directos. Desarrollo en PHP, CMS a medida y los primeros proyectos en WordPress que después crecieron a plataformas grandes.',
      },
    ],
  },
];

// Antes de 2015 (del CV anterior), se muestra plegado.
export const earlier = [
  { org: 'Magissim', title: 'Web developer y diseñador', period: '2014 — 2018', text: 'Sitios para el mercado europeo con WordPress, PrestaShop y Laravel.' },
  { org: 'Activar Comunicación', title: 'Web developer y diseñador', period: '2013 — 2014', text: 'Backends a medida en PHP y MySQL; sitios en WordPress.' },
  { org: 'Mendióroz Diseño', title: 'Diseñador gráfico', period: '2011 — 2013', text: 'Señalética, documentación técnica, ilustración 3D y proyectos web.' },
  { org: 'Exastudio', title: 'Diseñador y desarrollador web', period: '2008 — 2010', text: 'Primeros sitios complejos, piezas publicitarias e identidades corporativas.' },
  { org: 'NewPrint', title: 'Diseñador gráfico', period: '2007 — 2008', text: 'Preimpresión y atención a clientes.' },
  { org: 'Gilardoni & Asoc.', title: 'Asistente de fotografía y diseñador', period: '2005 — 2007', text: 'Retoque de imagen y los primeros sitios en HTML y CSS.' },
];

export const stack = [
  { group: 'Plataforma', items: ['WordPress', 'WooCommerce', 'Gutenberg', 'PHP', 'MySQL', 'Laravel'] },
  { group: 'Frontend', items: ['JavaScript / TypeScript', 'Vue', 'Nuxt', 'React', 'Astro', 'Tailwind CSS', 'Sass'] },
  { group: 'Backend e integraciones', items: ['Node.js', 'REST APIs', 'n8n', 'Stripe', 'PayPal', 'HubSpot'] },
  { group: 'IA', items: ['Agentes de código', 'MCP', 'QA asistido por IA', 'Automatizaciones'] },
  { group: 'Infra y flujo', items: ['Git', 'GitHub Actions', 'Docker', 'Cloudflare', 'AWS', 'WP Engine', 'Pantheon', 'Netlify'] },
];

export const education = [
  { org: 'Escuela de Fotografía Creativa Andy Goldstein', title: 'Técnico en Fotografía', period: '2007 — 2010' },
  { org: 'Escuelas Técnicas Raggio', title: 'Técnico en Comunicación Publicitaria', period: '2001 — 2006' },
];

export const languages = [
  { name: 'Español', level: 'Nativo' },
  { name: 'Inglés', level: 'Fluido' },
];
