import { ArrowUp } from 'lucide-react'

const REPO_URL = 'https://github.com/soma0078/motion-lab'

/** CSS smooth 는 지연 로딩으로 레이아웃이 바뀌면 중간에 멈춰서, 프레임마다 직접 올린다 */
function scrollToTop() {
  const start = window.scrollY
  if (start === 0) return
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    window.scrollTo({ top: 0, behavior: 'instant' })
    return
  }

  const duration = Math.min(900, 300 + start / 12)
  const startedAt = performance.now()
  let frame = 0
  const stop = () => cancelAnimationFrame(frame)
  // 사용자가 직접 스크롤하면 그쪽을 따름
  window.addEventListener('wheel', stop, { once: true, passive: true })
  window.addEventListener('touchstart', stop, { once: true, passive: true })

  const step = (now: number) => {
    const t = Math.min((now - startedAt) / duration, 1)
    window.scrollTo({ top: start * (1 - t) ** 3, behavior: 'instant' })
    if (t < 1) frame = requestAnimationFrame(step)
  }
  frame = requestAnimationFrame(step)
}

/** 도면의 표제란처럼: 왼쪽 저작권 · 가운데 저장소 · 오른쪽 맨 위로 */
export function Footer() {
  return (
    <footer className="border-line-strong text-ink-3 grid grid-cols-[1fr_auto_1fr] items-center gap-3 border-t pt-6 font-mono text-[11px] font-medium">
      <p>© 2026 soma0078</p>
      <a
        href={REPO_URL}
        target="_blank"
        rel="noreferrer"
        className="text-ink hover:text-key-text inline-flex items-center gap-1.5 font-semibold"
      >
        <svg viewBox="0 0 16 16" aria-hidden="true" className="size-4 fill-current">
          <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
        </svg>
        motion-lab
      </a>
      <button
        type="button"
        onClick={scrollToTop}
        className="border-line bg-surface text-ink shadow-raised-sm active:shadow-inset-sm flex items-center gap-1 justify-self-end rounded-full border px-3 py-1.5 font-sans text-xs font-semibold transition-shadow duration-200"
      >
        <ArrowUp className="size-3.5" strokeWidth={2.5} />
        맨 위로
      </button>
    </footer>
  )
}
