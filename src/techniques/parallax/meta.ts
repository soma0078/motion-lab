import type { TechniqueMeta } from '../types'

export default {
  name: '패럴랙스',
  english: 'parallax',
  meaning: '레이어마다 스크롤 속도를 달리해 깊이감을 줌',
  section: 'scroll',
  order: 50,
  param: '0.2× 0.5× 1×',
  motion: [
    'useTransform(scrollYProgress, [0, 1], [0, -200]) · 레이어마다 범위 다르게'
  ],
  gsap: [
    'scrub + 레이어별 yPercent'
  ],
  fit: 'both',
  docs: { motion: 'https://motion.dev/docs/react-scroll-animations', gsap: 'https://gsap.com/docs/v3/Plugins/ScrollSmoother/' }
} satisfies TechniqueMeta
