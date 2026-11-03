import { motion, useMotionValue } from 'motion/react'

import { useLoop, wait } from '../_shared'
import { Cursor } from '../_shared/ui'
import type { DemoProps } from '../types'

export default function LongPressMenu({ params }: DemoProps) {
  const scale = useMotionValue(1)

  const scope = useLoop(async (animate) => {
    await animate(scale, 1, { duration: 0 })
    await animate('.progress', { scaleX: 0 }, { duration: 0 })
    await animate('.menu', { opacity: 0, scale: 0.85 }, { duration: 0 })
    await animate('.cursor', { opacity: 1 }, { duration: 0.2 })
    await wait(300)
    // 누르는 시간 동안 게이지가 참
    await animate('.progress', { scaleX: 1 }, { duration: params.minDuration / 1000, ease: 'linear' })
    await Promise.all([
      animate(scale, 1.05, { type: 'spring', stiffness: 400, damping: 20 }),
      animate('.menu', { opacity: 1, scale: 1 }, { type: 'spring', stiffness: 400, damping: 24 })
    ])
    await animate('.cursor', { opacity: 0 }, { duration: 0.2 })
    await wait(1200)
  })

  return (
    <div ref={scope} className="absolute inset-0">
      <motion.div
        className="bg-surface shadow-raised-sm absolute top-[46px] left-[10%] h-14 w-[46%] overflow-hidden border-[1.5px] border-ink"
        style={{ scale }}
      >
        <div className="flex h-full items-center gap-2 px-3">
          <span className="paint-tone size-5 rounded-full border-[1.5px] border-ink" />
          <span className="text-xs font-extrabold">사진 1</span>
        </div>
        <div className="progress paint-key absolute inset-x-0 bottom-0 h-1.5 origin-left border-t-[1.5px] border-ink" />
        <div className="cursor absolute top-1/2 right-3 opacity-0">
          <Cursor />
        </div>
      </motion.div>
      <div className="menu bg-surface shadow-raised-sm absolute top-[46px] left-[62%] w-[28%] origin-left border-[1.5px] border-ink text-[11px] font-extrabold opacity-0">
        <p className="border-b-[1.5px] border-ink px-2 py-1">복사</p>
        <p className="px-2 py-1">삭제</p>
      </div>
    </div>
  )
}
