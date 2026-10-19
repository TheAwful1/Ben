import { NavLink } from 'react-router-dom'

// NavLink es como Link, pero agrega la clase "active" al enlace de la página actual.
const Nav = () => {
  return (
    <nav className="menu">
      <ul className="menu-lista">
        <li>
          <NavLink className="menu-enlace" to="/" end>
            Portada
          </NavLink>
        </li>
        <li>
          <NavLink className="menu-enlace" to="/Personajes">
            Personajes
          </NavLink>
        </li>
        <li>
          <NavLink className="menu-enlace" to="/Momentos">
            Momentos
          </NavLink>
        </li>
        <li>
          <NavLink className="menu-enlace" to="/Acercade">
            Acerca de
          </NavLink>
        </li>
        <li>
          <NavLink className="menu-enlace" to="/Juego">
            Juego
          </NavLink>
        </li>
        <li>
          <NavLink className="menu-enlace" to="/Contratame">
            Contrátame
          </NavLink>
        </li>
      </ul>
    </nav>
  )
}

export default Nav
