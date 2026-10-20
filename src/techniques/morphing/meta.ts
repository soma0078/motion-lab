import type { TechniqueMeta } from '../types'

export default {
  name: '모핑',
  english: 'morphing',
  meaning: '모양 자체가 다른 모양으로 변함',
  section: 'shape',
  order: 10,
  param: '50% → 8%',
  motion: [
    'd 네이티브 보간 (명령 수 · 종류 같을 때만)',
    '많이 다르면 Flubber · borderRadius 는 style 로 지정'
  ],
  gsap: [
    'MorphSVGPlugin (점 개수 · 종류 달라도 됨)',
    'circle/rect 는 convertToPath() · 꼬이면 shapeIndex'
  ],
  fit: 'gsap',
  docs: { motion: 'https://motion.dev/docs/react-svg-animation', gsap: 'https://gsap.com/docs/v3/Plugins/MorphSVGPlugin/' }
} satisfies TechniqueMeta
