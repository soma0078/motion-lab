import type { TechniqueMeta } from '../types'

export default {
  name: '스크롤 스크러빙',
  english: 'scroll scrubbing',
  meaning: '스크롤 진행도에 애니메이션을 직접 묶음',
  section: 'scroll',
  order: 20,
  param: 'scroll → 0~1',
  motion: [
    'useScroll({ target, offset: [\'start end\', \'end start\'] }) + useTransform'
  ],
  gsap: [
    'scrollTrigger: { scrub: true }'
  ],
  fit: 'gsap',
  docs: { motion: 'https://motion.dev/docs/react-scroll-animations', gsap: 'https://gsap.com/docs/v3/Plugins/ScrollTrigger/' }
} satisfies TechniqueMeta
