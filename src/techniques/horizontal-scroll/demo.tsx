import { motion, useMotionValue, useTransform } from 'motion/react'

import { useLoop, wait } from '../_shared'
import { cn } from '../../lib/utils'

const H_PANELS = ['bg-nb-blue', 'bg-nb-yellow', 'bg-nb-green', 'bg-nb-purple']

export default function HorizontalScroll() {
  const progress = useMotionValue(0)
  // 패널 4장 · 화면 1장 → 마지막이 보이려면 -75%
  const stripX = useTransform(progress, [0, 1], ['0%', '-75%'])
  const thumbY = useTransform(progress, [0, 1], ['0%', '300%'])

  const scope = useLoop(async (animate) => {
    await animate(progress, 1, { duration: 2.4, ease: 'easeInOut' })
    await wait(500)
    await animate(progress, 0, { duration: 0.9, ease: 'easeInOut' })
    await wait(400)
  })

  return (
    <div ref={scope} className="absolute inset-x-8 top-9 bottom-4 flex gap-4">
      <div className="flex-1 overflow-hidden border-2 border-black">
        <motion.div className="flex h-full w-[400%]" style={{ x: stripX }}>
          {H_PANELS.map((bg, index) => (
            <div key={bg} className="grid flex-1 place-items-center border-r-2 border-black last:border-r-0">
              <span className={cn('grid size-10 place-items-center border-2 border-black font-mono text-sm font-extrabold', bg)}>
                {index + 1}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
      {/* 세로 스크롤바: 세로로 내려도 가로로 흐름 */}
      <div className="w-3 border-2 border-black">
        <motion.div className="h-1/4 bg-black" style={{ y: thumbY }} />
      </div>
    </div>
  )
}
