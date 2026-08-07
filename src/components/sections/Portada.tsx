import Ornamento from '../ui/Ornamento'
import Photo from '../ui/Photo'
import floral from '../../assets/floral1SB.webp'

const portada = {
  cita: '"Hay momentos increíbles que se atesoran en el corazón para siempre, y por eso quiero que compartas conmigo este día tan especial."',
  rotulo: 'Mis XV Años',
  nombre: '[Nombre de la quinceañera]',
}

function Portada() {
  return (
    <section className="portada" id="portada">
      <Ornamento variant="floral" posicion="sup-izq" imagen={floral} />
      <Ornamento variant="floral" posicion="sup-der" imagen={floral} />

      <p className="portada__cita">{portada.cita}</p>

      <Ornamento variant="icono" icono="corona-icon" className="portada__corona" />

      <h2 className="portada__rotulo">{portada.rotulo}</h2>

      <Photo label="Foto principal" ratio="3x4" className="portada__foto" />

      <h1 className="portada__nombre">{portada.nombre}</h1>
    </section>
  )
}

export default Portada
