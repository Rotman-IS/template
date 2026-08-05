import { useState } from 'react'
import type { FormEvent } from 'react'
import Button from '../ui/Button'
import Input from '../ui/Input'
import Title from '../ui/Title'

function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [sent, setSent] = useState(false)

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    // TODO: conectar con tu backend o servicio de formularios.
    setSent(true)
  }

  return (
    <section className="contact" id="contact">
      <Title subtitle="Cuéntanos en qué podemos ayudarte">Contacto</Title>

      <form className="contact__form" onSubmit={handleSubmit}>
        <Input
          name="name"
          label="Nombre"
          value={form.name}
          onChange={(event) => setForm({ ...form, name: event.target.value })}
          required
        />

        <Input
          name="email"
          type="email"
          label="Email"
          value={form.email}
          onChange={(event) => setForm({ ...form, email: event.target.value })}
          required
        />

        <label className="input__label" htmlFor="message">
          Mensaje
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          value={form.message}
          onChange={(event) => setForm({ ...form, message: event.target.value })}
          required
        />

        <Button type="submit">Enviar</Button>

        {sent && <p className="contact__success">¡Gracias! Te responderemos pronto.</p>}
      </form>
    </section>
  )
}

export default Contact
