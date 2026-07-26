import Nav from './components/Nav'
import Grafo from './components/Grafo'
import {
  Cadena,
  Cierre,
  Cifras,
  Decisiones,
  Hero,
  Metodo,
  Pendiente,
  Problemas,
  Restricciones,
  Sistema,
  StackSeccion,
  Trayectoria,
} from './components/secciones'

export default function App() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Cadena />
        <Restricciones />
        <Sistema />
        <Cifras />
        <Grafo />
        <Decisiones />
        <Problemas />
        <Pendiente />
        <Metodo />
        <Trayectoria />
        <StackSeccion />
        <Cierre />
      </main>
    </>
  )
}
