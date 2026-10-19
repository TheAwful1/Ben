import react from 'react'
import {Link} from 'react-router-dom'

const Nav = () => {
  return (
  <>
  <nav class="navbar sm:navbar-expand bg-1 fg-2">
 <ul className="navbar-nav">
    <li className="nav-item">
      <Link className="nav-link" to="/Pages/Portada">
        Portada
      </Link>
    </li>
    <li className="nav-item">
      <Link className="nav-link" to="/Pages/Personajes">
        Personajes
      </Link>
    </li>
    <li className="nav-item">
      <Link className="nav-link" to="/Pages/Momentos">
        Momentos
      </Link>
    </li>
    <li className="nav-item">
      <Link className="nav-link" to="/Pages/Acercade">
        Acerca de
      </Link>
    </li>
    <li className="nav-item">
      <Link className="nav-link" to="/Pages/Juego">
        Juego
      </Link>
    </li>
    <li className="nav-item">
      <Link className="nav-link" to="/Pages/Contratame">
        Contratame
      </Link>
    </li>
  </ul>
</nav>
  </>
    )
}

export default Nav