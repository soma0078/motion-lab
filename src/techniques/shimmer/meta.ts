import type { TechniqueMeta } from '../types'

export default {
  name: '쉬머',
  english: 'shimmer',
  meaning: '빛줄기가 표면을 훑고 지나감. 주로 로딩 표시',
  tags: ['반짝이는', '빛이 훑고 지나가는'],
  section: 'loop',
  order: 20,
  param: '1.3s',
  fit: 'both',
  docs: { motion: 'https://motion.dev/docs/react-transitions', gsap: 'https://gsap.com/docs/v3/GSAP/Tween/' },
  prompt: () => '쉬머(shimmer)로 로딩 중인 표면 위를 빛줄기가 1.3s마다 훑고 지나가게 해.'
} satisfies TechniqueMeta
