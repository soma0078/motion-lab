import { motion, useMotionValue, useSpring, useTransform, type ValueAnimationTransition } from 'motion/react'

import { useLoop, wait } from '../_shared'
import type { DemoProps } from '../types'

// 버튼 영역 (커서 원점 기준 px)
const CURSOR_TARGET = { x: 40, y: 0, w: 70, h: 32 }

export default function CustomCursor({ params }: DemoProps) {
  const pointerX = useMotionValue(-120)
  const pointerY = useMotionValue(30)
  // 따라오는 원: spring ↓ stiffness 더 늦게 따라옴
  const followX = useSpring(pointerX, { stiffness: params.stiffness, damping: params.damping })
  const followY = useSpring(pointerY, { stiffness: params.stiffness, damping: params.damping })
  const over = useTransform((): number => {
    const dx = Math.abs(pointerX.get() - CURSOR_TARGET.x)
    const dy = Math.abs(pointerY.get() - CURSOR_TARGET.y)
    return dx < CURSOR_TARGET.w / 2 && dy < CURSOR_TARGET.h / 2 ? 1 : 0
  })
  const ringScale = useSpring(useTransform(over, [0, 1], [1, 2.4]), { stiffness: 300, damping: 22 })

  const scope = useLoop(async (animate) => {
    const path: ValueAnimationTransition = { duration: 3, times: [0, 0.35, 0.6, 1], ease: 'easeInOut' }
    await Promise.all([
      animate(pointerX, [-120, 40, 44, -120], path),
      animate(pointerY, [30, 0, 2, 30], path)
    ])
    await wait(300)
  })

  return (
    <div ref={scope} className="absolute inset-0 overflow-hidden">
      <div className="absolute top-[58%] left-1/2 size-0">
        <div
          className="absolute grid place-items-center border-2 border-black bg-white text-[10px] font-extrabold"
          style={{
            left: CURSOR_TARGET.x - CURSOR_TARGET.w / 2,
            top: CURSOR_TARGET.y - CURSOR_TARGET.h / 2,
            width: CURSOR_TARGET.w,
            height: CURSOR_TARGET.h
          }}
        >
          LINK
        </div>
        {/* 실제 커서는 숨기고 점 + 원으로 대신. pointer-events: none */}
        <motion.div className="pointer-events-none absolute -top-1 -left-1 size-2 rounded-full bg-black" style={{ x: pointerX, y: pointerY }} />
        <motion.div
          className="border-nb-orange pointer-events-none absolute -top-4 -left-4 size-8 rounded-full border-2 mix-blend-multiply"
          style={{ x: followX, y: followY, scale: ringScale }}
        />
      </div>
    </div>
  )
}
