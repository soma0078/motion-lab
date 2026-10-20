
import { useLoop } from '../_shared'
import { cn } from '../../lib/utils'

// 같은 폭 레이어라 속도비 = 재생 시간의 역수 (25s · 10s · 5s → 0.2× · 0.5× · 1×)
const PARALLAX_LAYERS = [
  {
    name: 'far',
    duration: 25,
    heights: [34, 52, 28, 46, 60, 38, 44, 30],
    className: 'bg-nb-line w-6'
  },
  {
    name: 'mid',
    duration: 10,
    heights: [56, 80, 48, 70, 62],
    className: 'bg-nb-blue w-7 border-2 border-b-0 border-black'
  },
  {
    name: 'near',
    duration: 5,
    heights: [72, 72, 72, 72],
    className: 'bg-black w-2.5'
  }
]

export default function Parallax() {
  const scope = useLoop(async (animate) => {
    await Promise.all(
      PARALLAX_LAYERS.map(({ name, duration }) =>
        animate(
          `.${name}`,
          { x: ['0%', '-50%'] },
          { duration, ease: 'linear', repeat: Infinity }
        )
      )
    )
  })

  return (
    <div ref={scope} className="absolute inset-0 overflow-hidden">
      {PARALLAX_LAYERS.map(({ name, heights, className }) => (
        // 같은 줄 두 번. -50%까지 가면 처음과 같은 장면
        <div
          key={name}
          className={cn(name, 'absolute bottom-3 left-0 flex w-[200%]')}
        >
          {[0, 1].map((copy) => (
            <div key={copy} className="flex w-1/2 items-end justify-around">
              {heights.map((height, index) => (
                <div key={index} className={className} style={{ height }} />
              ))}
            </div>
          ))}
        </div>
      ))}
      <div className="bg-nb-bg absolute inset-x-0 bottom-0 h-3 border-t-2 border-black" />
    </div>
  )
}
