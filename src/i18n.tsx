import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import type { L, Lang } from './content/site'

type Ctx = { lang: Lang; setLang: (l: Lang) => void; t: (v: L) => string }

const I18n = createContext<Ctx>({ lang: 'es', setLang: () => {}, t: (v) => v.es })

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>(() => {
    const saved = localStorage.getItem('lang')
    if (saved === 'es' || saved === 'en') return saved
    return navigator.language.toLowerCase().startsWith('en') ? 'en' : 'es'
  })

  useEffect(() => {
    localStorage.setItem('lang', lang)
    document.documentElement.lang = lang
  }, [lang])

  const value = useMemo<Ctx>(() => ({ lang, setLang, t: (v: L) => v[lang] }), [lang])
  return <I18n.Provider value={value}>{children}</I18n.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export const useI18n = () => useContext(I18n)
