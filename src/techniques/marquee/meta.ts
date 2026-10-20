import type { TechniqueMeta } from '../types'

export default {
  name: '마키',
  english: 'marquee',
  meaning: '글자 · 로고가 한 방향으로 끝없이 흐름',
  section: 'loop',
  order: 10,
  param: 'loop',
  motion: [
    '콘텐츠 2벌 + x: [\'0%\', \'-50%\'], repeat: Infinity, ease: \'linear\'',
    'Ticker 컴포넌트는 Motion+ 유료'
  ],
  gsap: [
    '콘텐츠 2벌 + xPercent: -50, repeat: -1, ease: \'none\'',
    '반응형 · 드래그: horizontalLoop(items, { speed, draggable }) 헬퍼'
  ],
  fit: 'both',
  docs: { motion: 'https://motion.dev/docs/react-transitions', gsap: 'https://gsap.com/docs/v3/HelperFunctions/helpers/seamlessLoop' }
} satisfies TechniqueMeta
