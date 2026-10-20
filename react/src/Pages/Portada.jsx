import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { aliens, serie } from '../data.js'
import useImagenes from '../useImagenes.js'
import Foto from '../Foto.jsx'

const Portada = () => {
  const [indice, setIndice] = useState(0)
  const imagenes = useImagenes(aliens.map((a) => a.wiki))
  const toqueInicial = useRef(null)
  const total = aliens.length

  const siguiente = () => setIndice((i) => (i + 1) % total) // % vuelve a 0 después del último
  const anterior = () => setIndice((i) => (i - 1 + total) % total)

  // Autoplay: cada vez que cambia el índice se reinicia el reloj de 5 segundos.
  useEffect(() => {
    const reloj = setTimeout(() => setIndice((i) => (i + 1) % total), 5000)
    return () => clearTimeout(reloj)
  }, [indice, total])

  // Controles de PC: flechas del teclado.
  useEffect(() => {
    const alPresionar = (e) => {
      if (e.key === 'ArrowRight') setIndice((i) => (i + 1) % total)
      if (e.key === 'ArrowLeft') setIndice((i) => (i - 1 + total) % total)
    }
    window.addEventListener('keydown', alPresionar)
    return () => window.removeEventListener('keydown', alPresionar)
  }, [total])

  // Controles de celular: deslizar con el dedo.
  const alTocar = (e) => {
    toqueInicial.current = e.touches[0].clientX
  }
  const alSoltar = (e) => {
    if (toqueInicial.current === null) return
    const diferencia = e.changedTouches[0].clientX - toqueInicial.current
    if (diferencia < -40) siguiente()
    if (diferencia > 40) anterior()
    toqueInicial.current = null
  }

  return (
    <main className="pagina portada">
      <header className="portada-cabecera">
        <h1 className="logo">BEN 10</h1>
        <p className="lema">{serie.lema}</p>
      </header>

      <section className="slider" aria-label="Aliens del Omnitrix">
        <div className="slider-ventana" onTouchStart={alTocar} onTouchEnd={alSoltar}>
          <div className="slider-pista" style={{ transform: `translateX(-${indice * 100}%)` }}>
            {aliens.map((a, i) => (
              <article className="slide" key={a.id} aria-hidden={i !== indice} style={{ '--color': a.color }}>
                <div className="slide-imagen">
                  <Foto src={a.imagen || imagenes[a.wiki]} nombre={a.nombre} />
                </div>
                <div className="slide-info">
                  <span className="slide-numero">
                    {i + 1} / {total}
                  </span>
                  <h2 className="slide-nombre">{a.nombre}</h2>
                  <div className="etiquetas">
                    <span className="etiqueta">{a.especie}</span>
                    <span className="etiqueta">{a.planeta}</span>
                  </div>
                  <p className="slide-texto">{a.descripcion}</p>
                  <p className="slide-poder">
                    <strong>Poder:</strong> {a.poder}
                  </p>
                </div>
              </article>
            ))}
          </div>

          <button className="flecha izquierda" onClick={anterior} aria-label="Alien anterior">
            ‹
          </button>
          <button className="flecha derecha" onClick={siguiente} aria-label="Alien siguiente">
            ›
          </button>
        </div>

        <div className="puntos">
          {aliens.map((a, i) => (
            <button
              key={a.id}
              className={i === indice ? 'punto activo' : 'punto'}
              onClick={() => setIndice(i)}
              aria-label={`Ir a ${a.nombre}`}
            />
          ))}
        </div>
      </section>

      <p className="pista">Desliza, usa las flechas ← → o toca los puntos</p>
      <Link className="boton-neon" to="/Personajes">
        Conoce a los personajes
      </Link>
    </main>
  )
}

export default Portada
