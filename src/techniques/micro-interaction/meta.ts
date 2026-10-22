import type { TechniqueMeta } from '../types'

export default {
  name: '마이크로 인터랙션',
  english: 'micro-interaction',
  meaning: '버튼 · 토글 같은 작은 조작에 붙는 짧은 피드백',
  section: 'interaction',
  order: 20,
  param: '500 / 30',
  motion: [
    'whileTap + spring (키보드 Enter 도 동작)'
  ],
  gsap: [
    'onClick → contextSafe(짧은 timeline)'
  ],
  fit: 'motion',
  docs: { motion: 'https://motion.dev/docs/react-gestures', gsap: 'https://gsap.com/docs/v3/GSAP/Timeline/' },
  params: [
    { key: 'stiffness', label: 'stiffness', min: 100, max: 900, step: 10, default: 500 },
    { key: 'damping', label: 'damping', min: 5, max: 50, step: 1, default: 30 }
  ],
  prompt: (v) => `토글 손잡이가 spring(stiffness ${v.stiffness}, damping ${v.damping})으로 짧고 단단하게 이동하고, 하트는 누르면 1.25배로 한 번 튀게.`,
  snippet: {
    motion: (v) => `animate={{ x: on ? 28 : 0 }} transition={{ type: 'spring', stiffness: ${v.stiffness}, damping: ${v.damping} }}`,
    gsap: () => `onClick → gsap.timeline().to(knob, { x: 28, duration: 0.25, ease: 'back.out(2)' })`
  }
} satisfies TechniqueMeta
