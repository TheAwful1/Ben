import react from 'react'
import {Link} from 'react-router-dom'

const Nav = () => {
  return (
  <>
  <nav class="nav">
 <ul className="navbar-nav">
    <li className="nav-item">
      <Link className="nav-link" to="/">
        Portada
      </Link>
    </li>
    <li className="nav-item">
      <Link className="nav-link" to="/Personajes">
        Personajes
      </Link>
    </li>
    <li className="nav-item">
      <Link className="nav-link" to="/Momentos">
        Momentos
      </Link>
    </li>
    <li className="nav-item">
      <Link className="nav-link" to="/Acercade">
        Acerca de
      </Link>
    </li>
    <li className="nav-item">
      <Link className="nav-link" to="/Juego">
        Juego
      </Link>
    </li>
    <li className="nav-item">
      <Link className="nav-link" to="/Contratame">
        Contratame
      </Link>
    </li>
  </ul>
</nav>
  </>
    )
}

export default Nav