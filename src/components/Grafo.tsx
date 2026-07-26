import { Suspense, lazy, useEffect, useMemo, useState } from 'react'
import { useI18n } from '../i18n'
import { GRAFO } from '../content/site'
import { Reveal } from './ui'
import type { GDatos, GNodo } from '../three/GraphScene'

const GraphScene = lazy(() => import('../three/GraphScene'))

const REPOS: { id: 'api' | 'panel' | 'web'; color: string }[] = [
  { id: 'api', color: '#4fd1c5' },
  { id: 'panel', color: '#7aa2ff' },
  { id: 'web', color: '#f5b83d' },
]

export default function Grafo() {
  const { t } = useI18n()
  const [datos, setDatos] = useState<GDatos | null>(null)
  const [activos, setActivos] = useState<Set<string>>(new Set(['api', 'panel', 'web']))
  const [seleccion, setSeleccion] = useState<string | null>(null)
  const [, setHover] = useState<GNodo | null>(null)
  const [girar, setGirar] = useState(true)
  const [visible, setVisible] = useState(false)

  // La escena solo se monta cuando la sección se acerca a la pantalla.
  useEffect(() => {
    const el = document.getElementById('grafo')
    if (!el) return
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true)
          io.disconnect()
        }
      },
      { rootMargin: '300px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    if (!visible || datos) return
    fetch(`${import.meta.env.BASE_URL}data/graph.json`)
      .then((r) => r.json())
      .then(setDatos)
      .catch(() => setDatos(null))
  }, [visible, datos])

  const nodoSel = useMemo(
    () => datos?.nodes.find((n) => n.id === seleccion) ?? null,
    [datos, seleccion],
  )

  const vecinosSel = useMemo(() => {
    if (!datos || !seleccion) return []
    const v: { id: string; file: string; w: number }[] = []
    for (const l of datos.links) {
      const otro = l.s === seleccion ? l.t : l.t === seleccion ? l.s : null
      if (!otro) continue
      const n = datos.nodes.find((x) => x.id === otro)
      if (n) v.push({ id: n.id, file: n.file, w: l.w })
    }
    return v.sort((a, b) => b.w - a.w).slice(0, 14)
  }, [datos, seleccion])

  const capas = useMemo(() => {
    if (!datos) return []
    const m = new Map<string, string>()
    for (const n of datos.nodes) if (!m.has(n.capa)) m.set(n.capa, n.color)
    return [...m.entries()]
  }, [datos])

  const alternar = (id: string) => {
    setSeleccion(null)
    setActivos((prev) => {
      const s = new Set(prev)
      if (s.has(id)) {
        if (s.size > 1) s.delete(id)
      } else s.add(id)
      return s
    })
  }

  return (
    <section id="grafo" className="borde-sup">
      <div className="wrap">
        <Reveal>
          <span className="eyebrow">{t(GRAFO.eyebrow)}</span>
          <h2 className="titulo-seccion">{t(GRAFO.titulo)}</h2>
          <p className="intro">{t(GRAFO.intro)}</p>
        </Reveal>

        <Reveal delay={90}>
          <div className="grafo-marco">
            {datos ? (
              <Suspense fallback={null}>
                <GraphScene
                  datos={datos}
                  reposActivos={activos}
                  seleccion={seleccion}
                  onSeleccion={setSeleccion}
                  onHover={setHover}
                  girar={girar}
                />
              </Suspense>
            ) : (
              <div
                className="mono"
                style={{
                  position: 'absolute',
                  inset: 0,
                  display: 'grid',
                  placeItems: 'center',
                  color: 'var(--tx-3)',
                  fontSize: '0.8rem',
                }}
              >
                {t(GRAFO.ui.cargando)}
              </div>
            )}

            <div className="grafo-ui">
              <div className="grafo-filtros">
                {REPOS.map((r) => {
                  const info = datos?.meta.repos.find((x) => x.id === r.id)
                  return (
                    <button
                      key={r.id}
                      className="chip"
                      data-on={activos.has(r.id)}
                      style={{ color: activos.has(r.id) ? r.color : undefined }}
                      onClick={() => alternar(r.id)}
                    >
                      <span className="pt" style={{ background: r.color }} />
                      {info?.nombre ?? r.id}
                    </button>
                  )
                })}
                <button className="chip" data-on={girar} onClick={() => setGirar((g) => !g)}>
                  {t(GRAFO.ui.girar)}
                </button>
              </div>

              <span className="grafo-pista">{t(GRAFO.ui.pista)}</span>

              {nodoSel && (
                <div className="grafo-detalle">
                  <button className="cerrar" onClick={() => setSeleccion(null)} aria-label="cerrar">
                    ×
                  </button>
                  <p className="ruta">{nodoSel.file}</p>
                  <dl>
                    <dt>{t(GRAFO.ui.repositorio)}</dt>
                    <dd>{datos?.meta.repos.find((r) => r.id === nodoSel.repo)?.nombre}</dd>
                    <dt>{t(GRAFO.ui.capa)}</dt>
                    <dd style={{ color: nodoSel.color }}>
                      {GRAFO.capas[nodoSel.capa] ? t(GRAFO.capas[nodoSel.capa]) : nodoSel.capa}
                    </dd>
                    <dt>{t(GRAFO.ui.simbolos)}</dt>
                    <dd>{nodoSel.size}</dd>
                    <dt>{t(GRAFO.ui.conexiones)}</dt>
                    <dd>{nodoSel.deg}</dd>
                  </dl>
                  {vecinosSel.length > 0 && (
                    <div className="vecinos">
                      <span className="eyebrow" style={{ marginBottom: 0 }}>
                        {t(GRAFO.ui.vecinos)}
                      </span>
                      <ul>
                        {vecinosSel.map((v) => (
                          <li key={v.id} title={v.file}>
                            {v.file} · {v.w}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </Reveal>

        {capas.length > 0 && (
          <div className="grafo-filtros" style={{ marginTop: '1rem' }}>
            {capas.map(([capa, color]) => (
              <span className="chip" key={capa} data-on="true" style={{ color }}>
                <span className="pt" style={{ background: color }} />
                {GRAFO.capas[capa] ? t(GRAFO.capas[capa]) : capa}
              </span>
            ))}
          </div>
        )}

        <p className="grafo-nota">{t(GRAFO.ui.nota)}</p>

        {datos && (
          <div className="grafo-repos">
            {datos.meta.repos.map((r) => (
              <div className="grafo-repo" key={r.id}>
                <h4>{r.nombre}</h4>
                <span className="st">{r.stack}</span>
                <span className="nm">
                  {r.nodos.toLocaleString('es-PE')} nodos · {r.aristas.toLocaleString('es-PE')}{' '}
                  aristas
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
