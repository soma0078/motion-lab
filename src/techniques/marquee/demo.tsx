
import { useLoop } from '../_shared'
import { cn } from '../../lib/utils'

const MARQUEE_WORDS = ['STAGGER', 'EASING', 'SPRING', 'OVERSHOOT', 'PARALLAX']

export default function Marquee() {
  const scope = useLoop(async (animate) => {
    // 재생 시간 ↓ 더 빠르게 흐름
    await Promise.all([
      animate(
        '.row-a',
        { x: ['0%', '-50%'] },
        { duration: 12, ease: 'linear', repeat: Infinity }
      ),
      animate(
        '.row-b',
        { x: ['-50%', '0%'] },
        { duration: 16, ease: 'linear', repeat: Infinity }
      )
    ])
  })

  const row = (name: string) => (
    <div className={cn(name, 'flex w-max')}>
      {[0, 1].map((copy) => (
        <div key={copy} className="flex shrink-0">
          {MARQUEE_WORDS.map((word) => (
            <span key={word} className="px-3 text-xl font-extrabold">
              {word} ✱
            </span>
          ))}
        </div>
      ))}
    </div>
  )

  return (
    <div
      ref={scope}
      className="absolute inset-x-0 top-9 bottom-4 flex flex-col justify-center gap-2 overflow-hidden"
    >
      {row('row-a')}
      <div className="bg-nb-yellow border-y-2 border-black py-1">
        {row('row-b')}
      </div>
    </div>
  )
}
