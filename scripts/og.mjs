/**
 * Regenera `public/og.jpg`, la tarjeta de previsualización que se ve al
 * compartir el enlace por WhatsApp, LinkedIn o Slack.
 *
 *   npm run build
 *   npm run preview -- --port 5299 &
 *   node scripts/og.mjs
 *
 * Requiere playwright y sharp instalados aparte —no son dependencias del sitio,
 * ver la cabecera de capturar-panel.mjs—.
 *
 * Se genera del propio héroe en lugar de dibujarse a mano: así la tarjeta nunca
 * se desincroniza del sitio cuando cambia el titular o la escena.
 */
import { chromium } from 'playwright'
import sharp from 'sharp'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const RAIZ = path.dirname(fileURLToPath(import.meta.url))
const DESTINO = process.env.OG_SALIDA ?? path.join(RAIZ, '..', 'public', 'og.jpg')
const SITIO = process.env.SITIO_URL ?? 'http://localhost:5299/'

const navegador = await chromium.launch()
// 1200×630 es la proporción que piden Open Graph y Twitter.
const page = await navegador.newPage({
  viewport: { width: 1200, height: 630 },
  deviceScaleFactor: 2,
})

await page.goto(SITIO, { waitUntil: 'load', timeout: 90_000 })
// El terreno del héroe tarda un par de segundos en levantarse del todo.
await page.waitForTimeout(9_000)

// La barra de navegación y el pie sobran en una tarjeta compartida.
await page.evaluate(() => {
  document.querySelector('.nav')?.remove()
  document.querySelector('.hero-pie')?.remove()
  const hero = document.querySelector('.hero')
  if (hero instanceof HTMLElement) hero.style.paddingTop = '0'
})
await page.waitForTimeout(1_200)

const png = await page.screenshot()
await sharp(png).resize(1200, 630).jpeg({ quality: 88, mozjpeg: true }).toFile(DESTINO)
console.log('og.jpg →', DESTINO)

await navegador.close()
