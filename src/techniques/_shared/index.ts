import { useEffect, useEffectEvent, useRef, useState } from 'react'
import {
  useAnimate,
  useInView,
  useReducedMotion,
  type AnimationPlaybackControls
} from 'motion/react'

/**
 * 데모들이 같이 쓰는 루프 훅 · 토큰 · 작은 부품.
 * 데모는 카드 화면(h-40)을 꽉 채우는 absolute 블록 하나. 위 28px은 태그 자리라 비운다.
 */

export type Animate = ReturnType<typeof useAnimate>[1]

export const EASE_OUT_QUART = [0.25, 1, 0.5, 1] as const
// 색 보간용 (index.css 팔레트 값)
export const COLOR = {
  blue: '#88aaee',
  yellow: '#ffdc58',
  green: '#a3e636',
  orange: '#ff7a5c',
  surface: '#ffffff'
}
export const DOT = 'block size-4 rounded-full border-2 border-black bg-nb-blue'

export const wait = (ms: number) =>
  new Promise<void>((resolve) => setTimeout(resolve, ms))
const STOPPED = Symbol('stopped')

/** 화면에 보이는 동안만 run 반복. 동작 줄이기 설정이면 첫 장면에 멈춤 */
export const useLoop = (run: (animate: Animate) => Promise<void>) => {
  const [scope, animate] = useAnimate<HTMLDivElement>()
  const inView = useInView(scope, { amount: 0.3 })
  const reduced = useReducedMotion()
  // 최신 run을 부르되 run이 바뀌어도 루프는 다시 시작하지 않음
  const runOnce = useEffectEvent(run)

  useEffect(() => {
    if (!inView || reduced) return
    let alive = true
    const running = new Set<AnimationPlaybackControls>()

    // 화면을 벗어나거나 요소가 사라지면 (언마운트 · HMR) 다음 단계에서 멈춤
    const guarded = ((...args: unknown[]) => {
      if (!alive || !scope.current) throw STOPPED
      const controls = (
        animate as (...rest: unknown[]) => AnimationPlaybackControls
      )(...args)
      running.add(controls)
      void controls.finished.then(() => running.delete(controls))
      return controls
    }) as Animate

    const loop = async () => {
      try {
        while (alive) await runOnce(guarded)
      } catch (error) {
        if (error !== STOPPED) throw error
      }
    }
    void loop()

    return () => {
      alive = false
      running.forEach((controls) => controls.stop())
    }
    // Effect Event는 의존성에 넣지 않음 (react-hooks 5.x는 아직 이 훅을 모름)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, reduced, animate])

  return scope
}

/** 보이는 동안 ms마다 on 뒤집기. 상태로 그리는 데모용 */
export const useToggle = (ms: number) => {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { amount: 0.3 })
  const reduced = useReducedMotion()
  const [on, setOn] = useState(false)

  useEffect(() => {
    if (!inView || reduced) return
    const id = setInterval(() => setOn((value) => !value), ms)
    return () => clearInterval(id)
  }, [inView, reduced, ms])

  return [ref, on] as const
}

/** 보이는 동안 ms마다 0 → count-1 순환. 상태로 그리는 데모용 */
export const useStep = (ms: number, count: number) => {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { amount: 0.3 })
  const reduced = useReducedMotion()
  const [step, setStep] = useState(0)

  useEffect(() => {
    if (!inView || reduced) return
    const id = setInterval(() => setStep((value) => (value + 1) % count), ms)
    return () => clearInterval(id)
  }, [inView, reduced, ms, count])

  return [ref, step] as const
}
