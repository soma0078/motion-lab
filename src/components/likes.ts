import { useCallback, useEffect, useRef, useState } from 'react'

/** 한 사람이 기법 하나에 줄 수 있는 좋아요 수. 하트가 이만큼의 칸으로 나뉘어 채워진다 */
export const MAX_LIKES = 6

// 테마(motion-lab-theme) · 효과음(motion-lab-sound)과 같은 모양의 키
const STORAGE_KEY = 'motion-lab-likes'

type Counts = Record<string, number>

/** 깨진 값은 버리고 한도를 넘는 값(예전 한도로 준 것)은 한도로 줄인다. 사생활 보호 모드처럼 저장소를 못 쓰면 빈 값 */
function readMine(): Counts {
  try {
    const parsed: unknown = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '{}')
    if (!parsed || typeof parsed !== 'object') return {}
    return Object.fromEntries(
      Object.entries(parsed)
        .filter((entry): entry is [string, number] => Number.isInteger(entry[1]) && entry[1] > 0)
        .map(([slug, count]) => [slug, Math.min(count, MAX_LIKES)])
    )
  } catch {
    return {}
  }
}

function writeMine(mine: Counts) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(mine))
  } catch {
    // 저장하지 못해도 이번 방문 동안은 화면에 그대로 보인다
  }
}

/**
 * 기법별 좋아요. 내가 준 수(0 ~ MAX_LIKES)는 이 브라우저에, 모든 사람의 합계는 netlify/functions/like-count.mjs 에 둔다.
 * 한도는 브라우저에서 지킨다 (서버는 사람을 구분하지 않는다)
 */
export function useLikes() {
  const [mine, setMine] = useState<Counts>(readMine)
  const [totals, setTotals] = useState<{ status: 'loading' | 'ready' | 'error'; counts: Counts }>({ status: 'loading', counts: {} })
  // 연달아 눌러도 한도를 바로 판단하도록 최신 값을 ref 에도 둔다
  const mineRef = useRef(mine)
  // 요청이 여러 개 오가면 가장 나중에 보낸 요청의 응답만 합계에 반영한다
  const latest = useRef<Counts>({})

  useEffect(() => {
    let alive = true
    fetch('/api/like')
      .then((response) => (response.ok ? response.json() : Promise.reject(new Error(String(response.status)))))
      .then((data: { counts?: Counts }) => {
        if (alive) setTotals({ status: 'ready', counts: data.counts ?? {} })
      })
      .catch(() => {
        if (alive) setTotals((prev) => ({ ...prev, status: 'error' }))
      })
    return () => {
      alive = false
    }
  }, [])

  /** 좋아요를 1 올리거나 내린다. 0 아래나 한도 위로는 가지 않고 false 를 돌려준다 */
  const change = useCallback((slug: string, delta: 1 | -1) => {
    const next = (mineRef.current[slug] ?? 0) + delta
    if (next < 0 || next > MAX_LIKES) return false

    const updated = { ...mineRef.current, [slug]: next }
    if (next === 0) delete updated[slug]
    mineRef.current = updated
    setMine(updated)
    writeMine(updated)

    // 합계는 먼저 바꿔 보이고, 서버가 답하면 그 값으로 맞춘다
    setTotals((prev) =>
      prev.status === 'ready' ? { ...prev, counts: { ...prev.counts, [slug]: Math.max(0, (prev.counts[slug] ?? 0) + delta) } } : prev
    )
    const seq = (latest.current[slug] ?? 0) + 1
    latest.current[slug] = seq
    fetch('/api/like', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ slug, delta }) })
      .then((response) => (response.ok ? response.json() : Promise.reject(new Error(String(response.status)))))
      .then(({ count }: { count?: number }) => {
        if (latest.current[slug] !== seq || typeof count !== 'number') return
        setTotals((prev) => ({ ...prev, counts: { ...prev.counts, [slug]: count } }))
      })
      .catch(() => {
        // 기록 실패는 알리지 않는다. 내 하트는 그대로 채워져 있다
      })
    return true
  }, [])

  return {
    mineOf: (slug: string) => mine[slug] ?? 0,
    /** 모든 사람의 합계. 모르면 null (읽는 중 · 읽기 실패) */
    totalOf: (slug: string) => (totals.status === 'ready' ? (totals.counts[slug] ?? 0) : null),
    change
  }
}
