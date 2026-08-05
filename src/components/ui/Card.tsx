import type { ReactNode } from 'react'

type CardProps = {
  title?: string
  children: ReactNode
  className?: string
}

function Card({ title, children, className = '' }: CardProps) {
  return (
    <div className={`card ${className}`}>
      {title && <h3 className="card__title">{title}</h3>}
      <div className="card__body">{children}</div>
    </div>
  )
}

export default Card
