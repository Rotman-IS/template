import Button from '../ui/Button'
import Ornamento from '../ui/Ornamento'
import Photo from '../ui/Photo'

const recepcion = {
  hora: '4:30 PM',
  titulo: 'Recepción',
  salon: '[Nombre del salón]',
  ciudad: '[Ciudad]',
  mapa: 'https://maps.google.com/?q=[direccion+del+salon]',
}

function Recepcion() {
  return (
    <section className="recepcion" id="recepcion">
      <Ornamento variant="icono" icono="brindis-icon" className="recepcion__icono" />

      <p className="recepcion__hora">{recepcion.hora}</p>

      <h2 className="recepcion__titulo">{recepcion.titulo}</h2>

      <p className="recepcion__salon">{recepcion.salon}</p>
      <p className="recepcion__ciudad">{recepcion.ciudad}</p>

      <Button onClick={() => window.open(recepcion.mapa, '_blank', 'noopener,noreferrer')}>
        Ver ubicación
      </Button>

      <Photo label="Foto de ambientación" ratio="4x5" className="recepcion__foto" />
    </section>
  )
}

export default Recepcion
