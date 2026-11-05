import type { TechniqueMeta } from '../types'

export default {
  name: '페이드 인 · 아웃',
  english: 'fade in · out',
  meaning: '투명도로 나타나고 사라짐',
  tags: ['스르륵 나타나는', '서서히 사라지는'],
  section: 'transition',
  order: 10,
  param: '0.6s',
  fit: 'both',
  docs: { motion: 'https://motion.dev/docs/react-animation', gsap: 'https://gsap.com/docs/v3/GSAP/CorePlugins/CSS/' },
  prompt: () => '페이드 인 · 아웃(fade in · out)으로 요소가 0.6s 동안 투명도만 바뀌며 나타나고 사라지게 해.'
} satisfies TechniqueMeta
