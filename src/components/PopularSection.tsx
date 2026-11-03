import { useEffect, useRef, useState, type FocusEvent, type PointerEvent, type ReactNode } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { animate, motion, useDragControls, useMotionValue, useReducedMotion, type PanInfo } from 'motion/react'

import type { Technique } from '../techniques/registry'
import { cn } from '../lib/utils'
import { SectionHeading } from './SectionHeading'
import { TechniqueCard } from './TechniqueCard'

/** 다른 카드 목록(sm 2열 · xl 3열, gap-5)과 같은 너비. 모바일은 1장씩 보인다 */
const ITEM_WIDTH = 'w-full sm:w-[calc((100%-1.25rem)/2)] xl:w-[calc((100%-2.5rem)/3)]'

/** 끌기를 시작하지 않는 곳: 조작 요소와 데모 화면 (러버밴드 · 관성처럼 데모 자체를 끄는 기법이 있다) */
const NO_DRAG = 'input, button, a, select, textarea, label, [data-demo]'

const SPRING = { type: 'spring', stiffness: 320, damping: 36 } as const

/**
 * 복사가 많은 기법(최대 5개, 복사된 것만)을 한 장씩 넘기는 슬라이드.
 * Motion 의 drag="x" 로 마우스 · 터치를 함께 끌고, 놓으면 끈 거리 · 속도로 다음 장을 정해 스프링으로 붙인다
 */
export function PopularSection({
  techniques,
  countOf,
  onCopied
}: {
  techniques: Technique[]
  countOf: (slug: string) => number | null
  onCopied: (slug: string, count: number) => void
}) {
  const viewportRef = useRef<HTMLDivElement>(null)
  const listRef = useRef<HTMLOListElement>(null)
  const reduced = useReducedMotion() ?? false
  const controls = useDragControls()
  const x = useMotionValue(0)
  const [index, setIndex] = useState(0)
  // 크기를 다시 잴 때 지금 장을 알아야 해서 state 와 함께 ref 에도 둔다
  const indexRef = useRef(0)
  // step: 카드 한 장 + 간격 · last: 마지막으로 멈출 수 있는 장 (보이는 장 수만큼 빼서)
  const [layout, setLayout] = useState({ step: 0, last: 0 })

  // 화면 너비가 바뀌면 한 장 폭과 보이는 장 수를 다시 잰다
  useEffect(() => {
    const viewport = viewportRef.current
    const list = listRef.current
    if (!viewport || !list) return
    const measure = () => {
      const card = list.firstElementChild as HTMLElement | null
      if (!card) return
      const gap = parseFloat(getComputedStyle(list).columnGap) || 0
      const step = card.offsetWidth + gap
      const visible = Math.max(1, Math.round((list.clientWidth + gap) / step))
      const last = Math.max(0, techniques.length - visible)
      // 너비가 바뀌면 지금 장 위치로 바로 맞춘다 (넘길 때는 go 의 애니메이션이 맡는다)
      const current = Math.min(indexRef.current, last)
      indexRef.current = current
      x.set(-current * step)
      setIndex(current)
      setLayout({ step, last })
    }
    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(viewport)
    return () => observer.disconnect()
  }, [techniques.length, x])

  const go = (target: number) => {
    const next = Math.max(0, Math.min(target, layout.last))
    indexRef.current = next
    setIndex(next)
    animate(x, -next * layout.step, reduced ? { duration: 0 } : SPRING)
  }

  // 카드 1/5 이상 끌었거나 빠르게 튕기면 그 방향으로 한 장, 아니면 제자리
  const onDragEnd = (_: unknown, info: PanInfo) => {
    const far = Math.abs(info.offset.x) >= layout.step * 0.2
    const fast = Math.abs(info.velocity.x) >= 500
    const direction = info.offset.x < 0 ? 1 : -1
    go(far || fast ? index + direction : index)
  }

  const startDrag = (event: PointerEvent<HTMLOListElement>) => {
    if (!(event.target as Element).closest(NO_DRAG)) controls.start(event)
  }

  // 키보드로 화면 밖 카드의 버튼 · 슬라이더에 들어가면 그 카드가 보이게 넘긴다
  const followFocus = (event: FocusEvent<HTMLOListElement>) => {
    const card = (event.target as Element).closest('li')
    const rank = card ? Array.prototype.indexOf.call(listRef.current?.children ?? [], card) : -1
    const visible = techniques.length - layout.last
    if (rank >= 0 && (rank < index || rank >= index + visible)) go(rank)
  }

  return (
    <section aria-roledescription="carousel" aria-label="인기 기법">
      <SectionHeading
        title="인기 기법"
        count={techniques.length}
        lead="지시문 복사가 많은 순서예요. 옆으로 넘겨 보세요."
        aside={
          <>
            <SlideButton label="이전 기법" disabled={index <= 0} onClick={() => go(index - 1)}>
              <ChevronLeft className="size-4" strokeWidth={2.5} />
            </SlideButton>
            <SlideButton label="다음 기법" disabled={index >= layout.last} onClick={() => go(index + 1)}>
              <ChevronRight className="size-4" strokeWidth={2.5} />
            </SlideButton>
          </>
        }
      />
      {/* 카드 그림자가 잘리지 않게 바깥 여백만큼 넓혔다가 안쪽 여백으로 되돌린다. 넓히는 폭은 페이지 좌우 여백과 같다 */}
      {/* overflow: hidden 이어도 포커스가 화면 밖 카드로 가면 브라우저가 이 틀을 스크롤한다. 위치는 transform 이 맡으니 0 으로 되돌린다 */}
      <div
        ref={viewportRef}
        onScroll={(event) => (event.currentTarget.scrollLeft = 0)}
        className="-mx-4 -my-6 overflow-hidden px-4 py-6 sm:-mx-6 sm:px-6"
      >
        <motion.ol
          ref={listRef}
          drag="x"
          dragControls={controls}
          dragListener={false}
          dragConstraints={{ left: -layout.last * layout.step, right: 0 }}
          dragElastic={0.12}
          dragMomentum={false}
          onPointerDown={startDrag}
          onDragEnd={onDragEnd}
          onFocusCapture={followFocus}
          // 세로 스크롤은 브라우저에 맡기고 가로 끌기만 Motion 이 받는다
          style={{ x, touchAction: 'pan-y' }}
          className="flex cursor-grab gap-5 active:cursor-grabbing"
        >
          {techniques.map((technique, rank) => (
            <TechniqueCard
              key={technique.slug}
              technique={technique}
              index={rank}
              copyCount={countOf(technique.slug)}
              onCopied={onCopied}
              className={cn(ITEM_WIDTH, 'shrink-0')}
            />
          ))}
        </motion.ol>
      </div>
    </section>
  )
}

function SlideButton({
  label,
  disabled,
  onClick,
  children
}: {
  label: string
  disabled: boolean
  onClick: () => void
  children: ReactNode
}) {
  return (
    <button
      type="button"
      aria-label={label}
      disabled={disabled}
      onClick={onClick}
      className="border-line bg-surface shadow-raised-sm active:shadow-inset-sm grid size-9 place-items-center rounded-full border transition-[box-shadow,opacity] duration-200 disabled:pointer-events-none disabled:opacity-40"
    >
      {children}
    </button>
  )
}
