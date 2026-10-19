// Trae imágenes de la wiki de Ben 10 usando su API (MediaWiki).
// - No necesita clave.
// - "origin=*" le dice a la wiki que acepte pedidos desde cualquier página (CORS).
// - Pedimos todos los títulos en UNA sola llamada, separados por "|".

const API = 'https://ben10.fandom.com/api.php'

// Guarda lo que ya pedimos para no repetir la llamada al cambiar de página.
const memoria = new Map()

export function getImagenes(titulos) {
  const clave = titulos.join('|')
  if (!memoria.has(clave)) {
    memoria.set(
      clave,
      pedir(titulos).catch((error) => {
        memoria.delete(clave) // si falló, la próxima vez lo intenta de nuevo
        throw error
      }),
    )
  }
  return memoria.get(clave)
}

async function pedir(titulos) {
  const params = new URLSearchParams({
    action: 'query',
    format: 'json',
    origin: '*',
    prop: 'pageimages',
    piprop: 'thumbnail',
    pithumbsize: '600',
    redirects: '1',
    titles: titulos.join('|'),
  })

  const respuesta = await fetch(`${API}?${params}`)
  if (!respuesta.ok) throw new Error(`La wiki respondió ${respuesta.status}`)
  const datos = await respuesta.json()
  const consulta = datos.query ?? {}

  // La wiki puede cambiar un título ("normalized") o redirigirlo ("redirects").
  // Seguimos esos cambios para saber qué página corresponde a cada título pedido.
  const destino = {}
  for (const t of titulos) destino[t] = t
  for (const cambio of [...(consulta.normalized ?? []), ...(consulta.redirects ?? [])]) {
    for (const t of titulos) {
      if (destino[t] === cambio.from) destino[t] = cambio.to
    }
  }

  const imagenPorPagina = {}
  for (const pagina of Object.values(consulta.pages ?? {})) {
    imagenPorPagina[pagina.title] = pagina.thumbnail?.source ?? null
  }

  // Resultado: { 'Heatblast': 'https://...png', 'Four Arms': null, ... }
  const resultado = {}
  for (const t of titulos) resultado[t] = imagenPorPagina[destino[t]] ?? null
  return resultado
}
