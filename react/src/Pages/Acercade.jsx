import { serie } from '../data.js'

const Acercade = () => {
  return (
    <main className="pagina pagina-texto">
      <h1 className="titulo">Acerca de</h1>
      <p className="parrafo">{serie.descripcion}</p>

      <div className="panel">
        <dl className="ficha">
          <dt>Creadores</dt>
          <dd>{serie.creadores}</dd>
          <dt>Temporadas</dt>
          <dd>{serie.temporadas}</dd>
          <dt>Canal</dt>
          <dd>{serie.canal}</dd>
          <dt>Estreno</dt>
          <dd>{serie.estreno}</dd>
        </dl>
      </div>

      <div className="panel">
        <h2 className="panel-titulo">Continuaciones de la franquicia</h2>
        <ul className="detalle-lista">
          {serie.continuaciones.map((c) => (
            <li key={c}>{c}</li>
          ))}
        </ul>
      </div>

      <p className="creditos">
        Información e imágenes tomadas de{' '}
        <a href="https://ben10.fandom.com" target="_blank" rel="noreferrer">
          Ben 10 Wiki
        </a>
        . Ben 10 pertenece a Cartoon Network / Warner Bros. Esta app es un proyecto de clase hecho por un fan.
      </p>
    </main>
  )
}

export default Acercade
