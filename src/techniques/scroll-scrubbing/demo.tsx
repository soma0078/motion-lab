import { motion, useMotionValue, useTransform } from 'motion/react'

import { useLoop, wait } from '../_shared'

export default function Scrubbing() {
  const progress = useMotionValue(0)
  const thumbY = useTransform(progress, [0, 1], ['0%', '300%'])
  const boxX = useTransform(progress, [0, 1], ['0%', '100%'])
  const rotate = useTransform(progress, [0, 1], [0, 180])

  const scope = useLoop(async (animate) => {
    await animate(progress, 0.45, { duration: 0.9, ease: 'easeInOut' })
    // 스크롤이 멈추면 모션도 중간에 멈춤
    await wait(700)
    await animate(progress, 1, { duration: 0.7, ease: 'easeInOut' })
    await wait(500)
    await animate(progress, 0, { duration: 1.1, ease: 'easeInOut' })
    await wait(400)
  })

  return (
    <div ref={scope} className="absolute inset-x-8 top-9 bottom-4 flex gap-5">
      <div className="flex flex-1 flex-col justify-center gap-4">
        <div className="h-3 border-2 border-black">
          <motion.div
            className="bg-nb-green h-full origin-left"
            style={{ scaleX: progress }}
          />
        </div>
        <div className="relative mr-8 h-8">
          <motion.div className="absolute inset-0" style={{ x: boxX }}>
            <motion.div
              className="bg-nb-blue size-8 border-2 border-black"
              style={{ rotate }}
            />
          </motion.div>
        </div>
      </div>
      {/* 스크롤바: thumb 높이 25%라 300% 옮기면 바닥 */}
      <div className="w-3 border-2 border-black">
        <motion.div className="h-1/4 bg-black" style={{ y: thumbY }} />
      </div>
    </div>
  )
}
