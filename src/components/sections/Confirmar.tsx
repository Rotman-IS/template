import Button from '../ui/Button'
import Ornamento from '../ui/Ornamento'

const confirmar = {
  titulo: 'Confirmar asistencia',
  texto: 'Por favor confirma tu asistencia',
  limite: 'antes del [día] de [mes]',
  enlace: 'https://wa.me/[numero]?text=Confirmo%20mi%20asistencia',
  etiquetaBoton: 'Confirmar asistencia',
}

function Confirmar() {
  return (
    <section className="confirmar" id="confirmar">
      <Ornamento variant="icono" icono="calendario-icon" className="confirmar__icono" />

      <h2>{confirmar.titulo}</h2>

      <p className="confirmar__texto">{confirmar.texto}</p>
      <p className="confirmar__limite">{confirmar.limite}</p>

      <Button onClick={() => window.open(confirmar.enlace, '_blank', 'noopener,noreferrer')}>
        {confirmar.etiquetaBoton}
      </Button>
    </section>
  )
}

export default Confirmar
