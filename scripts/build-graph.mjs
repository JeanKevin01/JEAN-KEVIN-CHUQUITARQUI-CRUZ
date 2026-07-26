/**
 * build-graph.mjs
 * ---------------------------------------------------------------------------
 * Genera public/data/graph.json a partir del grafo de conocimiento REAL
 * extraído de los tres repositorios de ASTRA ERA con codebase-memory-mcp.
 *
 * Los datos crudos (símbolos por archivo y aristas CALLS agregadas archivo→archivo)
 * provienen de consultas Cypher contra el índice del grafo:
 *
 *   MATCH (n) WHERE n.file_path IS NOT NULL
 *   RETURN n.file_path, count(*) ORDER BY count(*) DESC
 *
 *   MATCH (a)-[:CALLS]->(b) WHERE a.file_path IS NOT NULL AND b.file_path IS NOT NULL
 *   RETURN a.file_path, b.file_path, count(*) ORDER BY count(*) DESC
 *
 * El layout 3D se hornea aquí (force-directed) para que el navegador solo dibuje.
 * ---------------------------------------------------------------------------
 */
import { writeFileSync, mkdirSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const OUT = join(__dirname, '..', 'public', 'data', 'graph.json')

/* ------------------------------------------------------------------ */
/* 1. Datos crudos del índice                                          */
/* ------------------------------------------------------------------ */

// --- API (FastAPI + PostgreSQL) : 1.473 nodos / 6.872 aristas indexados
const API_FILES = `
routers/programacion.py 76
tests/test_programacion.py 57
tests/test_valor_ganado.py 40
parsers/plantilla_pu.py 38
routers/ro.py 34
core/pdf_partida.py 32
routers/tareo.py 22
tests/test_parser_pu.py 21
routers/otms.py 19
tests/test_ro_mensual.py 18
routers/presupuesto.py 17
tests/test_matriz.py 17
routers/padron.py 17
core/config.py 15
tests/test_roles_f06.py 15
routers/ev/_modelos.py 14
core/media.py 14
core/auth.py 14
tests/test_seguridad.py 14
routers/ev/_datos.py 13
tests/test_pdf_partida.py 13
tests/test_fases.py 13
migrations/versions/0001_baseline.py 12
tests/test_media.py 12
routers/usuarios.py 12
scripts/validacion_e2e.py 11
tests/fixtures/ro2007.py 11
routers/ev/partidas.py 11
routers/fases.py 10
migrations/versions/0002_limpieza_hh.py 10
migrations/versions/0003_drop_stp.py 10
migrations/versions/0004_tenant.py 10
migrations/versions/0005_presupuesto.py 10
migrations/versions/0006_ro.py 10
migrations/versions/0009_ids_trabajador_fks.py 10
migrations/versions/0012_apu.py 10
migrations/versions/0013_periodos.py 10
migrations/versions/0014_costo_docs.py 10
migrations/versions/0015_venta.py 10
migrations/versions/0016_proyeccion.py 10
migrations/versions/0017_valorizaciones.py 10
migrations/versions/0018_fases.py 10
migrations/versions/0019_programacion_media.py 10
migrations/versions/0020_actividades_supervisor.py 10
migrations/versions/0021_lps.py 10
migrations/versions/0022_lookahead_metrado.py 10
migrations/versions/0023_calendario_laboral.py 10
core/personal.py 10
migrations/versions/0024_lookahead_v2.py 10
migrations/versions/0025_hitos_fuente_unica.py 10
migrations/versions/0026_proyecto_moneda.py 10
migrations/versions/0027_prog_manual.py 10
migrations/versions/0028_drop_plantillas_hitos.py 10
migrations/versions/0029_reporte_id_local.py 10
migrations/versions/0030_usuarios_desde_padron.py 10
migrations/versions/0031_padron_unificado.py 10
migrations/versions/0032_reporte_estructurado.py 10
routers/ro_proyeccion.py 10
tests/test_usuarios_padron.py 10
tests/test_reporte_diario.py 10
routers/ev/isp.py 10
routers/ev/captura.py 10
routers/periodos.py 10
main.py 9
routers/jornada.py 9
core/tiempo.py 9
routers/ev/tarifas.py 9
routers/ev/matriz.py 9
routers/valorizaciones.py 9
routers/ev/_engine.py 9
routers/ev/historico.py 9
migrations/versions/0007_limpieza_muertas.py 8
migrations/versions/0008_unicidad_otm.py 8
migrations/versions/0010_drop_vista_legacy.py 8
migrations/versions/0011_usuarios_supervisor.py 8
routers/ev/improductivas.py 8
routers/presupuesto_import.py 7
migrations/env.py 7
routers/ev/conflictos.py 7
routers/presupuesto_derivados.py 7
routers/ev/valorizado.py 7
routers/ev/rendimiento.py 7
.github/workflows/tests.yml 6
routers/ro_motor.py 6
core/log.py 6
routers/ro_mensual.py 6
routers/ev/anomalias.py 6
routers/ev/avance_diario.py 6
routers/ev/performance.py 6
tests/test_presupuesto.py 6
scripts/backup_diario.sh 5
core/db.py 5
routers/valor_ganado.py 5
routers/monitor.py 5
tests/test_ro.py 5
routers/media.py 4
scripts/hacer_fixture_pu.py 3
Dockerfile 2
`

const API_EDGES = `
routers/programacion.py core/db.py 38
routers/programacion.py core/tiempo.py 35
tests/test_valor_ganado.py routers/ev/_engine.py 27
routers/tareo.py core/auth.py 13
tests/test_seguridad.py core/auth.py 13
tests/test_media.py core/media.py 13
routers/programacion.py core/auth.py 12
routers/usuarios.py core/auth.py 11
routers/ro.py core/db.py 10
routers/ev/isp.py routers/ev/_datos.py 10
routers/presupuesto.py core/db.py 8
routers/ev/isp.py routers/ev/_engine.py 8
routers/ro.py routers/periodos.py 7
routers/padron.py core/auth.py 7
tests/test_programacion.py routers/programacion.py 7
routers/ev/partidas.py core/db.py 6
tests/test_parser_pu.py routers/presupuesto_derivados.py 6
routers/programacion.py core/media.py 5
routers/ev/captura.py core/db.py 5
routers/valorizaciones.py core/db.py 5
routers/tareo.py core/tiempo.py 5
routers/jornada.py core/tiempo.py 5
tests/test_roles_f06.py core/auth.py 4
tests/test_reporte_diario.py routers/programacion.py 4
routers/otms.py core/auth.py 4
routers/ev/historico.py core/db.py 4
routers/periodos.py core/db.py 4
routers/monitor.py core/tiempo.py 4
routers/usuarios.py core/personal.py 4
tests/test_ro_mensual.py routers/ro.py 4
tests/test_presupuesto.py routers/presupuesto.py 4
tests/test_pdf_partida.py core/pdf_partida.py 4
tests/test_ro_mensual.py routers/ro_motor.py 4
tests/test_matriz.py routers/ev/matriz.py 4
tests/test_valor_ganado.py routers/ev/_modelos.py 4
routers/programacion.py routers/ev/_datos.py 3
routers/presupuesto_import.py routers/presupuesto_derivados.py 3
routers/ev/partidas.py routers/ev/_engine.py 3
routers/ev/isp.py core/db.py 3
routers/ev/captura.py routers/ev/_datos.py 3
routers/fases.py core/db.py 3
routers/ev/improductivas.py core/db.py 3
routers/ro_proyeccion.py core/db.py 3
tests/test_parser_pu.py parsers/plantilla_pu.py 3
tests/test_ro.py routers/ro.py 3
tests/test_usuarios_padron.py core/personal.py 3
tests/test_valor_ganado.py routers/ev/tarifas.py 3
tests/test_seguridad.py core/config.py 3
routers/periodos.py core/auth.py 2
routers/valorizaciones.py routers/periodos.py 2
routers/padron.py core/personal.py 2
routers/ro_proyeccion.py core/auth.py 2
routers/ev/tarifas.py core/db.py 2
routers/ev/valorizado.py core/db.py 2
routers/ev/partidas.py routers/ev/_datos.py 2
routers/jornada.py core/auth.py 2
main.py core/auth.py 2
routers/ev/conflictos.py core/db.py 2
routers/ev/tarifas.py core/log.py 2
main.py core/log.py 2
routers/ev/matriz.py core/tiempo.py 2
routers/ev/performance.py routers/ev/_datos.py 2
routers/ro_proyeccion.py routers/periodos.py 2
routers/ev/rendimiento.py core/db.py 2
routers/ro_mensual.py core/db.py 2
routers/media.py core/media.py 2
tests/test_fases.py routers/fases.py 2
routers/ro_proyeccion.py routers/ev/_datos.py 1
routers/ro_proyeccion.py routers/ev/_engine.py 1
routers/ev/_engine.py routers/ev/_datos.py 1
routers/otms.py core/tiempo.py 1
routers/ev/_datos.py core/db.py 1
core/pdf_partida.py routers/ro.py 1
core/pdf_partida.py core/media.py 1
tests/test_matriz.py core/auth.py 1
tests/test_fases.py core/auth.py 1
tests/test_ro_mensual.py core/auth.py 1
tests/test_programacion.py core/auth.py 1
tests/test_usuarios_padron.py core/auth.py 1
tests/test_pdf_partida.py core/auth.py 1
routers/ro_mensual.py routers/ev/_datos.py 1
routers/presupuesto.py routers/presupuesto_derivados.py 1
routers/ev/tarifas.py routers/ev/_engine.py 1
routers/tareo.py routers/ev/_datos.py 1
routers/periodos.py routers/ro_proyeccion.py 1
routers/valorizaciones.py routers/ev/_datos.py 1
core/personal.py core/auth.py 1
routers/tareo.py routers/jornada.py 1
routers/ev/avance_diario.py core/db.py 1
routers/ev/avance_diario.py routers/ev/_datos.py 1
routers/ev/avance_diario.py routers/programacion.py 1
routers/ev/partidas.py routers/ev/_modelos.py 1
routers/presupuesto_import.py parsers/plantilla_pu.py 1
routers/presupuesto_import.py core/db.py 1
main.py core/db.py 1
main.py routers/programacion.py 1
routers/ev/conflictos.py routers/ev/_datos.py 1
routers/ev/valorizado.py routers/ev/_datos.py 1
routers/ev/valorizado.py routers/ev/_engine.py 1
main.py core/config.py 1
routers/ev/matriz.py core/db.py 1
routers/ev/matriz.py routers/ev/_datos.py 1
routers/ev/anomalias.py core/db.py 1
routers/ev/anomalias.py routers/ev/_datos.py 1
routers/ev/anomalias.py routers/ev/_engine.py 1
routers/monitor.py routers/jornada.py 1
routers/ev/performance.py routers/ev/_engine.py 1
parsers/plantilla_pu.py core/media.py 1
routers/ev/rendimiento.py routers/ev/_datos.py 1
routers/ev/anomalias.py core/log.py 1
routers/ev/avance_diario.py core/log.py 1
routers/ev/captura.py core/log.py 1
routers/ev/conflictos.py core/log.py 1
routers/ev/historico.py core/log.py 1
routers/ev/improductivas.py core/log.py 1
routers/ev/isp.py core/log.py 1
routers/ev/partidas.py core/log.py 1
routers/ev/performance.py core/log.py 1
routers/ev/rendimiento.py core/log.py 1
routers/ev/valorizado.py core/log.py 1
routers/presupuesto_import.py core/log.py 1
routers/programacion.py core/log.py 1
routers/ro.py core/log.py 1
routers/tareo.py core/log.py 1
routers/valor_ganado.py core/log.py 1
tests/test_programacion.py core/media.py 1
tests/test_pdf_partida.py routers/programacion.py 1
`

// --- PANEL (React 19 + TypeScript) : 1.012 nodos / 1.896 aristas indexados
const PANEL_FILES = `
src/pages/ValorGanado.tsx 59
src/pages/Programacion.tsx 54
src/components/LookaheadGrid.tsx 34
src/pages/MonitorTareo.tsx 33
src/pages/TabISP.tsx 25
src/pages/Presupuesto.tsx 24
src/pages/OTMs.tsx 23
src/pages/Rentabilidad.tsx 23
src/pages/PpcPrint.tsx 22
src/pages/Usuarios.tsx 21
src/pages/ResultadoOperativo.tsx 20
src/pages/MatrizHistorica.tsx 19
src/pages/WBSArbol.tsx 18
src/pages/ImportarPartidas.tsx 18
src/pages/Costos.tsx 17
src/components/ProgramarLote.tsx 17
src/pages/Valorizacion.tsx 16
src/pages/GenerarRDC.tsx 16
src/pages/GuiaFases.tsx 15
src/lib/catalogos.ts 15
src/pages/Bitacora.tsx 14
src/lib/wbs.ts 14
src/components/CalendarioLaboral.tsx 13
src/lib/lookahead.ts 13
src/pages/LookaheadPrint.tsx 13
src/pages/TabAvanceDiario.tsx 13
src/pages/ImportarPersonal.tsx 13
src/pages/Monitor.tsx 12
src/pages/ReportePartidaPrint.tsx 12
src/pages/Supervisores.tsx 12
src/lib/auth.ts 11
src/components/CalendarioMes.tsx 11
src/pages/CargaHistorica.tsx 11
src/components/HistogramaMO.tsx 11
src/pages/EdicionDatos.tsx 11
src/pages/Reportes.tsx 10
src/pages/TabRendimientos.tsx 10
src/pages/TabProductividad.tsx 10
src/pages/ProgramacionPrint.tsx 9
src/pages/Dashboard.tsx 9
src/pages/TabSeguimiento.tsx 9
src/pages/RegistrosHH.tsx 9
src/pages/TabValorizacion.tsx 9
src/pages/Trabajadores.tsx 9
src/lib/api.ts 8
src/pages/ImpresionQR.tsx 8
src/pages/TabPerformance.tsx 8
src/pages/QRs.tsx 8
src/components/print/BrandDoc.tsx 6
src/components/print/GaleriaFotos.tsx 6
src/components/Sidebar.tsx 6
.github/workflows/build.yml 5
src/components/ThemeToggle.tsx 5
src/lib/semana.ts 5
src/components/CeldaDia.tsx 4
src/components/Header.tsx 4
src/pages/Login.tsx 4
src/pages/Placeholder.tsx 4
src/App.tsx 3
src/components/Layout.tsx 3
src/lib/utils.ts 3
src/main.tsx 2
vite.config.ts 2
src/index.css 2
`

const PANEL_EDGES = `
src/components/LookaheadGrid.tsx src/lib/lookahead.ts 12
src/pages/Programacion.tsx src/lib/semana.ts 11
src/pages/ValorGanado.tsx src/lib/wbs.ts 7
src/components/LookaheadGrid.tsx src/lib/semana.ts 6
src/pages/Costos.tsx src/lib/catalogos.ts 4
src/components/HistogramaMO.tsx src/lib/semana.ts 4
src/pages/Presupuesto.tsx src/lib/api.ts 4
src/lib/api.ts src/lib/auth.ts 4
src/pages/Programacion.tsx src/lib/api.ts 4
src/pages/ResultadoOperativo.tsx src/lib/api.ts 4
src/components/CeldaDia.tsx src/lib/lookahead.ts 3
src/components/HistogramaMO.tsx src/lib/lookahead.ts 3
src/pages/MatrizHistorica.tsx src/lib/semana.ts 3
src/pages/PpcPrint.tsx src/lib/semana.ts 3
src/pages/OTMs.tsx src/lib/api.ts 3
src/pages/EdicionDatos.tsx src/lib/api.ts 3
src/components/CalendarioMes.tsx src/lib/semana.ts 2
src/components/LookaheadGrid.tsx src/components/CeldaDia.tsx 2
src/pages/TabAvanceDiario.tsx src/pages/Presupuesto.tsx 2
src/pages/LookaheadPrint.tsx src/lib/semana.ts 2
src/pages/Programacion.tsx src/components/LookaheadGrid.tsx 2
src/pages/ProgramacionPrint.tsx src/lib/semana.ts 2
src/pages/ResultadoOperativo.tsx src/lib/catalogos.ts 2
src/pages/TabAvanceDiario.tsx src/components/CalendarioMes.tsx 2
src/pages/GenerarRDC.tsx src/lib/api.ts 2
src/pages/ImportarPartidas.tsx src/lib/api.ts 2
src/pages/Costos.tsx src/lib/api.ts 2
src/components/CalendarioLaboral.tsx src/lib/api.ts 2
src/pages/TabAvanceDiario.tsx src/lib/api.ts 2
src/components/ProgramarLote.tsx src/lib/api.ts 2
src/pages/Rentabilidad.tsx src/lib/api.ts 2
src/pages/Supervisores.tsx src/lib/api.ts 2
src/pages/TabValorizacion.tsx src/lib/api.ts 2
src/pages/Trabajadores.tsx src/lib/api.ts 2
src/pages/Valorizacion.tsx src/lib/api.ts 2
src/pages/Usuarios.tsx src/lib/api.ts 2
src/pages/CargaHistorica.tsx src/lib/api.ts 2
src/pages/GuiaFases.tsx src/lib/api.ts 2
src/pages/TabISP.tsx src/lib/api.ts 2
src/components/LookaheadGrid.tsx src/lib/api.ts 2
src/pages/MonitorTareo.tsx src/lib/api.ts 2
src/App.tsx src/lib/auth.ts 1
src/App.tsx src/pages/Login.tsx 1
src/App.tsx src/pages/ProgramacionPrint.tsx 1
src/App.tsx src/pages/LookaheadPrint.tsx 1
src/App.tsx src/pages/ReportePartidaPrint.tsx 1
src/App.tsx src/pages/PpcPrint.tsx 1
src/App.tsx src/components/Layout.tsx 1
src/App.tsx src/pages/Dashboard.tsx 1
src/App.tsx src/pages/Programacion.tsx 1
src/App.tsx src/pages/Supervisores.tsx 1
src/App.tsx src/pages/Trabajadores.tsx 1
src/App.tsx src/pages/ImportarPersonal.tsx 1
src/App.tsx src/pages/QRs.tsx 1
src/App.tsx src/pages/ImpresionQR.tsx 1
src/App.tsx src/pages/RegistrosHH.tsx 1
src/App.tsx src/pages/MatrizHistorica.tsx 1
src/App.tsx src/pages/Reportes.tsx 1
src/App.tsx src/pages/OTMs.tsx 1
src/App.tsx src/pages/GenerarRDC.tsx 1
src/App.tsx src/pages/ValorGanado.tsx 1
src/App.tsx src/pages/Presupuesto.tsx 1
src/App.tsx src/pages/GuiaFases.tsx 1
src/App.tsx src/pages/Costos.tsx 1
src/App.tsx src/pages/Valorizacion.tsx 1
src/App.tsx src/pages/ResultadoOperativo.tsx 1
src/App.tsx src/pages/EdicionDatos.tsx 1
src/App.tsx src/pages/Monitor.tsx 1
src/App.tsx src/pages/Bitacora.tsx 1
src/App.tsx src/pages/Usuarios.tsx 1
src/pages/ProgramacionPrint.tsx src/components/print/GaleriaFotos.tsx 1
src/pages/Presupuesto.tsx src/lib/catalogos.ts 1
src/components/Layout.tsx src/components/Header.tsx 1
src/components/Layout.tsx src/components/Sidebar.tsx 1
src/pages/LookaheadPrint.tsx src/components/print/BrandDoc.tsx 1
src/pages/Monitor.tsx src/pages/MonitorTareo.tsx 1
src/pages/PpcPrint.tsx src/components/print/BrandDoc.tsx 1
src/pages/Programacion.tsx src/components/CalendarioLaboral.tsx 1
src/pages/Programacion.tsx src/components/HistogramaMO.tsx 1
src/pages/Programacion.tsx src/components/CalendarioMes.tsx 1
src/pages/Programacion.tsx src/components/ProgramarLote.tsx 1
src/pages/ProgramacionPrint.tsx src/components/print/BrandDoc.tsx 1
src/pages/ReportePartidaPrint.tsx src/components/print/BrandDoc.tsx 1
src/pages/ReportePartidaPrint.tsx src/components/print/GaleriaFotos.tsx 1
src/pages/ResultadoOperativo.tsx src/pages/Rentabilidad.tsx 1
src/components/Sidebar.tsx src/lib/auth.ts 1
src/components/Sidebar.tsx src/components/ThemeToggle.tsx 1
src/pages/TabAvanceDiario.tsx src/pages/LookaheadPrint.tsx 1
src/pages/TabAvanceDiario.tsx src/components/CeldaDia.tsx 1
src/pages/Usuarios.tsx src/lib/auth.ts 1
src/pages/ValorGanado.tsx src/pages/WBSArbol.tsx 1
src/pages/ValorGanado.tsx src/pages/TabISP.tsx 1
src/pages/ValorGanado.tsx src/pages/TabAvanceDiario.tsx 1
src/pages/ValorGanado.tsx src/pages/TabPerformance.tsx 1
src/pages/ValorGanado.tsx src/pages/TabRendimientos.tsx 1
src/pages/ValorGanado.tsx src/pages/CargaHistorica.tsx 1
src/pages/ValorGanado.tsx src/pages/TabProductividad.tsx 1
src/pages/ValorGanado.tsx src/pages/TabSeguimiento.tsx 1
src/pages/ValorGanado.tsx src/pages/TabValorizacion.tsx 1
src/pages/ValorGanado.tsx src/pages/ImportarPartidas.tsx 1
src/components/LookaheadGrid.tsx src/components/CalendarioMes.tsx 1
src/components/CalendarioMes.tsx src/lib/api.ts 1
src/pages/MatrizHistorica.tsx src/lib/api.ts 1
src/pages/TabPerformance.tsx src/lib/api.ts 1
src/pages/Bitacora.tsx src/lib/api.ts 1
src/pages/Dashboard.tsx src/lib/api.ts 1
src/pages/ImpresionQR.tsx src/lib/api.ts 1
src/pages/Monitor.tsx src/lib/api.ts 1
src/pages/QRs.tsx src/lib/api.ts 1
src/pages/RegistrosHH.tsx src/lib/api.ts 1
src/pages/ImportarPersonal.tsx src/lib/api.ts 1
src/pages/LookaheadPrint.tsx src/lib/api.ts 1
src/pages/PpcPrint.tsx src/lib/api.ts 1
src/pages/ProgramacionPrint.tsx src/lib/api.ts 1
src/pages/ReportePartidaPrint.tsx src/lib/api.ts 1
src/pages/Reportes.tsx src/lib/api.ts 1
src/pages/TabProductividad.tsx src/lib/api.ts 1
src/pages/TabRendimientos.tsx src/lib/api.ts 1
src/pages/TabSeguimiento.tsx src/lib/api.ts 1
src/pages/WBSArbol.tsx src/lib/api.ts 1
src/components/HistogramaMO.tsx src/lib/api.ts 1
src/pages/ValorGanado.tsx src/lib/api.ts 1
src/main.tsx src/App.tsx 1
src/pages/Login.tsx src/lib/auth.ts 1
`

// --- APP DE CAMPO (PWA vanilla + Service Worker + IndexedDB)
const WEB_FILES = `
index.html 34
admin.html 18
sw.js 9
manifest.json 15
`

// Aristas entre servicios: HTTP_CALLS detectadas por el índice (13 en el panel)
// más la conexión de la app de campo con el API (tareo / reporte diario / outbox).
const CROSS_EDGES = [
  ['panel::src/lib/api.ts', 'api::main.py', 13, 'http'],
  ['web::index.html', 'api::routers/tareo.py', 8, 'http'],
  ['web::index.html', 'api::routers/programacion.py', 4, 'http'],
  ['web::sw.js', 'api::routers/media.py', 3, 'http'],
  ['web::admin.html', 'api::routers/padron.py', 2, 'http'],
]

/* ------------------------------------------------------------------ */
/* 2. Parseo                                                           */
/* ------------------------------------------------------------------ */

const parseFiles = (raw) =>
  raw
    .trim()
    .split('\n')
    .map((l) => {
      const i = l.lastIndexOf(' ')
      return { file: l.slice(0, i).trim(), size: Number(l.slice(i + 1)) }
    })

const parseEdges = (raw) =>
  raw
    .trim()
    .split('\n')
    .map((l) => {
      const p = l.trim().split(' ')
      return { s: p[0], t: p[1], w: Number(p[2]) }
    })
    .filter((e) => e.s !== e.t)

/** Clasifica un archivo en una capa arquitectónica legible. */
function capaDe(repo, file) {
  if (repo === 'api') {
    if (file.startsWith('migrations/')) return 'migraciones'
    if (file.startsWith('tests/')) return 'tests'
    if (file.startsWith('routers/ev/')) return 'motor-ev'
    if (file.startsWith('routers/')) return 'api-http'
    if (file.startsWith('core/')) return 'nucleo'
    if (file.startsWith('parsers/')) return 'parsers'
    if (file.startsWith('scripts/') || file.startsWith('.github/') || file === 'Dockerfile')
      return 'infra'
    return 'nucleo'
  }
  if (repo === 'panel') {
    if (file.includes('Print') || file.includes('/print/')) return 'pdf'
    if (file.startsWith('src/lib/')) return 'nucleo'
    if (file.startsWith('src/components/')) return 'componentes'
    if (file.startsWith('src/pages/')) return 'pantallas'
    return 'infra'
  }
  return 'campo'
}

const COLORES = {
  'motor-ev': '#f5b83d', //  el activo más valioso
  'api-http': '#4fd1c5',
  nucleo: '#7aa2ff',
  migraciones: '#a78bfa',
  tests: '#4ade80',
  parsers: '#fb923c',
  infra: '#64748b',
  pantallas: '#4fd1c5',
  componentes: '#7aa2ff',
  pdf: '#f472b6',
  campo: '#f5b83d',
}

const nodes = []
const links = []
const index = new Map()

function addRepo(repo, filesRaw, edgesRaw) {
  for (const { file, size } of parseFiles(filesRaw)) {
    const id = `${repo}::${file}`
    const capa = capaDe(repo, file)
    const n = {
      id,
      repo,
      file,
      name: file.split('/').pop(),
      capa,
      color: COLORES[capa],
      size,
      deg: 0,
    }
    index.set(id, n)
    nodes.push(n)
  }
  for (const { s, t, w } of parseEdges(edgesRaw)) {
    const a = `${repo}::${s}`
    const b = `${repo}::${t}`
    if (!index.has(a) || !index.has(b)) continue
    links.push({ s: a, t: b, w, kind: 'call' })
  }
}

addRepo('api', API_FILES, API_EDGES)
addRepo('panel', PANEL_FILES, PANEL_EDGES)
addRepo('web', WEB_FILES, '')

for (const [s, t, w, kind] of CROSS_EDGES) {
  if (index.has(s) && index.has(t)) links.push({ s, t, w, kind })
}

for (const l of links) {
  index.get(l.s).deg += l.w
  index.get(l.t).deg += l.w
}

/* ------------------------------------------------------------------ */
/* 3. Layout 3D force-directed (horneado)                              */
/* ------------------------------------------------------------------ */

// PRNG determinista: el layout debe ser idéntico en cada build.
let seed = 20260726
const rnd = () => {
  seed = (seed * 1664525 + 1013904223) % 4294967296
  return seed / 4294967296
}

// Cada repositorio orbita en su propia región del espacio.
const ANCLA = {
  api: [0, 0, 0],
  panel: [150, 20, -40],
  web: [-130, -30, 50],
}

const P = nodes.map((n) => {
  const [ax, ay, az] = ANCLA[n.repo]
  return {
    x: ax + (rnd() - 0.5) * 90,
    y: ay + (rnd() - 0.5) * 90,
    z: az + (rnd() - 0.5) * 90,
    vx: 0,
    vy: 0,
    vz: 0,
  }
})
const pos = new Map(nodes.map((n, i) => [n.id, P[i]]))

const ITER = 900
for (let it = 0; it < ITER; it++) {
  const alpha = 1 - it / ITER

  // Repulsión O(n²) — con ~250 nodos es instantáneo.
  for (let i = 0; i < P.length; i++) {
    for (let j = i + 1; j < P.length; j++) {
      const a = P[i]
      const b = P[j]
      let dx = a.x - b.x
      let dy = a.y - b.y
      let dz = a.z - b.z
      let d2 = dx * dx + dy * dy + dz * dz
      if (d2 < 0.01) {
        dx = rnd() - 0.5
        dy = rnd() - 0.5
        dz = rnd() - 0.5
        d2 = 0.01
      }
      const d = Math.sqrt(d2)
      const f = (260 * alpha) / d2
      a.vx += (dx / d) * f
      a.vy += (dy / d) * f
      a.vz += (dz / d) * f
      b.vx -= (dx / d) * f
      b.vy -= (dy / d) * f
      b.vz -= (dz / d) * f
    }
  }

  // Atracción por arista (más peso = resorte más corto).
  for (const l of links) {
    const a = pos.get(l.s)
    const b = pos.get(l.t)
    const dx = b.x - a.x
    const dy = b.y - a.y
    const dz = b.z - a.z
    const d = Math.hypot(dx, dy, dz) || 0.001
    const ideal = l.kind === 'http' ? 120 : 26
    const f = ((d - ideal) * 0.012 * Math.min(l.w, 8) * alpha) / d
    a.vx += dx * f
    a.vy += dy * f
    a.vz += dz * f
    b.vx -= dx * f
    b.vy -= dy * f
    b.vz -= dz * f
  }

  // Cohesión de repositorio + amortiguación.
  for (let i = 0; i < P.length; i++) {
    const p = P[i]
    const [ax, ay, az] = ANCLA[nodes[i].repo]
    p.vx += (ax - p.x) * 0.006 * alpha
    p.vy += (ay - p.y) * 0.006 * alpha
    p.vz += (az - p.z) * 0.006 * alpha
    p.x += p.vx
    p.y += p.vy
    p.z += p.vz
    p.vx *= 0.82
    p.vy *= 0.82
    p.vz *= 0.82
  }
}

// Centrar y normalizar la escala a un radio cómodo para la cámara.
let cx = 0
let cy = 0
let cz = 0
for (const p of P) {
  cx += p.x
  cy += p.y
  cz += p.z
}
cx /= P.length
cy /= P.length
cz /= P.length
let rmax = 0
for (const p of P) {
  p.x -= cx
  p.y -= cy
  p.z -= cz
  rmax = Math.max(rmax, Math.hypot(p.x, p.y, p.z))
}
const k = 46 / rmax
for (const p of P) {
  p.x *= k
  p.y *= k
  p.z *= k
}

/* ------------------------------------------------------------------ */
/* 4. Salida                                                           */
/* ------------------------------------------------------------------ */

const out = {
  meta: {
    generado: '2026-07-26',
    fuente: 'codebase-memory-mcp · grafo de conocimiento indexado sobre los 3 repositorios',
    indexado: { nodos: 2518, aristas: 8801 },
    proyeccion:
      'Vista agregada a nivel de archivo: cada esfera es un archivo real y cada arista una relación de llamada agregada del grafo.',
    repos: [
      {
        id: 'api',
        nombre: 'API',
        stack: 'FastAPI · PostgreSQL · Alembic',
        nodos: 1473,
        aristas: 6872,
      },
      {
        id: 'panel',
        nombre: 'Panel',
        stack: 'React 19 · TypeScript · Vite',
        nodos: 1012,
        aristas: 1896,
      },
      {
        id: 'web',
        nombre: 'App de campo',
        stack: 'PWA · Service Worker · IndexedDB',
        nodos: 33,
        aristas: 33,
      },
    ],
  },
  nodes: nodes.map((n, i) => ({
    ...n,
    x: +P[i].x.toFixed(2),
    y: +P[i].y.toFixed(2),
    z: +P[i].z.toFixed(2),
  })),
  links,
}

mkdirSync(dirname(OUT), { recursive: true })
writeFileSync(OUT, JSON.stringify(out))
console.log(
  `graph.json → ${out.nodes.length} nodos · ${out.links.length} aristas · ${(
    JSON.stringify(out).length / 1024
  ).toFixed(1)} KB`,
)
