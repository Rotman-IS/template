import type { ReactNode } from 'react'

type TitleProps = {
  as?: 'h1' | 'h2' | 'h3'
  subtitle?: string
  children: ReactNode
}

function Title({ as: Tag = 'h2', subtitle, children }: TitleProps) {
  return (
    <header className="title">
      <Tag className="title__heading">{children}</Tag>
      {subtitle && <p className="title__subtitle">{subtitle}</p>}
    </header>
  )
}

export default Title
