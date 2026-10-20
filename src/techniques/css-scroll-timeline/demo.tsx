import { useRef } from 'react'
import { useMotionValue, useMotionValueEvent } from 'motion/react'

import { useLoop, wait } from '../_shared'
import './demo.css'

const LINES = [70, 50, 85, 60, 75, 45, 80, 55, 65, 90, 50, 70]

/** 진짜 CSS scroll-driven animation. JS 는 스크롤만 움직이고, 막대는 animation-timeline 이 그림 */
export default function CssScrollTimeline() {
  const box = useRef<HTMLDivElement>(null)
  const scroll = useMotionValue(0)
  useMotionValueEvent(scroll, 'change', (value) => {
    if (box.current) box.current.scrollTop = value
  })

  const scope = useLoop(async (animate) => {
    const max = box.current ? box.current.scrollHeight - box.current.clientHeight : 0
    await animate(scroll, max, { duration: 1.8, ease: 'easeInOut' })
    await wait(500)
    await animate(scroll, 0, { duration: 0.8, ease: 'easeInOut' })
    await wait(400)
  })

  return (
    <div ref={scope} className="css-scroll-root absolute inset-x-8 top-9 bottom-4 flex flex-col gap-2">
      <div className="h-3 border-2 border-black">
        <div className="css-scroll-bar bg-nb-green h-full origin-left" />
      </div>
      <div ref={box} className="css-scroll-box flex-1 overflow-hidden border-2 border-black">
        <div className="space-y-2 p-2">
          {LINES.map((width, index) => (
            <div key={index} className="bg-nb-line h-2" style={{ width: `${width}%` }} />
          ))}
        </div>
      </div>
    </div>
  )
}
