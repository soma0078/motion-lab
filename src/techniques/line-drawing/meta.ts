import type { TechniqueMeta } from '../types'

export default {
  name: '라인 드로잉',
  english: 'line drawing',
  meaning: '선이 그려지듯 나타남',
  tags: ['그려지는', '선이 그어지는', '손글씨처럼'],
  section: 'shape',
  order: 20,
  param: 'pathLength',
  fit: 'both',
  docs: { motion: 'https://motion.dev/docs/react-svg-animation', gsap: 'https://gsap.com/docs/v3/Plugins/DrawSVGPlugin/' },
  prompt: () => '라인 드로잉(line drawing)으로 SVG 선이 pathLength 0에서 1까지 그려지듯 나타나게 해.'
} satisfies TechniqueMeta
