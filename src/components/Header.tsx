import { useEffect, useRef } from 'react'
import { Moon, Search, Sun, X } from 'lucide-react'

import type { Theme } from './theme'
import { cn } from '../lib/utils'

export interface HeaderSection {
  id: string
  heading: string
}

/**
 * 고정 헤더. 히어로의 섹션 바로가기가 화면에서 사라지면 같은 칩을 여기에 띄우고, 지금 보는 섹션을 눌린 칩으로 표시.
 * 검색은 "/" 로 바로 포커스, Esc 로 비움
 */
export function Header({
  sections,
  activeId,
  showChips,
  query,
  onQuery,
  resultCount,
  theme,
  onToggleTheme
}: {
  sections: HeaderSection[]
  activeId: string | null
  showChips: boolean
  query: string
  onQuery: (value: string) => void
  resultCount: number
  theme: Theme
  onToggleTheme: () => void
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
    <header className="border-line bg-paper/85 sticky top-0 z-[100] border-b backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-[1280px] items-center gap-3 px-4 sm:px-6 lg:px-10">
        <a href="#top" className="flex shrink-0 items-center gap-2 font-mono text-xs font-semibold tracking-[0.14em] uppercase">
          <span className="bg-key shadow-raised-sm size-2.5 rounded-full" />
          <span className="hidden sm:inline">Motion Lab</span>
        </a>

        <nav
          aria-label="섹션"
          aria-hidden={!showChips}
          className={cn(
            'hidden min-w-0 flex-1 items-center gap-1 overflow-x-auto px-2 transition-opacity duration-200 lg:flex',
            showChips ? 'opacity-100' : 'pointer-events-none opacity-0'
          )}
        >
          {sections.map((section) => (
            <a
              key={section.id}
              href={`#${section.id}`}
              tabIndex={showChips ? undefined : -1}
              aria-current={activeId === section.id ? 'location' : undefined}
              className={cn(
                'shrink-0 rounded-full px-2.5 py-1 text-xs font-semibold whitespace-nowrap transition-[color,box-shadow,background-color] duration-200',
                activeId === section.id ? 'bg-well text-ink shadow-inset-sm' : 'text-ink-3 hover:text-ink'
              )}
            >
              {section.heading}
            </a>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <label className="bg-well shadow-inset-sm focus-within:outline-key-text flex h-9 w-44 items-center gap-2 rounded-full px-3 focus-within:outline-2 focus-within:outline-offset-2 sm:w-64">
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
              placeholder="기법 검색"
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

          <button
            type="button"
            onClick={onToggleTheme}
            aria-label={theme === 'dark' ? '라이트 모드로 전환' : '다크 모드로 전환'}
            className="border-line bg-surface shadow-raised-sm active:shadow-inset-sm grid size-9 shrink-0 place-items-center rounded-full border transition-shadow duration-200"
          >
            {theme === 'dark' ? <Sun className="size-4" strokeWidth={2.25} /> : <Moon className="size-4" strokeWidth={2.25} />}
          </button>
        </div>
      </div>
    </header>
  )
}
