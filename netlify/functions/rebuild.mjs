// Regenera el sitio una vez por semana, para traer las fotos nuevas de Instagram.
// Netlify solo ejecuta funciones programadas en el deploy de producción.
export default async () => {
	const hook = process.env.REBUILD_HOOK_URL
	if (!hook) return console.log('Falta REBUILD_HOOK_URL: no se regenera el sitio')
	const res = await fetch(hook, { method: 'POST' })
	console.log(`Rebuild pedido: ${res.status}`)
}

export const config = { schedule: '@weekly' }
