import { Moon, Sun, Volume2, VolumeX } from 'lucide-react'

import { playThemeSwitch, toggleSound, useSoundEnabled } from './sound'
import type { Theme } from './theme'
import { cn } from '../lib/utils'

export interface HeaderSection {
  id: string
  heading: string
}

/**
 * 고정 헤더. 히어로의 섹션 바로가기가 화면에서 사라지면 같은 칩을 여기에 띄우고, 지금 보는 섹션을 눌린 칩으로 표시.
 * 검색창은 기법 목록 맨 위(SearchBar)에 있다. 오른쪽 끝은 효과음 · 테마 전환이고, 둘 다 누르면 효과음이 난다
 */
export function Header({
  sections,
  activeId,
  showChips,
  theme,
  onToggleTheme
}: {
  sections: HeaderSection[]
  activeId: string | null
  showChips: boolean
  theme: Theme
  onToggleTheme: () => void
}) {
  return (
    <header className="border-line bg-paper/85 sticky top-0 z-[100] border-b backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-[1280px] items-center gap-3 px-4 sm:px-6 lg:px-10">
        <a href="#top" className="flex shrink-0 items-center gap-2 font-mono text-xs font-semibold tracking-[0.14em] uppercase">
          <span className="bg-key shadow-raised-sm size-2.5 rounded-full" />
          <span>Motion Lab</span>
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

        <div className="ml-auto flex shrink-0 items-center gap-2">
          <SoundToggle />
          <button
            type="button"
            onClick={() => {
              playThemeSwitch(theme === 'light')
              onToggleTheme()
            }}
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

/** 효과음 켜고 끄기. 켜고 끌 때마다 확인 소리가 난다 (sound.ts 의 toggleSound) */
function SoundToggle() {
  const enabled = useSoundEnabled()

  return (
    <button
      type="button"
      onClick={() => toggleSound(!enabled)}
      aria-label={enabled ? '효과음 끄기' : '효과음 켜기'}
      title={enabled ? '효과음 끄기' : '효과음 켜기'}
      className="border-line bg-surface shadow-raised-sm active:shadow-inset-sm grid size-9 shrink-0 place-items-center rounded-full border transition-shadow duration-200"
    >
      {enabled ? <Volume2 className="size-4" strokeWidth={2.25} /> : <VolumeX className="size-4" strokeWidth={2.25} />}
    </button>
  )
}
