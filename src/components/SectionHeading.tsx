import type { ReactNode } from 'react'

/**
 * 섹션 제목. 도면 번호(§01) · 제목 · 개수.
 * 카드 제목(text-lg)보다 크게 해서 섹션이 바뀌는 지점이 보이게 한다
 */
export function SectionHeading({
  index,
  title,
  count,
  lead,
  aside
}: {
  index?: number
  title: string
  count?: number
  lead?: string
  /** 제목 줄 오른쪽 끝에 붙는 조작 (예: 슬라이드 버튼) */
  aside?: ReactNode
}) {
  return (
    <header className="mb-8">
      <div className="flex items-center gap-3">
        {index !== undefined && (
          <span className="text-key-text font-mono text-xs font-semibold tracking-wider">
            §{String(index).padStart(2, '0')}
          </span>
        )}
        <h2 className="text-2xl font-bold tracking-tight break-keep sm:text-[28px]">{title}</h2>
        {count !== undefined && (
          <span className="border-line text-ink-3 rounded-full border px-2 py-0.5 font-mono text-[11px] font-medium">
            {count}
          </span>
        )}
        {aside && <div className="ml-auto flex shrink-0 items-center gap-2">{aside}</div>}
      </div>
      {lead && <p className="text-ink-2 mt-2 max-w-3xl text-sm break-keep">{lead}</p>}
    </header>
  )
}
