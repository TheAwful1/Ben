import { useEffect, useState } from 'react'
import { getImagenes } from './wiki.js'

// Hook: recibe una lista de títulos de la wiki y devuelve { titulo: urlDeImagen }.
// Mientras carga (o si falla) devuelve {}, y la interfaz usa el respaldo.
export default function useImagenes(titulos) {
  const [imagenes, setImagenes] = useState({})
  const clave = titulos.join('|') // un texto estable para que el efecto no se repita sin necesidad

  useEffect(() => {
    let cancelado = false
    getImagenes(clave.split('|'))
      .then((resultado) => {
        if (!cancelado) setImagenes(resultado)
      })
      .catch(() => {
        /* sin internet o la wiki no responde: se queda el respaldo */
      })
    return () => {
      cancelado = true // si la página se cierra antes de que llegue la respuesta
    }
  }, [clave])

  return imagenes
}
