/**
 * Regenera las capturas de la sección "El producto".
 *
 *   PANEL_USER=... PANEL_PASS=... node scripts/capturar-panel.mjs
 *
 * Requiere playwright y sharp instalados (no son dependencias del sitio; se
 * instalan aparte solo cuando toca reponer las imágenes):
 *
 *   npm i -D playwright sharp && npx playwright install chromium
 *
 * REGLA: el saneamiento ocurre DENTRO del navegador, antes del screenshot. Una
 * captura cruda del panel no es publicable —lleva nombres de trabajadores, la
 * marca del empleador, números de orden de trabajo y fotos del sitio del
 * cliente—. Ver la sección Confidencialidad del README.
 */
import { chromium } from 'playwright'
import sharp from 'sharp'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const RAIZ = path.dirname(fileURLToPath(import.meta.url))
const DESTINO = path.join(RAIZ, '..', 'public', 'capturas')
const PANEL = process.env.PANEL_URL ?? 'https://panel.astraera.space'
const USUARIO = process.env.PANEL_USER
const CLAVE = process.env.PANEL_PASS

if (!USUARIO || !CLAVE) {
  console.error('Faltan PANEL_USER y PANEL_PASS en el entorno.')
  process.exit(1)
}

/** Corre en la página. No devuelve nada: solo redacta el DOM. */
const SANEAR = () => {
  // 1 · marca del empleador y números de orden de trabajo
  const w = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT)
  const nodos = []
  let n
  while ((n = w.nextNode())) nodos.push(n)
  for (const t of nodos) {
    const o = t.nodeValue
    if (!o) continue
    const s = o
      .replace(/KAMPFER/g, 'ASTRA ERA')
      .replace(/AIT\s*\d+\s*:?\s*/gi, '')
      .replace(/IO-\d{3,}\s*:?\s*/gi, '')
    if (s !== o) t.nodeValue = s
  }

  // 2 · nombres en las tarjetas de programación
  let i = 0
  document.querySelectorAll('div.flex.items-center.gap-1').forEach((d) => {
    if (!d.querySelector('svg.lucide-user')) return
    const svg = d.querySelector('svg')
    d.textContent = ''
    if (svg) d.appendChild(svg)
    d.appendChild(document.createTextNode(' SUPERVISOR ' + String((i++ % 6) + 1).padStart(2, '0')))
  })

  // 3 · lista "estado por supervisor" del dashboard
  const cabs = [...document.querySelectorAll('div,header,h2,h3,span')].filter(
    (el) =>
      /ESTADO POR SUPERVISOR/i.test(el.textContent || '') &&
      ![...el.children].some((c) => /ESTADO POR SUPERVISOR/i.test(c.textContent || '')),
  )
  let tarjeta = cabs.at(-1) ?? null
  while (tarjeta && !/Sin reporte/i.test(tarjeta.textContent || '')) tarjeta = tarjeta.parentElement
  if (tarjeta) {
    let k = 0
    tarjeta.querySelectorAll('div,span,p,h3,h4').forEach((el) => {
      if (el.children.length) return
      const s = (el.textContent || '').trim()
      if (s.length < 3 || s !== s.toUpperCase() || /[0-9]/.test(s)) return
      if (/REPORTE|ESTADO|SUPERVISOR|AGOSTO|JULIO|SÁBADO|DOMINGO|LUNES|MARTES|MIÉRCOLES|JUEVES|VIERNES/i.test(s)) return
      el.textContent = 'SUPERVISOR ' + String(++k).padStart(2, '0')
    })
  }

  // 4 · fotos de evidencia del sitio del cliente
  document.querySelectorAll('img').forEach((im) => {
    const r = im.getBoundingClientRect()
    if (r.width > 200 && r.height > 200) return
    im.style.filter = 'blur(6px) saturate(0.7)'
  })

  // 5 · identidad de la sesión en la barra lateral
  document.querySelectorAll('*').forEach((el) => {
    if (!el.children.length && (el.textContent || '').trim() === 'Jean')
      el.textContent = 'Oficina técnica'
  })
}

/** [archivo, ruta, pestaña dentro de la página] */
const VISTAS = [
  ['curva-s', '/valor-ganado', 'Curva S'],
  ['valor-ganado', '/valor-ganado', null],
  ['resumen-ejecutivo', '/valor-ganado', 'Resumen Ejecutivo'],
  ['isp', '/valor-ganado', 'ISP'],
  ['performance', '/valor-ganado', 'Performance'],
  ['programacion', '/programacion', null],
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

for (const [nombre, ruta, pestana] of VISTAS) {
  await page.goto(PANEL + ruta, { waitUntil: 'load' })
  await page.waitForTimeout(9_000)
  if (pestana) {
    await page.getByRole('button', { name: new RegExp(pestana, 'i') }).first().click()
    await page.waitForTimeout(7_000)
  }
  await page.evaluate(SANEAR)
  await page.waitForTimeout(600)

  const png = await page.screenshot()
  await sharp(png).resize({ width: 1800 }).webp({ quality: 82 }).toFile(path.join(DESTINO, `${nombre}.webp`))
  await sharp(png).resize({ width: 720 }).webp({ quality: 74 }).toFile(path.join(DESTINO, `${nombre}-mini.webp`))
  console.log('✓', nombre)
}

await navegador.close()
