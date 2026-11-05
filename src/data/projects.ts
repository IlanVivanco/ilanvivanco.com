// Portfolio. Los case studies (`study`) tienen página propia en /portfolio/<slug>; el resto es una fila del índice.
// Imágenes: portada en public/img/projects/<slug>.webp y el resto en public/img/projects/<slug>/<archivo>.webp.
// Con textos, se piden por idioma: `projectsFor`, `studiesFor` y `shotAlt`.
import { byLang } from '../i18n/index.ts'

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
	agency?: 'epicdevs' | 'ntm' // la agencia por la que lo hice, según cuándo empezó
	description: string
	tags: string[]
	featured?: boolean // el que se destaca en la home
	image?: string // por defecto /img/projects/<slug>.webp
	gallery?: string[] // filas: capturas extra
	galleryNote?: string
	study?: Study
}

const es: Project[] = [
	{
		slug: 'tempo',
		name: 'Tempo Communications',
		url: 'https://www.tempocom.com/',
		date: '2025-08',
		period: 'desde 2025',
		role: 'Tech lead y PM. Planifiqué el proyecto y armé la extracción de datos y el importador del catálogo.',
		agency: 'epicdevs',
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
		agency: 'epicdevs',
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
		agency: 'epicdevs',
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
		agency: 'epicdevs',
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
		agency: 'ntm',
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
		agency: 'epicdevs',
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
		agency: 'epicdevs',
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
		agency: 'ntm',
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
		agency: 'epicdevs',
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
		agency: 'epicdevs',
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
		agency: 'epicdevs',
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
		agency: 'epicdevs',
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
		agency: 'epicdevs',
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
		agency: 'epicdevs',
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
		agency: 'ntm',
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
		agency: 'ntm',
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
		agency: 'ntm',
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
		agency: 'epicdevs',
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
const shotText = {
	en: {
		shot: 'Screenshot of',
		kinds: [
			[/contexto/, 'on a screen, on a desk'],
			[/duo/, 'on desktop and mobile'],
			[/scroll/, 'further down the page'],
			[/mobile/, 'on mobile'],
		] as [RegExp, string][],
		pages: {
			catalogo: 'catalog',
			eventos: 'events',
			revista: 'magazine',
			reportes: 'reports',
			certificaciones: 'certifications',
			red: 'network',
			sintaxis: 'syntax',
			paleta: 'palette',
			comandos: 'commands',
			variantes: 'variants',
			versionado: 'versioning',
		} as Record<string, string>,
	},
	es: {
		shot: 'Captura de',
		kinds: [
			[/contexto/, 'en una pantalla, sobre un escritorio'],
			[/duo/, 'en desktop y mobile'],
			[/scroll/, 'más abajo en la página'],
			[/mobile/, 'en mobile'],
		] as [RegExp, string][],
		pages: {} as Record<string, string>,
	},
}
// Las capturas extra de una fila: su galería o, en los case studies, las de su página.
export const galleryFor = (p: Project) =>
	p.gallery ?? (p.study && [p.study.hero, ...p.study.steps.flatMap((step) => (step.shot ? [step.shot] : []))])

export const shotAlt = (p: Project, file: string, locale?: string) => {
	const { shot, kinds, pages } = byLang(shotText, locale)
	const kind = kinds.find(([re]) => re.test(file))?.[1]
	const page = file
		.replace(/-(contexto|duo|scroll|desk)$/, '')
		.split('-')
		.map((word) => pages[word] ?? word)
		.join(' ')
	return `${shot} ${p.name}: ${kind ?? page}`
}

type StudyText = Pick<Study, 'tagline' | 'lead' | 'start' | 'figures'> & { steps: { title: string; text: string }[] }
const enStudies: Record<string, StudyText> = {
	'tempo': {
		tagline: 'Catalog, content, and store in one site',
		lead: 'The content was in WordPress, the catalog in Craft, and sales in Shopify. We brought them together into a new site, without taking Shopify out of sales.',
		start: "The old WordPress read the catalog from Craft, and that dependency was fragile. Shopify had to stay, because it was already integrated with the company's systems. Craft, on the other hand, had to give up its data, and that data had to be mapped properly.",
		steps: [
			{
				title: 'First, a copy',
				text: 'Before touching anything, I migrated the site to a separate environment, so I could analyze and export it without risk. That confirmed it was better to build from scratch.',
			},
			{
				title: 'A spreadsheet as the source of truth',
				text: "I merged several exports into a master spreadsheet, where Tempo's team could work on the new categories.",
			},
			{
				title: 'An importer before manual entry',
				text: 'I wrote a command-line tool that can be re-run, with a test mode and product code validation. Odd cases were fixed by hand, to keep the logic free of exceptions.',
			},
			{
				title: 'A hybrid store',
				text: 'WordPress shows the synced catalog and Shopify closes the sale. We started with a plugin and, when it hit its limit, the team replaced it with a custom one, without changing the front end.',
			},
			{
				title: 'One rule, not hundreds',
				text: 'Some documents had links already handed out to distributors. We migrated them keeping every file name, so a single redirect rule was enough.',
			},
		],
		figures: ['~1,260 catalog entries exported from Craft', '876 documents migrated', 'Live since August 2026'],
	},
	'naropa': {
		tagline: 'University in Boulder, Colorado',
		lead: "A university's website, academic catalog, events, and publications, all on WordPress. There's a new catalog every year, so this project has no end date.",
		start: 'In 2022, Naropa changed vendors. The site we inherited was recent, but it had performance and usability problems, even in the dashboard. We audited it and proposed moving it to Elementor in an orderly way.',
		steps: [
			{
				title: 'The whole site, again',
				text: 'In about four months we rebuilt and restructured the entire site: sitemap, templates, menu, staff directory, and the migration of events, people, and posts. It launched in December 2022, and then we trained their team to edit on their own.',
			},
			{
				title: 'A catalog that renews every year',
				text: "The catalog stayed out of the rebuild, by Naropa's decision. We maintain it each academic year: from 2022-23 through 2026-27, every edition gets updated and published.",
			},
			{
				title: 'Events without double entry',
				text: "The university's calendars live in SharePoint. We built a process that brings them into WordPress as drafts, so editors can review them before publishing.",
			},
			{
				title: 'Changing hosts',
				text: "In early 2025 I proposed moving the site and catalog to Pressable, and reviewed it with Naropa's IT team. The cutover was in May, with a content freeze and QA comparing staging and production.",
			},
			{
				title: 'Accessibility',
				text: 'We worked on touch targets, mobile text, and images. The Silktide accessibility score went from 61% to 92%.',
			},
			{
				title: 'A living site',
				text: "We keep expanding the site with Naropa's team: a new home page, the 50th anniversary section, the online magazine, the graduation program on the web, and a program finder.",
			},
		],
		figures: [
			'Active relationship since 2022',
			'400+ tasks completed',
			'5 catalog editions',
			'Accessibility: from 61% to 92%',
		],
	},
	'harver': {
		tagline: 'Hiring software',
		lead: "After several acquisitions, Harver had an inherited main site and one more for each brand it bought, each on its own platform. We stayed with them until the handoff, at the end of 2025, and today's site already has changes from another team.",
		start: "Marketing depended on a base that was hard to edit, with deadlines that didn't allow for stopping everything and starting over. The acquired brands lived on WordPress, HubSpot, Craft CMS, and Webflow.",
		steps: [
			{
				title: 'First, tidy up what we inherited',
				text: 'We started with an audit and a facelift on tight deadlines. On top of that, we built a new base theme to keep building from.',
			},
			{
				title: 'Rebuilding without stopping',
				text: "Working from an agency's design, we moved the critical pages to Elementor in batches, to hit marketing's dates without waiting for a big launch.",
			},
			{
				title: 'Each brand, in two stages',
				text: 'First, the content and redirects. Later, the domains and old servers. When shutting them down, we started with a single site, with DNS changes first thing in the morning, so we could test and roll back.',
			},
		],
		figures: ['More than 3 years of work', '4 source platforms'],
	},
	'kid-city-guide': {
		tagline: "EpicDevs' own project",
		lead: 'A network of local guides to things to do with kids, which started as a single site and now covers 21 cities.',
		start: 'It was one WordPress install on a commercial directory theme, where each city was a filter inside the same site. Every new market added weight and complexity to a single installation.',
		steps: [
			{
				title: 'One city, one site',
				text: 'In 2021 we split each city into its own site within a network. We built Denver first on staging and, once it was validated, repeated the process for the others.',
			},
			{
				title: 'Rebuilding without losing ground',
				text: 'In 2023 we redid the base with a custom theme. Each city was migrated with its spreadsheet of posts and places, normalized categories, and redirect checks. And opening a city became a repeatable checklist.',
			},
			{
				title: 'A decision we reversed',
				text: 'In 2024, following an SEO request, we moved the cities from subdomains to subfolders. Google ended up mixing the new structure, and traffic took a big hit. Within a few weeks we went back and reversed the redirects. Today each city is still on its subdomain.',
			},
			{
				title: 'Events with less manual work',
				text: 'We designed a flow that gathers events by city, puts them in a spreadsheet, and generates descriptions and categories with AI, with editorial review before publishing.',
			},
		],
		figures: ['21 active cities', 'More than 7 years of continuous evolution'],
	},
	'skillsoft': {
		tagline: 'A catalog that updates without getting out of hand',
		lead: "It was the most complex project I'd taken on up to that point, at Networks That Matter, now EpicDevs. The screenshots are from that era: Skillsoft's current site isn't this work anymore.",
		start: "The catalog lived in giant XML files generated by internal systems, and each team used them for its own purpose, so changing their structure wasn't an option. Migrating once wasn't enough: the XML came back every cycle.",
		steps: [
			{
				title: 'Accepting the source as it was',
				text: 'We considered moving to spreadsheets, but the product team already generated XML. We decided to adapt to that format and not ask anyone to change anything.',
			},
			{
				title: 'An identity that survives changes',
				text: 'At first I built the slugs from the title, and any editorial tweak caused conflicts. So I combined the XML ID with the title: readable URLs and a stable key.',
			},
			{
				title: 'One course, one record',
				text: 'The same course appeared in several series. The parser unifies it by its code and accumulates its parents, instead of creating copies.',
			},
			{
				title: 'Testing before publishing',
				text: 'Each cycle started from a copy of production: we imported, marketing validated on staging, and only then did we go live, coordinating an editing window.',
			},
		],
		figures: [
			'Between ~4,900 and ~5,900 courses per export',
			'More than 4,000 redirects from old URLs',
			'4 XML files and 1 API as sources',
		],
	},
	'datos-insights': {
		tagline: 'Paid research, new brand, and new platform, on the same day',
		lead: 'How do you move a paid research library to another platform on the very day the company changes its name? We moved Aite-Novarica Group from Drupal to WordPress, and launched alongside the announcement of its new brand. We worked there until 2025.',
		start: "The old site had thousands of pieces of content, with URLs that didn't follow its own structure, and inside it lived the contracts that defined what each client could read.",
		steps: [
			{
				title: 'Understanding before moving',
				text: 'I set up a local copy of Drupal and mapped content types and URLs. With that, the client could decide what to migrate and what not to.',
			},
			{
				title: 'Cutting scope to get there',
				text: "A rushed MVP didn't add up, so we prioritized doing it right, and individual report sales were left for later.",
			},
			{
				title: 'Access by company, not by person',
				text: "We translated the contracts into memberships by research area. Anyone who registers with a client company's domain gets access to what that company has contracted.",
			},
			{
				title: 'Salesforce with custom code',
				text: 'We built a plugin that links each registration to its account, and sends downloads and email preferences to Salesforce.',
			},
		],
		figures: ['Launched on June 21, 2023', '2 brands unified in one site'],
	},
	'tufts-jumbopress': {
		tagline: "A university's WordPress platform",
		lead: "Tufts runs its departments' sites on one WordPress platform. We audited it, built a new theme for upcoming sites, and today we keep solving what the audit found in the existing ones.",
		start: "In January 2025, the university looked for a partner to define how to renew JumboPress. There were dozens of sites, edited by the departments themselves, and the page builder they were built on held back any evolution. The first request wasn't to build, but to come up with a strategy.",
		steps: [
			{
				title: 'Understanding before proposing',
				text: 'For five weeks we audited the front end, accessibility, infrastructure, plugins, and custom code, and tested conversions on real pages.',
			},
			{
				title: 'Why a single block theme?',
				text: "Adding skins to the classic theme didn't solve the dependency on the builder, and several themes would multiply maintenance. I proposed just one, with a limited editing layer and the blocks inside it, to avoid version mismatches.",
			},
			{
				title: 'From recommendation to real scope',
				text: 'The audit recommended modernizing the whole network. A narrower path was chosen: JumboPress 3.0 for new sites, while the rest kept running. Three sites use it today.',
			},
			{
				title: 'Publish once, reach everyone',
				text: "I designed the deployment around a shared origin, separate from the legacy code. Sites take the code from there, and the final step to production stays in the hands of Tufts' team.",
			},
		],
		figures: ['5 weeks of auditing', '3 public sites on the new theme'],
	},
	'ilanvivanco': {
		tagline: 'My lab',
		lead: "This site is where I leave my comfort zone and try new things, so I'm ready when a client needs them. It's on its second, very different version.",
		start: 'In 2020 I built it with Nuxt and Vue, outside my usual turf. It had a portfolio, a resume, animations, and even a blog in two languages. The blog had three posts, all hidden. I wanted to refresh the information, and took the chance to focus fully on accessibility and performance.',
		steps: [
			{
				title: 'Starting with the limits',
				text: "Before the design, I defined what's non-negotiable: 99+ on Lighthouse, 10 KB of my own JavaScript per page, and zero layout shift.",
			},
			{
				title: "Not breaking what's there",
				text: 'Before deleting anything, I audited every URL on the old site. The old routes still respond with their redirects.',
			},
			{
				title: 'Researching with agents',
				text: 'For this portfolio, agents went through years of work in Gmail, Slack, Trello, GitHub, and Notion. The result was an inventory of 168 projects, and then we reviewed each case together. They corrected me too: I remembered a weekly import, and it was monthly.',
			},
			{
				title: 'Two models on opposite sides',
				text: "Claude builds and Codex reviews, or the other way around. What one signs off on, the other argues with. The final call is mine, and QA applies to everyone: what doesn't pass doesn't get in.",
			},
		],
		figures: [
			'99+ on Lighthouse, in all 4 categories',
			'7.5 KB of my own JavaScript on the home page',
			'0 accessibility errors with axe',
		],
	},
}

const enText: Record<string, Pick<Project, 'period' | 'role' | 'description' | 'tags'> & Partial<Project>> = {
	'tempo': {
		period: 'since 2025',
		role: 'Tech lead and PM. I planned the project and built the data extraction and the catalog importer.',
		description:
			'Content in WordPress, catalog in Craft, and sales in Shopify. We brought them together into one new site, without taking Shopify out of sales.',
		tags: ['Case study', 'WordPress', 'Shopify', 'Migration', 'Integration'],
	},
	'naropa': {
		period: 'since 2022',
		role: 'CTO / Director of Engineering. Architecture, audits, and technical direction.',
		description:
			"A university's website, academic catalog, events, and publications. We took it over from another vendor in 2022 and keep building it alongside their team.",
		tags: ['Case study', 'WordPress', 'Elementor', 'Migration', 'Integration'],
	},
	'harver': {
		period: '2022 to 2025',
		role: 'Technical lead and technical contact. Theme foundation and migration plan.',
		description:
			'An inherited site, and one more brand with every acquisition. We rebuilt it in phases while the other brands moved into one place.',
		tags: ['Case study', 'WordPress', 'Elementor', 'Migration'],
	},
	'kid-city-guide': {
		period: 'since 2019',
		role: 'Technical lead. Architecture, planning, and coordinating the development team.',
		description:
			"A network of local guides to things to do with kids, EpicDevs' own project. It started as a single site and now covers 21 cities.",
		tags: ['Case study', 'WordPress', 'Multisite', 'Migration'],
	},
	'skillsoft': {
		period: '2017 to 2020',
		role: 'Team lead and main dev. Architect of the importer.',
		description:
			'Thousands of courses spread across XML from different teams, turned into a WordPress catalog that took in new data every month without duplicating inventory.',
		tags: ['Case study', 'WordPress', 'Migration', 'Integration', 'WP Plugin'],
	},
	'datos-insights': {
		period: '2022 to 2025',
		role: 'Tech lead and architect.',
		description:
			'A paid research library, moved from Drupal to WordPress, with subscription access and a Salesforce connection. It launched the same day as the new brand.',
		tags: ['Case study', 'WordPress', 'Salesforce', 'Migration', 'Integration'],
	},
	'tufts-jumbopress': {
		urlLabel: 'See a site in the network',
		period: 'since 2025',
		role: 'Architect and tech lead, author of the audits.',
		description:
			"A university's WordPress platform: we audited it end to end, built a block theme for new sites, and kept going with the existing ones.",
		tags: ['Case study', 'WordPress', 'Gutenberg', 'Multisite'],
	},
	'ilanvivanco': {
		period: 'since 2020',
		role: 'Everything, for better and for worse.',
		description:
			"My lab: this is where I try new things before a client needs them. It's on its second version, and the latest was built with agents from end to end.",
		tags: ['Case study', 'Astro', 'Own product', 'AI'],
	},
	'camunda': {
		period: '2019 to 2026',
		role: 'Team lead, architect, and technical contact',
		description:
			'Migrated the site from Hugo to WordPress, with a custom importer from Markdown and the blog URLs preserved, so marketing could edit without depending on development. Then several years expanding their ecosystem of sites. In 2026, Camunda moved to another platform.',
		tags: ['WordPress', 'Migration', 'WP Plugin'],
	},
	'como-trabajamos': {
		name: 'How we work',
		post: '/en/blog/two-decades-of-wordpress',
		urlLabel: 'See the GitHub Action',
		period: '2017 to today',
		role: 'I defined the processes and guided the team',
		description:
			'What sits underneath every project: Git and per-environment workflows, a public GitHub Action for deploys, base themes and plugins at each stage, knowledge in Notion, and an incident protocol.',
		tags: ['Processes', 'Team', 'CI/CD'],
	},
	'lakefs-dvc': {
		period: '2025 to today',
		role: 'Architecture and estimation on DVC; account and direction on lakeFS',
		description:
			'We migrated dvc.org from Gatsby to WordPress, with a custom content importer and templates for each page type. From the same client we inherited the lakeFS site and got it in shape: redirects, sitemaps, structured data, and modular templates.',
		tags: ['WordPress', 'Migration'],
	},
	'bcbs': {
		period: '2024 to today',
		role: 'Tech lead and PM on the web side',
		description:
			'We implemented the new site, with courses, faculty, and programs synced from Salesforce to WordPress. We planned the migration of the previous site and added a filterable calendar and search tools.',
		tags: ['WordPress', 'Salesforce', 'Migration', 'Integration'],
	},
	'storyblocks': {
		period: '2023 to 2026',
		role: 'Technical lead and development',
		description:
			'We built the Resource Center in WordPress, served under /resources on the main domain through a reverse proxy. We planned the migration of the blog and case studies, with redirects to keep the URLs.',
		tags: ['WordPress', 'Migration'],
	},
	'syndigo': {
		period: '2025 to today',
		role: 'PM and lead, with development on specific deliverables',
		description:
			'We coordinated and implemented the redesign on a custom theme. We planned the new sitemap, added Careers and events, and adapted the site for localization in several languages.',
		tags: ['WordPress', 'Redesign', 'Localization'],
	},
	'womens-power-gap': {
		period: '2021 to 2023',
		role: 'Technical lead and author of the dynamic table',
		description:
			'I integrated a third-party data API with WordPress through a custom plugin with a caching layer. I built a dynamic, searchable table viewer in Vue that supported new reports as they were published.',
		tags: ['WordPress', 'Vue', 'Integration', 'WP Plugin'],
		galleryNote: 'The table is shown with the real plugin and sample data.',
	},
	'afc-urgent-care': {
		period: '2020',
		role: 'Lead developer of the plugin',
		description:
			'My first project with Vue, in the middle of the pandemic: in two weeks I built an appointment system integrated through an API, so patients could choose a location, reason, and time without leaving the site.',
		tags: ['WordPress', 'Vue', 'Integration', 'WP Plugin'],
	},
	'construye-mundo': {
		period: '2021 to today',
		role: 'Sole author, as a volunteer',
		description:
			"I migrated the NGO's site from Drupal to WordPress, with a full redesign and a new content structure. I've maintained it since launch and I'm still on the team as a volunteer.",
		tags: ['WordPress', 'Migration', 'Redesign'],
	},
	'play2fund': {
		period: '2020 to 2021, with maintenance afterward',
		role: 'Team lead',
		description:
			'I led the technical team of a platform for funding virtual concerts, planned and launched against the clock during the pandemic. We added split payments with PayPal, event chat, and video integrations.',
		tags: ['WordPress', 'WP Plugin', 'Integration'],
	},
	'mit-sea-grant': {
		period: '2018 to 2023',
		role: 'Lead developer',
		description:
			"I implemented an institutional site from a third-party design, on MIT's infrastructure. I built the theme and custom fields, planned the bulk import of news and projects, and then took care of maintenance.",
		tags: ['WordPress', 'Migration'],
	},
	'mobius': {
		period: '2024 to 2025',
		role: 'Technical lead and PM',
		description:
			'The site for Mobius, which provides personalized medical care and medical risk management to family offices, companies, and maritime programs. A simple, clear structure for a high-profile audience, on a custom theme.',
		tags: ['WordPress', 'Institutional'],
	},
	'monokai-cotalpa': {
		urlLabel: 'See on the Marketplace',
		period: '2019 to today',
		role: 'Author and maintainer',
		description:
			"My own variant of Monokai for VS Code, which I've maintained since 2019. I recently gave it a thorough review to fix bugs and cover the editor's new colors.",
		tags: ['VS Code', 'Open source', 'Own product'],
	},
	'wp-deployment-action': {
		urlLabel: 'See on the Marketplace',
		period: '2024 to today',
		role: 'Author and maintainer',
		description:
			"A public GitHub Action for deploying themes and plugins to WordPress over SSH and rsync. It's simplified for Pressable and WP Engine, but it works on any server with SSH access. We use it on EpicDevs projects so every merge reaches production with no manual steps. I still maintain it, though it has barely needed changes, and that still surprises me.",
		tags: ['GitHub Actions', 'Open source', 'Own product', 'CI/CD'],
	},
	'forant': {
		period: '2026',
		role: 'Founder and sole developer',
		description:
			"A directory and community for international professionals working remotely from Cantabria. I planned it as my own product, from idea to launch. It's still running today, without active development.",
		tags: ['Own product', 'TypeScript'],
	},
}
// La estructura sale de `es`: en inglés solo cambia el texto.
const en: Project[] = es.map((p) => {
	const text = enStudies[p.slug]
	return {
		...p,
		...enText[p.slug],
		study: p.study &&
			text && {
				...p.study,
				...text,
				steps: p.study.steps.map((step, i) => ({ ...step, ...text.steps[i] })),
			},
	}
})

export const projectsFor = (locale?: string) => byLang({ es, en }, locale)
export const studyPath = (slug: string, locale?: string) => `${locale === 'en' ? '/en' : ''}/portfolio/${slug}`
export const studiesFor = (locale?: string) => projectsFor(locale).filter((p) => p.study)
