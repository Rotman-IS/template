import { useState } from 'react'
import Title from '../ui/Title'

const faqs = [
  { id: 'q1', question: '¿Cómo empiezo?', answer: 'Crea una cuenta y sigue el asistente inicial.' },
  { id: 'q2', question: '¿Puedo cancelar?', answer: 'Sí, en cualquier momento desde tu panel.' },
  { id: 'q3', question: '¿Ofrecen soporte?', answer: 'Sí, por email en todos los planes.' },
]

function FAQ() {
  const [openId, setOpenId] = useState<string | null>(null)

  return (
    <section className="faq" id="faq">
      <Title subtitle="Preguntas frecuentes">FAQ</Title>

      <ul className="faq__list">
        {faqs.map((faq) => (
          <li key={faq.id} className="faq__item">
            <button
              className="faq__question"
              aria-expanded={openId === faq.id}
              onClick={() => setOpenId(openId === faq.id ? null : faq.id)}
            >
              {faq.question}
            </button>

            {openId === faq.id && <p className="faq__answer">{faq.answer}</p>}
          </li>
        ))}
      </ul>
    </section>
  )
}

export default FAQ
