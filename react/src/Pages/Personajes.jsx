import { useState } from 'react'
import { personajes } from '../data.js'
import useImagenes from '../useImagenes.js'
import Foto from '../Foto.jsx'
import Modal from '../Modal.jsx'

const Personajes = () => {
  const [elegido, setElegido] = useState(null) // null = ningún personaje abierto
  const imagenes = useImagenes(personajes.map((p) => p.wiki))

  return (
    <main className="pagina">
      <h1 className="titulo">Personajes</h1>
      <p className="subtitulo">Toca un personaje para ver su foto y sus detalles.</p>

      <div className="rejilla">
        {personajes.map((p) => (
          <button key={p.id} className="tarjeta" onClick={() => setElegido(p)}>
            <Foto className="tarjeta-foto" src={p.imagen || imagenes[p.wiki]} nombre={p.nombre} />
            <span className="tarjeta-nombre">{p.nombre}</span>
            <span className="tarjeta-rol">{p.rol}</span>
          </button>
        ))}
      </div>

      {elegido && (
        <Modal titulo={elegido.nombre} onCerrar={() => setElegido(null)}>
          <Foto className="detalle-foto" src={elegido.imagen || imagenes[elegido.wiki]} nombre={elegido.nombre} />
          <h2 className="detalle-nombre">{elegido.nombre}</h2>
          <span className="etiqueta">{elegido.rol}</span>
          <p className="detalle-texto">{elegido.descripcion}</p>
          <ul className="detalle-lista">
            {elegido.datos.map((d) => (
              <li key={d}>{d}</li>
            ))}
          </ul>
        </Modal>
      )}
    </main>
  )
}

export default Personajes
