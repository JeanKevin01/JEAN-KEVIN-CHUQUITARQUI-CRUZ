/**
 * Genera las variantes móviles de las capturas del panel.
 *
 *   node scripts/recortes-movil.mjs
 *
 * Una captura de escritorio de 1800 px comprimida a 390 es una mancha: para un
 * jefe de oficina técnica que abre el enlace desde el celular en obra, la
 * sección más importante del sitio no comunica nada.
 *
 * El recorte quita la barra lateral —que en móvil no aporta y se come el 21%
 * del ancho— y se queda con la franja superior del contenido, que es donde
 * están el título del módulo, los indicadores y el primer gráfico o tabla.
 *
 * Requiere sharp instalado aparte (ver la cabecera de capturar-panel.mjs).
 */
import sharp from 'sharp'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const RAIZ = path.dirname(fileURLToPath(import.meta.url))
const DIR = process.env.CAPTURAS_DIR ?? path.join(RAIZ, '..', 'public', 'capturas')

/** Proporción del ancho que ocupa la barra lateral del panel (320 px de 1500). */
const SIDEBAR = 0.158
/** Alto máximo del recorte, en proporción del ancho resultante. */
const RELACION = 0.62

const fuentes = fs
  .readdirSync(DIR)
  .filter((f) => f.endsWith('.webp') && !f.includes('-mini') && !f.includes('-movil'))

for (const archivo of fuentes) {
  const ruta = path.join(DIR, archivo)
  const { width, height } = await sharp(ruta).metadata()
  if (!width || !height) continue

  const izquierda = Math.round(width * SIDEBAR)
  const ancho = width - izquierda
  const alto = Math.min(height, Math.round(ancho * RELACION))

  const salida = path.join(DIR, archivo.replace('.webp', '-movil.webp'))
  await sharp(ruta)
    .extract({ left: izquierda, top: 0, width: ancho, height: alto })
    .resize({ width: 900 })
    .webp({ quality: 80 })
    .toFile(salida)

  const kb = (fs.statSync(salida).size / 1024).toFixed(0)
  console.log(`${archivo.replace('.webp', '').padEnd(20)} → ${ancho}×${alto} → 900px · ${kb} kB`)
}
