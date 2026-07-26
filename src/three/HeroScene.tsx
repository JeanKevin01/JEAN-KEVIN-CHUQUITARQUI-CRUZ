import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useMemo, useRef } from 'react'
import * as THREE from 'three'
import { useCapacidad } from './useCapacidad'

/**
 * Terreno de datos.
 *
 * Una superficie de puntos que ondula: la misma imagen mental de un modelo
 * digital de terreno y de una curva de avance. No es decoración aleatoria —
 * la retícula es la metáfora del sitio: puntos discretos medidos en campo
 * que, juntos, describen una superficie.
 */

const VERT = /* glsl */ `
  uniform float uTime;
  uniform vec2  uMouse;
  uniform float uSize;
  attribute float aSeed;
  varying float vAlt;
  varying float vDist;

  void main() {
    vec3 p = position;

    float r = length(p.xz);

    // Tres trenes de onda de distinta escala: el relieve nunca se repite igual.
    float h  = sin(p.x * 0.28 + uTime * 0.42) * 0.55;
    h += sin(p.z * 0.21 - uTime * 0.31) * 0.62;
    h += sin((p.x + p.z) * 0.13 + uTime * 0.22) * 0.85;
    h += sin(r * 0.42 - uTime * 0.75) * 0.5 / (1.0 + r * 0.16);

    // El puntero levanta el terreno a su alrededor, con caída suave.
    vec2 m = uMouse * 22.0;
    float d = distance(p.xz, m);
    h += 2.4 * exp(-d * d * 0.008);

    p.y += h;
    vAlt = h;
    vDist = r;

    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    gl_Position = projectionMatrix * mv;

    float centelleo = 0.72 + 0.28 * sin(uTime * 1.7 + aSeed * 6.2831);
    gl_PointSize = uSize * centelleo * (34.0 / -mv.z);
  }
`

const FRAG = /* glsl */ `
  precision mediump float;
  uniform vec3 uAmbar;
  uniform vec3 uCian;
  varying float vAlt;
  varying float vDist;

  void main() {
    vec2 c = gl_PointCoord - 0.5;
    float d = dot(c, c);
    if (d > 0.25) discard;

    // Punto con núcleo denso y halo corto.
    float alfa = smoothstep(0.25, 0.02, d);

    // Ámbar en las crestas, cian en los valles.
    float k = clamp(vAlt * 0.34 + 0.5, 0.0, 1.0);
    vec3 col = mix(uCian, uAmbar, k);

    // Desvanecido radial: el borde del mundo se apaga.
    float lejos = 1.0 - smoothstep(26.0, 54.0, vDist);
    alfa *= lejos * (0.30 + 0.70 * k);

    gl_FragColor = vec4(col, alfa);
  }
`

function Terreno({ grid }: { grid: number }) {
  const puntos = useRef<THREE.Points>(null)
  const mat = useRef<THREE.ShaderMaterial>(null)
  const objetivo = useRef(new THREE.Vector2(0, 0))
  const actual = useRef(new THREE.Vector2(0, 0))
  const { viewport } = useThree()

  const geo = useMemo(() => {
    const lado = 56
    const n = grid * grid
    const pos = new Float32Array(n * 3)
    const seed = new Float32Array(n)
    let i = 0
    for (let x = 0; x < grid; x++) {
      for (let z = 0; z < grid; z++) {
        pos[i * 3] = (x / (grid - 1) - 0.5) * lado
        pos[i * 3 + 1] = 0
        pos[i * 3 + 2] = (z / (grid - 1) - 0.5) * lado
        seed[i] = Math.random()
        i++
      }
    }
    const g = new THREE.BufferGeometry()
    g.setAttribute('position', new THREE.BufferAttribute(pos, 3))
    g.setAttribute('aSeed', new THREE.BufferAttribute(seed, 1))
    return g
  }, [grid])

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0, 0) },
      uSize: { value: 2.0 },
      uAmbar: { value: new THREE.Color('#f5b83d') },
      uCian: { value: new THREE.Color('#4fd1c5') },
    }),
    [],
  )

  useFrame((state, dt) => {
    const p = state.pointer
    objetivo.current.set(p.x * (viewport.width / 40), -p.y * (viewport.height / 40))
    actual.current.lerp(objetivo.current, Math.min(1, dt * 2.2))

    if (mat.current) {
      mat.current.uniforms.uTime.value = state.clock.elapsedTime
      mat.current.uniforms.uMouse.value.copy(actual.current)
    }
    if (puntos.current) {
      puntos.current.rotation.y += dt * 0.028
    }
  })

  return (
    <points ref={puntos} geometry={geo} position={[0, -2.4, 0]} rotation={[0.02, 0, 0]}>
      <shaderMaterial
        ref={mat}
        uniforms={uniforms}
        vertexShader={VERT}
        fragmentShader={FRAG}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
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
        <Terreno grid={cap.grid} />
        <fog attach="fog" args={['#05070d', 34, 74]} />
      </Canvas>
    </div>
  )
}
