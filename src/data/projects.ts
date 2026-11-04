// Portfolio. Los case studies (`study`) tienen página propia en /portfolio/<slug>; el resto es una fila del índice.
// Imágenes: portada en public/img/projects/<slug>.webp y el resto en public/img/projects/<slug>/<archivo>.webp.

export type StudyStep = {
	title: string
	text: string
	shot?: string // archivo, sin extensión
}
export type Study = {
	tagline: string
	stack: string[]
	lead: string
	start: string
	steps: StudyStep[]
	figures: string[]
	hero: string
}
export type Project = {
	slug: string
	name: string
	url?: string
	urlLabel?: string
	post?: string // post del blog que amplía el proyecto
	date: string // YYYY-MM: orden y rango del índice
	period: string // lo que se muestra
	role: string
	description: string
	tags: string[]
	featured?: boolean // el que se destaca en la home
	image?: string // por defecto /img/projects/<slug>.webp
	gallery?: string[] // filas: capturas extra
	galleryNote?: string
	study?: Study
}

export const projects: Project[] = [
	{
		slug: 'tempo',
		name: 'Tempo Communications',
		url: 'https://www.tempocom.com/',
		date: '2025-08',
		period: 'desde 2025',
		role: 'Tech lead y PM. Planifiqué el proyecto y armé la extracción de datos y el importador del catálogo.',
		description:
			'Contenido en WordPress, catálogo en Craft y venta en Shopify. Los unimos en un solo sitio nuevo, sin sacar a Shopify de la venta.',
		tags: ['Case study', 'WordPress', 'Shopify', 'Migración', 'Integración'],
		featured: true,
		study: {
			tagline: 'Catálogo, contenido y tienda en un solo sitio',
			stack: ['WordPress', 'Elementor', 'Shopify', 'Node.js'],
			lead: 'El contenido estaba en WordPress, el catálogo en Craft y la venta en Shopify. Los unimos en un sitio nuevo, sin sacar a Shopify de la venta.',
			start: 'El WordPress anterior leía el catálogo desde Craft, y esa dependencia era frágil. Shopify tenía que quedarse, porque ya estaba integrado con los sistemas de la empresa. A Craft, en cambio, había que sacarle la información y mapearla bien.',
			hero: 'home-contexto',
			steps: [
				{
					title: 'Primero, una copia',
					text: 'Antes de tocar nada, migré el sitio a un entorno aparte, para analizarlo y exportar sin riesgo. Eso confirmó que convenía construir desde cero.',
				},
				{
					title: 'Una planilla como fuente de verdad',
					text: 'Crucé varios exports en una planilla maestra, donde el equipo de Tempo pudo trabajar las categorías nuevas.',
				},
				{
					title: 'Un importador antes que la carga manual',
					text: 'Escribí una herramienta de línea de comandos que se puede volver a correr, con modo de prueba y validación de códigos de producto. Los casos raros se corregían a mano, para no llenar la lógica de excepciones.',
					shot: 'home-scroll',
				},
				{
					title: 'Una tienda híbrida',
					text: 'WordPress muestra el catálogo sincronizado y Shopify cierra la compra. Arrancamos con un plugin y, cuando llegó a su límite, el equipo lo reemplazó por uno propio, sin cambiar el front.',
					shot: 'home-duo',
				},
				{
					title: 'Una regla, no cientos',
					text: 'Había documentos con links ya repartidos a distribuidores. Los migramos conservando cada nombre de archivo, para que alcanzara una sola regla de redirect.',
				},
			],
			figures: [
				'~1.260 entradas de catálogo exportadas de Craft',
				'876 documentos migrados',
				'En vivo desde agosto de 2026',
			],
		},
	},
	{
		slug: 'naropa',
		name: 'Naropa University',
		url: 'https://www.naropa.edu/',
		date: '2022-04',
		period: 'desde 2022',
		role: 'CTO / Director of Engineering. Arquitectura, auditorías y dirección técnica.',
		description:
			'Sitio, catálogo académico, eventos y publicaciones de una universidad. Lo recibimos de otro proveedor en 2022 y lo seguimos construyendo junto a su equipo.',
		tags: ['Case study', 'WordPress', 'Elementor', 'Migración', 'Integración'],
		study: {
			tagline: 'Universidad en Boulder, Colorado',
			stack: ['WordPress', 'Elementor', 'Pressable', 'GitHub Actions'],
			lead: 'Sitio, catálogo académico, eventos y publicaciones de una universidad, todo sobre WordPress. Cada año hay un catálogo nuevo, así que este proyecto no tiene fecha de fin.',
			start: 'En 2022, Naropa cambió de proveedor. El sitio que recibimos era reciente, pero tenía problemas de rendimiento y usabilidad, incluso en el dashboard. Lo auditamos y propusimos pasarlo a Elementor, de manera ordenada.',
			hero: 'home-contexto',
			steps: [
				{
					title: 'Todo el sitio, de nuevo',
					text: 'En unos cuatro meses rehicimos y reestructuramos el sitio completo: sitemap, plantillas, menú, directorio de staff y migración de eventos, personas y posts. Salió en diciembre de 2022, y después capacitamos a su equipo para que pudiera editar por su cuenta.',
					shot: 'home-duo',
				},
				{
					title: 'Un catálogo que se renueva cada año',
					text: 'El catálogo quedó afuera de la reconstrucción por decisión de Naropa. Lo mantenemos en cada año lectivo: desde 2022-23 hasta 2026-27, cada edición se actualiza y se publica.',
					shot: 'catalogo-desk',
				},
				{
					title: 'Eventos sin carga doble',
					text: 'Los calendarios de la universidad viven en SharePoint. Armamos un proceso que los trae a WordPress como borradores, para que los editores los revisen antes de publicar.',
					shot: 'eventos-desk',
				},
				{
					title: 'Cambio de hosting',
					text: 'A principios de 2025 propuse pasar el sitio y el catálogo a Pressable, y lo revisé con el equipo de IT de Naropa. El corte fue en mayo, con congelamiento de contenido y QA comparando staging y producción.',
				},
				{
					title: 'Accesibilidad',
					text: 'Trabajamos en botones táctiles, texto en mobile e imágenes. El puntaje de accesibilidad en Silktide pasó de 61% a 92%.',
				},
				{
					title: 'Un sitio vivo',
					text: 'Seguimos ampliando el sitio junto al equipo de Naropa: una home nueva, la sección de los 50 años, la revista online, el programa de graduación en la web y un buscador de programas.',
					shot: 'revista-desk',
				},
			],
			figures: [
				'Relación activa desde 2022',
				'+400 tareas completadas',
				'5 ediciones del catálogo',
				'Accesibilidad: de 61% a 92%',
			],
		},
	},
	{
		slug: 'harver',
		name: 'Harver',
		url: 'https://harver.com/',
		date: '2022-08',
		period: '2022 a 2025',
		role: 'Líder técnico y contacto técnico. Base del theme y plan de migración.',
		description:
			'Un sitio heredado y una marca más por cada adquisición. Lo reconstruimos por fases, mientras las otras marcas pasaban a un solo lugar.',
		tags: ['Case study', 'WordPress', 'Elementor', 'Migración'],
		study: {
			tagline: 'Software de contratación',
			stack: ['WordPress', 'Elementor', 'WP Engine'],
			lead: 'Después de varias adquisiciones, Harver tenía un sitio principal heredado y otro más por cada marca comprada, cada uno en su plataforma. Lo acompañamos hasta el traspaso, a fines de 2025, y el sitio de hoy ya tiene cambios de otro equipo.',
			start: 'Marketing dependía de una base difícil de editar, con plazos que no daban para frenar todo y empezar de cero. Las marcas compradas vivían en WordPress, HubSpot, Craft CMS y Webflow.',
			hero: 'home-contexto',
			steps: [
				{
					title: 'Primero, ordenar lo heredado',
					text: 'Arrancamos con una auditoría y un facelift con plazos ajustados. Sobre eso armamos un theme base nuevo para seguir construyendo.',
				},
				{
					title: 'Reconstruir sin frenar',
					text: 'A partir del diseño de una agencia, pasamos las páginas críticas a Elementor por lotes, para llegar a las fechas de marketing sin esperar un gran lanzamiento.',
					shot: 'home-duo',
				},
				{
					title: 'Cada marca, en dos tiempos',
					text: 'Primero, el contenido y los redirects. Más adelante, los dominios y los servidores viejos. Al apagarlos, empezamos por un solo sitio, con los cambios de DNS a primera hora, para poder probar y volver atrás.',
					shot: 'mobile',
				},
			],
			figures: ['Más de 3 años de trabajo', '4 plataformas de origen'],
		},
	},
	{
		slug: 'kid-city-guide',
		name: 'Kid City Guide',
		url: 'https://kidcityguide.com/',
		date: '2019-10',
		period: 'desde 2019',
		role: 'Líder técnico. Arquitectura, planificación y coordinación del equipo de desarrollo.',
		description:
			'Una red de guías locales de planes para chicos, proyecto propio de EpicDevs. Empezó como un solo sitio y hoy cubre 21 ciudades.',
		tags: ['Case study', 'WordPress', 'Multisite', 'Migración'],
		study: {
			tagline: 'Proyecto propio de EpicDevs',
			stack: ['WordPress Multisite', 'Elementor'],
			lead: 'Una red de guías locales de planes para chicos, que empezó como un solo sitio y hoy cubre 21 ciudades.',
			start: 'Era un único WordPress sobre un theme comercial de directorios, donde cada ciudad era un filtro dentro del mismo sitio. Cada mercado nuevo sumaba peso y complejidad a una sola instalación.',
			hero: 'red-contexto',
			steps: [
				{
					title: 'Una ciudad, un sitio',
					text: 'En 2021 separamos cada ciudad en su propio sitio dentro de una red. Armamos Denver primero en staging y, una vez validada, repetimos el proceso en las demás.',
					shot: 'denver-desk',
				},
				{
					title: 'Reconstruir sin perder lo ganado',
					text: 'En 2023 rehicimos la base con un theme propio. Cada ciudad se migró con su planilla de posts y lugares, categorías normalizadas y control de redirects. Y abrir una ciudad pasó a ser un checklist repetible.',
					shot: 'red-duo',
				},
				{
					title: 'Una decisión que revertimos',
					text: 'En 2024, a partir de un pedido de SEO, movimos las ciudades de subdominios a subcarpetas. Google terminó mezclando la estructura nueva y el tráfico sufrió mucho. A las pocas semanas volvimos atrás e invertimos los redirects. Hoy cada ciudad sigue en su subdominio.',
					shot: 'red-scroll',
				},
				{
					title: 'Eventos con menos carga manual',
					text: 'Diseñamos un flujo que junta eventos por ciudad, los vuelca en una planilla y genera descripciones y categorías con IA, con revisión editorial antes de publicar.',
					shot: 'mobile',
				},
			],
			figures: ['21 ciudades activas', 'Más de 7 años de evolución continua'],
		},
	},
	{
		slug: 'skillsoft',
		name: 'Skillsoft',
		date: '2017-11',
		period: '2017 a 2020',
		role: 'Team lead y dev principal. Arquitecto del importador.',
		description:
			'Miles de cursos repartidos en XML de distintos equipos, convertidos en un catálogo en WordPress que recibía datos nuevos cada mes sin duplicar inventario.',
		tags: ['Case study', 'WordPress', 'Migración', 'Integración', 'WP Plugin'],
		study: {
			tagline: 'Un catálogo que se actualiza sin descontrolarse',
			stack: ['WordPress', 'PHP'],
			lead: 'Fue el proyecto más complejo que había encarado hasta ese momento, en Networks That Matter, hoy EpicDevs. Las capturas son de época: el sitio actual de Skillsoft ya no es este trabajo.',
			start: 'El catálogo vivía en XML gigantes generados por sistemas internos, y cada equipo los usaba con su propio propósito, así que cambiar su estructura no era opción. No alcanzaba con migrar una vez: el XML volvía a llegar en cada ciclo.',
			hero: 'wayback-home-2018-contexto',
			steps: [
				{
					title: 'Aceptar la fuente como era',
					text: 'Evaluamos pasar a planillas, pero el equipo de producto ya generaba XML. Decidimos adaptarnos a ese formato y no pedirle cambios a nadie.',
				},
				{
					title: 'Una identidad que sobrevive a los cambios',
					text: 'Primero armé los slugs con el título, y cualquier retoque editorial generaba conflictos. Entonces combiné el ID del XML con el título: URLs legibles y una clave estable.',
					shot: 'wayback-catalogo-2019-desk',
				},
				{
					title: 'Un curso, un registro',
					text: 'Un mismo curso aparecía en varias series. El parser lo unifica por su código y acumula sus padres, en vez de crear copias.',
					shot: 'wayback-certificaciones-2018-desk',
				},
				{
					title: 'Probar antes de publicar',
					text: 'Cada ciclo partía de una copia de producción: importábamos, marketing validaba en staging y recién entonces pasábamos a vivo, coordinando una ventana de edición.',
					shot: 'wayback-home-2018-duo',
				},
			],
			figures: [
				'Entre ~4.900 y ~5.900 cursos por exportación',
				'Más de 4.000 redirecciones de URLs antiguas',
				'4 XML y 1 API como fuentes',
			],
		},
	},
	{
		slug: 'datos-insights',
		name: 'Datos Insights',
		url: 'https://datos-insights.com/',
		date: '2022-10',
		period: '2022 a 2025',
		role: 'Tech lead y arquitecto.',
		description:
			'Una biblioteca de research paga, de Drupal a WordPress, con acceso por suscripción y conexión a Salesforce. Salió el mismo día que la marca nueva.',
		tags: ['Case study', 'WordPress', 'Salesforce', 'Migración', 'Integración'],
		study: {
			tagline: 'Research pago, marca nueva y plataforma nueva, el mismo día',
			stack: ['WordPress', 'Salesforce'],
			lead: '¿Cómo mudás una biblioteca de research paga a otra plataforma justo el día que la empresa cambia de nombre? Pasamos a Aite-Novarica Group de Drupal a WordPress, y salimos junto con el anuncio de su marca nueva. Trabajamos ahí hasta 2025.',
			start: 'El sitio anterior tenía miles de contenidos, con URLs que no respetaban su propia estructura, y ahí adentro vivían los contratos que definían qué podía leer cada cliente.',
			hero: 'home-contexto',
			steps: [
				{
					title: 'Entender antes de mudar',
					text: 'Levanté una copia local de Drupal y mapeé tipos de contenido y URLs. Con eso, el cliente pudo decidir qué migrar y qué no.',
					shot: 'wayback-home-2023-desk',
				},
				{
					title: 'Recortar para llegar',
					text: 'Un MVP apurado no cerraba, así que priorizamos hacerlo bien, y la venta individual de reportes quedó para después.',
				},
				{
					title: 'Acceso por empresa, no por persona',
					text: 'Tradujimos los contratos a membresías por área de research. Quien se registra con el dominio de una empresa cliente accede a lo que esa empresa contrató.',
					shot: 'reportes-desk',
				},
				{
					title: 'Salesforce con código propio',
					text: 'Hicimos un plugin que vincula cada registro con su cuenta, y lleva a Salesforce descargas y preferencias de email.',
					shot: 'home-duo',
				},
			],
			figures: ['Lanzamiento el 21 de junio de 2023', '2 marcas unificadas en un sitio'],
		},
	},
	{
		slug: 'tufts-jumbopress',
		name: 'Tufts JumboPress',
		url: 'https://commencement.tufts.edu/',
		urlLabel: 'Ver un sitio de la red',
		date: '2025-01',
		period: 'desde 2025',
		role: 'Arquitecto y tech lead, autor de las auditorías.',
		description:
			'La plataforma WordPress de una universidad: la auditamos de punta a punta, construimos un block theme para los sitios nuevos y seguimos con los actuales.',
		tags: ['Case study', 'WordPress', 'Gutenberg', 'Multisite'],
		study: {
			tagline: 'Plataforma WordPress de una universidad',
			stack: ['WordPress', 'Gutenberg'],
			lead: 'Tufts sostiene los sitios de sus departamentos sobre una misma plataforma de WordPress. La auditamos, construimos un theme nuevo para los sitios que vienen y hoy seguimos resolviendo lo que encontró la auditoría en los actuales.',
			start: 'En enero de 2025, la universidad buscó un partner para definir cómo renovar JumboPress. Eran decenas de sitios, editados por los propios departamentos, y el page builder sobre el que estaban armados frenaba cualquier evolución. El primer pedido no era construir, sino una estrategia.',
			hero: 'commencement-contexto',
			steps: [
				{
					title: 'Entender antes de proponer',
					text: 'Durante cinco semanas auditamos frontend, accesibilidad, infraestructura, plugins y código propio, y probamos conversiones sobre páginas reales.',
				},
				{
					title: '¿Por qué un solo block theme?',
					text: 'Sumar skins al theme clásico no resolvía la dependencia del builder, y varios themes multiplicaban el mantenimiento. Propuse uno solo, con una capa de edición acotada y los bloques adentro, para evitar desajustes de versión.',
					shot: 'commencement-duo',
				},
				{
					title: 'De la recomendación al alcance real',
					text: 'La auditoría recomendaba modernizar toda la red. Se eligió un camino más acotado: JumboPress 3.0 para los sitios nuevos, mientras lo anterior seguía funcionando. Hoy lo usan tres sitios.',
					shot: 'expanding-viewpoints-desk',
				},
				{
					title: 'Publicar una vez, llegar a todos',
					text: 'Diseñé el despliegue sobre un origen compartido, separado del legado. Los sitios toman el código desde ahí, y el paso final a producción queda en manos del equipo de Tufts.',
					shot: 'mobile',
				},
			],
			figures: ['5 semanas de auditoría', '3 sitios públicos sobre el theme nuevo'],
		},
	},
	{
		slug: 'ilanvivanco',
		name: 'ilanvivanco.com',
		url: 'https://ilanvivanco.com/',
		date: '2020-07',
		period: 'desde 2020',
		role: 'Todo, para bien y para mal.',
		description:
			'Mi laboratorio: acá pruebo cosas nuevas antes de que un cliente las necesite. Ya va por dos versiones, y la última se hizo con agentes de punta a punta.',
		tags: ['Case study', 'Astro', 'Producto propio', 'IA'],
		study: {
			tagline: 'Mi laboratorio',
			stack: ['Astro', 'TypeScript'],
			lead: 'Este sitio es donde salgo de mi zona de confort y pruebo cosas nuevas, para estar preparado cuando un cliente las necesite. Ya va por dos versiones muy distintas.',
			start: 'En 2020 lo armé con Nuxt y Vue, fuera de mi terreno habitual. Tenía portfolio, CV, animaciones y hasta un blog en dos idiomas. El blog tuvo tres posts, todos ocultos. Quise renovar la información y aproveché para enfocarme por completo en la accesibilidad y el rendimiento.',
			hero: 'home-contexto',
			steps: [
				{
					title: 'Empezar por los límites',
					text: 'Antes del diseño definí lo que no se negocia: 99+ en Lighthouse, 10 KB de JavaScript propio por página y cero saltos de layout.',
					shot: 'v1-home-desk',
				},
				{
					title: 'No romper lo que había',
					text: 'Antes de borrar nada, audité cada URL del sitio viejo. Las rutas viejas siguen respondiendo con su redirect.',
					shot: 'v1-portfolio-desk',
				},
				{
					title: 'Investigar con agentes',
					text: 'Para este portfolio, los agentes revisaron años de trabajo en Gmail, Slack, Trello, GitHub y Notion. Salió un inventario de 168 proyectos, y después revisamos cada caso juntos. También me corrigieron: yo recordaba un import semanal, y era mensual.',
					shot: 'portfolio-desk',
				},
				{
					title: 'Dos modelos en lados opuestos',
					text: 'Claude hace y Codex revisa, o al revés. Lo que uno da por bueno, el otro lo discute. La decisión final es mía, y el QA vale igual para todos: lo que no pasa, no entra.',
					shot: 'home-duo',
				},
			],
			figures: [
				'99+ en Lighthouse, en las 4 categorías',
				'7,5 KB de JavaScript propio en la home',
				'0 errores de accesibilidad con axe',
			],
		},
	},
	{
		slug: 'camunda',
		name: 'Camunda',
		date: '2019-11',
		period: '2019 a 2026',
		role: 'Team lead, arquitecto y contacto técnico',
		description:
			'Migración del sitio de Hugo a WordPress, con importador propio desde Markdown y las URLs del blog conservadas, para que marketing pudiera editar sin depender de desarrollo. Después, varios años ampliando su ecosistema de sitios. En 2026, Camunda pasó a otra plataforma.',
		tags: ['WordPress', 'Migración', 'WP Plugin'],
	},
	{
		slug: 'como-trabajamos',
		name: 'Cómo trabajamos',
		url: 'https://github.com/IlanVivanco/wp-deployment-action',
		urlLabel: 'Ver la GitHub Action',
		post: '/blog/dos-decadas-de-wordpress',
		date: '2017-01',
		period: '2017 a hoy',
		role: 'Definí los procesos y guié al equipo',
		description:
			'Lo que hay debajo de todos los proyectos: Git y flujos por entorno, una GitHub Action pública para los deploys, themes y plugins base en cada etapa, conocimiento en Notion y un protocolo de incidentes.',
		tags: ['Procesos', 'Equipo', 'CI/CD'],
		gallery: ['versionado'],
	},
	{
		slug: 'lakefs-dvc',
		name: 'lakeFS y DVC',
		url: 'https://lakefs.io/',
		date: '2025-10',
		period: '2025 a hoy',
		role: 'Arquitectura y estimación en DVC; cuenta y dirección en lakeFS',
		description:
			'Migramos dvc.org de Gatsby a WordPress, con un importador de contenido propio y templates para cada tipo de página. Del mismo cliente heredamos el sitio de lakeFS y lo pusimos a punto: redirecciones, sitemaps, datos estructurados y templates modulares.',
		tags: ['WordPress', 'Migración'],
		gallery: ['lakefs-duo', 'dvc-desk', 'mobile'],
	},
	{
		slug: 'bcbs',
		name: 'Barre Center for Buddhist Studies',
		url: 'https://www.buddhistinquiry.org',
		date: '2024-02',
		period: '2024 a hoy',
		role: 'Tech lead y PM del lado web',
		description:
			'Implementamos el sitio nuevo, con cursos, docentes y programas sincronizados desde Salesforce hacia WordPress. Planificamos la migración del sitio anterior y sumamos calendario con filtros y buscadores.',
		tags: ['WordPress', 'Salesforce', 'Migración', 'Integración'],
		gallery: ['home-duo', 'home-scroll', 'mobile'],
	},
	{
		slug: 'storyblocks',
		name: 'Storyblocks',
		url: 'https://www.storyblocks.com/resources',
		date: '2023-12',
		period: '2023 a 2026',
		role: 'Lead técnico y desarrollo',
		description:
			'Construimos el Resource Center en WordPress, servido bajo /resources del dominio principal mediante un proxy reverso. Planificamos la migración del blog y los casos de estudio, con redirecciones para mantener las URLs.',
		tags: ['WordPress', 'Migración'],
		gallery: ['resources-scroll'],
	},
	{
		slug: 'syndigo',
		name: 'Syndigo',
		url: 'https://syndigo.com/',
		date: '2025-02',
		period: '2025 a hoy',
		role: 'PM y lead, con desarrollo en entregas puntuales',
		description:
			'Coordinamos e implementamos el rediseño sobre un theme propio. Planificamos el nuevo sitemap, sumamos Careers y eventos, y adaptamos el sitio a la localización en varios idiomas.',
		tags: ['WordPress', 'Rediseño', 'Localización'],
		gallery: ['home-duo'],
	},
	{
		slug: 'womens-power-gap',
		name: "Women's Power Gap",
		url: 'https://www.womenspowergap.org/',
		date: '2021-02',
		period: '2021 a 2023',
		role: 'Líder técnico y autor de la tabla dinámica',
		description:
			'Integré una API de datos de terceros con WordPress mediante un plugin propio, con una capa de caché. Armé en Vue un visualizador de tablas dinámico, con búsqueda, que acompañó nuevos reportes a medida que se publicaban.',
		tags: ['WordPress', 'Vue', 'Integración', 'WP Plugin'],
		gallery: ['vue-demo-duo', 'home-desk', 'rankings-desk'],
		galleryNote: 'La tabla se muestra con el plugin real y datos de ejemplo.',
	},
	{
		slug: 'afc-urgent-care',
		name: 'AFC Urgent Care',
		date: '2020-05',
		period: '2020',
		role: 'Developer principal del plugin',
		description:
			'Mi primer proyecto con Vue, en plena pandemia: en dos semanas desarrollé un sistema de turnos integrado por API, para que los pacientes eligieran sede, motivo y horario sin salir del sitio.',
		tags: ['WordPress', 'Vue', 'Integración', 'WP Plugin'],
		gallery: ['wayback-2020-duo', 'wayback-2020-scroll'],
	},
	{
		slug: 'construye-mundo',
		name: 'Construye Mundo',
		url: 'https://construyemundo.org/',
		date: '2021-04',
		period: '2021 a hoy',
		role: 'Autor único, como voluntariado',
		description:
			'Migré el sitio de la ONGD desde Drupal a WordPress, con rediseño completo y una estructura de contenidos nueva. Lo mantengo desde el lanzamiento y sigo en el equipo como voluntario.',
		tags: ['WordPress', 'Migración', 'Rediseño'],
		gallery: ['home-duo', 'home-scroll'],
	},
	{
		slug: 'play2fund',
		name: 'Play2Fund',
		date: '2020-03',
		period: '2020 a 2021, con mantenimiento posterior',
		role: 'Team lead',
		description:
			'Lideré el equipo técnico de una plataforma para financiar conciertos virtuales, planificada y lanzada a contrarreloj durante la pandemia. Sumamos pagos divididos con PayPal, chat en eventos e integraciones de video.',
		tags: ['WordPress', 'WP Plugin', 'Integración'],
		gallery: ['home-duo', 'home-scroll'],
	},
	{
		slug: 'mit-sea-grant',
		name: 'MIT Sea Grant',
		url: 'https://seagrant.mit.edu/',
		date: '2018-03',
		period: '2018 a 2023',
		role: 'Developer principal',
		description:
			'Implementé un sitio institucional a partir de un diseño de terceros, sobre la infraestructura del MIT. Armé el theme y los campos personalizados, planifiqué la importación masiva de noticias y proyectos, y después me ocupé del mantenimiento.',
		tags: ['WordPress', 'Migración'],
		gallery: ['home-duo'],
	},
	{
		slug: 'mobius',
		name: 'Mobius',
		url: 'https://mobiusm.com/',
		date: '2024-12',
		period: '2024 a 2025',
		role: 'Líder técnico y PM',
		description:
			'El sitio de Mobius, que brinda atención médica personalizada y gestión de riesgos médicos a family offices, empresas y programas marítimos. Una estructura simple y clara para un público de alto perfil, sobre un theme propio.',
		tags: ['WordPress', 'Institucional'],
		gallery: ['home-duo'],
	},
	{
		slug: 'monokai-cotalpa',
		name: 'Monokai Cotalpa',
		url: 'https://marketplace.visualstudio.com/items?itemName=ilanvivanco.cotalpa',
		urlLabel: 'Ver en el Marketplace',
		date: '2019-09',
		period: '2019 a hoy',
		role: 'Autor y maintainer',
		description:
			'Mi propia variante de Monokai para VS Code, que mantengo desde 2019. Hace poco la revisé a fondo para corregir errores y cubrir los colores nuevos del editor.',
		tags: ['VS Code', 'Open source', 'Producto propio'],
		gallery: ['sintaxis-php', 'sintaxis-tsx', 'diff', 'source-control', 'paleta-comandos', 'variantes'],
	},
	{
		slug: 'wp-deployment-action',
		name: 'WordPress Deployment Action',
		url: 'https://github.com/marketplace/actions/wordpress-deployment-action',
		urlLabel: 'Ver en el Marketplace',
		date: '2024-10',
		period: '2024 a hoy',
		role: 'Autor y maintainer',
		description:
			'Una GitHub Action pública para desplegar themes y plugins a WordPress por SSH y rsync. Está simplificada para Pressable y WP Engine, pero sirve en cualquier servidor con acceso SSH. La usamos en los proyectos de EpicDevs para que cada merge llegue a producción sin pasos manuales. La sigo manteniendo, aunque casi no necesitó cambios, y eso todavía me sorprende.',
		tags: ['GitHub Actions', 'Open source', 'Producto propio', 'CI/CD'],
	},
	{
		slug: 'forant',
		name: 'Forant',
		url: 'https://forant.io/',
		date: '2026-03',
		period: '2026',
		role: 'Founder y único desarrollador',
		description:
			'Un directorio y comunidad para profesionales internacionales que trabajan en remoto desde Cantabria. Lo planifiqué como producto propio, de la idea a la puesta en línea. Hoy sigue andando, sin desarrollo activo.',
		tags: ['Producto propio', 'TypeScript'],
		gallery: ['home-duo'],
	},
]

export const imageFor = (p: Project) => p.image ?? `/img/projects/${p.slug}.webp`
// Las variantes las genera scripts/build/project-images.mjs. La original mide 960 px.
export const imageVariant = (p: Project, width: 480 | 720) => imageFor(p).replace(/\.webp$/, `-${width}.webp`)
export const imageSrcset = (p: Project) =>
	`${imageVariant(p, 480)} 480w, ${imageVariant(p, 720)} 720w, ${imageFor(p)} 960w`

// Capturas de cada proyecto: 1440 × 900, con las mismas variantes.
export const shotPath = (p: Project, file: string) => `/img/projects/${p.slug}/${file}.webp`
export const shotSrcset = (p: Project, file: string) => {
	const path = shotPath(p, file)
	return `${path.replace(/\.webp$/, '-480.webp')} 480w, ${path.replace(/\.webp$/, '-720.webp')} 720w, ${path} 1440w`
}
const shotKinds: [RegExp, string][] = [
	[/contexto/, 'en una pantalla, sobre un escritorio'],
	[/duo/, 'en desktop y mobile'],
	[/scroll/, 'más abajo en la página'],
	[/mobile/, 'en mobile'],
]
export const shotAlt = (p: Project, file: string) => {
	const kind = shotKinds.find(([re]) => re.test(file))?.[1]
	const page = file.replace(/-(contexto|duo|scroll|desk)$/, '').replace(/-/g, ' ')
	return `Captura de ${p.name}: ${kind ?? page}`
}

export const studies = projects.filter((p) => p.study)
export const allTags = [...new Set(projects.flatMap((p) => p.tags))]
