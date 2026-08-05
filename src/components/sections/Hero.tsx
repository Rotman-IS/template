import Button from '../ui/Button'

function Hero() {
  return (
    <section className="hero" id="hero">
      <h1>Un titular que explica tu propuesta de valor</h1>
      <p>Una frase corta de apoyo que aclara para quién es y qué problema resuelve.</p>

      <div className="hero__actions">
        <Button>Empezar</Button>
        <Button variant="secondary">Saber más</Button>
      </div>
    </section>
  )
}

export default Hero
