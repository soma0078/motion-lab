
import { COLOR, EASE_OUT_QUART, useLoop, wait } from '../_shared'

export default function FilterColor() {
  const scope = useLoop(async (animate) => {
    await animate('.blurred', { filter: 'blur(10px)', opacity: 0 }, { duration: 0 })
    await animate('.swatch', { backgroundColor: COLOR.blue, filter: 'grayscale(1)' }, { duration: 0 })
    await wait(300)
    // blur 는 비쌈 → 작은 요소 · 짧게
    await animate('.blurred', { filter: 'blur(0px)', opacity: 1 }, { duration: 0.7, ease: EASE_OUT_QUART })
    await animate('.swatch', { filter: 'grayscale(0)' }, { duration: 0.5 })
    await animate('.swatch', { backgroundColor: [COLOR.blue, COLOR.yellow, COLOR.orange, COLOR.green] }, { duration: 1.6, ease: 'linear' })
    await wait(700)
  })

  return (
    <div ref={scope} className="absolute inset-0 flex items-center justify-center gap-6 pt-6">
      <span className="blurred text-3xl font-extrabold">BLUR</span>
      <span className="swatch size-14 border-2 border-black" />
    </div>
  )
}
