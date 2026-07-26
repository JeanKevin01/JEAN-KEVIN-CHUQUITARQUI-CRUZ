import { useEffect, useRef, useState, type ReactNode } from 'react'

/** Aparece cuando entra en pantalla. Una sola vez. */
export function Reveal({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true)
          io.disconnect()
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={`reveal${visible ? ' visible' : ''}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  )
}

/** Cuenta hasta el valor cuando la cifra entra en pantalla. */
export function Contador({ valor }: { valor: number }) {
  const ref = useRef<HTMLSpanElement>(null)
  const [n, setN] = useState(0)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setN(valor)
      return
    }
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return
        io.disconnect()
        const t0 = performance.now()
        const dur = 1150
        const paso = (t: number) => {
          const k = Math.min(1, (t - t0) / dur)
          // easeOutExpo: arranca rápido y se asienta.
          const e2 = k === 1 ? 1 : 1 - Math.pow(2, -10 * k)
          setN(Math.round(valor * e2))
          if (k < 1) requestAnimationFrame(paso)
        }
        requestAnimationFrame(paso)
      },
      { threshold: 0.4 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [valor])

  return (
    <span ref={ref} className="v">
      {n.toLocaleString('es-PE')}
    </span>
  )
}

/** Convierte **negritas** del contenido en <strong>. */
export function Rico({ texto }: { texto: string }) {
  const partes = texto.split(/(\*\*[^*]+\*\*)/g)
  return (
    <>
      {partes.map((p, i) =>
        p.startsWith('**') && p.endsWith('**') ? <strong key={i}>{p.slice(2, -2)}</strong> : p,
      )}
    </>
  )
}

/* ── Iconografía mínima, trazo de plano ───────────────────────────── */

const svg = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.4,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
}

export function Icono({ nombre }: { nombre: string }) {
  const c = { className: 'icono', viewBox: '0 0 24 24', ...svg }
  switch (nombre) {
    case 'signal':
      return (
        <svg {...c}>
          <path d="M3 18h2M8 18v-4M13 18v-8M18 18V6" />
          <path d="M20.5 3.5 3.5 20.5" stroke="currentColor" opacity=".55" />
        </svg>
      )
    case 'glove':
      return (
        <svg {...c}>
          <path d="M7 21v-5.5a3 3 0 0 1-2-2.8V9a1.5 1.5 0 0 1 3 0V5a1.5 1.5 0 0 1 3 0v3.5" />
          <path d="M11 8.5V4a1.5 1.5 0 0 1 3 0v4.5M14 9V6a1.5 1.5 0 0 1 3 0v7a8 8 0 0 1-2 5.3V21" />
        </svg>
      )
    case 'disk':
      return (
        <svg {...c}>
          <ellipse cx="12" cy="6" rx="7.5" ry="3" />
          <path d="M4.5 6v12c0 1.7 3.4 3 7.5 3s7.5-1.3 7.5-3V6" />
          <path d="M4.5 12c0 1.7 3.4 3 7.5 3s7.5-1.3 7.5-3" />
        </svg>
      )
    case 'pdf':
      return (
        <svg {...c}>
          <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" />
          <path d="M14 3v5h5M9 13h6M9 17h4" />
        </svg>
      )
    case 'campo':
      return (
        <svg {...c}>
          <rect x="6" y="2.5" width="12" height="19" rx="2.5" />
          <path d="M10.5 5.5h3M9 10h6v5H9zM12 18.5h.01" />
        </svg>
      )
    case 'panel':
      return (
        <svg {...c}>
          <rect x="2.5" y="4" width="19" height="14" rx="2" />
          <path d="M2.5 9h19M7.5 13h3M14 12v3M17 10.5V15" />
        </svg>
      )
    case 'api':
      return (
        <svg {...c}>
          <circle cx="12" cy="12" r="2.6" />
          <circle cx="5" cy="5.5" r="2" />
          <circle cx="19" cy="5.5" r="2" />
          <circle cx="5" cy="18.5" r="2" />
          <circle cx="19" cy="18.5" r="2" />
          <path d="m6.6 7 3.6 3.3M17.4 7l-3.6 3.3M6.6 17l3.6-3.3M17.4 17l-3.6-3.3" />
        </svg>
      )
    case 'mail':
      return (
        <svg {...c} className="ico-mini">
          <rect x="2.5" y="5" width="19" height="14" rx="2" />
          <path d="m3 6.5 9 6.5 9-6.5" />
        </svg>
      )
    case 'link':
      return (
        <svg {...c} className="ico-mini">
          <path d="M10 13a5 5 0 0 0 7.5.5l2-2a5 5 0 0 0-7-7l-1.2 1.1" />
          <path d="M14 11a5 5 0 0 0-7.5-.5l-2 2a5 5 0 0 0 7 7l1.2-1.1" />
        </svg>
      )
    case 'flecha':
      return (
        <svg {...c} className="ico-mini">
          <path d="M5 12h13M12 5.5 18.5 12 12 18.5" />
        </svg>
      )
    default:
      return null
  }
}
