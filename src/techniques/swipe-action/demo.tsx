import { motion, useMotionValue } from 'motion/react'

import { useLoop, wait } from '../_shared'
import { Cursor } from '../_shared/ui'
import type { DemoProps } from '../types'

const ACTION_WIDTH = 80
const DRAG = 50

export default function SwipeAction({ params }: DemoProps) {
  const x = useMotionValue(0)

  const scope = useLoop(async (animate) => {
    await animate(x, 0, { duration: 0 })
    await animate('.cursor', { opacity: 1 }, { duration: 0.2 })
    await wait(300)
    await animate(x, -DRAG, { duration: 0.7, ease: 'easeInOut' })
    await wait(250)
    await animate('.cursor', { opacity: 0 }, { duration: 0.2 })
    // 기준을 넘겼으면 버튼 너비만큼 열린 채 멈추고, 아니면 닫힘
    if (DRAG >= params.threshold) {
      await animate(x, -ACTION_WIDTH, { type: 'spring', stiffness: 400, damping: 36 })
      await wait(1100)
      await animate(x, 0, { type: 'spring', stiffness: 400, damping: 36 })
    } else {
      await animate(x, 0, { type: 'spring', stiffness: 400, damping: 36 })
    }
    await wait(600)
  })

  return (
    <div ref={scope} className="absolute inset-0">
      <div className="absolute top-[46px] right-[8%] left-[8%] h-12 overflow-hidden border-2 border-black bg-white">
        <div className="bg-nb-orange absolute inset-y-0 right-0 flex w-20 items-center justify-center border-l-2 border-black text-xs font-extrabold">
          삭제
        </div>
        <motion.div className="absolute inset-0 flex items-center bg-white px-3" style={{ x }}>
          <span className="text-xs font-extrabold">새 메시지 · 안녕하세요</span>
          <div className="cursor absolute top-1/2 right-5 opacity-0">
            <Cursor />
          </div>
        </motion.div>
        {/* 놓았을 때 열리는 기준. 오른쪽 끝에서 threshold 만큼, 위아래 눈금으로 표시 */}
        <div className="pointer-events-none absolute top-0 h-2 border-l-2 border-black" style={{ right: params.threshold }} />
        <div className="pointer-events-none absolute bottom-0 h-2 border-l-2 border-black" style={{ right: params.threshold }} />
      </div>
    </div>
  )
}
