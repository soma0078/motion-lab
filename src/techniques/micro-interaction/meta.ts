import type { TechniqueMeta } from '../types'

export default {
  name: '마이크로 인터랙션',
  english: 'micro-interaction',
  meaning: '버튼 · 토글 같은 작은 조작에 붙는 짧은 피드백',
  section: 'interaction',
  order: 20,
  param: '500 / 30',
  fit: 'motion',
  docs: { motion: 'https://motion.dev/docs/react-gestures', gsap: 'https://gsap.com/docs/v3/GSAP/Timeline/' },
  params: [
    { key: 'stiffness', label: 'stiffness', min: 100, max: 900, step: 10, default: 500, effect: '토글 손잡이를 반대편으로 보내는 힘이에요. 클수록 짧고 단단하게 딸깍 움직여요.' },
    { key: 'damping', label: 'damping', min: 5, max: 50, step: 1, default: 30, effect: '손잡이가 멈출 때 흔들림을 줄이는 힘이에요. 낮으면 끝에서 살짝 튕겨요.' }
  ],
  prompt: (v) => `마이크로 인터랙션(micro-interaction)으로 토글 손잡이가 스프링(stiffness ${v.stiffness}, damping ${v.damping})으로 짧고 단단하게 이동하게 하고, 하트는 누르면 1.25배로 한 번 튀게 해.`
} satisfies TechniqueMeta
