import Ornamento from '../ui/Ornamento'
import Photo from '../ui/Photo'
import floral from '../../assets/floral1SB.webp'

const galeria = {
  etiqueta: 'Foto destacada',
}

function Galeria() {
  return (
    <section className="galeria" id="galeria">
      <Ornamento variant="floral" posicion="sup-der" imagen={floral} />

      <Photo label={galeria.etiqueta} ratio="3x4" variant="arco" className="galeria__foto" />

      <Ornamento variant="floral" posicion="inf-izq" imagen={floral} />
    </section>
  )
}

export default Galeria
