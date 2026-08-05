function Footer() {
  return (
    <footer className="footer">
      <p>&copy; {new Date().getFullYear()} Mi Proyecto. Todos los derechos reservados.</p>

      <nav className="footer__nav">
        <a href="#about">Nosotros</a>
        <a href="#services">Servicios</a>
        <a href="#contact">Contacto</a>
      </nav>
    </footer>
  )
}

export default Footer
