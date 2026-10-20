import { motion, useMotionValue, useTransform } from 'motion/react'

import { useLoop, wait } from '../_shared'
import { Cursor } from '../_shared/ui'
import type { DemoProps } from '../types'

export default function RubberBand({ params }: DemoProps) {
  const cursorX = useMotionValue(0)
  const ballX = useMotionValue(0)
  const stretch = useTransform(ballX, [0, 90 * params.elastic], [1, 1.25])

  const scope = useLoop(async (animate) => {
    await animate(cursorX, 0, { duration: 0 })
    await animate('.cursor', { opacity: 1 }, { duration: 0.2 })
    await wait(300)
    await Promise.all([
      animate(cursorX, 90, { duration: 0.9, ease: 'easeInOut' }),
      animate(ballX, 90 * params.elastic, { duration: 0.9, ease: 'easeInOut' })
    ])
    await wait(250)
    // 놓으면 bounce로 복귀
    await Promise.all([
      animate(ballX, 0, { type: 'spring', stiffness: 400, damping: params.damping }),
      animate('.cursor', { opacity: 0 }, { duration: 0.3 })
    ])
    await wait(500)
  })

  return (
    <div ref={scope} className="absolute inset-0">
      <div className="absolute top-[58%] left-[38%] size-0">
        {/* 끌 수 있는 한계. 넘어간 만큼은 버팀 */}
        <div className="absolute -top-10 left-5 h-20 border-l-2 border-dashed border-black" />
        <span className="absolute -top-14 left-5 -translate-x-1/2 font-mono text-[10px] font-bold">
          limit
        </span>
        <motion.div
          className="bg-nb-blue absolute -top-5 -left-5 size-10 rounded-full border-2 border-black"
          style={{ x: ballX, scaleX: stretch, originX: 0 }}
        />
        <motion.div
          className="cursor absolute top-0 left-0"
          style={{ x: cursorX }}
        >
          <Cursor />
        </motion.div>
      </div>
    </div>
  )
}
