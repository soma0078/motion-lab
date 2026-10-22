import type { TechniqueMeta } from '../types'

export default {
  name: '공유 레이아웃 전환',
  english: 'shared layout transition',
  meaning: '같은 요소가 화면 · 상태가 바뀌어도 위치 · 크기를 이어 움직임',
  section: 'transition',
  order: 80,
  param: 'layoutId',
  motion: [
    'layout · layoutId'
  ],
  gsap: [
    'Flip.getState() → 상태 변경 → Flip.from(state, { absolute, targets })'
  ],
  fit: 'motion',
  docs: { motion: 'https://motion.dev/docs/react-layout-animations', gsap: 'https://gsap.com/docs/v3/Plugins/Flip/' }
} satisfies TechniqueMeta
