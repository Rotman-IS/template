import type { ButtonHTMLAttributes, ReactNode } from 'react'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary' | 'ghost'
  children: ReactNode
}

function Button({ variant = 'primary', children, ...props }: ButtonProps) {
  return (
    <button className={`btn btn--${variant}`} {...props}>
      {children}
    </button>
  )
}

export default Button
