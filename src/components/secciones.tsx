import { Suspense, lazy, useState, type ReactNode } from 'react'
import { useI18n } from '../i18n'
import {
  CADENA,
  CIFRAS,
  DECISIONES,
  DETALLE,
  HERO,
  METODO,
  PENDIENTE,
  PERFIL,
  PROBLEMAS,
  PROPOSITO,
  RECORRIDO,
  RESTRICCIONES,
  RESUELVE,
  SISTEMA,
  TESIS,
  TRAYECTORIA,
} from '../content/site'
import { Contador, Icono, Reveal, Rico } from './ui'

const HeroScene = lazy(() => import('../three/HeroScene'))

/* ── 00 · Hero ────────────────────────────────────────────────────── */

export function Hero() {
  const { t } = useI18n()
  const [l1, l2] = t(HERO.titulo).split('\n')

  return (
    <section id="inicio" className="hero">
      <Suspense fallback={null}>
        <HeroScene />
      </Suspense>
      <div className="hero-velo" />

      <div className="wrap">
        <Reveal>
          <span className="eyebrow">{t(HERO.kicker)}</span>
        </Reveal>
        <Reveal delay={90}>
          <h1>
            {l1}
            {'\n'}
            <span className="luz">{l2}</span>
          </h1>
        </Reveal>
        <Reveal delay={170}>
          <p className="hero-sub">{t(HERO.subtitulo)}</p>
        </Reveal>
        <Reveal delay={240}>
          <p className="intro">{t(HERO.parrafo)}</p>
        </Reveal>
        <Reveal delay={320}>
          <div className="hero-cta">
            <a href="#sistema" className="btn btn-primario">
              {t(HERO.cta1)} <Icono nombre="flecha" />
            </a>
            <a href="#trayectoria" className="btn">
              {t(HERO.cta2)}
            </a>
          </div>
        </Reveal>
      </div>

      <div className="wrap hero-pie">
        <span>{t(PERFIL.ubicacion)}</span>
        <span>ASTRA ERA · 2026</span>
      </div>
    </section>
  )
}

/* ── 01 · La cadena rota ──────────────────────────────────────────── */

export function Cadena() {
  const { t } = useI18n()
  return (
    <section id="problema" className="borde-sup blueprint">
      <div className="wrap">
        <Reveal>
          <span className="eyebrow">{t(CADENA.eyebrow)}</span>
          <h2 className="titulo-seccion">{t(CADENA.titulo)}</h2>
          <p className="intro">{t(CADENA.intro)}</p>
        </Reveal>

        <div className="cadena">
          {CADENA.pasos.map((p, i) => (
            <Reveal key={p.n} delay={i * 70}>
              <div className="cadena-paso">
                <span className="n">{p.n}</span>
                <h3>{t(p.t)}</h3>
                <p>{t(p.d)}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={120}>
          <div className="remate">
            <Rico texto={t(CADENA.remate)} />
          </div>
        </Reveal>
      </div>
    </section>
  )
}

/* ── 02 · Qué resuelve ────────────────────────────────────────────── */

export function Resuelve() {
  const { t } = useI18n()
  return (
    <section id="resuelve" className="borde-sup">
      <div className="wrap">
        <Reveal>
          <span className="eyebrow">{t(RESUELVE.eyebrow)}</span>
          <h2 className="titulo-seccion">{t(RESUELVE.titulo)}</h2>
          <p className="intro">{t(RESUELVE.intro)}</p>
        </Reveal>

        <div className="resuelve">
          {RESUELVE.items.map((r, i) => (
            <Reveal key={i} delay={(i % 2) * 80}>
              <article className="resuelve-par">
                <div className="lado antes">
                  <span className="et">{t(RESUELVE.etAntes)}</span>
                  <p>{t(r.antes)}</p>
                </div>
                <Icono nombre="flecha" />
                <div className="lado ahora">
                  <span className="et">{t(RESUELVE.etAhora)}</span>
                  <p>{t(r.ahora)}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ── 07 · Para un asesor de tesis ─────────────────────────────────── */

export function Tesis() {
  const { t } = useI18n()
  return (
    <section id="tesis" className="borde-sup isla">
      <div className="wrap">
        <div className="cabecera">
          <Reveal>
            <div>
              <span className="eyebrow">{t(TESIS.eyebrow)}</span>
              <h2 className="titulo-seccion">{t(TESIS.titulo)}</h2>
            </div>
          </Reveal>
          <Reveal delay={80}>
            <p className="intro">{t(TESIS.intro)}</p>
          </Reveal>
        </div>

        <Reveal delay={60}>
          <div className="aviso pregunta">
            <span className="et">{t(TESIS.pregunta.et)}</span>
            <p>
              <Rico texto={t(TESIS.pregunta.d)} />
            </p>
          </div>
        </Reveal>

        <div className="rejilla dos">
          {TESIS.bloques.map((b, i) => (
            <Reveal key={i} delay={(i % 2) * 80}>
              <article className="tarjeta">
                <h3>{t(b.t)}</h3>
                <p>{t(b.d)}</p>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={100}>
          <div className="aviso" style={{ marginTop: '2.2rem' }}>
            <h3>{t(TESIS.agenda.t)}</h3>
            <p>{t(TESIS.agenda.d)}</p>
          </div>
        </Reveal>

        <Reveal delay={140}>
          <div className="cta-bloque">
            <a className="btn btn-primario" href={`mailto:${PERFIL.email}?subject=Tesis%20%C2%B7%20ASTRA%20ERA`}>
              <Icono nombre="mail" /> {t(TESIS.cta)}
            </a>
            <span>{t(TESIS.ctaNota)}</span>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

/* ── Detalle técnico · plegable ───────────────────────────────────── */

/**
 * Envuelve las secciones de ingeniería fina. Van cerradas por defecto: el
 * lector que solo quiere entender qué resuelve el sistema no debería tener que
 * scrollear seis pantallas de criterio de arquitectura para llegar al final.
 */
export function DetalleTecnico({ children }: { children: ReactNode }) {
  const { t } = useI18n()
  const [abierto, setAbierto] = useState(false)

  return (
    <section id="detalle" className="borde-sup detalle">
      <div className="wrap">
        <Reveal>
          <button className="detalle-cab" onClick={() => setAbierto(!abierto)} aria-expanded={abierto}>
            <div>
              <span className="eyebrow">{t(DETALLE.eyebrow)}</span>
              <h2 className="titulo-seccion">{t(DETALLE.titulo)}</h2>
              <p className="intro">{t(DETALLE.intro)}</p>
            </div>
            <span className="detalle-boton">
              {abierto ? t(DETALLE.ocultar) : t(DETALLE.mostrar)}
              <i data-abierto={abierto}>+</i>
            </span>
          </button>
        </Reveal>
      </div>
      {abierto && <div className="detalle-cuerpo">{children}</div>}
    </section>
  )
}

/* ── 05 · Restricciones ───────────────────────────────────────────── */

export function Restricciones() {
  const { t } = useI18n()
  return (
    <section id="terreno" className="borde-sup">
      <div className="wrap">
        <Reveal>
          <span className="eyebrow">{t(RESTRICCIONES.eyebrow)}</span>
          <h2 className="titulo-seccion">{t(RESTRICCIONES.titulo)}</h2>
          <p className="intro">{t(RESTRICCIONES.intro)}</p>
        </Reveal>

        <div className="rejilla dos">
          {RESTRICCIONES.items.map((r, i) => (
            <Reveal key={r.icono} delay={i * 80}>
              <article className="tarjeta">
                <Icono nombre={r.icono} />
                <h3>{t(r.t)}</h3>
                <p>{t(r.d)}</p>
                <span className="consec">{t(r.consec)}</span>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ── 03 · El sistema ──────────────────────────────────────────────── */

export function Sistema() {
  const { t, lang } = useI18n()
  const iconos = ['campo', 'panel', 'api']

  return (
    <section id="sistema" className="borde-sup blueprint">
      <div className="wrap">
        <Reveal>
          <span className="eyebrow">{t(SISTEMA.eyebrow)}</span>
          <h2 className="titulo-seccion">
            {SISTEMA.nombre} — {t(SISTEMA.titulo)}
          </h2>
          <p className="intro">{t(SISTEMA.intro)}</p>
        </Reveal>

        <div className="rejilla tres">
          {SISTEMA.componentes.map((c, i) => (
            <Reveal key={c.k} delay={i * 90}>
              <article className="tarjeta">
                <Icono nombre={iconos[i]} />
                <h3>{t(c.t)}</h3>
                <p>{t(c.d)}</p>
                <span className="stack">{c.stack}</span>
              </article>
            </Reveal>
          ))}
        </div>

        {/* El recorrido de un solo registro: es el argumento central del sitio
            y antes eran cuatro cajitas de texto que ni entraban en pantalla. */}
        <div className="recorrido">
          <div className="recorrido-cab">
            <span className="et">{t(RECORRIDO.et)}</span>
            <h3>{t(RECORRIDO.titulo)}</h3>
          </div>

          <ol className="recorrido-pasos">
            {RECORRIDO.pasos.map((p, i) => (
              <Reveal key={p.n} delay={i * 90}>
                <li className="recorrido-paso">
                  <span className="n">{p.n}</span>
                  <span className="donde">{t(p.donde)}</span>
                  <p className="que">{t(p.que)}</p>
                  <strong className="dato">{lang === 'en' ? p.datoEn : p.dato}</strong>
                  <p className="nota">{t(p.nota)}</p>
                </li>
              </Reveal>
            ))}
          </ol>

          <Reveal delay={120}>
            <p className="recorrido-remate">
              <Rico texto={t(RECORRIDO.remate)} />
            </p>
          </Reveal>
        </div>

        <Reveal delay={110}>
          <div className="aviso">
            <h3>{t(SISTEMA.sinIA.t)}</h3>
            <p>{t(SISTEMA.sinIA.d)}</p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

/* ── 04 · Cifras ──────────────────────────────────────────────────── */

export function Cifras() {
  const { t } = useI18n()
  return (
    <section id="cifras" className="borde-sup isla">
      <div className="wrap">
        <Reveal>
          <span className="eyebrow">{t(CIFRAS.eyebrow)}</span>
          <h2 className="titulo-seccion">{t(CIFRAS.titulo)}</h2>
          <p className="intro mono" style={{ fontSize: '0.8rem', letterSpacing: '0.06em' }}>
            {t(CIFRAS.corte)}
          </p>
        </Reveal>

        <div className="cifras">
          {CIFRAS.items.map((c, i) => (
            <div className="cifra" key={i}>
              <Contador valor={c.v} />
              <span className="t">{t(c.t)}</span>
            </div>
          ))}
        </div>

        <Reveal delay={90}>
          <div className="aviso" style={{ marginTop: '2.4rem' }}>
            <h3>{t(CIFRAS.validacion.t)}</h3>
            <p>{t(CIFRAS.validacion.d)}</p>
          </div>
        </Reveal>

        <div className="lista">
          {CIFRAS.validacion.pruebas.map((p, i) => (
            <div className="lista-item" key={i}>
              <h4>{t(p.t)}</h4>
              <p>{t(p.d)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ── 06 · Decisiones ──────────────────────────────────────────────── */

export function Decisiones() {
  const { t } = useI18n()
  return (
    <section id="criterio" className="borde-sup blueprint">
      <div className="wrap">
        <Reveal>
          <span className="eyebrow">{t(DECISIONES.eyebrow)}</span>
          <h2 className="titulo-seccion">{t(DECISIONES.titulo)}</h2>
          <p className="intro">{t(DECISIONES.intro)}</p>
        </Reveal>

        <div className="rejilla dos">
          {DECISIONES.items.map((d, i) => (
            <Reveal key={d.n} delay={(i % 2) * 80}>
              <article className="tarjeta">
                <span className="eyebrow" style={{ marginBottom: '0.7rem' }}>
                  {d.n}
                </span>
                <h3>{t(d.t)}</h3>
                <p>{t(d.d)}</p>
                <span className="consec">
                  {t({ es: '¿Por qué? ', en: 'Why? ' })}
                  {t(d.porque)}
                </span>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ── 07 · Problemas difíciles ─────────────────────────────────────── */

export function Problemas() {
  const { t } = useI18n()
  const [abierto, setAbierto] = useState<number | null>(null)

  return (
    <section className="borde-sup">
      <div className="wrap">
        <Reveal>
          <span className="eyebrow">{t(PROBLEMAS.eyebrow)}</span>
          <h2 className="titulo-seccion">{t(PROBLEMAS.titulo)}</h2>
          <p className="intro" style={{ marginBottom: '2.6rem' }}>
            {t(PROBLEMAS.intro)}
          </p>
        </Reveal>

        {PROBLEMAS.items.map((p, i) => (
          <Reveal key={i} delay={i * 60}>
            <article className="problema" data-abierto={abierto === i}>
              <button
                className="problema-cab"
                onClick={() => setAbierto(abierto === i ? null : i)}
                aria-expanded={abierto === i}
              >
                <h3>{t(p.t)}</h3>
                <span className="mas" aria-hidden>
                  +
                </span>
              </button>
              {abierto === i && (
                <div className="problema-cuerpo">
                  <div className="bloque">
                    <span className="et">{t({ es: 'El hallazgo', en: 'The finding' })}</span>
                    <p>{t(p.hallazgo)}</p>
                  </div>
                  <div className="bloque">
                    <span className="et">{t({ es: 'La resolución', en: 'The resolution' })}</span>
                    <p>{t(p.resolucion)}</p>
                  </div>
                  <div className="bloque prueba">
                    <span className="et">
                      {t({ es: 'La prueba que lo confirma', en: 'The proof that confirms it' })}
                    </span>
                    <p>{t(p.prueba)}</p>
                  </div>
                </div>
              )}
            </article>
          </Reveal>
        ))}

        <Reveal delay={80}>
          <div className="lista" style={{ marginTop: '2.4rem' }}>
            <div className="lista-item">
              <h4>{t(PROBLEMAS.atrapados.t)}</h4>
              <div style={{ display: 'grid', gap: '1.1rem' }}>
                {PROBLEMAS.atrapados.items.map((x, i) => (
                  <p key={i}>{t(x)}</p>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

/* ── 08 · Lo que no está resuelto ─────────────────────────────────── */

export function Pendiente() {
  const { t } = useI18n()
  return (
    <section className="borde-sup blueprint">
      <div className="wrap">
        <Reveal>
          <span className="eyebrow">{t(PENDIENTE.eyebrow)}</span>
          <h2 className="titulo-seccion">{t(PENDIENTE.titulo)}</h2>
          <p className="intro">{t(PENDIENTE.intro)}</p>
        </Reveal>

        <div className="lista">
          {PENDIENTE.items.map((p, i) => (
            <div className="lista-item" key={i}>
              <h4>{t(p.t)}</h4>
              <p>{t(p.d)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ── 09 · Método ──────────────────────────────────────────────────── */

export function Metodo() {
  const { t } = useI18n()
  return (
    <section className="borde-sup">
      <div className="wrap">
        <Reveal>
          <span className="eyebrow">{t(METODO.eyebrow)}</span>
          <h2 className="titulo-seccion">{t(METODO.titulo)}</h2>
          <p className="intro">{t(METODO.intro)}</p>
        </Reveal>

        <div className="rejilla tres">
          {METODO.items.map((m, i) => (
            <Reveal key={i} delay={(i % 3) * 70}>
              <article className="tarjeta">
                <h3>{t(m.t)}</h3>
                <p>{t(m.d)}</p>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={100}>
          <div className="remate" style={{ marginTop: '2.6rem' }}>
            {t(METODO.cierre)}
          </div>
        </Reveal>
      </div>
    </section>
  )
}

/* ── 10 · Trayectoria ─────────────────────────────────────────────── */

export function Trayectoria() {
  const { t } = useI18n()
  return (
    <section id="trayectoria" className="borde-sup blueprint">
      <div className="wrap">
        <Reveal>
          <span className="eyebrow">{t(TRAYECTORIA.eyebrow)}</span>
          <h2 className="titulo-seccion">{t(TRAYECTORIA.titulo)}</h2>
        </Reveal>

        <div className="timeline">
          {TRAYECTORIA.experiencia.map((e, i) => (
            <Reveal key={i} delay={i * 60}>
              <div className="tl-item">
                <div className="tl-periodo">{t(e.periodo)}</div>
                <div>
                  <h3 className="tl-rol">{t(e.rol)}</h3>
                  <p className="tl-org">{t(e.org)}</p>
                  <ul className="tl-puntos">
                    {e.puntos.map((p, j) => (
                      <li key={j}>{t(p)}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="dos-col">
          <Reveal>
            <div>
              <h3>{t(TRAYECTORIA.educacion.t)}</h3>
              <div className="mini">
                {TRAYECTORIA.educacion.items.map((e, i) => (
                  <div className="mini-item" key={i}>
                    <span className="t">{t(e.t)}</span>
                    <span className="d">{t(e.d)}</span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
          <Reveal delay={80}>
            <div>
              <h3>{t(TRAYECTORIA.certificaciones.t)}</h3>
              <div className="mini">
                {TRAYECTORIA.certificaciones.items.map((c, i) => (
                  <div className="mini-item" key={i}>
                    <span className="t">{c.t}</span>
                    <span className="d">{c.d}</span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

/* ── 12 · Cierre y contacto ───────────────────────────────────────── */

export function Cierre() {
  const { t } = useI18n()
  return (
    <section id="contacto" className="borde-sup blueprint">
      <div className="wrap cierre">
        <Reveal>
          <span className="eyebrow">{t(PROPOSITO.eyebrow)}</span>
          <h2 className="titulo-seccion">{t(PROPOSITO.titulo)}</h2>
          <p>{t(PROPOSITO.cuerpo)}</p>
        </Reveal>

        <Reveal delay={120}>
          <div className="contacto">
            <a className="btn btn-primario" href={`mailto:${PERFIL.email}`}>
              <Icono nombre="mail" /> {t(PROPOSITO.contacto)}
            </a>
            <a className="btn" href={PERFIL.linkedin} target="_blank" rel="noreferrer">
              <Icono nombre="link" /> LinkedIn
            </a>
            <a className="btn" href={PERFIL.github} target="_blank" rel="noreferrer">
              <Icono nombre="link" /> GitHub
            </a>
          </div>
        </Reveal>

        <div className="pie">
          <p>{t(PROPOSITO.nota)}</p>
          <span className="firma">
            {PERFIL.nombre.toUpperCase()} · {t(PERFIL.ubicacion)}
          </span>
        </div>
      </div>
    </section>
  )
}
