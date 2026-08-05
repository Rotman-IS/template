import { useEffect, useState } from 'react'
import Ornamento from '../ui/Ornamento'

// Fuente única de la fecha del evento: la muestran tanto el bloque de fecha
// como la cuenta regresiva.
const evento = {
  fecha: new Date('2026-12-05T16:30:00'),
  etiquetaFaltan: 'Faltan',
}

const unidades = [
  { id: 'dias', label: 'Días' },
  { id: 'horas', label: 'Horas' },
  { id: 'min', label: 'Min' },
  { id: 'seg', label: 'Seg' },
] as const

const mes = new Intl.DateTimeFormat('es-ES', { month: 'long' }).format(evento.fecha)
const diaSemana = new Intl.DateTimeFormat('es-ES', { weekday: 'long' }).format(evento.fecha)

function restante(objetivo: Date) {
  const total = Math.floor(Math.max(0, objetivo.getTime() - Date.now()) / 1000)

  return {
    dias: Math.floor(total / 86400),
    horas: Math.floor(total / 3600) % 24,
    min: Math.floor(total / 60) % 60,
    seg: total % 60,
  }
}

function CuentaRegresiva() {
  const [tiempo, setTiempo] = useState(() => restante(evento.fecha))

  useEffect(() => {
    if (evento.fecha.getTime() <= Date.now()) return

    const id = setInterval(() => {
      const siguiente = restante(evento.fecha)
      setTiempo(siguiente)

      if (siguiente.dias + siguiente.horas + siguiente.min + siguiente.seg === 0) {
        clearInterval(id)
      }
    }, 1000)

    return () => clearInterval(id)
  }, [])

  return (
    <div className="cuenta">
      <p className="cuenta__etiqueta">{evento.etiquetaFaltan}</p>

      <div className="cuenta__unidades">
        {unidades.map((unidad) => (
          <div className="cuenta__unidad" key={unidad.id}>
            <span className="cuenta__valor">{String(tiempo[unidad.id]).padStart(2, '0')}</span>
            <span className="cuenta__label">{unidad.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function Fecha() {
  return (
    <section className="fecha" id="fecha">
      <Ornamento variant="separador" icono="corona-icon" />

      <p className="fecha__mes">{mes}</p>

      <div className="fecha__bloque">
        <span className="fecha__semana">{diaSemana}</span>
        <span className="fecha__dia">{evento.fecha.getDate()}</span>
        <span className="fecha__anio">{evento.fecha.getFullYear()}</span>
      </div>

      <CuentaRegresiva />
    </section>
  )
}

export default Fecha
