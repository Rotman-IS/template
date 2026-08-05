import Ornamento from '../ui/Ornamento'

const vestimenta = {
  titulo: 'Código de vestimenta',
  codigo: 'Formal',
  atuendos: [
    { id: 'vestido', icon: 'vestido-icon', label: 'Vestido largo' },
    { id: 'traje', icon: 'traje-icon', label: 'Traje formal' },
  ],
  nota: 'Con mucho cariño les pedimos evitar prendas en color lavanda y morado, reservados para la quinceañera.',
}

function Vestimenta() {
  return (
    <section className="vestimenta" id="vestimenta">
      <h2>{vestimenta.titulo}</h2>

      <p className="vestimenta__codigo">{vestimenta.codigo}</p>

      <Ornamento variant="separador" />

      <ul className="vestimenta__atuendos">
        {vestimenta.atuendos.map((atuendo) => (
          <li className="vestimenta__atuendo" key={atuendo.id}>
            <svg className="vestimenta__icono">
              <use href={`/icons.svg#${atuendo.icon}`} />
            </svg>
            <span>{atuendo.label}</span>
          </li>
        ))}
      </ul>

      <p className="vestimenta__nota">{vestimenta.nota}</p>
    </section>
  )
}

export default Vestimenta
