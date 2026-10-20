import { motion, useMotionValue, useTransform } from 'motion/react'

import { useLoop } from '../_shared'

// 300 × 80 기준 곡선. 글자가 이 위를 흐름
const TEXT_PATH = 'M 0 60 C 60 0, 120 0, 150 40 S 240 80, 300 20'

export default function TextOnPath() {
  const progress = useMotionValue(0)
  const startOffset = useTransform(progress, (value) => `${value}%`)

  const scope = useLoop(async (animate) => {
    await animate(progress, [-60, 100], { duration: 3.2, ease: 'linear' })
  })

  return (
    <div ref={scope} className="absolute inset-0 grid place-items-center pt-6">
      <svg viewBox="0 0 300 80" className="w-[260px] overflow-visible">
        <path id="text-path-demo" d={TEXT_PATH} fill="none" stroke="var(--nb-line)" strokeWidth={2} />
        <text className="fill-black text-[18px] font-extrabold">
          <motion.textPath href="#text-path-demo" startOffset={startOffset}>
            ON THE PATH →
          </motion.textPath>
        </text>
      </svg>
    </div>
  )
}
