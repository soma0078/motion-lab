import { useEffect, useRef } from 'react'
import { Search, X } from 'lucide-react'

/**
 * 기법 목록 맨 위의 검색창. 스크롤하면 고정 헤더 바로 아래에 붙어서 목록 어디서든 쓸 수 있다.
 * "/" 로 바로 포커스, Esc 로 비움. 붙었을 때 가리는 높이는 index.css 의 scroll-padding-top 에 더해 둔다
 */
export function SearchBar({
  query,
  onQuery,
  resultCount
}: {
  query: string
  onQuery: (value: string) => void
  resultCount: number
}) {
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const focusSearch = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement
      if (event.key !== '/' || target.closest('input, textarea, [contenteditable]')) return
      event.preventDefault()
      inputRef.current?.focus()
    }
    window.addEventListener('keydown', focusSearch)
    return () => window.removeEventListener('keydown', focusSearch)
  }, [])

  return (
    <div role="search" className="bg-paper/85 sticky top-16 z-[90] -mx-4 px-4 py-3 backdrop-blur-md sm:-mx-6 sm:px-6 lg:-mx-10 lg:px-10">
      <label className="bg-well shadow-inset-sm focus-within:outline-key-text flex h-11 w-full items-center gap-2.5 rounded-full px-4 focus-within:outline-2 focus-within:outline-offset-2">
        <Search className="text-ink-3 size-4 shrink-0" strokeWidth={2.25} />
        <span className="sr-only">기법 검색</span>
        <input
          ref={inputRef}
          type="search"
          value={query}
          onChange={(event) => onQuery(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === 'Escape') onQuery('')
          }}
          placeholder="기법 이름이나 움직임으로 검색"
          className="placeholder:text-ink-3 min-w-0 flex-1 bg-transparent text-sm outline-none [&::-webkit-search-cancel-button]:hidden"
        />
        {query ? (
          <>
            <span className="text-ink-3 shrink-0 font-mono text-[11px]">{resultCount}</span>
            <button type="button" onClick={() => onQuery('')} aria-label="검색어 지우기" className="text-ink-3 hover:text-ink">
              <X className="size-3.5" strokeWidth={2.5} />
            </button>
          </>
        ) : (
          <kbd className="border-line text-ink-3 hidden rounded border px-1.5 font-mono text-[11px] sm:block">/</kbd>
        )}
      </label>
    </div>
  )
}
