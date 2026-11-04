import type { TechniqueMeta } from '../types'

export default {
  name: '진입 · 퇴장',
  english: 'enter · exit',
  meaning: '요소가 나타날 때 · 사라질 때의 모션',
  tags: ['올라오며 나타나는', '빠지며 사라지는'],
  section: 'transition',
  order: 20,
  param: 'in 0.4 · out 0.25',
  fit: 'motion',
  docs: { motion: 'https://motion.dev/docs/react-animate-presence', gsap: 'https://gsap.com/resources/React/' },
  params: [
    { key: 'enter', label: '진입', min: 0.1, max: 1, step: 0.05, default: 0.4, unit: 's', effect: '나타날 때 걸리는 시간이에요.' },
    { key: 'exit', label: '퇴장', min: 0.1, max: 1, step: 0.05, default: 0.25, unit: 's', effect: '사라질 때 걸리는 시간이에요. 진입보다 짧게 두면 화면이 빨리 비워진 느낌이 나요.' }
  ],
  prompt: (v) => `진입 · 퇴장(enter · exit) 모션으로 토스트가 아래 24px에서 ${v.enter}s ease-out-quart로 올라오며 나타나게 하고, 사라질 때는 ${v.exit}s ease-in으로 위로 빠지게 해. 퇴장은 진입보다 짧게 해.`
} satisfies TechniqueMeta
