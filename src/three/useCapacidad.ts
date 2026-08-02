import { useMemo } from 'react'

export type Capacidad = {
  /** El equipo es de gama baja o el usuario pidió menos movimiento. */
  ligero: boolean
  /** No renderizar 3D en absoluto. */
  sin3d: boolean
  /** Densidad de la retícula del héroe. */
  grid: number
  /** Cuántas curvas de nivel dibuja el héroe. */
  curvas: number
  dpr: [number, number]
}

/**
 * Decide cuánto 3D puede permitirse este dispositivo.
 * Un teléfono de obra no es una estación de trabajo: la página tiene que
 * abrir igual en los dos.
 */
export function useCapacidad(): Capacidad {
  return useMemo(() => {
    if (typeof window === 'undefined')
      return { ligero: true, sin3d: true, grid: 60, curvas: 14, dpr: [1, 1] }

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const angosto = window.innerWidth < 760
    const nucleos = navigator.hardwareConcurrency ?? 4
    const mem = (navigator as Navigator & { deviceMemory?: number }).deviceMemory ?? 4

    let webgl = true
    try {
      const c = document.createElement('canvas')
      webgl = !!(c.getContext('webgl2') || c.getContext('webgl'))
    } catch {
      webgl = false
    }

    const ligero = reduce || angosto || nucleos <= 4 || mem <= 4
    return {
      ligero,
      sin3d: !webgl,
      grid: ligero ? 86 : 150,
      curvas: ligero ? 18 : 34,
      dpr: ligero ? [1, 1.25] : [1, 1.75],
    }
  }, [])
}
