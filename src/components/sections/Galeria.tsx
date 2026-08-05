import Ornamento from '../ui/Ornamento'
import Photo from '../ui/Photo'

const galeria = {
  etiqueta: 'Foto destacada',
}

function Galeria() {
  return (
    <section className="galeria" id="galeria">
      <Ornamento variant="floral" posicion="sup-der" />

      <Photo label={galeria.etiqueta} ratio="3x4" variant="arco" className="galeria__foto" />

      <Ornamento variant="floral" posicion="inf-izq" />
    </section>
  )
}

export default Galeria
