import { motion, useMotionValue } from 'motion/react'

import { useLoop, wait } from '../_shared'
import { Cursor } from '../_shared/ui'
import type { DemoProps } from '../types'

const SPRING = { type: 'spring', stiffness: 400, damping: 36 } as const

export default function PullToRefresh({ params }: DemoProps) {
  const y = useMotionValue(0)

  const scope = useLoop(async (animate) => {
    await animate(y, 0, { duration: 0 })
    await animate('.spinner', { opacity: 0, rotate: 0 }, { duration: 0 })
    await animate('.cursor', { opacity: 1 }, { duration: 0.2 })
    await wait(250)
    await animate(y, 56, { duration: 0.7, ease: 'easeOut' })
    await animate('.spinner', { opacity: 1 }, { duration: 0.15 })
    await animate('.cursor', { opacity: 0 }, { duration: 0.15 })
    // 놓으면 로딩 높이에 머물며 인디케이터가 돎
    await animate(y, 40, SPRING)
    await animate('.spinner', { rotate: 720 }, { duration: 1.4, ease: 'linear' })
    await Promise.all([animate(y, 0, SPRING), animate('.spinner', { opacity: 0 }, { duration: 0.2 })])
    await wait(700)
  })

  return (
    <div ref={scope} className="absolute inset-0">
      <div className="absolute top-8 right-[8%] bottom-3 left-[8%] overflow-hidden border-2 border-black bg-white">
        <div
          className="spinner absolute left-1/2 size-5 -translate-x-1/2 rounded-full border-[3px] border-black border-t-transparent opacity-0"
          style={{ top: 8 + params.offset }}
        />
        <motion.div className="absolute inset-0 bg-white" style={{ y }}>
          {[0, 1, 2, 3].map((row) => (
            <div key={row} className="flex h-9 items-center gap-2 border-b-2 border-black px-3">
              <span className="bg-nb-blue size-4 rounded-full border-2 border-black" />
              <span className="h-1.5 w-1/2 bg-black" />
            </div>
          ))}
          <div className="cursor absolute top-2 right-6 opacity-0">
            <Cursor />
          </div>
        </motion.div>
      </div>
    </div>
  )
}
