import { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'
import BrowserRouter from 'react-router-dom'
import * as bootstrap from 'bootstrap'
import Display from './components/display'

function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      <Display />
    </BrowserRouter>
  )
}

export default App
