import type { TechniqueMeta } from '../types'

export default {
  name: '가로 스크롤',
  english: 'horizontal scroll',
  meaning: '세로로 스크롤하면 섹션이 옆으로 흘러감',
  section: 'scroll',
  order: 40,
  param: '0 → -75%',
  motion: [
    'useScroll({ target, offset: [\'start start\', \'end end\'] }) + useTransform(…, [\'0%\', \'-75%\'])',
    '300vh 바깥 > sticky 100vh overflow-hidden > motion.div style={{ x }}'
  ],
  gsap: [
    'pin + scrub 트윈 x: -(w - innerWidth), ease: \'none\'',
    '안쪽 트리거는 containerAnimation: tween (pin · snap 불가)'
  ],
  fit: 'gsap',
  docs: { motion: 'https://motion.dev/docs/react-scroll-animations', gsap: 'https://gsap.com/docs/v3/Plugins/ScrollTrigger/' }
} satisfies TechniqueMeta
