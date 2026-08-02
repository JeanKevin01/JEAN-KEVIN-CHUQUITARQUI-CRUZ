import { useCallback, useEffect, useState } from 'react'
import { useI18n } from '../i18n'
import { PRODUCTO } from '../content/site'
import { Icono, Reveal } from './ui'

/**
 * Galería del producto: capturas reales del panel en producción.
 *
 * La imagen grande se precarga vía <link rel="preload"> implícito del navegador
 * al montar la primera; el resto entra con loading="lazy". La vista ampliada es
 * un diálogo modal propio —sin dependencias— que devuelve el foco al cerrar.
 */
export default function Producto() {
  const { t, lang } = useI18n()
  const [activa, setActiva] = useState(0)
  const [ampliada, setAmpliada] = useState(false)

  const vista = PRODUCTO.vistas[activa]
  const cerrar = useCallback(() => setAmpliada(false), [])

  useEffect(() => {
    if (!ampliada) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') cerrar()
      if (e.key === 'ArrowRight') setActiva((i) => (i + 1) % PRODUCTO.vistas.length)
      if (e.key === 'ArrowLeft')
        setActiva((i) => (i - 1 + PRODUCTO.vistas.length) % PRODUCTO.vistas.length)
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
        <Reveal>
          <span className="eyebrow">{t(PRODUCTO.eyebrow)}</span>
          <h2 className="titulo-seccion">{t(PRODUCTO.titulo)}</h2>
          <p className="intro">{t(PRODUCTO.intro)}</p>
        </Reveal>

        <div className="producto">
          {/* Selector de módulo */}
          <div className="producto-menu" role="tablist" aria-label={t(PRODUCTO.titulo)}>
            {PRODUCTO.vistas.map((v, i) => (
              <button
                key={v.k}
                role="tab"
                aria-selected={i === activa}
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
            <figure className="marco" onClick={() => setAmpliada(true)}>
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
              <figcaption>
                {t(PRODUCTO.ampliar)} <Icono nombre="flecha" />
              </figcaption>
            </figure>

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
      </div>

      {ampliada && (
        <div className="lupa" role="dialog" aria-modal="true" onClick={cerrar}>
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
