import { useCallback, useEffect, useRef, useState } from 'react'
import { useI18n } from '../i18n'
import { PERFIL, PRODUCTO } from '../content/site'
import { Icono, Reveal } from './ui'

/**
 * Galería del producto: capturas reales del panel en producción.
 *
 * La primera imagen carga con `eager` y el resto con `lazy`. La vista ampliada
 * es un diálogo modal propio, sin dependencias: atrapa el tabulador, se cierra
 * con Escape, navega con las flechas y devuelve el foco a quien la abrió.
 */
export default function Producto() {
  const { t, lang } = useI18n()
  const [activa, setActiva] = useState(0)
  const [ampliada, setAmpliada] = useState(false)
  const dialogo = useRef<HTMLDivElement>(null)
  const invocador = useRef<HTMLElement | null>(null)

  const vista = PRODUCTO.vistas[activa]
  const cerrar = useCallback(() => setAmpliada(false), [])

  const abrir = useCallback(() => {
    invocador.current = document.activeElement as HTMLElement
    setAmpliada(true)
  }, [])

  useEffect(() => {
    if (!ampliada) {
      // Devuelve el foco a quien abrió la vista ampliada.
      invocador.current?.focus?.()
      return
    }
    dialogo.current?.focus()
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') cerrar()
      if (e.key === 'ArrowRight') setActiva((i) => (i + 1) % PRODUCTO.vistas.length)
      if (e.key === 'ArrowLeft')
        setActiva((i) => (i - 1 + PRODUCTO.vistas.length) % PRODUCTO.vistas.length)
      // Atrapa el tabulador dentro del diálogo.
      if (e.key === 'Tab') {
        const foco = dialogo.current?.querySelectorAll<HTMLElement>('button, [href], [tabindex]')
        if (!foco?.length) return
        const primero = foco[0]
        const ultimo = foco[foco.length - 1]
        if (e.shiftKey && document.activeElement === primero) {
          e.preventDefault()
          ultimo.focus()
        } else if (!e.shiftKey && document.activeElement === ultimo) {
          e.preventDefault()
          primero.focus()
        }
      }
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [ampliada, cerrar])

  return (
    <section id="producto" className="borde-sup">
      <div className="wrap">
        <div className="cabecera">
          <Reveal>
            <div>
              <span className="eyebrow">{t(PRODUCTO.eyebrow)}</span>
              <h2 className="titulo-seccion">{t(PRODUCTO.titulo)}</h2>
            </div>
          </Reveal>
          <Reveal delay={80}>
            <p className="intro">{t(PRODUCTO.intro)}</p>
          </Reveal>
        </div>

        <div className="producto">
          {/* Selector de módulo */}
          <div className="producto-menu">
            {PRODUCTO.vistas.map((v, i) => (
              <button
                key={v.k}
                aria-pressed={i === activa}
                className="producto-tab"
                data-on={i === activa}
                onClick={() => setActiva(i)}
              >
                <img src={`/capturas/${v.k}-mini.webp`} alt="" loading="lazy" aria-hidden />
                <span>
                  <strong>{t(v.t)}</strong>
                  <em>{t(v.pregunta)}</em>
                </span>
              </button>
            ))}
          </div>

          {/* Vista grande */}
          <div className="producto-vista">
            <button className="marco" onClick={abrir} aria-label={`${t(PRODUCTO.ampliar)} — ${t(vista.t)}`}>
              <div className="marco-barra" aria-hidden>
                <i />
                <i />
                <i />
                <span>{t(vista.t)}</span>
              </div>
              <img
                src={`/capturas/${vista.k}.webp`}
                alt={`${t(vista.t)} — ${t(vista.pregunta)}`}
                loading={activa === 0 ? 'eager' : 'lazy'}
                width={1800}
                height={1128}
              />
              <span className="marco-pie">
                {t(PRODUCTO.ampliar)} <Icono nombre="flecha" />
              </span>
            </button>

            <div className="producto-texto">
              <h3>{t(vista.pregunta)}</h3>
              <p>{t(vista.d)}</p>
              <div className="tags">
                {vista.chips[lang].map((c) => (
                  <span className="tag" key={c}>
                    {c}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Único CTA entre el héroe y el pie: sin esto no había ninguna llamada
            a la acción en 13.000 px de recorrido. */}
        <Reveal delay={80}>
          <aside className="cta-medio">
            <div>
              <h3>{t(PRODUCTO.cta.t)}</h3>
              <p>{t(PRODUCTO.cta.d)}</p>
            </div>
            <a
              className="btn btn-primario"
              href={`mailto:${PERFIL.email}?subject=Demostraci%C3%B3n%20%C2%B7%20ASTRA%20ERA`}
            >
              <Icono nombre="mail" /> {t(PRODUCTO.cta.boton)}
            </a>
          </aside>
        </Reveal>
      </div>

      {ampliada && (
        <div className="lupa" role="dialog" aria-modal="true" aria-label={t(vista.t)} tabIndex={-1} ref={dialogo} onClick={cerrar}>
          <button className="lupa-cerrar" onClick={cerrar} aria-label={t(PRODUCTO.cerrar)}>
            ×
          </button>
          <img
            src={`/capturas/${vista.k}.webp`}
            alt={`${t(vista.t)} — ${t(vista.pregunta)}`}
            onClick={(e) => e.stopPropagation()}
          />
          <span className="lupa-pie">{t(vista.t)}</span>
        </div>
      )}
    </section>
  )
}
