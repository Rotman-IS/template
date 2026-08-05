import Card from '../ui/Card'
import Title from '../ui/Title'

const services = [
  { id: 'design', title: 'Diseño', description: 'Interfaces claras y consistentes.' },
  { id: 'dev', title: 'Desarrollo', description: 'Aplicaciones rápidas y mantenibles.' },
  { id: 'growth', title: 'Crecimiento', description: 'Medición y mejora continua.' },
]

function Services() {
  return (
    <section className="services" id="services">
      <Title subtitle="Lo que podemos hacer por ti">Servicios</Title>

      <div className="services__grid">
        {services.map((service) => (
          <Card key={service.id} title={service.title}>
            {service.description}
          </Card>
        ))}
      </div>
    </section>
  )
}

export default Services
