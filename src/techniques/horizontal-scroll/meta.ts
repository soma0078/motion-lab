import type { TechniqueMeta } from '../types'

export default {
  name: '가로 스크롤',
  english: 'horizontal scroll',
  meaning: '세로로 스크롤하면 섹션이 옆으로 흘러감',
  section: 'scroll',
  order: 40,
  param: '0 → -75%',
  fit: 'gsap',
  docs: { motion: 'https://motion.dev/docs/react-scroll-animations', gsap: 'https://gsap.com/docs/v3/Plugins/ScrollTrigger/' },
  prompt: () => '가로 스크롤(horizontal scroll)로 세로로 스크롤하는 동안 섹션들이 0에서 -75%까지 옆으로 흘러가게 해.'
} satisfies TechniqueMeta
