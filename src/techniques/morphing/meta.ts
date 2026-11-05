import type { TechniqueMeta } from '../types'

export default {
  name: '모핑',
  english: 'morphing',
  meaning: '모양 자체가 다른 모양으로 변함',
  tags: ['모양이 바뀌는', '변신하는'],
  section: 'shape',
  order: 10,
  param: '50% → 8%',
  fit: 'gsap',
  docs: { motion: 'https://motion.dev/docs/react-svg-animation', gsap: 'https://gsap.com/docs/v3/Plugins/MorphSVGPlugin/' },
  prompt: () => '모핑(morphing)으로 원(border-radius 50%)이 둥근 사각형(8%)으로 모양 자체가 바뀌게 해.'
} satisfies TechniqueMeta
