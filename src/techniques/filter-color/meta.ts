import type { TechniqueMeta } from '../types'

export default {
  name: '필터 · 색 전환',
  english: 'filter · color',
  meaning: '흐림 · 흑백 · 색이 서서히 바뀜',
  section: 'transition',
  order: 110,
  param: 'blur 10 → 0',
  motion: [
    'filter: \'blur(10px)\' → \'blur(0px)\' · backgroundColor 보간'
  ],
  gsap: [
    'filter: \'blur(10px)\' · backgroundColor'
  ],
  fit: 'both',
  docs: { motion: 'https://motion.dev/docs/react-animation', gsap: 'https://gsap.com/docs/v3/GSAP/CorePlugins/CSS/' }
} satisfies TechniqueMeta
