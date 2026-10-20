
import { useLoop, wait } from '../_shared'
import type { DemoProps } from '../types'

export default function Overshoot({ params }: DemoProps) {
  const scope = useLoop(async (animate) => {
    await animate('.mover', { x: '0%' }, { duration: 0 })
    await wait(400)
    // 오버슈트 곡선: 두 번째 y 가 1 을 넘는 만큼 목표를 넘었다 돌아옴
    await animate('.mover', { x: '70%' }, { duration: 0.9, ease: [0.34, 1 + params.amount, 0.64, 1] })
    await wait(900)
    await animate('.mover', { x: '0%' }, { duration: 0.5, ease: 'easeInOut' })
  })

  return (
    <div ref={scope} className="absolute inset-0 flex items-center px-8 pt-6">
      <div className="relative mr-6 h-6 w-full">
        <div className="border-nb-line absolute top-1/2 -right-6 left-0 -translate-y-1/2 border-t-2 border-dashed" />
        {/* 목표 지점: 블록 중심이 70%에 오는 자리 */}
        <div className="absolute -top-4 -bottom-4 left-[calc(70%+12px)] border-l-2 border-dashed border-black" />
        <span className="absolute -top-9 left-[calc(70%+12px)] -translate-x-1/2 font-mono text-[10px] font-bold">
          target
        </span>
        <div className="mover absolute inset-0">
          <span className="bg-nb-blue block size-6 border-2 border-black" />
        </div>
      </div>
    </div>
  )
}
