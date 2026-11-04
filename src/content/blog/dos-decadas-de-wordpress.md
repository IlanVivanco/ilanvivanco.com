Hoy le podés pedir a un agente que cambie un título y sume tres tarjetas en un sitio, y lo hace. Durante años, ese mismo pedido fue un trabajo. Fue el mío.

Entonces, si cualquiera puede hacer un sitio con IA, ¿para qué un developer?

Hago sitios desde 2005 y trabajo con WordPress con regularidad desde al menos 2010. Para contestar esa pregunta, voy a hacer algo un poco obsesivo: tomar ese pedido, cambiar un título y sumar tres tarjetas, y ver cómo se resolvía en cada época. Spoiler: cada cambio resolvió un problema y trajo otro. Y cada vez, alguien anunció el fin de una era.

Si no sos del palo, vas a entender la mayor parte. El resto es culpa de los shortcodes.

![Gráfico de barras con nueve eras de WordPress y sus años aproximados. Shortcodes y widgets, de 2008 a 2017. Customizer y menús, de 2010 a 2019. ACF fields y templates, de 2011 a 2020. ACF layouts, de 2013 a 2021. Builders con shortcodes, de 2011 a 2020. Builders de arrastrar y soltar, desde 2014. Gutenberg y ACF blocks, desde 2019. Block themes y FSE, desde 2022. Agentes, MCP y Abilities API, desde 2026. Las barras se superponen durante años. Nota al pie: fechas aproximadas, pueden variar según la herramienta, y no todo fue tan lineal.](/img/blog/dos-decadas-de-wordpress/rangos-eras.webp)

## Acto 1: se lo pedías a alguien

### Corchetes por todos lados

En [marzo de 2008, WordPress 2.5](https://wordpress.org/news/2008/03/wordpress-25-brecker/) trajo la API de shortcodes: "little bracket-delineated strings", en sus palabras. Escribías algo como `[button url="/contacto"]` en el contenido, guardabas, y recién ahí veías qué había pasado. Las barras laterales se armaban aparte, con widgets.

Parecía magia hasta que lo sacabas. Según la [propia documentación](https://developer.wordpress.org/apis/shortcode/), un shortcode sin registrar es texto común, sin ningún significado especial. Cambiabas de theme, y en tu página aparecían los corchetes a la vista de todo el mundo.

¿Las tres tarjetas? Si el theme traía un shortcode para eso, tenías suerte. Si no, le escribías a alguien como yo.

![Ilustración del editor de WordPress con una página escrita a puro shortcode, como columns, button, gallery y contact-form, junto al panel de widgets de la barra lateral.](/img/blog/dos-decadas-de-wordpress/era-1-shortcodes.webp)

### Por primera vez, sin llamar a nadie

[WordPress 3.0](https://wordpress.org/news/2010/06/thelonious/) trajo los menús, y su anuncio lo decía con alivio: "no more file editing". Dos años después, [WordPress 3.4](https://wordpress.org/news/2012/06/green/) presentó su mayor novedad, el customizer: ver los cambios antes de mostrárselos al mundo.

Para quien administraba un sitio fue enorme. Pero se cambiaban opciones, no la estructura. El título se podía tocar. Las tres tarjetas seguían siendo otro tema. Y si el theme no te daba las opciones, seguías con las manos atadas.

Y una nota sobre el vértigo: la gran novedad de 2012 fue, diez años más tarde, algo que [WordPress 5.9](https://wordpress.org/news/2022/01/josephine/) anunció que, con los themes de bloques, ya no hacía falta. Textual: "you no longer need the Customizer".

![Ilustración del customizer de WordPress, con sus secciones de identidad, colores, menús y widgets, al lado de la vista previa de un sitio y un editor de menú.](/img/blog/dos-decadas-de-wordpress/era-2-customizer.webp)

### El contenido se separa del diseño

[Advanced Custom Fields](https://wordpress.org/plugins/advanced-custom-fields/) cambió la conversación desde 2011. En vez de un gran cuadro de texto, quien edita completa un formulario: título, imagen, botón. El theme decide cómo se ve.

Primero fueron campos fijos con templates específicos: prolijo, pero cada variante nueva pedía código. Después llegaron los layouts, bloques que se apilan y se reordenan. Las tres tarjetas ya eran algo que cualquiera podía sumar, aunque el resultado se viera recién al abrir la página.

![Ilustración de un formulario de campos con título, bajada, imagen, botón y enlace, junto al sitio resultante y una lista de templates PHP.](/img/blog/dos-decadas-de-wordpress/era-3-acf-fields.webp)

Con eso armamos nuestro theme base, que ya usábamos en 2017. Y descubrimos una ley que se iba a repetir: lo que mejor te resuelve un problema hoy es lo que vas a tener que migrar mañana. Cuando un sitio creció hasta tener miles de cursos, como [Skillsoft](/portfolio/skillsoft), el problema ya no era un formulario, sino importar catálogos cada mes sin descontrolar nada y adaptarlo para que el theme mostrara lo que tenía que mostrar.

![Ilustración de un editor de layouts: un bloque de tarjetas se arrastra entre el hero, los testimonios y el llamado a la acción, con el sitio resultante detrás.](/img/blog/dos-decadas-de-wordpress/era-4-acf-layouts.webp)

## Acto 2: lo hacés vos

### La primera ola de builders

Visual Composer, Divi y Enfold prometieron lo que todos querían: armar la página con cajas visuales. Filas, columnas, elementos. Por fin, casi cualquier cosa sin tocar código.

El detalle estaba abajo: mucho de lo que guardaban seguían siendo shortcodes. Tu contenido quedaba atado al builder. Si un día querías irte, te encontrabas con un `[vc_row]` donde antes había un texto.

Años después, el propio Divi lo reconoció a su manera. La página de [Divi 5](https://www.elegantthemes.com/divi-5/) tiene un título que dice "No more shortcodes". Todavía hoy, cada tanto, nos llega algún export con código de un builder que hay que limpiar a mano.

![Ilustración de un editor visual con filas y cajas de título, imagen y texto, y detrás el código de shortcodes que guarda en realidad.](/img/blog/dos-decadas-de-wordpress/era-5-builders-widgets.webp)

### La segunda ola: arrastrar y soltar

[Beaver Builder, en 2014](https://www.wpbeaverbuilder.com/about/), y [Elementor, en 2016](https://elementor.com/about/), llevaron la edición a la página misma. Después llegó Bricks. Agarrás las tres tarjetas, las soltás donde van, y lo que ves es lo que hay.

Probamos varios. Allá por 2020 lo dije por escrito en nuestro Slack: "de todos los builders que usé, es por lejos el más ameno, para devs y editores". Lo probé en un sitio chico y, si salía bien, íbamos a armar un theme base encima. Salió bien. Elementor mejoró mucho, es extensible para quienes desarrollamos, y a los clientes les gustaba. Tanto, que lo pedían.

No fue gratis. Había una discusión de fondo en el equipo: ¿no era mejor Gutenberg? ¿Quién busca "programador en Elementor"? Y los updates también traían sorpresas. En agosto de 2022, una versión nueva nos rompió íconos en un sitio y, en otro, alguien terminó editando el core del plugin para salir del paso. Sí, ya sé. Por eso, después, un update limpio fue un lanzamiento en sí mismo.

![Ilustración de un builder de arrastrar y soltar: un widget de listado se suelta directamente sobre la página, con paneles de widgets y de estilos de la sección a los costados.](/img/blog/dos-decadas-de-wordpress/era-6-builders-drag.webp)

### El día que WordPress cambió de editor

El [6 de diciembre de 2018](https://wordpress.org/news/2018/12/bebo/), WordPress 5.0 reemplazó el editor por uno de bloques, y lo presentó como "the first step toward an exciting new future". Fue el volantazo más grande de todos, porque no lo elegías: venía con la actualización.

Nosotros no fuimos más valientes. Esa misma semana estábamos pasándonos el link de un plugin para desactivarlo. Cuatro días después, un cliente actualizó por su cuenta, y hubo que desactivarlo para dejarle su editor de siempre, avisándole que eso no iba a durar.

La respuesta del ecosistema se puede medir. WordPress había [prometido sostener el editor clásico hasta 2021](https://make.wordpress.org/core/2018/11/07/classic-editor-plugin-support-window/). El plugin [Classic Editor](https://wordpress.org/plugins/classic-editor/) hoy declara más de 8 millones de instalaciones activas, y soporte "until 2024, or as long as is necessary".

Ahí está la tensión de todo este post: la resistencia a cambiar lo que ya sabés hacer es razonable, porque lo que sabés hacer funciona y te da de comer. Pero si te quedás ahí, te estancás. Con [ACF Blocks](https://www.advancedcustomfields.com/blog/acf-5-8-introducing-acf-blocks-for-gutenberg/), [en 2019](https://www.advancedcustomfields.com/changelog/), sumar bloques a medida pasó a ser posible con lo que ya sabíamos, PHP. Las tres tarjetas se volvieron un bloque, editado donde se ve.

Y como nada es definitivo, tuvimos también el camino inverso. Al pasar páginas de Gutenberg a Elementor con un cliente, los bloques custom se convirtieron en shortcodes. La tecnología "vieja" fue la salida más barata.

![Ilustración del editor de bloques: un bloque de tres tarjetas seleccionado dentro de la página, con sus opciones en un panel y un selector de bloques abajo.](/img/blog/dos-decadas-de-wordpress/era-7-gutenberg.webp)

### Todo el sitio, editable

[En enero de 2022](https://wordpress.org/news/2022/01/josephine/), WordPress anunció "Full site editing is here". La misma idea se extendió a encabezado, pie, plantillas y estilos. El diseño pasó a vivir en un sistema de tokens.

Para nosotros, es una rama que sigue abierta: un flujo válido, fácil de mantener, y la dirección oficial de WordPress. En [Tufts](/portfolio/tufts-jumbopress) construimos un theme de bloques para los sitios nuevos de su red, mientras los actuales siguen funcionando.

![Ilustración del editor de sitio de WordPress, con plantillas, patrones y estilos en el menú, partes como encabezado y pie, y un panel de tipografía y colores.](/img/blog/dos-decadas-de-wordpress/era-8-block-themes.webp)

## Mientras tanto, por debajo

En 2018 todavía pusheábamos a master. No en todos los proyectos, pero sí en suficientes como para que circulara una frase en el equipo: "quien esté libre de push a master que arroje la primera piedra".

Este cambio no lo vio ningún cliente, y es de los que más importan. Primero se editaba directo en el dashboard, en producción, sin rastro. Después por SFTP: archivos en tu máquina, que subías a mano. Más tarde apareció el control de versiones local, con el servidor todavía manual. Con Git, el historial pasó a ser del equipo. Hoy, con flujos de Git y CI/CD, `main` va a producción por PR y el deploy es automático. Armamos hasta [una GitHub Action](https://github.com/IlanVivanco/wp-deployment-action) para eso.

Esto también es parte de la respuesta a la pregunta del principio. Nadie compra un flujo de deploy, pero se nota mucho el día que falta.

También hay que admitir que a más de uno le costó horrores sacarse esa manera de trabajar de la cabeza. Hemos tenido largas sesiones internas tratando de descular quién había editado qué, por qué había 4 branches sin mergear e infinidad de cambios en prod que no figuraban en el repo. Lo que a corto plazo parece fácil y rápido, a la larga te trae “merge conflicts” y dolores de cabeza.

![Gráfico en forma de línea de commits, con cómo llega el código a producción. Edición directa en el dashboard: se cambia en producción y no queda rastro. SFTP: los archivos se editan en local y se suben a mano. Control de versiones local más SFTP: hay historial en la máquina, pero el servidor sigue siendo manual. Git: un repositorio compartido, con ramas e historial del equipo. Flujos de Git y CI/CD: main va a producción por PR, dev a su entorno, y el deploy es automático.](/img/blog/dos-decadas-de-wordpress/versionado.webp)

## Rehacer todo: la respuesta fácil

Cada volantazo tiene un costado comercial. Sale una tecnología nueva, y alguien va a decirte que tu sitio ya no sirve y que hay que rehacerlo.

Nos pasó de cerca. En 2024, otra agencia le dijo a alguien que su builder no servía y que había que rehacer todo. Esa persona nos pidió una segunda opinión. Y la verdad incómoda: a nosotros también nos convenía confirmarlo, porque rehacer es más trabajo facturable.

Pero la verdad, nunca fue nuestra filosofía recomendar eso por reflejo. Lo mejor para cada cliente suele ser otra cosa, y muchas veces se ve recién al mirar de verdad:

- **Reconstruir sin frenar.** [Harver](/portfolio/harver) tenía un sitio heredado y plazos que no daban para empezar de cero. Lo optimizamos y lo fuimos reconstruyendo por lotes.
- **Probar antes de sentenciar.** Una vez nos tocó un sitio con un theme discontinuado, cuya página oficial ya era de casinos. Antes de condenarlo, propusimos probar las actualizaciones en un entorno aparte. Recuerdo frases como: "si sale bien, tiran un poco más. Si no, site nuevo o muerte".
- **Elegir qué modernizar.** En [Tufts](/portfolio/tufts-jumbopress), la auditoría recomendaba modernizar toda la red. Se eligió otro camino, y también funcionó, pero a otra escala.

Y a veces no queda otra, y hay que decirlo. En [Naropa](/portfolio/naropa), el sitio era reciente pero tenía problemas de rendimiento y usabilidad, hasta en el dashboard. Lo auditamos, propusimos pasar a Elementor, y lo rehicimos completo en unos cuatro meses. Rehacer no es el problema. El problema es que sea la primera respuesta, siempre.

## Acto 3: se lo pedís a tu LLM amigo

En [diciembre de 2025, WordPress 6.9](https://wordpress.org/news/2025/12/gene/) trajo la Abilities API, una forma estándar de abrirle la puerta a la IA. El [adaptador de MCP](https://github.com/WordPress/mcp-adapter) la conecta con los agentes. Hasta [Elementor](https://elementor.com/mcp/) anunció ya su propio MCP, aunque a mi parecer a media máquina.

El pedido del principio ahora se escribe tal cual: "cambiá el título y sumá tres tarjetas". Ahí estamos trabajando: en que el equipo de un cliente pueda hacer esto con roles y lineamientos claros, y con una persona que revisa antes de publicar.

Yo lo vivo también en carne propia. Este mismo sitio lo [hice con agentes](/portfolio/ilanvivanco), poniendo a dos modelos en lados opuestos: uno hace y el otro revisa. Son rápidos, y a veces me corrigen. También se equivocan con una seguridad admirable. El desafío ahora es poder agarrar esos errores a tiempo, saber dónde mirar.

![Ilustración de un agente que recibe el pedido de actualizar el título de la home, lee los lineamientos de marca, crea un borrador y espera una revisión antes de publicar. Su rol le permite leer y editar contenido, pero no publicar ni cambiar plugins.](/img/blog/dos-decadas-de-wordpress/era-9-agentes.webp)

## Entonces, ¿para qué un developer?

La línea entre un developer profesional y uno amateur se está difuminando, es inevitable. Me parece genial, y me parece peligroso, por lo mismo que decía el tío Ben: “un gran poder conlleva una gran responsabilidad”.

Lo mismo que te permite crear 3 tarjetas te permite romper todo el sitio. Sin una guía clara detrás, se puede generar mucha basura inconsistente, muy rápido.

Si algo aprendí de 20 años de volantazos es que las herramientas cambian más rápido que los problemas. Ya vi morir a varias soluciones definitivas. Incluso PHP lleva más años muriendo que de vida misma. Lo que sigue igual: qué se rompe, por qué, qué no hay que tocar un viernes, y cuándo rehacer no es la respuesta.

### Cuándo alcanza con la herramienta

El trabajo simple ya no necesita un developer atrás. Cambiar un título, borrar 2 páginas, editar metadata, probablemente tampoco. Pero las tareas más complejas e intrincadas todavía se benefician de lo que un developer aprendió en los últimos años.

En la práctica, lo divido en tres.

**Alcanza, si alguien mira el resultado:**

- Cambiar textos e imágenes, borrar un par de páginas, o revisar contenido viejo o desactualizado.
- Armar una landing nueva con patrones que el sitio ya tiene. La clave está en tener buenas instrucciones y lineamientos, para no tener que rehacer todo constantemente.
- Editar metadata en masa. O incluso mejor: extraerla a una planilla, editarla, revisarla y volver a importarla. Lo mejor de ambos mundos.
- Hacer un primer borrador de una página, un componente o un prototipo para mostrar una idea.

**Sirve, pero timoneado, no en piloto automático:**

- **Diagnosticar.** Encontrar por qué un sitio anda lento, en vez de sumar un parche encima.
- **Auditar.** Encontrar patrones negativos y problemas. Decidir si conviene rehacer o no sigue siendo mejor trabajo para una persona.

**Todavía no alcanza, o no sola:**

- **Migrar sin perder nada.** Conservar URLs, redirects y datos, con forma de volver atrás, como en [Harver](/portfolio/harver) o [Tempo](/portfolio/tempo). Un workflow ordenado sigue siendo clave.
- **Integrar con otros sistemas.** Cada día tenemos más microsistemas conectados en un solo lado: formularios en HubSpot, parámetros UTM para campañas, analytics, pasarelas de pago. El problema real es qué pasa si el otro lado falla o cambia.
- **Importar en forma recurrente,** como los catálogos de [Skillsoft](/portfolio/skillsoft). Todavía hay casos en los que resolver un problema de manera procedural, repetitiva y consistente es superior a la IA generativa, donde hacer dos veces lo mismo no garantiza el mismo resultado.
- **Permisos y contenido pago.** Un error acá no se ve en pantalla, pero alguien accede a lo que no debe. Nada peor que un error silencioso de este estilo.
- **Redes de sitios.** En una red como la de [Tufts](/portfolio/tufts-jumbopress), un cambio que anda en un sitio puede romper otro. Hacen falta chequeos automáticos que encuentren los casos raros a tiempo.
- **Incidentes.** Cuando algo se cae un viernes, hay que entender qué pasó antes de tocar nada. Y un contexto de 1M de tokens no siempre alcanza para un sitio de miles de páginas con años de historia.

La diferencia no está en lo difícil que parece la tarea, sino en cuánto cuesta equivocarse y si se nota a tiempo. Un título mal se ve y se corrige en un minuto. Un redirect mal puede tardar semanas en notarse y Google no perdona con eso.

### No hay un anillo único

Sacando mi lado nerd: tampoco existe el anillo único para gobernarlos a todos. Hay muchas maneras de lograr un objetivo. Por eso mi foco hoy no está en elegir la herramienta ganadora, sino en acercarle a cada cliente la que necesita para hacer su trabajo más rápido y eficiente, pero bien. Con su intención, su voz y su estética. Usar el LLM como una herramienta más, poderosa, pero nada más.

---

¿Estás por rehacer un sitio y no sabés si hace falta? [Contame qué tenés](/contacto) y lo miramos.
