import type { InputHTMLAttributes } from 'react'

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string
  error?: string
}

function Input({ label, error, id, ...props }: InputProps) {
  const inputId = id ?? props.name

  return (
    <div className="input">
      {label && (
        <label className="input__label" htmlFor={inputId}>
          {label}
        </label>
      )}
      <input className="input__field" id={inputId} {...props} />
      {error && <span className="input__error">{error}</span>}
    </div>
  )
}

export default Input
