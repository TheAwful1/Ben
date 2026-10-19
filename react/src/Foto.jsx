import { useState } from 'react'

// Muestra una imagen. Si no hay URL, o la imagen falla al cargar,
// muestra un recuadro con la inicial del nombre.
const Foto = ({ src, nombre, className = '' }) => {
  const [fallo, setFallo] = useState(false)

  if (!src || fallo) {
    return (
      <div className={`foto-vacia ${className}`} role="img" aria-label={nombre}>
        {nombre.charAt(0)}
      </div>
    )
  }

  return (
    <img
      className={`foto ${className}`}
      src={src}
      alt={nombre}
      onError={() => setFallo(true)}
    />
  )
}

export default Foto
