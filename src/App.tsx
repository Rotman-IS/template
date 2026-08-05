// Landing anterior: se conserva como referencia. Import y uso van comentados
// juntos, porque `noUnusedLocals` rompe la compilación si solo se comenta el JSX.
// import Header from './components/layout/Header'
// import Footer from './components/layout/Footer'
// import Hero from './components/sections/Hero'
// import About from './components/sections/About'
// import Services from './components/sections/Services'
// import Pricing from './components/sections/Pricing'
// import FAQ from './components/sections/FAQ'
// import Contact from './components/sections/Contact'
import Portada from './components/sections/Portada'
import Padres from './components/sections/Padres'
import Fecha from './components/sections/Fecha'
import Recepcion from './components/sections/Recepcion'
import Itinerario from './components/sections/Itinerario'
import Vestimenta from './components/sections/Vestimenta'
import Galeria from './components/sections/Galeria'
import Regalos from './components/sections/Regalos'
import Confirmar from './components/sections/Confirmar'
import Cierre from './components/sections/Cierre'
import './App.css'

function App() {
  return (
    <>
      {/* <Header /> */}

      <main>
        <Portada />
        <Padres />
        <Fecha />
        <Recepcion />
        <Itinerario />
        <Vestimenta />
        <Galeria />
        <Regalos />
        <Confirmar />
        <Cierre />
      </main>

      {/* <Footer /> */}
    </>
  )
}

export default App
