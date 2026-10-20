import { motion, useMotionValue, useTransform } from 'motion/react'

import { useLoop, wait } from '../_shared'
import type { DemoProps } from '../types'

export default function Spring({ params }: DemoProps) {
  const pull = useMotionValue(0)
  // 줄 길이 = 기본 + 당긴 거리. 블록은 줄 끝에 매달림
  const rope = useTransform(pull, (value) => 26 + value)

  const scope = useLoop(async (animate) => {
    await animate(pull, 44, { duration: 0.6, ease: 'easeInOut' })
    await wait(250)
    // damping ↓ 더 출렁 · stiffness ↑ 더 빠르게 되돌아옴
    await animate(pull, 0, {
      type: 'spring',
      stiffness: params.stiffness,
      damping: params.damping,
      mass: 0.6
    })
    await wait(700)
  })

  return (
    <div ref={scope} className="absolute inset-0 pt-7">
      <div className="mx-auto h-2 w-14 bg-black" />
      <motion.div style={{ height: rope }} className="mx-auto w-0.5 bg-black" />
      <div className="bg-nb-blue mx-auto size-10 border-2 border-black" />
    </div>
  )
}
