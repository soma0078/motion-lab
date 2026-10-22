import { motion, useMotionValue } from 'motion/react'

import { useLoop, wait } from '../_shared'
import type { DemoProps } from '../types'

const SPAN = 200

export default function HapticSync({ params }: DemoProps) {
  const x = useMotionValue(0)
  const ticks = Array.from({ length: params.ticks }, (_, i) => i)

  const scope = useLoop(async (animate) => {
    await animate(x, 0, { duration: 0 })
    await animate('.tick', { scaleY: 1, backgroundColor: '#000000' }, { duration: 0 })
    await wait(500)
    const step = SPAN / (params.ticks - 1)
    for (let i = 1; i < params.ticks; i += 1) {
      await animate(x, step * i, { duration: 0.35, ease: 'linear' })
      // 눈금에 닿는 순간 튀는 것 = 햅틱이 나는 순간
      void animate(`.tick-${i}`, { scaleY: [1, 2.2, 1], backgroundColor: ['#000000', '#ff7a5c', '#000000'] }, { duration: 0.35 })
    }
    await wait(700)
    await animate(x, 0, { duration: 0.6, ease: 'easeInOut' })
    await wait(300)
  })

  return (
    <div ref={scope} className="absolute inset-0">
      <div className="absolute top-[88px] left-1/2 -translate-x-1/2" style={{ width: SPAN }}>
        <div className="absolute top-0 right-0 left-0 h-0 border-t-2 border-black" />
        {ticks.map((i) => (
          <div
            key={i}
            className={`tick tick-${i} absolute -top-2 h-4 w-0.5 bg-black`}
            style={{ left: (SPAN / (params.ticks - 1)) * i - 1 }}
          />
        ))}
        <motion.div
          className="bg-nb-yellow absolute -top-3 -left-3 size-6 rounded-full border-2 border-black"
          style={{ x }}
        />
      </div>
    </div>
  )
}
