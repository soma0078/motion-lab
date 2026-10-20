import { motion, useMotionValue, useTransform } from 'motion/react'

import { EASE_OUT_QUART, useLoop, wait } from '../_shared'
import type { DemoProps } from '../types'

const COUNT_TO = 1284

export default function CountUp({ params }: DemoProps) {
  const count = useMotionValue(0)
  const rounded = useTransform(count, (value) => Math.round(value).toLocaleString())
  const barScale = useTransform(count, [0, COUNT_TO], [0, 1])

  const scope = useLoop(async (animate) => {
    count.jump(0)
    await wait(300)
    // 끝에서 감속해야 숫자가 읽힘
    await animate(count, COUNT_TO, { duration: params.duration, ease: EASE_OUT_QUART })
    await wait(1200)
  })

  return (
    <div ref={scope} className="absolute inset-x-10 top-9 bottom-4 flex flex-col justify-center gap-3">
      <motion.span className="text-4xl font-extrabold tabular-nums">{rounded}</motion.span>
      <div className="h-3 border-2 border-black">
        <motion.div className="bg-nb-yellow h-full origin-left" style={{ scaleX: barScale }} />
      </div>
    </div>
  )
}
