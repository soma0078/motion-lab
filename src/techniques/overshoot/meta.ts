import type { TechniqueMeta } from '../types'

export default {
  name: '오버슈트',
  english: 'overshoot',
  meaning: '목표 지점을 살짝 넘었다가 돌아옴',
  section: 'timing',
  order: 30,
  param: 'backOut',
  motion: [
    'ease: \'backOut\''
  ],
  gsap: [
    'ease: \'back.out(1.7)\''
  ],
  fit: 'both',
  docs: { motion: 'https://motion.dev/docs/react-transitions', gsap: 'https://gsap.com/docs/v3/Eases' },
  params: [
    { key: 'amount', label: '넘는 정도', min: 0, max: 1, step: 0.05, default: 0.55, effect: '목표를 넘어가는 정도예요. 0이면 넘지 않고 멈추고, 클수록 크게 지나쳤다 돌아와요. 곡선의 두 번째 값(1 + 넘는 정도)이 바뀌어요.' }
  ],
  prompt: (v) => `오버슈트(overshoot)로 목표를 살짝 넘었다 돌아오게 해. 곡선은 cubic-bezier(0.34, ${(1 + v.amount).toFixed(2)}, 0.64, 1), 길이는 0.9s로 해.`,
  snippet: {
    motion: (v) => `transition={{ duration: 0.9, ease: [0.34, ${(1 + v.amount).toFixed(2)}, 0.64, 1] }}`,
    gsap: (v) => `{ duration: 0.9, ease: 'back.out(${(v.amount * 3).toFixed(1)})' } (근사)`
  }
} satisfies TechniqueMeta
