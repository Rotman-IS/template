import type { HTMLAttributes } from 'react'

type OrnamentoProps = HTMLAttributes<HTMLSpanElement> & {
  variant?: 'floral' | 'icono' | 'separador'
  posicion?: 'sup-izq' | 'sup-der' | 'inf-izq' | 'inf-der'
  icono?: string
  imagen?: string
  className?: string
}

function Ornamento({
  variant = 'separador',
  posicion,
  icono = 'flor-icon',
  imagen,
  className = '',
  ...props
}: OrnamentoProps) {
  const posClass = posicion ? ` ornamento--${posicion}` : ''

  return (
    <span
      className={`ornamento ornamento--${variant}${posClass} ${className}`}
      aria-hidden="true"
      {...props}
    >
      {variant === 'floral' &&
        (imagen ? (
          <img className="ornamento__img" src={imagen} alt="" loading="lazy" />
        ) : (
          <span className="ornamento__marcador">floral</span>
        ))}

      {variant === 'icono' && (
        <svg className="ornamento__svg">
          <use href={`/icons.svg#${icono}`} />
        </svg>
      )}

      {variant === 'separador' && (
        <>
          <span className="ornamento__linea" />
          <svg className="ornamento__svg">
            <use href={`/icons.svg#${icono}`} />
          </svg>
          <span className="ornamento__linea" />
        </>
      )}
    </span>
  )
}

export default Ornamento
