import Ornamento from '../ui/Ornamento'

const padres = {
  intro: 'Con la compañía de mis padres',
  nombres: ['[Nombre del padre]', '[Nombre de la madre]'],
  invitacion: 'Te invito a celebrar con alegría este momento tan especial:',
  cierre: 'Mis 15 Años',
}

function Padres() {
  return (
    <section className="padres" id="padres">
      <Ornamento variant="separador" />

      <p className="padres__intro">{padres.intro}</p>

      <p className="padres__nombres">{padres.nombres.join(' & ')}</p>

      <p className="padres__invitacion">{padres.invitacion}</p>

      <p className="padres__cierre">{padres.cierre}</p>
    </section>
  )
}

export default Padres
