
import { DOT, EASE_OUT_QUART, useLoop, wait } from '../_shared'
import { cn } from '../../lib/utils'
import type { DemoProps } from '../types'

export default function Easing({ params }: DemoProps) {
  const scope = useLoop(async (animate) => {
    await animate('.mover', { x: '0%' }, { duration: 0 })
    await wait(500)
    await Promise.all([
      animate('.linear', { x: '100%' }, { duration: params.duration, ease: 'linear' }),
      animate('.eased', { x: '100%' }, { duration: params.duration, ease: EASE_OUT_QUART })
    ])
    await wait(800)
  })

  return (
    <div
      ref={scope}
      className="absolute inset-0 flex flex-col justify-center gap-4 px-8 pt-6"
    >
      {[
        ['linear', 'linear'],
        ['ease-out', 'eased']
      ].map(([label, name]) => (
        <div key={name}>
          <span className="text-nb-muted font-mono text-[10px] font-bold">
            {label}
          </span>
          {/* 오른쪽 여백 = 점 크기. mover를 100% 옮기면 끝에 닿음 */}
          <div className="relative mt-1 mr-4 h-4">
            <div className="border-nb-line absolute top-1/2 -right-4 left-0 -translate-y-1/2 border-t-2 border-dashed" />
            <div className={cn('mover absolute inset-0', name)}>
              <span className={cn(DOT, name === 'linear' && 'bg-white')} />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
