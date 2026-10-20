import { motion, useMotionValue, useSpring, useTransform, type ValueAnimationTransition } from 'motion/react'

import { useLoop, wait } from '../_shared'
import { Cursor } from '../_shared/ui'
import type { DemoProps } from '../types'

export default function Magnetic({ params }: DemoProps) {
  const cursorX = useMotionValue(-200)
  const cursorY = useMotionValue(40)
  const range = params.range
  const near = () => Math.hypot(cursorX.get(), cursorY.get()) < range
  const pullX = useTransform(() => (near() ? cursorX.get() * params.pull : 0))
  const pullY = useTransform(() => (near() ? cursorY.get() * params.pull : 0))
  // damping ↓ 제자리를 더 크게 넘었다 돌아옴
  const spring = { stiffness: params.stiffness, damping: params.damping, mass: 0.6 }
  const buttonX = useSpring(pullX, spring)
  const buttonY = useSpring(pullY, spring)

  const scope = useLoop(async (animate) => {
    const path: ValueAnimationTransition = {
      duration: 3,
      times: [0, 0.3, 0.55, 0.75, 1],
      ease: 'easeInOut'
    }
    await Promise.all([
      animate(cursorX, [-200, -40, 20, 30, 200], path),
      animate(cursorY, [40, 10, -10, 12, -40], path)
    ])
    await wait(400)
  })

  return (
    <div ref={scope} className="absolute inset-0 overflow-hidden">
      <div className="absolute top-[58%] left-1/2 size-0">
        <div
          className="border-nb-line absolute rounded-full border-2 border-dashed"
          style={{
            left: -range,
            top: -range,
            width: range * 2,
            height: range * 2
          }}
        />
        <motion.div
          className="bg-nb-blue shadow-nb-sm absolute -top-5 -left-12 grid h-10 w-24 place-items-center rounded-[5px] border-2 border-black text-xs font-extrabold"
          style={{ x: buttonX, y: buttonY }}
        >
          BUTTON
        </motion.div>
        <motion.div
          className="absolute top-0 left-0"
          style={{ x: cursorX, y: cursorY }}
        >
          <Cursor />
        </motion.div>
      </div>
    </div>
  )
}
