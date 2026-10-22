import type { TechniqueMeta } from '../types'

export default {
  name: '가로 스크롤',
  english: 'horizontal scroll',
  meaning: '세로로 스크롤하면 섹션이 옆으로 흘러감',
  section: 'scroll',
  order: 40,
  param: '0 → -75%',
  motion: [
    'useScroll({ target, offset: [\'start start\', \'end end\'] }) + useTransform(…, [\'0%\', \'-75%\'])'
  ],
  gsap: [
    'pin + scrub 트윈 x: -(w - innerWidth), ease: \'none\''
  ],
  fit: 'gsap',
  docs: { motion: 'https://motion.dev/docs/react-scroll-animations', gsap: 'https://gsap.com/docs/v3/Plugins/ScrollTrigger/' }
} satisfies TechniqueMeta
