/**
 * Regenera las capturas de la sección "El producto".
 *
 *   PANEL_USER=... PANEL_PASS=... node scripts/capturar-panel.mjs
 *
 * Requiere playwright y sharp, que NO son dependencias del sitio (meterlas en
 * package.json engordaría la imagen de Docker del despliegue). Se instalan
 * aparte solo cuando toca reponer las imágenes:
 *
 *   npm i playwright sharp && npx playwright install chromium
 *
 * Si prefieres no tocar este repo, instálalas en otra carpeta, copia este
 * archivo allí y apunta el destino con CAPTURAS_DIR.
 *
 * REGLA: el saneamiento ocurre DENTRO del navegador, antes del screenshot. Una
 * captura cruda del panel no es publicable —lleva nombres de trabajadores, la
 * marca del empleador, números de orden de trabajo y fotos del sitio del
 * cliente—. Ver la sección Confidencialidad del README.
 *
 * Los nombres NO se adivinan por heurística: se le piden al propio panel
 * (`/api/supervisores` y `/admin/trabajadores`) y se sustituyen por coincidencia
 * exacta. Nada de eso sale del navegador; el proceso Node nunca los ve.
 */
import { chromium } from 'playwright'
import sharp from 'sharp'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const RAIZ = path.dirname(fileURLToPath(import.meta.url))
// CAPTURAS_DIR permite ejecutar el script desde otra carpeta (por ejemplo, una
// donde playwright y sharp sí estén instalados) sin dejar de escribir en el repo.
const DESTINO = process.env.CAPTURAS_DIR ?? path.join(RAIZ, '..', 'public', 'capturas')
const PANEL = process.env.PANEL_URL ?? 'https://panel.astraera.space'
const API = process.env.API_URL ?? 'https://api.apps1.astraera.space'
const USUARIO = process.env.PANEL_USER
const CLAVE = process.env.PANEL_PASS

if (!USUARIO || !CLAVE) {
  console.error('Faltan PANEL_USER y PANEL_PASS en el entorno.')
  process.exit(1)
}

/**
 * Construye el padrón de nombres reales consultando el API con la sesión
 * abierta. Devuelve solo un recuento — los nombres se quedan en la página.
 */
const CARGAR_PADRON = async (api) => {
  // El panel guarda el JWT en 'kampfer_token' (ver src/lib/auth.ts del panel).
  const tk = (localStorage.getItem('kampfer_token') || '').replace(/^"|"$/g, '')
  if (tk.length < 20) throw new Error(`token de sesión inválido (largo ${tk.length})`)

  const traer = async (ruta) => {
    const r = await fetch(api + ruta, { headers: { Authorization: 'Bearer ' + tk } })
    return r.ok ? r.json() : []
  }
  const filas = [...(await traer('/api/supervisores')), ...(await traer('/admin/trabajadores'))]

  const nombres = new Set()
  for (const f of filas) {
    for (const campo of ['nombre', 'nombres', 'supervisor_nombre', 'responsable']) {
      const v = f?.[campo]
      if (typeof v === 'string' && v.trim().length > 2) nombres.add(v.trim())
    }
  }

  // Piezas sueltas: el LookAhead muestra un solo apellido en la columna RESP.
  const piezas = new Set()
  for (const n of nombres) {
    for (const p of n.split(/\s+/)) if (p.length >= 4) piezas.add(p)
  }

  // Se ordena de más largo a más corto para que el nombre completo gane sobre
  // el apellido suelto y no queden restos a medio sustituir.
  window.__padron = {
    completos: [...nombres].sort((a, b) => b.length - a.length),
    piezas: [...piezas].sort((a, b) => b.length - a.length),
  }
  return { nombres: nombres.size, piezas: piezas.size }
}

const escapar = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

/** Corre en la página. No devuelve nada sensible: solo redacta el DOM. */
const SANEAR = () => {
  const { completos, piezas } = window.__padron
  const esc = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

  const asigna = new Map()
  let k = 0
  const etiqueta = (n) => {
    if (!asigna.has(n)) asigna.set(n, 'SUPERVISOR ' + String(++k).padStart(2, '0'))
    return asigna.get(n)
  }

  // La identidad de la sesión se resuelve ANTES que el padrón: si no, "Jean"
  // cae como una pieza más de nombre y la barra lateral queda con una etiqueta.
  document.querySelectorAll('*').forEach((el) => {
    if (!el.children.length && (el.textContent || '').trim() === 'Jean')
      el.textContent = 'Oficina técnica'
  })

  const nodos = []
  const w = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT)
  let n
  while ((n = w.nextNode())) nodos.push(n)

  for (const t of nodos) {
    let s = t.nodeValue
    if (!s) continue
    const original = s

    // 1 · marca del empleador y números de orden de trabajo
    s = s
      .replace(/KAMPFER/g, 'ASTRA ERA')
      .replace(/AIT\s*\d+\s*:?\s*/gi, '')
      .replace(/IO-\d{3,}\s*:?\s*/gi, '')

    // 2 · nombres completos, luego apellidos sueltos.
    //     El reemplazo va como función: así `etiqueta()` solo corre cuando hay
    //     coincidencia real y la numeración queda compacta (01, 02, 03…) en vez
    //     de consumir un número por cada persona del padrón.
    for (const nom of completos) s = s.replace(new RegExp(esc(nom), 'gi'), () => etiqueta(nom))
    for (const p of piezas) s = s.replace(new RegExp('\\b' + esc(p) + '\\b', 'gi'), () => etiqueta(p))

    if (s !== original) t.nodeValue = s
  }

  // 3 · fotos de evidencia del sitio del cliente
  document.querySelectorAll('img').forEach((im) => {
    const r = im.getBoundingClientRect()
    if (r.width > 200 && r.height > 200) return
    im.style.filter = 'blur(6px) saturate(0.7)'
  })

  // 4 · identidad de la sesión en la barra lateral
  document.querySelectorAll('*').forEach((el) => {
    if (!el.children.length && (el.textContent || '').trim() === 'Jean')
      el.textContent = 'Oficina técnica'
  })
}

/**
 * Puerta de seguridad: busca en el DOM ya saneado cualquier resto del padrón.
 * Precisa por construcción —compara contra los nombres reales, no contra una
 * heurística—, así que un resultado > 0 es un fallo verdadero.
 */
const AUDITAR = () => {
  const { completos, piezas } = window.__padron
  const texto = document.body.innerText
  let restos = 0
  for (const n of [...completos, ...piezas]) {
    if (new RegExp('\\b' + n.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '\\b', 'i').test(texto))
      restos++
  }
  return restos
}

/** [archivo, ruta, pestaña dentro de la página, altoDeVentana?] */
const VISTAS = [
  // Planificación primero: es el módulo que se quiere mostrar.
  ['programacion', '/programacion', null],
  ['lookahead', '/programacion', 'Lookahead', 1180],
  ['ppc', '/programacion', 'PPC', 1180],
  ['histograma', '/programacion', 'Histograma', 1100],
  // Valor ganado.
  ['curva-s', '/valor-ganado', 'Curva S'],
  ['valor-ganado', '/valor-ganado', null],
  ['resumen-ejecutivo', '/valor-ganado', 'Resumen Ejecutivo'],
  ['isp', '/valor-ganado', 'ISP'],
]

const navegador = await chromium.launch()
const ctx = await navegador.newContext({
  viewport: { width: 1500, height: 940 },
  deviceScaleFactor: 2,
})
const page = await ctx.newPage()

await page.goto(`${PANEL}/dashboard`, { waitUntil: 'load', timeout: 90_000 })
await page.locator('input').first().fill(USUARIO)
await page.locator('input[type=password]').first().fill(CLAVE)
await page.getByRole('button', { name: /ingresar/i }).click()
await page.waitForTimeout(8_000)

fs.mkdirSync(DESTINO, { recursive: true })
let fallos = 0

for (const [nombre, ruta, pestana, alto] of VISTAS) {
  await page.setViewportSize({ width: 1500, height: alto ?? 940 })
  await page.goto(PANEL + ruta, { waitUntil: 'load' })
  await page.waitForTimeout(9_000)
  if (pestana) {
    await page.getByRole('button', { name: new RegExp(pestana, 'i') }).first().click()
    await page.waitForTimeout(7_000)
  }

  // El padrón se recarga en cada navegación: `window` se limpia al cambiar de ruta.
  const censo = await page.evaluate(CARGAR_PADRON, API)
  await page.evaluate(SANEAR)
  await page.waitForTimeout(600)

  const restos = await page.evaluate(AUDITAR)
  if (restos > 0) {
    console.error(`✗ ${nombre}: ${restos} nombre(s) del padrón sin redactar — NO se guarda`)
    fallos++
    continue
  }

  const png = await page.screenshot()
  await sharp(png).resize({ width: 1800 }).webp({ quality: 82 }).toFile(path.join(DESTINO, `${nombre}.webp`))
  await sharp(png).resize({ width: 720 }).webp({ quality: 74 }).toFile(path.join(DESTINO, `${nombre}-mini.webp`))
  console.log(`✓ ${nombre}  (padrón: ${censo.nombres} nombres / ${censo.piezas} piezas)`)
}

await navegador.close()

if (fallos > 0) {
  console.error(`\n${fallos} vista(s) no superaron la auditoría. Revisa el saneador.`)
  process.exit(1)
}
