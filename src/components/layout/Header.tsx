import Button from '../ui/Button'

const links = [
  { label: 'Inicio', href: '#hero' },
  { label: 'Nosotros', href: '#about' },
  { label: 'Servicios', href: '#services' },
  { label: 'Precios', href: '#pricing' },
  { label: 'FAQ', href: '#faq' },
]

function Header() {
  return (
    <header className="header">
      <a className="header__logo" href="#hero">
        Logo
      </a>

      <nav className="header__nav">
        {links.map((link) => (
          <a key={link.href} href={link.href}>
            {link.label}
          </a>
        ))}
      </nav>

      <Button onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}>
        Contacto
      </Button>
    </header>
  )
}

export default Header
