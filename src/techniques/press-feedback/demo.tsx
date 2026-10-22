import { motion, useMotionValue } from 'motion/react'

import { useLoop, wait } from '../_shared'
import { Cursor } from '../_shared/ui'
import type { DemoProps } from '../types'

export default function PressFeedback({ params }: DemoProps) {
  const scale = useMotionValue(1)

  const scope = useLoop(async (animate) => {
    await animate(scale, 1, { duration: 0 })
    await animate('.cursor', { opacity: 1 }, { duration: 0.2 })
    await wait(400)
    await animate(scale, params.scale, { duration: 0.1, ease: 'easeOut' })
    await wait(450)
    await animate('.cursor', { opacity: 0 }, { duration: 0.2 })
    await animate(scale, 1, { type: 'spring', stiffness: 400, damping: 12 })
    await wait(900)
  })

  return (
    <div ref={scope} className="absolute inset-0 flex items-center justify-center pt-5">
      <motion.div
        className="bg-nb-yellow shadow-nb-sm relative flex h-11 w-40 items-center justify-center border-2 border-black text-sm font-extrabold"
        style={{ scale }}
      >
        장바구니 담기
        <div className="cursor absolute right-3 -bottom-1 opacity-0">
          <Cursor />
        </div>
      </motion.div>
    </div>
  )
}
