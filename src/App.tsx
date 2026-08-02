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
  Tesis,
  Trayectoria,
} from './components/secciones'

/**
 * Orden narrativo: qué problema hay, qué se resuelve, cómo se ve, y recién al
 * final cómo está hecho por dentro.
 *
 * El grafo del código vive DENTRO del detalle plegado, no en el recorrido
 * principal: no le habla ni al asesor de tesis ni al jefe de oficina técnica, y
 * sus OrbitControls capturaban la rueda del ratón a media página —un muro de
 * scroll justo antes del contacto—.
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
        <Tesis />
        <DetalleTecnico>
          <Decisiones />
          <Problemas />
          <Pendiente />
          <Metodo />
          <Grafo />
        </DetalleTecnico>
        <Trayectoria />
        <Cierre />
      </main>
    </>
  )
}
