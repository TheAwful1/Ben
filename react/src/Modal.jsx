import { useEffect } from 'react'

// Ventana emergente. Se cierra con la X, tocando el fondo o con la tecla Escape.
const Modal = ({ titulo, onCerrar, children }) => {
  useEffect(() => {
    const alPresionar = (e) => {
      if (e.key === 'Escape') onCerrar()
    }
    window.addEventListener('keydown', alPresionar)
    document.body.style.overflow = 'hidden' // evita que la página de atrás se desplace
    return () => {
      window.removeEventListener('keydown', alPresionar)
      document.body.style.overflow = ''
    }
  }, [onCerrar])

  return (
    <div className="modal-fondo" onClick={onCerrar}>
      <div
        className="modal-panel"
        role="dialog"
        aria-modal="true"
        aria-label={titulo}
        onClick={(e) => e.stopPropagation()} // tocar dentro del panel no lo cierra
      >
        <button className="modal-cerrar" onClick={onCerrar} aria-label="Cerrar">
          ×
        </button>
        {children}
      </div>
    </div>
  )
}

export default Modal
