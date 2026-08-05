import type { HTMLAttributes } from 'react'

type PhotoProps = HTMLAttributes<HTMLDivElement> & {
  label: string
  ratio?: '4x5' | '3x4' | '1x1' | '9x16'
  variant?: 'recta' | 'arco'
  className?: string
}

function Photo({ label, ratio = '4x5', variant = 'recta', className = '', ...props }: PhotoProps) {
  return (
    <div className={`photo photo--${variant} photo--${ratio} ${className}`} {...props}>
      <span className="photo__label">{label}</span>
      <span className="photo__hint">reemplazar por imagen</span>
    </div>
  )
}

export default Photo
