import { Canvas, useFrame, useThree, type ThreeEvent } from '@react-three/fiber'
import { Html, OrbitControls } from '@react-three/drei'
import { useEffect, useMemo, useRef, useState } from 'react'
import * as THREE from 'three'
import { useCapacidad } from './useCapacidad'

/* ── Tipos del dataset horneado por scripts/build-graph.mjs ───────── */

export type GNodo = {
  id: string
  repo: 'api' | 'panel' | 'web'
  file: string
  name: string
  capa: string
  color: string
  size: number
  deg: number
  x: number
  y: number
  z: number
}
export type GArista = {
  s: string
  t: string
  w: number
  kind: 'call' | 'http'
}
export type GDatos = {
  meta: {
    generado: string
    fuente: string
    indexado: { nodos: number; aristas: number }
    proyeccion: string
    repos: {
      id: string
      nombre: string
      stack: string
      nodos: number
      aristas: number
    }[]
  }
  nodes: GNodo[]
  links: GArista[]
}

const radioDe = (n: GNodo) => 0.34 + Math.sqrt(n.size) * 0.135

/* ── Nube de nodos ────────────────────────────────────────────────── */

function Nodos({
  nodos,
  activo,
  seleccion,
  vecinos,
  onSeleccion,
  onHover,
}: {
  nodos: GNodo[]
  activo: (n: GNodo) => boolean
  seleccion: string | null
  vecinos: Set<string>
  onSeleccion: (id: string | null) => void
  onHover: (n: GNodo | null) => void
}) {
  const ref = useRef<THREE.InstancedMesh>(null)
  const [hover, setHover] = useState<number | null>(null)
  const dummy = useMemo(() => new THREE.Object3D(), [])
  const color = useMemo(() => new THREE.Color(), [])

  // Posición y escala de cada instancia.
  useEffect(() => {
    const m = ref.current
    if (!m) return
    nodos.forEach((n, i) => {
      const on = activo(n)
      const destacado = seleccion === n.id
      const r = radioDe(n) * (destacado ? 1.75 : on ? 1 : 0.45)
      dummy.position.set(n.x, n.y, n.z)
      dummy.scale.setScalar(r)
      dummy.updateMatrix()
      m.setMatrixAt(i, dummy.matrix)
    })
    m.instanceMatrix.needsUpdate = true
  }, [nodos, activo, seleccion, dummy])

  // Color: apagado cuando el nodo queda fuera del foco actual.
  useEffect(() => {
    const m = ref.current
    if (!m) return
    nodos.forEach((n, i) => {
      const on = activo(n)
      const enFoco = !seleccion || seleccion === n.id || vecinos.has(n.id)
      color.set(n.color)
      if (!on) color.multiplyScalar(0.13)
      else if (!enFoco) color.multiplyScalar(0.24)
      else if (seleccion === n.id) color.multiplyScalar(1.9)
      m.setColorAt(i, color)
    })
    if (m.instanceColor) m.instanceColor.needsUpdate = true
  }, [nodos, activo, seleccion, vecinos, color])

  useFrame(() => {
    const m = ref.current
    if (!m || hover === null) return
    // Latido suave del nodo bajo el puntero.
    const n = nodos[hover]
    if (!n) return
    const r = radioDe(n) * (1.28 + Math.sin(performance.now() * 0.006) * 0.09)
    dummy.position.set(n.x, n.y, n.z)
    dummy.scale.setScalar(r)
    dummy.updateMatrix()
    m.setMatrixAt(hover, dummy.matrix)
    m.instanceMatrix.needsUpdate = true
  })

  const mover = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation()
    const i = e.instanceId
    if (i === undefined) return
    const n = nodos[i]
    if (!activo(n)) return
    setHover(i)
    onHover(n)
    document.body.style.cursor = 'pointer'
  }

  const salir = () => {
    setHover(null)
    onHover(null)
    document.body.style.cursor = ''
  }

  return (
    <instancedMesh
      ref={ref}
      args={[undefined, undefined, nodos.length]}
      frustumCulled={false}
      onPointerMove={mover}
      onPointerOut={salir}
      onClick={(e) => {
        e.stopPropagation()
        const i = e.instanceId
        if (i === undefined) return
        const n = nodos[i]
        if (!activo(n)) return
        onSeleccion(seleccion === n.id ? null : n.id)
      }}
    >
      <sphereGeometry args={[1, 14, 12]} />
      <meshBasicMaterial toneMapped={false} />
      {hover !== null && nodos[hover] && (
        <Html
          position={[nodos[hover].x, nodos[hover].y + radioDe(nodos[hover]) + 0.9, nodos[hover].z]}
          center
          distanceFactor={42}
          style={{ pointerEvents: 'none' }}
        >
          <div
            style={{
              fontFamily: 'ui-monospace, monospace',
              fontSize: 12,
              whiteSpace: 'nowrap',
              background: 'rgba(5,7,13,.92)',
              border: '1px solid rgba(255,255,255,.18)',
              borderRadius: 6,
              padding: '3px 8px',
              color: '#e9ecf3',
            }}
          >
            {nodos[hover].name}
          </div>
        </Html>
      )}
    </instancedMesh>
  )
}

/* ── Aristas ──────────────────────────────────────────────────────── */

function Aristas({
  nodos,
  links,
  activo,
  seleccion,
}: {
  nodos: GNodo[]
  links: GArista[]
  activo: (n: GNodo) => boolean
  seleccion: string | null
}) {
  const geo = useMemo(() => new THREE.BufferGeometry(), [])
  const mapa = useMemo(() => new Map(nodos.map((n) => [n.id, n])), [nodos])

  useEffect(() => {
    const pos: number[] = []
    const col: number[] = []
    const c = new THREE.Color()

    for (const l of links) {
      const a = mapa.get(l.s)
      const b = mapa.get(l.t)
      if (!a || !b) continue

      const visible = activo(a) && activo(b)
      const tocaSeleccion = !seleccion || l.s === seleccion || l.t === seleccion

      let i = visible ? (tocaSeleccion ? 1 : 0.16) : 0.05
      if (seleccion && tocaSeleccion && visible) i = 1.9

      pos.push(a.x, a.y, a.z, b.x, b.y, b.z)

      // El enlace entre servicios (HTTP) se pinta ámbar: es la costura del sistema.
      c.set(l.kind === 'http' ? '#f5b83d' : a.color)
      c.multiplyScalar(i * 0.55)
      col.push(c.r, c.g, c.b)
      c.set(l.kind === 'http' ? '#f5b83d' : b.color)
      c.multiplyScalar(i * 0.55)
      col.push(c.r, c.g, c.b)
    }

    geo.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3))
    geo.setAttribute('color', new THREE.Float32BufferAttribute(col, 3))
    geo.computeBoundingSphere()
  }, [links, mapa, activo, seleccion, geo])

  return (
    <lineSegments geometry={geo} frustumCulled={false}>
      <lineBasicMaterial
        vertexColors
        transparent
        opacity={0.85}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        toneMapped={false}
      />
    </lineSegments>
  )
}

/* ── Cámara: centrar suavemente en el nodo elegido ────────────────── */

type ControlsConTarget = { target: THREE.Vector3; update: () => void }

function Camara({ objetivo }: { objetivo: THREE.Vector3 | null }) {
  const controls = useThree((s) => s.controls) as unknown as ControlsConTarget | null
  const meta = useMemo(() => new THREE.Vector3(0, 0, 0), [])

  useFrame((_, dt) => {
    if (!controls) return
    meta.copy(objetivo ?? ORIGEN)
    controls.target.lerp(meta, Math.min(1, dt * 2))
  })
  return null
}

const ORIGEN = new THREE.Vector3(0, 0, 0)

/* ── Escena ───────────────────────────────────────────────────────── */

export default function GraphScene({
  datos,
  reposActivos,
  seleccion,
  onSeleccion,
  onHover,
  girar,
}: {
  datos: GDatos
  reposActivos: Set<string>
  seleccion: string | null
  onSeleccion: (id: string | null) => void
  onHover: (n: GNodo | null) => void
  girar: boolean
}) {
  const cap = useCapacidad()

  const activo = useMemo(() => (n: GNodo) => reposActivos.has(n.repo), [reposActivos])

  const vecinos = useMemo(() => {
    const s = new Set<string>()
    if (!seleccion) return s
    for (const l of datos.links) {
      if (l.s === seleccion) s.add(l.t)
      if (l.t === seleccion) s.add(l.s)
    }
    return s
  }, [seleccion, datos.links])

  const objetivo = useMemo(() => {
    if (!seleccion) return null
    const n = datos.nodes.find((x) => x.id === seleccion)
    return n ? new THREE.Vector3(n.x, n.y, n.z) : null
  }, [seleccion, datos.nodes])

  if (cap.sin3d) return null

  return (
    <div className="grafo-canvas">
      <Canvas
        dpr={cap.dpr}
        gl={{ antialias: !cap.ligero, powerPreference: 'high-performance' }}
        camera={{ position: [6, 10, 92], fov: 46, near: 0.5, far: 600 }}
        onPointerMissed={() => onSeleccion(null)}
      >
        <color attach="background" args={['#04060b']} />
        <fog attach="fog" args={['#04060b', 130, 320]} />
        <Nodos
          nodos={datos.nodes}
          activo={activo}
          seleccion={seleccion}
          vecinos={vecinos}
          onSeleccion={onSeleccion}
          onHover={onHover}
        />
        <Aristas nodos={datos.nodes} links={datos.links} activo={activo} seleccion={seleccion} />
        <Camara objetivo={objetivo} />
        <OrbitControls
          makeDefault
          enablePan={false}
          enableDamping
          dampingFactor={0.06}
          rotateSpeed={0.55}
          zoomSpeed={0.75}
          minDistance={26}
          maxDistance={230}
          autoRotate={girar && !seleccion}
          autoRotateSpeed={0.42}
        />
      </Canvas>
    </div>
  )
}
