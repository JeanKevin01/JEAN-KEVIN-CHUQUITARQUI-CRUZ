import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useEffect, useMemo, useRef } from 'react'
import * as THREE from 'three'
import { useCapacidad } from './useCapacidad'

/**
 * Terreno de datos.
 *
 * Una superficie levantada por curvas de nivel y nube de puntos: la misma
 * imagen mental de un modelo digital de terreno y de una curva de avance. No es
 * decoración aleatoria — la retícula es la metáfora del sitio: puntos discretos
 * medidos en campo que, juntos, describen una superficie.
 *
 * Tres cosas cargan el peso visual:
 *  · las curvas de nivel, que dan lectura de relieve donde los puntos sueltos
 *    solo daban textura;
 *  · el levantamiento inicial, una onda que recorre el terreno de dentro hacia
 *    fuera durante los primeros segundos;
 *  · el desplazamiento por scroll, que baja la cámara a ras del terreno para
 *    invitar a seguir bajando.
 */

/** Campo de alturas compartido por puntos y curvas: ambos deben coincidir. */
const RELIEVE = /* glsl */ `
  uniform float uTime;
  uniform vec2  uMouse;
  uniform float uReveal;

  float relieve(vec3 p) {
    float r = length(p.xz);

    // Tres trenes de onda de distinta escala: el relieve nunca se repite igual.
    float h  = sin(p.x * 0.28 + uTime * 0.42) * 0.55;
    h += sin(p.z * 0.21 - uTime * 0.31) * 0.62;
    h += sin((p.x + p.z) * 0.13 + uTime * 0.22) * 0.85;
    h += sin(r * 0.42 - uTime * 0.75) * 0.5 / (1.0 + r * 0.16);

    // El puntero levanta el terreno a su alrededor, con caída suave.
    vec2 m = uMouse * 22.0;
    float d = distance(p.xz, m);
    h += 3.1 * exp(-d * d * 0.007);

    return h;
  }

  /** 0 → 1 con retardo radial: la onda de aparición sale del centro. */
  float aparicion(vec3 p) {
    float r = length(p.xz);
    float t = clamp(uReveal * 1.75 - r * 0.020, 0.0, 1.0);
    return t * t * (3.0 - 2.0 * t);   // smoothstep
  }
`

const VERT_PUNTOS = /* glsl */ `
  ${RELIEVE}
  uniform float uSize;
  attribute float aSeed;
  varying float vAlt;
  varying float vDist;
  varying float vAparicion;

  void main() {
    vec3 p = position;
    float a = aparicion(p);
    float h = relieve(p);

    p.y += h * a;
    vAlt = h;
    vDist = length(p.xz);
    vAparicion = a;

    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    gl_Position = projectionMatrix * mv;

    float centelleo = 0.78 + 0.22 * sin(uTime * 1.7 + aSeed * 6.2831);
    gl_PointSize = uSize * centelleo * (34.0 / -mv.z);
  }
`

const FRAG_PUNTOS = /* glsl */ `
  precision mediump float;
  uniform vec3 uAmbar;
  uniform vec3 uCian;
  varying float vAlt;
  varying float vDist;
  varying float vAparicion;

  void main() {
    vec2 c = gl_PointCoord - 0.5;
    float d = dot(c, c);
    if (d > 0.25) discard;

    // Núcleo denso con halo corto.
    float alfa = smoothstep(0.25, 0.015, d);

    // Ámbar en las crestas, cian en los valles.
    float k = clamp(vAlt * 0.34 + 0.5, 0.0, 1.0);
    vec3 col = mix(uCian, uAmbar, k);
    col += k * k * 0.35;                       // las crestas queman un poco

    // El borde del mundo se apaga, pero mucho menos que antes.
    float lejos = 1.0 - smoothstep(30.0, 58.0, vDist);
    alfa *= lejos * (0.55 + 0.45 * k) * vAparicion;

    gl_FragColor = vec4(col, alfa);
  }
`

const VERT_CURVAS = /* glsl */ `
  ${RELIEVE}
  varying float vAlt;
  varying float vDist;
  varying float vAparicion;

  void main() {
    vec3 p = position;
    float a = aparicion(p);
    float h = relieve(p);

    p.y += h * a;
    vAlt = h;
    vDist = length(p.xz);
    vAparicion = a;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
  }
`

const FRAG_CURVAS = /* glsl */ `
  precision mediump float;
  uniform vec3 uAmbar;
  uniform vec3 uCian;
  varying float vAlt;
  varying float vDist;
  varying float vAparicion;

  void main() {
    float k = clamp(vAlt * 0.34 + 0.5, 0.0, 1.0);
    vec3 col = mix(uCian, uAmbar, k);

    float lejos = 1.0 - smoothstep(26.0, 56.0, vDist);
    // Solo las cotas altas se dibujan fuerte: da lectura de curva de nivel.
    float realce = smoothstep(0.30, 0.92, k);
    float alfa = lejos * vAparicion * (0.10 + 0.55 * realce);

    gl_FragColor = vec4(col, alfa);
  }
`

const LADO = 56

/** Uniforms compartidos: una sola fuente para que puntos y curvas no se separen. */
function useUniformes() {
  return useMemo(
    () => ({
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0, 0) },
      uReveal: { value: 0 },
      uSize: { value: 3.4 },
      uAmbar: { value: new THREE.Color('#f5b83d') },
      uCian: { value: new THREE.Color('#4fd1c5') },
    }),
    [],
  )
}

function Terreno({ grid, curvas, animar }: { grid: number; curvas: number; animar: boolean }) {
  const grupo = useRef<THREE.Group>(null)
  const matPuntos = useRef<THREE.ShaderMaterial>(null)
  const matCurvas = useRef<THREE.ShaderMaterial>(null)
  const objetivo = useRef(new THREE.Vector2(0, 0))
  const actual = useRef(new THREE.Vector2(0, 0))
  const reveal = useRef(animar ? 0 : 1)
  const scroll = useRef(0)
  const { viewport, camera } = useThree()

  const uniforms = useUniformes()

  // Progreso de scroll dentro del héroe, 0 → 1.
  useEffect(() => {
    const onScroll = () => {
      scroll.current = Math.min(1, window.scrollY / Math.max(1, window.innerHeight))
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const geoPuntos = useMemo(() => {
    const n = grid * grid
    const pos = new Float32Array(n * 3)
    const seed = new Float32Array(n)
    let i = 0
    for (let x = 0; x < grid; x++) {
      for (let z = 0; z < grid; z++) {
        pos[i * 3] = (x / (grid - 1) - 0.5) * LADO
        pos[i * 3 + 1] = 0
        pos[i * 3 + 2] = (z / (grid - 1) - 0.5) * LADO
        seed[i] = Math.random()
        i++
      }
    }
    const g = new THREE.BufferGeometry()
    g.setAttribute('position', new THREE.BufferAttribute(pos, 3))
    g.setAttribute('aSeed', new THREE.BufferAttribute(seed, 1))
    return g
  }, [grid])

  /** Curvas de nivel: líneas corridas en X, muestreadas fino para que el
      desplazamiento del vértice no las quiebre. */
  const geoCurvas = useMemo(() => {
    const muestras = 190
    const pos = new Float32Array(curvas * (muestras - 1) * 2 * 3)
    let i = 0
    for (let c = 0; c < curvas; c++) {
      const z = (c / (curvas - 1) - 0.5) * LADO
      for (let s = 0; s < muestras - 1; s++) {
        const x0 = (s / (muestras - 1) - 0.5) * LADO
        const x1 = ((s + 1) / (muestras - 1) - 0.5) * LADO
        pos[i++] = x0
        pos[i++] = 0
        pos[i++] = z
        pos[i++] = x1
        pos[i++] = 0
        pos[i++] = z
      }
    }
    const g = new THREE.BufferGeometry()
    g.setAttribute('position', new THREE.BufferAttribute(pos, 3))
    return g
  }, [curvas])

  useEffect(() => () => {
    geoPuntos.dispose()
    geoCurvas.dispose()
  }, [geoPuntos, geoCurvas])

  useFrame((state, dt) => {
    const p = state.pointer
    objetivo.current.set(p.x * (viewport.width / 40), -p.y * (viewport.height / 40))
    actual.current.lerp(objetivo.current, Math.min(1, dt * 2.2))

    if (animar && reveal.current < 1) reveal.current = Math.min(1, reveal.current + dt * 0.42)

    for (const m of [matPuntos.current, matCurvas.current]) {
      if (!m) continue
      m.uniforms.uTime.value = state.clock.elapsedTime
      m.uniforms.uMouse.value.copy(actual.current)
      m.uniforms.uReveal.value = reveal.current
    }
    if (grupo.current) grupo.current.rotation.y += dt * 0.028

    // Al bajar, la cámara se acerca al terreno y lo mira más de canto.
    const s = scroll.current
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, 9.5 - s * 6.2, Math.min(1, dt * 3))
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, 24 - s * 5.0, Math.min(1, dt * 3))
    camera.lookAt(0, -2.4, 0)
  })

  return (
    <group ref={grupo} position={[0, -2.4, 0]} rotation={[0.02, 0, 0]}>
      <points geometry={geoPuntos}>
        <shaderMaterial
          ref={matPuntos}
          uniforms={uniforms}
          vertexShader={VERT_PUNTOS}
          fragmentShader={FRAG_PUNTOS}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
      <lineSegments geometry={geoCurvas}>
        <shaderMaterial
          ref={matCurvas}
          uniforms={uniforms}
          vertexShader={VERT_CURVAS}
          fragmentShader={FRAG_CURVAS}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </lineSegments>
    </group>
  )
}

export default function HeroScene() {
  const cap = useCapacidad()
  if (cap.sin3d) return null

  // El envoltorio lleva el posicionamiento: R3F escribe estilos en línea
  // sobre su propio contenedor y ganarían a los de la hoja de estilos.
  return (
    <div className="hero-canvas">
      <Canvas
        dpr={cap.dpr}
        gl={{ antialias: false, powerPreference: 'high-performance', alpha: true }}
        camera={{ position: [0, 9.5, 24], fov: 52, near: 0.1, far: 200 }}
      >
        <Terreno grid={cap.grid} curvas={cap.curvas} animar={!cap.ligero} />
        <fog attach="fog" args={['#05070d', 38, 80]} />
      </Canvas>
    </div>
  )
}
