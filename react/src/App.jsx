import './App.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Nav from './Nav.jsx'
import Portada from './Pages/Portada.jsx'
import Personajes from './Pages/Personajes.jsx'
import Momentos from './Pages/Momentos.jsx'
import Acercade from './Pages/Acercade.jsx'
import Juego from './Pages/Juego.jsx'
import Contratame from './Pages/Contratame.jsx'
function App() {

  return (
  <>
    <BrowserRouter>
      <Nav/>


      
      <Routes>
          <Route path="/" element={<Portada/>} />
          <Route path="/Personajes" element={<Personajes />} />
          <Route path="/Momentos" element={<Momentos />} />
          <Route path="/Acercade" element={<Acercade />} />
          <Route path="/Juego" element={<Juego />} />
           <Route path="/Contratame" element={<Contratame />} />
      </Routes>
    </BrowserRouter>
  </>
  )
}

export default App
