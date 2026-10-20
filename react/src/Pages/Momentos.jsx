import { useState } from 'react'
import { momentos } from '../data.js'
import useImagenes from '../useImagenes.js'
import Foto from '../Foto.jsx'
import Modal from '../Modal.jsx'

// Reproduce el video DENTRO de la app (no manda a YouTube).
const Reproductor = ({ momento }) => {
  if (momento.archivo) {
    return (
      <div className="video">
        <video src={momento.archivo} controls playsInline />
      </div>
    )
  }
  if (momento.video) {
    // youtube-nocookie.com/embed = reproductor incrustado; playsinline evita la pantalla completa forzada en iPhone
    const url = `https://www.youtube-nocookie.com/embed/${momento.video}?playsinline=1&rel=0`
    return (
      <div className="video">
        <iframe
          src={url}
          title={momento.titulo}
          allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
          allowFullScreen
        />
      </div>
    )
  }
  return (
    <div className="video video-vacio">
      Aquí va el video de este momento. Pega su código de YouTube en <code>data.js</code>.
    </div>
  )
}

const Momentos = () => {
  const [elegido, setElegido] = useState(null)
  const imagenes = useImagenes(momentos.map((m) => m.wiki))

  return (
    <main className="pagina">
      <h1 className="titulo">Momentos</h1>
      <p className="subtitulo">Mis 3 momentos favoritos. Toca uno para ver más y reproducir el video.</p>

      <div className="rejilla rejilla-momentos">
        {momentos.map((m) => (
          <button key={m.id} className="tarjeta tarjeta-momento" onClick={() => setElegido(m)}>
            <Foto className="momento-foto" src={m.imagen || imagenes[m.wiki]} nombre={m.titulo} />
            <span className="tarjeta-nombre">{m.titulo}</span>
          </button>
        ))}
      </div>

      {elegido && (
        <Modal titulo={elegido.titulo} onCerrar={() => setElegido(null)}>
          <Foto className="momento-detalle-foto" src={elegido.imagen || imagenes[elegido.wiki]} nombre={elegido.titulo} />
          <h2 className="detalle-nombre">{elegido.titulo}</h2>
          <p className="detalle-texto">{elegido.detalle}</p>
          <Reproductor momento={elegido} />
        </Modal>
      )}
    </main>
  )
}

export default Momentos
