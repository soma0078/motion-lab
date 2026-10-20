import { motion, useMotionValue, useSpring, useTransform, useVelocity } from 'motion/react'

import { useLoop, wait } from '../_shared'

const VELOCITY_LINES = [70, 50, 85, 60, 75, 45, 80, 55, 65, 90, 50, 70]

export default function VelocitySkew() {
  const scroll = useMotionValue(0)
  const contentY = useTransform(scroll, (value) => -value)
  const velocity = useVelocity(scroll)
  // 속도 (px/s) → 기울기. 범위 ↓ 더 민감
  const skewY = useSpring(useTransform(velocity, [-400, 400], [-10, 10], { clamp: true }), { stiffness: 300, damping: 30 })
  const meter = useTransform(velocity, [-400, 0, 400], [1, 0, 1], { clamp: true })

  const scope = useLoop(async (animate) => {
    scroll.jump(0)
    await wait(300)
    await animate(scroll, 30, { duration: 1, ease: 'easeInOut' })
    await animate(scroll, 160, { duration: 0.5, ease: 'easeInOut' })
    await wait(500)
    await animate(scroll, 0, { duration: 0.6, ease: 'easeInOut' })
    await wait(300)
  })

  return (
    <div ref={scope} className="absolute inset-x-8 top-9 bottom-4 flex gap-4">
      <div className="flex-1 overflow-hidden border-2 border-black">
        <motion.div className="space-y-2 p-3" style={{ y: contentY, skewY }}>
          {VELOCITY_LINES.map((width, index) => (
            <div key={index} className={index % 4 === 0 ? 'bg-nb-blue h-3 border-2 border-black' : 'bg-nb-line h-2'} style={{ width: `${width}%` }} />
          ))}
        </motion.div>
      </div>
      {/* 속도계 */}
      <div className="flex w-3 items-end border-2 border-black">
        <motion.div className="bg-nb-orange h-full w-full origin-bottom" style={{ scaleY: meter }} />
      </div>
    </div>
  )
}
