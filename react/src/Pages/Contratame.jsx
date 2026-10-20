import { contacto } from '../data.js'
import Foto from '../Foto.jsx'
import './Contratame.css'

const tecnologias = [
  {
    nombre: 'React',
    marca: '⚛',
    tipo: 'Interfaz',
    descripcion: 'Componentes reutilizables y vistas que responden a cambios de estado.',
    clase: 'react',
  },
  {
    nombre: 'JavaScript',
    marca: 'JS',
    tipo: 'Lenguaje',
    descripcion: 'Lógica de la aplicación, interacciones y comportamiento del juego.',
    clase: 'javascript',
  },
  {
    nombre: 'HTML5',
    marca: '5',
    tipo: 'Estructura',
    descripcion: 'Estructura semántica de las páginas y sus elementos.',
    clase: 'html',
  },
  {
    nombre: 'CSS3',
    marca: '3',
    tipo: 'Diseño adaptable',
    descripcion: 'Diseño visual, animaciones, distribución y adaptación a móviles.',
    clase: 'css',
  },
  {
    nombre: 'Vite',
    marca: 'V',
    tipo: 'Herramienta de desarrollo',
    descripcion: 'Servidor local y proceso de compilación para producción.',
    clase: 'vite',
  },
  {
    nombre: 'React Router',
    marca: '↗',
    tipo: 'Navegación',
    descripcion: 'Rutas para moverse entre las secciones de la web sin recargarla.',
    clase: 'router',
  },
  {
    nombre: 'Bootstrap',
    marca: 'B',
    tipo: 'Estilos base',
    descripcion: 'Utilidades y estilos base complementados con CSS propio.',
    clase: 'bootstrap',
  },
  {
    nombre: 'Canvas 2D',
    marca: '2D',
    tipo: 'Gráficos de juego',
    descripcion: 'Dibujo en tiempo real para el prototipo de combate dentro del navegador.',
    clase: 'canvas',
  },
]

const Contratame = () => {
  return (
    <main className="pagina pagina-contacto contacto">
      <section className="contacto-presentacion" aria-label="Perfil y contacto">
        <div className="contacto-perfil">
          <Foto className="contacto-foto" src={contacto.foto} nombre={contacto.nombre} />
          <div className="contacto-perfil-texto">
            <span className="contacto-kicker">PERFIL DE DESARROLLADOR</span>
            <h1 className="titulo">Contrátame</h1>
            <h2 className="detalle-nombre">{contacto.nombre}</h2>
            <span className="etiqueta">{contacto.titulo}</span>
            <p className="contacto-bio">{contacto.bio}</p>
          </div>
        </div>

        <div className="contacto-botones">
          <a className="boton-neon" href={`mailto:${contacto.email}`}>
            <span aria-hidden="true">✉</span> Correo
          </a>
          <a className="boton-neon boton-borde" href={`tel:${contacto.telefono.replace(/\s/g, '')}`}>
            <span aria-hidden="true">☎</span> Teléfono
          </a>
          <a className="boton-neon boton-borde" href={contacto.github} target="_blank" rel="noreferrer">
            GitHub <span aria-hidden="true">↗</span>
          </a>
        </div>
      </section>

      <section className="contacto-tecnologias" aria-labelledby="titulo-tecnologias">
        <div className="tecnologias-encabezado">
          <span className="contacto-kicker">MI STACK</span>
          <h2 id="titulo-tecnologias">Tecnologías utilizadas</h2>
          <p>
            Herramientas y tecnologías que he utilizado para construir este sitio
            y su prototipo de juego interactivo.
          </p>
        </div>

        <div className="tecnologias-grid">
          {tecnologias.map((tecnologia) => (
            <article className="tecnologia-card" key={tecnologia.nombre}>
              <div className={`tecnologia-marca tecnologia-marca--${tecnologia.clase}`} aria-hidden="true">
                {tecnologia.marca}
              </div>
              <div className="tecnologia-contenido">
                <span className="tecnologia-tipo">{tecnologia.tipo}</span>
                <h3>{tecnologia.nombre}</h3>
                <p>{tecnologia.descripcion}</p>
              </div>
            </article>
          ))}
        </div>

        <p className="tecnologias-nota">
          El diseño combina estilos propios con Bootstrap; el juego utiliza Canvas 2D
          directamente desde React, sin un motor externo.
        </p>
      </section>
    </main>
  )
}

export default Contratame
