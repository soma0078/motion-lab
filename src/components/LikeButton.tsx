import { useEffect, useId, useRef, useState } from 'react'
import { motion, useAnimate, useReducedMotion } from 'motion/react'

import { MAX_LIKES } from './likes'
import { playBlocked, playLike, playMax, playUnlike, primeSound } from './sound'
import { cn } from '../lib/utils'

// lucide 하트(24×24). 채우기는 하트가 실제로 차지하는 세로 범위를 MAX_LIKES 칸으로 나눠 아래부터 올린다
const HEART =
  'M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5'
const FILL_TOP = 3.5
const FILL_BOTTOM = 21.5
/** 손가락으로 이만큼 누르고 있으면 -1 (터치에는 우클릭이 없어서) */
const LONG_PRESS_MS = 500
/** 컨페티가 다 떨어질 때까지. 조각마다 시작을 조금씩 늦춰서 가장 긴 조각 기준 */
const CONFETTI_MS = 1100

const FILL_SPRING = { type: 'spring', stiffness: 320, damping: 26 } as const

type Feedback = 'up' | 'full' | 'down' | 'blocked'
/** 하트 위로 떠올랐다 사라지는 글자. 다 채운 순간과 다 찬 뒤에 또 누를 때는 MAX */
type Pop = '+1' | '−1' | 'MAX'

/**
 * 좋아요 하트. 좌클릭 +1, 우클릭(터치는 길게 누르기) -1, 최대 MAX_LIKES.
 * 내가 준 만큼 하트가 아래부터 채워지고, 누를 때마다 +1 · −1 이 떠올랐다 사라진다. 다 채우면 MAX 가 떠오르며 컨페티가 터진다.
 * 옆 숫자는 모든 사람의 합계
 */
export function LikeButton({
  mine,
  total,
  onChange
}: {
  mine: number
  /** 모든 사람의 합계. 모르면 null */
  total: number | null
  /** 바뀌었으면 true, 한도에 막혔으면 false */
  onChange: (delta: 1 | -1) => boolean
}) {
  const reduced = useReducedMotion()
  const [scope, animate] = useAnimate<HTMLSpanElement>()
  // url(#id) 에 쓸 수 있게 useId 의 특수 문자를 뺀다
  const clipId = `heart-${useId().replace(/[^a-zA-Z0-9_-]/g, '')}`
  const pointerType = useRef('mouse')
  const pressTimer = useRef<number | undefined>(undefined)
  const longPressed = useRef(false)
  // 연달아 누르면 +1 이 여러 개 겹쳐 떠오른다. 각자 끝나면 스스로 빠진다
  const [pops, setPops] = useState<{ id: number; text: Pop }[]>([])
  const popId = useRef(0)
  // 다 채울 때마다 새 번호로 컨페티를 다시 그린다. 0 이면 없음
  const [burst, setBurst] = useState(0)

  useEffect(() => {
    if (!burst) return
    const id = window.setTimeout(() => setBurst(0), CONFETTI_MS)
    return () => window.clearTimeout(id)
  }, [burst])

  const fillHeight = ((FILL_BOTTOM - FILL_TOP) * mine) / MAX_LIKES

  const play = (feedback: Feedback) => {
    if (reduced || !scope.current) return
    if (feedback === 'up') animate(scope.current, { scale: [1, 1.22, 1] }, { duration: 0.28, ease: 'easeOut' })
    if (feedback === 'full') animate(scope.current, { scale: [1, 1.4, 0.92, 1] }, { duration: 0.45, ease: 'easeOut' })
    if (feedback === 'down') animate(scope.current, { scale: [1, 0.84, 1] }, { duration: 0.24, ease: 'easeOut' })
    // 더 채울 수도, 더 비울 수도 없을 때는 고개를 젓듯 흔든다
    if (feedback === 'blocked') animate(scope.current, { x: [0, -3, 3, -2, 2, 0] }, { duration: 0.35 })
  }

  const showPop = (text: Pop) => {
    popId.current += 1
    setPops((prev) => [...prev, { id: popId.current, text }])
  }

  const act = (delta: 1 | -1) => {
    if (!onChange(delta)) {
      // 다 찬 하트를 또 누르면 왜 안 오르는지 MAX 로 알려 준다. 0 에서 빼려 할 때는 흔들기만
      if (delta === 1) showPop('MAX')
      playBlocked()
      return play('blocked')
    }
    const full = delta === 1 && mine + 1 === MAX_LIKES
    showPop(full ? 'MAX' : delta === 1 ? '+1' : '−1')
    if (full && !reduced) setBurst(popId.current)
    // 효과음은 칸과 짝을 이룬다: 채운 칸의 음으로 오르고, 비운 칸의 음에서 내려간다
    if (full) playMax()
    else if (delta === 1) playLike(mine + 1)
    else playUnlike(mine)
    play(delta === -1 ? 'down' : full ? 'full' : 'up')
  }

  const cancelPress = () => window.clearTimeout(pressTimer.current)

  return (
    <button
      type="button"
      onPointerDown={(event) => {
        pointerType.current = event.pointerType
        // 길게 누르기의 -1 은 타이머에서 나서, 사용자가 누른 이 순간에 소리를 미리 열어 둔다
        primeSound()
        if (event.pointerType !== 'touch') return
        longPressed.current = false
        cancelPress()
        pressTimer.current = window.setTimeout(() => {
          longPressed.current = true
          act(-1)
        }, LONG_PRESS_MS)
      }}
      onPointerUp={cancelPress}
      onPointerLeave={cancelPress}
      onPointerCancel={cancelPress}
      onClick={() => {
        // 길게 눌러 -1 을 했으면 손을 뗄 때 오는 클릭은 +1 로 치지 않는다
        if (longPressed.current) {
          longPressed.current = false
          return
        }
        act(1)
      }}
      onContextMenu={(event) => {
        event.preventDefault()
        // 터치에서 길게 누르면 브라우저에 따라 contextmenu 도 와서, 길게 누르기 타이머만 센다
        if (pointerType.current !== 'touch') act(-1)
      }}
      onKeyDown={(event) => {
        if (['ArrowDown', 'Backspace', 'Delete', '-'].includes(event.key)) {
          event.preventDefault()
          act(-1)
        } else if (['ArrowUp', '+'].includes(event.key)) {
          event.preventDefault()
          act(1)
        }
      }}
      aria-label={`좋아요 ${mine}/${MAX_LIKES}${total === null ? '' : `, 전체 ${total.toLocaleString()}`}`}
      title={`클릭 +1 · 우클릭 −1 (최대 ${MAX_LIKES})`}
      className={cn(
        'border-line bg-surface shadow-raised-sm active:shadow-inset-sm inline-flex touch-manipulation items-center gap-1.5 rounded-full border px-2.5 py-1.5 text-xs font-semibold transition-[color,box-shadow] duration-200 select-none [-webkit-touch-callout:none]',
        mine > 0 ? 'text-key-text' : 'text-ink-3 hover:text-ink'
      )}
    >
      <span className="relative grid place-items-center">
        <span ref={scope} className="grid place-items-center">
          <svg viewBox="0 0 24 24" className="size-4" aria-hidden="true">
            <defs>
              <clipPath id={clipId}>
                {/* SVG 에서 Motion 의 y 는 transform 이라, clipPath 안에서도 확실하게 attrY 로 y 속성을 움직인다 */}
                <motion.rect
                  x={0}
                  width={24}
                  initial={false}
                  animate={{ attrY: FILL_BOTTOM - fillHeight, height: fillHeight }}
                  transition={reduced ? { duration: 0 } : FILL_SPRING}
                />
              </clipPath>
            </defs>
            <path d={HEART} fill="var(--key)" clipPath={`url(#${clipId})`} />
            <path d={HEART} fill="none" stroke="currentColor" strokeWidth={2.25} strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>

        {pops.map((pop) => (
          <motion.span
            key={pop.id}
            aria-hidden="true"
            className="text-key-text pointer-events-none absolute bottom-full left-1/2 font-mono text-[11px] font-bold whitespace-nowrap tabular-nums"
            style={{ x: '-50%' }}
            initial={{ opacity: 0, y: 2 }}
            animate={{ opacity: [0, 1, 1, 0], y: reduced ? 2 : -16 }}
            transition={{ duration: 0.7, ease: 'easeOut', opacity: { duration: 0.7, times: [0, 0.15, 0.6, 1] } }}
            onAnimationComplete={() => setPops((prev) => prev.filter((item) => item.id !== pop.id))}
          >
            {pop.text}
          </motion.span>
        ))}

        {burst > 0 && <Confetti key={burst} />}
      </span>
      <span className="font-mono text-[11px] tabular-nums">{total === null ? '—' : total.toLocaleString()}</span>
      <span className="sr-only" aria-live="polite">
        {mine > 0 ? `좋아요 ${mine}/${MAX_LIKES}` : ''}
      </span>
    </button>
  )
}

// --tone 은 다크 테마에서 배경에 묻혀서, 두 테마 모두 보이는 --ink-2 를 쓴다
const CONFETTI_COLORS = ['var(--key)', 'var(--sub)', 'var(--key-hover)', 'var(--ink-2)']
const PIECES = 16

const between = (min: number, max: number) => min + Math.random() * (max - min)

/** 위쪽 부채꼴로 흩어졌다가 조금 떨어지며 사라지는 조각들. 하트 가운데에서 출발한다 */
function makePieces() {
  return Array.from({ length: PIECES }, (_, index) => {
    // -170° ~ -10° (위쪽 반원)에 고르게 나눈 뒤 조금씩 흔든다
    const angle = ((-170 + (160 * index) / (PIECES - 1) + between(-6, 6)) * Math.PI) / 180
    const distance = between(26, 52)
    const round = index % 3 === 0
    return {
      x: Math.cos(angle) * distance,
      y: Math.sin(angle) * distance,
      fall: between(14, 28),
      rotate: between(-240, 240),
      delay: between(0, 0.06),
      color: CONFETTI_COLORS[index % CONFETTI_COLORS.length],
      width: round ? 5 : 4,
      height: round ? 5 : 7,
      radius: round ? '50%' : '1px'
    }
  })
}

function Confetti() {
  const [pieces] = useState(makePieces)

  return (
    <span aria-hidden="true" className="pointer-events-none absolute top-1/2 left-1/2 z-10">
      {pieces.map((piece, index) => (
        <motion.span
          key={index}
          className="absolute block"
          style={{
            width: piece.width,
            height: piece.height,
            left: -piece.width / 2,
            top: -piece.height / 2,
            borderRadius: piece.radius,
            backgroundColor: piece.color
          }}
          initial={{ x: 0, y: 0, opacity: 1, rotate: 0, scale: 0.5 }}
          animate={{ x: piece.x * 1.2, y: [0, piece.y, piece.y + piece.fall], opacity: [1, 1, 0], rotate: piece.rotate, scale: 1 }}
          transition={{
            duration: 0.9,
            delay: piece.delay,
            ease: [0.2, 0.7, 0.4, 1],
            // 솟을 때는 감속, 떨어질 때는 가속해 중력처럼 보이게
            y: { duration: 0.9, delay: piece.delay, times: [0, 0.45, 1], ease: ['easeOut', 'easeIn'] },
            opacity: { duration: 0.9, delay: piece.delay, times: [0, 0.65, 1] }
          }}
        />
      ))}
    </span>
  )
}
