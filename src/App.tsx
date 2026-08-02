import Nav from './components/Nav'
import Grafo from './components/Grafo'
import Producto from './components/Producto'
import {
  Cadena,
  Cierre,
  Cifras,
  Decisiones,
  DetalleTecnico,
  Hero,
  Metodo,
  Pendiente,
  Problemas,
  Restricciones,
  Resuelve,
  Sistema,
  StackSeccion,
  Trayectoria,
} from './components/secciones'

/**
 * Orden narrativo: primero qué problema hay y qué se resuelve, después cómo se
 * ve y recién al final cómo está hecho por dentro. El detalle de ingeniería va
 * plegado para que un lector no técnico llegue al contacto sin atravesarlo.
 */
export default function App() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Cadena />
        <Resuelve />
        <Sistema />
        <Producto />
        <Restricciones />
        <Cifras />
        <Grafo />
        <DetalleTecnico>
          <Decisiones />
          <Problemas />
          <Pendiente />
          <Metodo />
        </DetalleTecnico>
        <Trayectoria />
        <StackSeccion />
        <Cierre />
      </main>
    </>
  )
}
