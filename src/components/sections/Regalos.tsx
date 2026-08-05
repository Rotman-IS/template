import Ornamento from '../ui/Ornamento'

const regalos = {
  titulo: 'Sugerencia de regalos',
  texto: 'Tu compañía en este día tan especial es el mejor regalo. Pero si deseas darme un obsequio, aquí tienes algunas opciones:',
  modalidad: 'Lluvia de sobres',
}

function Regalos() {
  return (
    <section className="regalos" id="regalos">
      <h2>{regalos.titulo}</h2>

      <p className="regalos__texto">{regalos.texto}</p>

      <Ornamento variant="icono" icono="sobre-icon" className="regalos__icono" />

      <p className="regalos__modalidad">{regalos.modalidad}</p>
    </section>
  )
}

export default Regalos
