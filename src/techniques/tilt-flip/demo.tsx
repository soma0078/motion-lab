import { motion, useMotionValue, useSpring, useTransform } from 'motion/react'

import { EASE_OUT_QUART, useLoop, wait } from '../_shared'
import { cn } from '../../lib/utils'
import type { DemoProps } from '../types'

export default function Tilt3D({ params }: DemoProps) {
  const pointerX = useMotionValue(0)
  const pointerY = useMotionValue(0)
  const rotateY = useSpring(useTransform(pointerX, [-1, 1], [-params.angle, params.angle]), { stiffness: 200, damping: 20 })
  const rotateX = useSpring(useTransform(pointerY, [-1, 1], [params.angle, -params.angle]), { stiffness: 200, damping: 20 })

  const scope = useLoop(async (animate) => {
    await animate('.flip', { rotateY: 0 }, { duration: 0 })
    await Promise.all([
      animate(pointerX, [0, -1, 1, 0.6, 0], { duration: 2.2, ease: 'easeInOut' }),
      animate(pointerY, [0, -0.8, 0.6, -0.4, 0], { duration: 2.2, ease: 'easeInOut' })
    ])
    // 플립: 앞뒤 면 모두 backface-visibility hidden
    await animate('.flip', { rotateY: 180 }, { duration: 0.6, ease: EASE_OUT_QUART })
    await wait(900)
  })

  const face = 'absolute inset-0 grid place-items-center border-2 border-black text-xs font-extrabold [backface-visibility:hidden]'

  return (
    <div ref={scope} className="absolute inset-0 grid place-items-center pt-6">
      <motion.div className="h-20 w-32" style={{ rotateX, rotateY, transformPerspective: params.perspective }}>
        <div className="flip relative size-full [transform-style:preserve-3d]">
          <div className={cn(face, 'bg-nb-blue shadow-nb-sm')}>FRONT</div>
          <div className={cn(face, 'bg-nb-yellow [transform:rotateY(180deg)]')}>BACK</div>
        </div>
      </motion.div>
    </div>
  )
}
