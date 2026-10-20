import { motion, useMotionValue, useTransform } from 'motion/react'

import { useLoop, wait } from '../_shared'

const PIN_LINES = [
  80, 64, 90, 72, 56, 84, 68, 92, 60, 76, 88, 52, 70, 82, 66, 58
]
// 고정 막대가 놓인 자리와 풀리는 스크롤 거리 (px)
const PIN_TOP = 26
const PIN_RELEASE = 96

export default function Pin() {
  const scroll = useMotionValue(0)
  const contentY = useTransform(scroll, (value) => -value)
  // 자리까지 올라오면 위에 붙고, 구간이 끝나면 다시 같이 올라감
  const pinY = useTransform(scroll, (value) =>
    value < PIN_TOP
      ? PIN_TOP - value
      : value < PIN_RELEASE
        ? 0
        : PIN_RELEASE - value
  )

  const scope = useLoop(async (animate) => {
    await animate(scroll, 190, { duration: 2.6, ease: 'linear' })
    await wait(500)
    await animate(scroll, 0, { duration: 0.8, ease: 'easeInOut' })
    await wait(400)
  })

  return (
    <div
      ref={scope}
      className="absolute inset-x-10 top-8 bottom-3 overflow-hidden border-2 border-black"
    >
      <motion.div className="space-y-2.5 px-3 pt-2" style={{ y: contentY }}>
        {PIN_LINES.map((width, index) => (
          <div
            key={index}
            className={index === 1 ? 'h-5' : 'bg-nb-line h-2'}
            style={index === 1 ? undefined : { width: `${width}%` }}
          />
        ))}
      </motion.div>
      <motion.div
        className="bg-nb-yellow absolute inset-x-3 top-0 h-5 border-2 border-black"
        style={{ y: pinY }}
      />
    </div>
  )
}
