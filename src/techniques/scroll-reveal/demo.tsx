import { motion, useMotionValue, useTransform } from 'motion/react'

import { EASE_OUT_QUART, useLoop, wait } from '../_shared'

const REVEAL_CARDS = [0, 1, 2, 3]
// 카드 간격 · 이 선을 넘으면 재생 (px)
const REVEAL_GAP = 44
const REVEAL_LINE = 92
// 스크롤 속도 (px/s)
const REVEAL_SPEED = 50

export default function ScrollReveal() {
  const scroll = useMotionValue(0)
  const contentY = useTransform(scroll, (value) => -value)

  const scope = useLoop(async (animate) => {
    scroll.jump(0)
    await animate('.card', { opacity: 0, y: 16 }, { duration: 0 })
    await wait(400)
    // 카드가 기준선을 넘는 스크롤 위치마다 재생 시작 (await 안 함). 진행은 카드 자기 시간
    for (const index of REVEAL_CARDS) {
      const crossAt = Math.max(0, 20 + index * REVEAL_GAP - REVEAL_LINE)
      const distance = crossAt - scroll.get()
      if (distance > 0) await animate(scroll, crossAt, { duration: distance / REVEAL_SPEED, ease: 'linear' })
      void animate(`.card-${index}`, { opacity: 1, y: 0 }, { duration: 0.45, ease: EASE_OUT_QUART })
    }
    await animate(scroll, 110, { duration: (110 - scroll.get()) / REVEAL_SPEED, ease: 'linear' })
    await wait(800)
  })

  return (
    <div ref={scope} className="absolute inset-x-10 top-8 bottom-3 overflow-hidden border-2 border-black">
      <motion.div className="relative h-full" style={{ y: contentY }}>
        {REVEAL_CARDS.map((index) => (
          <div
            key={index}
            className={`card card-${index} bg-nb-blue absolute inset-x-3 h-8 border-2 border-black opacity-0`}
            style={{ top: 20 + index * REVEAL_GAP }}
          />
        ))}
      </motion.div>
      {/* 재생 기준선 */}
      <div className="pointer-events-none absolute inset-x-0 border-t-2 border-dashed border-nb-orange" style={{ top: REVEAL_LINE }} />
    </div>
  )
}
