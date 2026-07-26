/**
 * grafo-svg.mjs
 * ---------------------------------------------------------------------------
 * Proyecta public/data/graph.json a un SVG apaisado para documentos impresos.
 * Reutiliza el layout 3D ya horneado: misma constelación que muestra el sitio,
 * vista desde un ángulo fijo y con perspectiva suave.
 *
 *   node scripts/grafo-svg.mjs <salida.svg> [ancho] [alto]
 * ---------------------------------------------------------------------------
 */
import { readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const [, , salida = 'grafo.svg', anchoArg = '1100', altoArg = '430'] = process.argv
const W = Number(anchoArg)
const H = Number(altoArg)

const datos = JSON.parse(readFileSync(join(__dirname, '..', 'public', 'data', 'graph.json'), 'utf8'))

/* Cámara: giro en Y y ligera inclinación en X. Elegidos para que los dos
   cúmulos —API y panel— queden separados y se lea el puente entre servicios. */
const AY = -0.42
const AX = 0.22
const DIST = 210
const FOCAL = 620

const proyecta = (n) => {
  let { x, y, z } = n
  let x1 = x * Math.cos(AY) + z * Math.sin(AY)
  let z1 = -x * Math.sin(AY) + z * Math.cos(AY)
  const y1 = y * Math.cos(AX) - z1 * Math.sin(AX)
  z1 = y * Math.sin(AX) + z1 * Math.cos(AX)
  const k = FOCAL / (DIST - z1)
  return { px: x1 * k, py: -y1 * k, k, z: z1 }
}

const P = new Map()
for (const n of datos.nodes) P.set(n.id, { ...proyecta(n), n })

// Encuadrar al cuerpo del grafo por percentiles: un par de nodos sueltos muy
// alejados dejarían la mitad del lienzo vacío.
const pct = (arr, q) => {
  const s = [...arr].sort((a, b) => a - b)
  return s[Math.min(s.length - 1, Math.max(0, Math.round((s.length - 1) * q)))]
}
const xs = [...P.values()].map((p) => p.px)
const ys = [...P.values()].map((p) => p.py)
const minX = pct(xs, 0.02)
const maxX = pct(xs, 0.98)
const minY = pct(ys, 0.02)
const maxY = pct(ys, 0.98)
// Escalar para llenar el ancho, admitiendo que la banda recorte arriba y abajo:
// en una franja apaisada el vacío lateral se nota mucho más que el recorte.
const margen = 18
const escX = (W - margen * 2) / (maxX - minX)
const escY = (H - margen * 2) / (maxY - minY)
const esc = Math.min(escX, escY * 1.75)
const cx = (minX + maxX) / 2
const cy = (minY + maxY) / 2
const T = (p) => ({ x: W / 2 + (p.px - cx) * esc, y: H / 2 + (p.py - cy) * esc })

const radio = (n, k) => Math.max(1.5, (0.34 + Math.sqrt(n.size) * 0.135) * esc * k * 0.5)

/* Aristas primero, de atrás hacia delante. */
const aristas = datos.links
  .map((l) => {
    const a = P.get(l.s)
    const b = P.get(l.t)
    if (!a || !b) return null
    return { l, a, b, z: (a.z + b.z) / 2 }
  })
  .filter(Boolean)
  .sort((u, v) => u.z - v.z)

let svg = ''
for (const { l, a, b } of aristas) {
  const p1 = T(a)
  const p2 = T(b)
  const http = l.kind === 'http'
  const color = http ? '#f5b83d' : a.n.color
  const op = http ? 0.9 : Math.min(0.72, 0.24 + l.w * 0.05)
  const gr = http ? 1.2 : 0.7
  svg += `<line x1="${p1.x.toFixed(1)}" y1="${p1.y.toFixed(1)}" x2="${p2.x.toFixed(
    1,
  )}" y2="${p2.y.toFixed(1)}" stroke="${color}" stroke-opacity="${op.toFixed(
    2,
  )}" stroke-width="${gr}"/>\n`
}

/* Nodos: halo + núcleo, de atrás hacia delante. */
const nodos = [...P.values()].sort((u, v) => u.z - v.z)
for (const p of nodos) {
  const { x, y } = T(p)
  const r = radio(p.n, p.k)
  svg += `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${(r * 2.5).toFixed(
    1,
  )}" fill="${p.n.color}" fill-opacity="0.12"/>\n`
  svg += `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${r.toFixed(1)}" fill="${
    p.n.color
  }"/>\n`
}

const doc = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}">
<defs><clipPath id="marco"><rect width="${W}" height="${H}"/></clipPath></defs>
<rect width="${W}" height="${H}" fill="#06090f"/>
<g clip-path="url(#marco)">
${svg}</g></svg>
`

writeFileSync(salida, doc)
console.log(`${salida} → ${datos.nodes.length} nodos · ${aristas.length} aristas · ${W}×${H}`)
