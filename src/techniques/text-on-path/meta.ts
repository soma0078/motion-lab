import type { TechniqueMeta } from '../types'

export default {
  name: '텍스트 경로',
  english: 'text on path',
  meaning: '글자가 곡선을 따라 흐름',
  section: 'shape',
  order: 40,
  param: 'startOffset',
  motion: [
    '<motion.textPath startOffset={mv}> (SVG textPath)'
  ],
  gsap: [
    'gsap.to(textPath, { attr: { startOffset: \'100%\' } })',
    '시작값도 % 로 (AttrPlugin 은 단위 변환 안 함)'
  ],
  fit: 'gsap',
  docs: { motion: 'https://motion.dev/docs/react-svg-animation', gsap: 'https://gsap.com/docs/v3/GSAP/CorePlugins/Attributes/' }
} satisfies TechniqueMeta
