import type { TechniqueMeta } from '../types'

export default {
  name: '라인 드로잉',
  english: 'line drawing',
  meaning: '선이 그려지듯 나타남',
  section: 'shape',
  order: 20,
  param: 'pathLength',
  motion: [
    'pathLength: 0 → 1',
    'pathOffset · pathSpacing (0~1)'
  ],
  gsap: [
    'gsap.from(path, { drawSVG: 0 }) (DrawSVGPlugin)',
    'stroke 지정돼 있어야 보임'
  ],
  fit: 'both',
  docs: { motion: 'https://motion.dev/docs/react-svg-animation', gsap: 'https://gsap.com/docs/v3/Plugins/DrawSVGPlugin/' }
} satisfies TechniqueMeta
