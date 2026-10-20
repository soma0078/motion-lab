import type { TechniqueMeta } from '../types'

export default {
  name: '스크롤 스크러빙',
  english: 'scroll scrubbing',
  meaning: '스크롤 진행도에 애니메이션을 직접 묶음',
  section: 'scroll',
  order: 20,
  param: 'scroll → 0~1',
  motion: [
    'useScroll({ target, offset: [\'start end\', \'end start\'] }) + useTransform',
    '부드럽게: useSpring(scrollYProgress)'
  ],
  gsap: [
    'scrollTrigger: { scrub: true }',
    '부드럽게: scrub: 1 (초 단위로 따라잡음)'
  ],
  fit: 'gsap',
  docs: { motion: 'https://motion.dev/docs/react-scroll-animations', gsap: 'https://gsap.com/docs/v3/Plugins/ScrollTrigger/' }
} satisfies TechniqueMeta
