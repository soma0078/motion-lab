
import { useLoop, wait } from '../_shared'

// 240 × 90 박스 기준 경로. SVG 선과 offset-path 가 같은 값을 씀
const MOTION_PATH = 'M 10 70 C 60 -10, 110 110, 150 40 S 220 10, 230 60'

export default function MotionPath() {
  const scope = useLoop(async (animate) => {
    await animate('.rider', { offsetDistance: '0%' }, { duration: 0 })
    await wait(300)
    await animate('.rider', { offsetDistance: '100%' }, { duration: 1.8, ease: 'easeInOut' })
    await wait(700)
  })

  return (
    <div ref={scope} className="absolute inset-0 grid place-items-center pt-6">
      <div className="relative h-[90px] w-[240px]">
        <svg viewBox="0 0 240 90" className="absolute inset-0 overflow-visible">
          <path d={MOTION_PATH} fill="none" stroke="var(--nb-line)" strokeWidth={2} strokeDasharray="5 5" />
        </svg>
        {/* offsetRotate auto: 진행 방향으로 회전 (GSAP autoRotate) */}
        <div
          className="rider bg-nb-purple absolute top-0 left-0 h-3 w-5 border-2 border-black"
          style={{ offsetPath: `path('${MOTION_PATH}')`, offsetRotate: 'auto', offsetDistance: '0%' }}
        />
      </div>
    </div>
  )
}
