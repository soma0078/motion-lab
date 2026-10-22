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
    { key: 'amount', label: '넘는 정도', min: 0, max: 1, step: 0.05, default: 0.55 }
  ],
  prompt: (v) => `목표를 살짝 넘었다 돌아오게. 오버슈트 곡선 cubic-bezier(0.34, ${(1 + v.amount).toFixed(2)}, 0.64, 1), 0.9s.`,
  snippet: {
    motion: (v) => `transition={{ duration: 0.9, ease: [0.34, ${(1 + v.amount).toFixed(2)}, 0.64, 1] }}`,
    gsap: (v) => `{ duration: 0.9, ease: 'back.out(${(v.amount * 3).toFixed(1)})' } (근사)`
  }
} satisfies TechniqueMeta
