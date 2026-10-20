import type { TechniqueMeta } from '../types'

export default {
  name: '페이드 인 · 아웃',
  english: 'fade in · out',
  meaning: '투명도로 나타나고 사라짐',
  section: 'transition',
  order: 10,
  param: '0.6s',
  motion: [
    'initial={{ opacity: 0 }} animate={{ opacity: 1 }}'
  ],
  gsap: [
    'autoAlpha: 0 → 1 (0 이면 visibility: hidden · 클릭도 막힘)'
  ],
  fit: 'both',
  docs: { motion: 'https://motion.dev/docs/react-animation', gsap: 'https://gsap.com/docs/v3/GSAP/CorePlugins/CSS/' }
} satisfies TechniqueMeta
