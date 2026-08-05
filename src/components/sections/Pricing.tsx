import Button from '../ui/Button'
import Card from '../ui/Card'
import Title from '../ui/Title'

const plans = [
  { id: 'basic', name: 'Básico', price: '$9', features: ['1 proyecto', 'Soporte por email'] },
  { id: 'pro', name: 'Pro', price: '$29', features: ['10 proyectos', 'Soporte prioritario'] },
  { id: 'team', name: 'Equipo', price: '$79', features: ['Proyectos ilimitados', 'SSO'] },
]

function Pricing() {
  return (
    <section className="pricing" id="pricing">
      <Title subtitle="Elige el plan que se ajuste a tu equipo">Precios</Title>

      <div className="pricing__grid">
        {plans.map((plan) => (
          <Card key={plan.id} title={plan.name}>
            <p className="pricing__price">
              {plan.price}
              <span>/mes</span>
            </p>

            <ul>
              {plan.features.map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>

            <Button>Elegir {plan.name}</Button>
          </Card>
        ))}
      </div>
    </section>
  )
}

export default Pricing
