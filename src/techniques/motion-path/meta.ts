import type { TechniqueMeta } from '../types'

export default {
  name: '모션 패스',
  english: 'motion path',
  meaning: '요소가 정해진 곡선 경로를 따라 이동',
  section: 'shape',
  order: 30,
  param: 'offset-path',
  motion: [
    'CSS offset-path + offsetDistance: \'0%\' → \'100%\''
  ],
  gsap: [
    'motionPath: { path, align: path, alignOrigin: [0.5, 0.5], autoRotate: true }'
  ],
  fit: 'gsap',
  docs: { gsap: 'https://gsap.com/docs/v3/Plugins/MotionPathPlugin/', native: 'https://developer.mozilla.org/en-US/docs/Web/CSS/offset-path' }
} satisfies TechniqueMeta
