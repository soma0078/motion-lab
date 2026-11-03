import { useCallback, useEffect, useState } from 'react'

export interface CopyCounts {
  /** loading: 읽는 중 · ready: 읽음 · error: 서버 없음(로컬 vite dev) 또는 실패 */
  status: 'loading' | 'ready' | 'error'
  /** 지금 보여 줄 횟수. 복사하면 서버가 돌려준 값으로 바로 바뀐다 */
  counts: Record<string, number>
  /** 인기 순위용. 페이지를 열 때 읽은 값으로 고정해서, 복사할 때마다 카드 순서가 바뀌지 않게 한다 */
  ranking: Record<string, number>
}

/** 기법별 지시문 복사 횟수 (netlify/functions/copy-count.mjs). 페이지를 열 때 한 번 읽는다 */
export function useCopyCounts() {
  const [state, setState] = useState<CopyCounts>({ status: 'loading', counts: {}, ranking: {} })

  useEffect(() => {
    let alive = true
    fetch('/api/copy')
      .then((response) => (response.ok ? response.json() : Promise.reject(new Error(String(response.status)))))
      .then((data: { counts?: Record<string, number> }) => {
        const counts = data.counts ?? {}
        if (alive) setState({ status: 'ready', counts, ranking: counts })
      })
      .catch(() => {
        // vite dev 에는 함수가 없어 index.html 이 돌아와 JSON 해석에서 실패한다
        if (alive) setState((prev) => ({ ...prev, status: 'error' }))
      })
    return () => {
      alive = false
    }
  }, [])

  const record = useCallback((slug: string, count: number) => {
    setState((prev) => ({ ...prev, counts: { ...prev.counts, [slug]: count } }))
  }, [])

  /** 카드에 보일 값. 모르면 null (읽기 실패 · 읽는 중) */
  const countOf = (slug: string) => state.counts[slug] ?? (state.status === 'ready' ? 0 : null)

  return { ...state, record, countOf }
}
