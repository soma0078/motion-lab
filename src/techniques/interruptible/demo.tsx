import { motion, useMotionValue } from 'motion/react'

import { useLoop, wait } from '../_shared'
import type { DemoProps } from '../types'

const FAR = 90

export default function Interruptible({ params }: DemoProps) {
  const x = useMotionValue(-FAR)

  const scope = useLoop(async (animate) => {
    const spring = { type: 'spring', stiffness: params.stiffness, damping: params.damping } as const
    await animate(x, -FAR, { duration: 0 })
    await wait(400)
    // 1번 탭: 오른쪽으로 출발
    void animate('.tap1', { opacity: [1, 0] }, { duration: 0.6 })
    void animate(x, FAR, spring)
    await wait(260)
    // 2번 탭: 도착 전에 왼쪽으로 방향 전환. 현재 위치에서 이어서 감
    void animate('.tap2', { opacity: [1, 0] }, { duration: 0.6 })
    await animate(x, -FAR, spring)
    await wait(900)
  })

  return (
    <div ref={scope} className="absolute inset-0">
      <div className="absolute top-[88px] right-[10%] left-[10%] border-t-2 border-dashed border-black/50" />
      <span className="tap2 absolute top-[56px] left-[10%] border-2 border-black bg-white px-1 font-mono text-[10px] font-bold opacity-0">
        탭 2
      </span>
      <span className="tap1 absolute top-[56px] right-[10%] border-2 border-black bg-white px-1 font-mono text-[10px] font-bold opacity-0">
        탭 1
      </span>
      <div className="absolute top-[88px] left-1/2 size-0">
        <motion.div className="bg-nb-orange absolute -top-4 -left-4 size-8 rounded-full border-2 border-black" style={{ x }} />
      </div>
    </div>
  )
}
