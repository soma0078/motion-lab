import { useEffect, useRef, useState } from 'react'

export type Theme = 'light' | 'dark'

/** index.html 의 인라인 스크립트와 같은 키. 첫 화면을 그리기 전에 data-theme 을 붙여 깜빡임을 막는다 */
const STORAGE_KEY = 'motion-lab-theme'
const DARK_QUERY = '(prefers-color-scheme: dark)'

const readStored = (): Theme | null => {
  try {
    const value = localStorage.getItem(STORAGE_KEY)
    return value === 'light' || value === 'dark' ? value : null
  } catch {
    // 시크릿 창 · 저장소 차단이면 OS 설정을 따른다
    return null
  }
}

const systemTheme = (): Theme => (window.matchMedia(DARK_QUERY).matches ? 'dark' : 'light')

/** 사용자가 고른 테마가 있으면 그것, 없으면 OS 설정을 따라가며 바뀔 때도 반영 */
export function useTheme() {
  const [theme, setTheme] = useState<Theme>(() => readStored() ?? systemTheme())
  const chosen = useRef(readStored() !== null)

  useEffect(() => {
    document.documentElement.dataset.theme = theme
  }, [theme])

  useEffect(() => {
    const query = window.matchMedia(DARK_QUERY)
    const follow = (event: MediaQueryListEvent) => {
      if (!chosen.current) setTheme(event.matches ? 'dark' : 'light')
    }
    query.addEventListener('change', follow)
    return () => query.removeEventListener('change', follow)
  }, [])

  const toggle = () => {
    const next = theme === 'dark' ? 'light' : 'dark'
    chosen.current = true
    setTheme(next)
    try {
      localStorage.setItem(STORAGE_KEY, next)
    } catch {
      // 저장이 막혀도 이번 방문 동안은 바뀐 테마를 유지
    }
  }

  return { theme, toggle }
}
