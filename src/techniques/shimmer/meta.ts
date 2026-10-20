import type { TechniqueMeta } from '../types'

export default {
  name: '쉬머',
  english: 'shimmer',
  meaning: '빛줄기가 표면을 훑고 지나감. 주로 로딩 표시',
  section: 'loop',
  order: 20,
  param: '1.3s',
  motion: [
    'x 반복 · 또는 CSS @keyframes 로 충분'
  ],
  gsap: [
    'repeat: -1, repeatDelay: 1 (+ yoyo)'
  ],
  fit: 'both',
  docs: { motion: 'https://motion.dev/docs/react-transitions', gsap: 'https://gsap.com/docs/v3/GSAP/Tween/' }
} satisfies TechniqueMeta
