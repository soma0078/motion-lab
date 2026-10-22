import { motion, useMotionValue } from 'motion/react'

import { useLoop, wait } from '../_shared'
import { Cursor } from '../_shared/ui'
import type { DemoProps } from '../types'

// 프레임 높이 132px 기준. 시트 맨 위 y 좌표 (작을수록 높이 올라옴)
const SNAP = { peek: 99, half: 66, full: 13 }

const SNAPS = [
  { label: '90%', y: SNAP.full },
  { label: '50%', y: SNAP.half },
  { label: '25%', y: SNAP.peek }
]

export default function BottomSheet({ params }: DemoProps) {
  const y = useMotionValue(SNAP.peek)

  const scope = useLoop(async (animate) => {
    const settle = (to: number) =>
      animate(y, to, { type: 'spring', stiffness: params.stiffness, damping: params.damping, mass: 1 })

    await animate(y, SNAP.peek, { duration: 0 })
    await animate('.cursor', { opacity: 1 }, { duration: 0.2 })
    await wait(250)
    // peek → half 근처까지 끌고 놓음 → 가까운 half 로 붙음
    await animate(y, 76, { duration: 0.6, ease: 'easeInOut' })
    await animate('.cursor', { opacity: 0 }, { duration: 0.15 })
    await settle(SNAP.half)
    await wait(500)
    await animate('.cursor', { opacity: 1 }, { duration: 0.15 })
    await animate(y, 32, { duration: 0.6, ease: 'easeInOut' })
    await animate('.cursor', { opacity: 0 }, { duration: 0.15 })
    await settle(SNAP.full)
    await wait(700)
    await animate('.cursor', { opacity: 1 }, { duration: 0.15 })
    await animate(y, 88, { duration: 0.7, ease: 'easeInOut' })
    await animate('.cursor', { opacity: 0 }, { duration: 0.15 })
    await settle(SNAP.peek)
    await wait(600)
  })

  return (
    <div ref={scope} className="absolute inset-0">
      <div className="absolute top-7 bottom-0 left-1/2 w-40 -translate-x-1/2 overflow-hidden rounded-t-xl border-x-2 border-t-2 border-black bg-white">
        <motion.div
          className="bg-nb-blue absolute inset-x-0 top-0 h-full border-t-2 border-black"
          style={{ y }}
        >
          <div className="mx-auto mt-1.5 h-1 w-8 rounded-full bg-black" />
          <div className="cursor absolute top-0.5 left-[62%] opacity-0">
            <Cursor />
          </div>
        </motion.div>
      </div>
      {SNAPS.map((snap) => (
        <div
          key={snap.label}
          className="pointer-events-none absolute left-[calc(50%+88px)] flex items-center gap-1 font-mono text-[10px] font-bold"
          style={{ top: 28 + snap.y - 7 }}
        >
          <span className="w-4 border-t-2 border-dashed border-black/60" />
          {snap.label}
        </div>
      ))}
    </div>
  )
}
