import { useEffect, useState } from 'react'
import { useI18n } from '../i18n'
import { NAV } from '../content/site'

export default function Nav() {
  const { t, lang, setLang } = useI18n()
  const [solido, setSolido] = useState(false)
  const [activo, setActivo] = useState('inicio')

  useEffect(() => {
    const onScroll = () => setSolido(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const secciones = NAV.items
      .map((i) => document.getElementById(i.id))
      .filter((e): e is HTMLElement => !!e)
    const io = new IntersectionObserver(
      (entradas) => {
        const v = entradas
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (v) setActivo(v.target.id)
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: [0, 0.2, 0.6] },
    )
    secciones.forEach((s) => io.observe(s))
    return () => io.disconnect()
  }, [])

  return (
    <nav className={`nav${solido ? ' solido' : ''}`}>
      <a href="#inicio" className="nav-marca">
        JEAN KEVIN <span>· CHUQUITARQUI CRUZ</span>
      </a>

      <div className="nav-links">
        {NAV.items.map((i) => (
          <a key={i.id} href={`#${i.id}`} className={activo === i.id ? 'activo' : ''}>
            {t(i.t)}
          </a>
        ))}
      </div>

      <div className="lang" role="group" aria-label="Idioma / Language">
        <button data-on={lang === 'es'} onClick={() => setLang('es')} aria-label="Español">
          ES
        </button>
        <button data-on={lang === 'en'} onClick={() => setLang('en')} aria-label="English">
          EN
        </button>
      </div>
    </nav>
  )
}
