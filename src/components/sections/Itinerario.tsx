import Ornamento from '../ui/Ornamento'

const hitos = [
  { id: 'ceremonia', hora: '4:30 PM', label: 'Ceremonia', icon: 'corona-icon' },
  { id: 'bendicion', hora: '5:00 PM', label: 'Bendición', icon: 'cruz-icon' },
  { id: 'cena', hora: '6:00 PM', label: 'Cena', icon: 'cena-icon' },
  { id: 'baile', hora: '9:00 PM', label: 'Baile', icon: 'baile-icon' },
  { id: 'despedida', hora: '11:00 PM', label: 'Despedida', icon: 'despedida-icon' },
]

function Itinerario() {
  return (
    <section className="itinerario" id="itinerario">
      <h2>Itinerario de actividades</h2>

      <Ornamento variant="separador" />

      <ol className="itinerario__lista">
        {hitos.map((hito) => (
          <li className="itinerario__hito" key={hito.id}>
            <span className="itinerario__hora">{hito.hora}</span>

            <span className="itinerario__nodo">
              <svg className="itinerario__icono">
                <use href={`/icons.svg#${hito.icon}`} />
              </svg>
            </span>

            <span className="itinerario__label">{hito.label}</span>
          </li>
        ))}
      </ol>
    </section>
  )
}

export default Itinerario
