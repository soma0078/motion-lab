import { motion, useMotionValue, useTransform } from 'motion/react'

import { useLoop, wait } from '../_shared'
import type { DemoProps } from '../types'

const SCRAMBLE_TARGET = 'SCRAMBLE'
const SCRAMBLE_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ#%&*'

/** progress 0~1. 앞에서부터 확정, 나머지는 매 프레임 무작위 */
const scrambleAt = (progress: number) =>
  [...SCRAMBLE_TARGET]
    .map((char, index) =>
      index < Math.floor(progress * SCRAMBLE_TARGET.length)
        ? char
        : SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)]
    )
    .join('')

export default function ScrambleText({ params }: DemoProps) {
  const progress = useMotionValue(0)
  const text = useTransform(progress, scrambleAt)

  const scope = useLoop(async (animate) => {
    progress.jump(0)
    await wait(300)
    // 길이 ↑ 오래 뒤섞임 · linear 라 글자마다 같은 간격으로 확정
    await animate(progress, 1, { duration: params.duration, ease: 'linear' })
    await wait(1200)
  })

  return (
    <div ref={scope} className="absolute inset-0 grid place-items-center pt-6">
      <motion.span className="font-mono text-3xl font-extrabold tracking-widest">{text}</motion.span>
    </div>
  )
}
