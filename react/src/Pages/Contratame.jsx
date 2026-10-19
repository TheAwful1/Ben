import { contacto } from '../data.js'
import Foto from '../Foto.jsx'

const Contratame = () => {
  return (
    <main className="pagina pagina-texto contacto">
      <h1 className="titulo">Contrátame</h1>

      <Foto className="contacto-foto" src={contacto.foto} nombre={contacto.nombre} />
      <h2 className="detalle-nombre">{contacto.nombre}</h2>
      <span className="etiqueta">{contacto.titulo}</span>
      <p className="parrafo">{contacto.bio}</p>

      <div className="contacto-botones">
        <a className="boton-neon" href={`mailto:${contacto.email}`}>
          ✉ {contacto.email}
        </a>
        <a className="boton-neon" href={`tel:${contacto.telefono.replace(/\s/g, '')}`}>
          ☎ {contacto.telefono}
        </a>
        <a className="boton-neon boton-borde" href={contacto.github} target="_blank" rel="noreferrer">
          GitHub
        </a>
      </div>
    </main>
  )
}

export default Contratame
