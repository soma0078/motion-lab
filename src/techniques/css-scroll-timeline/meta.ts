import type { TechniqueMeta } from '../types'

export default {
  name: 'CSS 스크롤 타임라인',
  english: 'scroll-driven animations',
  meaning: 'JS 없이 CSS 만으로 스크롤 진행도에 애니메이션을 묶음',
  section: 'scroll',
  order: 90,
  param: 'animation-timeline',
  motion: [
    '스크롤 연동은 가능하면 브라우저 ScrollTimeline 으로 실행 (안 되면 JS)'
  ],
  gsap: [
    'ScrollTrigger (JS 계산)'
  ],
  native: [
    'animation-timeline: scroll() · view()',
    '지원 Chrome 115 · Safari 26 · Firefox 159 → @supports (animation-timeline: scroll()) 로 가드'
  ],
  fit: 'native',
  docs: { motion: 'https://motion.dev/docs/react-scroll-animations', gsap: 'https://gsap.com/docs/v3/Plugins/ScrollTrigger/', native: 'https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_scroll-driven_animations' }
} satisfies TechniqueMeta
