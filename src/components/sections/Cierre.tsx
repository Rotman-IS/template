import Ornamento from '../ui/Ornamento'

const cierre = {
  nota: 'Con mucho cariño, esta celebración es para adolescentes y adultos que puedan compartir y disfrutar juntos.',
  agradecimiento: 'Tu presencia y alegría harán que esta noche sea inolvidable.',
  despedida: 'Te esperamos',
}

function Cierre() {
  return (
    <section className="cierre" id="cierre">
      <p className="cierre__nota">{cierre.nota}</p>

      <Ornamento variant="separador" />

      <p className="cierre__agradecimiento">{cierre.agradecimiento}</p>

      <p className="cierre__despedida">{cierre.despedida}</p>

      <Ornamento variant="floral" posicion="inf-izq" />
      <Ornamento variant="floral" posicion="inf-der" />
    </section>
  )
}

export default Cierre
