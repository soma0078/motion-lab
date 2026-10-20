import { motion, useMotionValue } from 'motion/react'

import { useLoop, wait } from '../_shared'
import { Cursor } from '../_shared/ui'
import type { DemoProps } from '../types'

// 벽 위치 (px). 넘으면 bounce 로 튕겨 돌아옴
const INERTIA_MAX = 150

export default function Inertia({ params }: DemoProps) {
  const x = useMotionValue(0)
  const pointerX = useMotionValue(-30)

  const scope = useLoop(async (animate) => {
    x.jump(0)
    pointerX.jump(-30)
    await wait(400)
    // 짧고 빠르게 끌어서 던짐
    await Promise.all([
      animate(pointerX, 10, { duration: 0.15, ease: 'linear' }),
      animate(x, 40, { duration: 0.15, ease: 'linear' })
    ])
    // 놓은 뒤: 던진 속도로 감속. power ↑ 더 멀리 · timeConstant ↑ 더 오래 미끄러짐
    void animate(pointerX, -30, { duration: 0.4 })
    await animate(x, 0, { type: 'inertia', velocity: 900, power: params.power, timeConstant: params.timeConstant, max: INERTIA_MAX, bounceStiffness: 400, bounceDamping: 18 })
    await wait(700)
  })

  return (
    <div ref={scope} className="absolute inset-x-6 top-9 bottom-4 flex items-center">
      <div className="relative h-12 flex-1">
        <div className="bg-nb-line absolute inset-x-0 top-1/2 h-0.5" />
        <div className="absolute top-0 h-full w-1 bg-black" style={{ left: INERTIA_MAX + 40 }} />
        <motion.div className="bg-nb-green absolute top-1 size-10 rounded-full border-2 border-black" style={{ x }} />
        <motion.div className="absolute top-6 left-4" style={{ x: pointerX }}>
          <Cursor />
        </motion.div>
      </div>
    </div>
  )
}
