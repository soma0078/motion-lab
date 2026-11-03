import type { TechniqueMeta } from '../types'

export default {
  name: 'CSS 스크롤 타임라인',
  english: 'scroll-driven animations',
  meaning: 'JS 없이 CSS 만으로 스크롤 진행도에 애니메이션을 묶음',
  section: 'scroll',
  order: 90,
  param: 'animation-timeline',
  fit: 'native',
  docs: { motion: 'https://motion.dev/docs/react-scroll-animations', gsap: 'https://gsap.com/docs/v3/Plugins/ScrollTrigger/', native: 'https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_scroll-driven_animations' },
  prompt: () => 'CSS 스크롤 타임라인(scroll-driven animations)으로 JS 없이 CSS animation-timeline만 써서 스크롤 진행도에 맞춰 애니메이션이 재생되게 해.'
} satisfies TechniqueMeta
