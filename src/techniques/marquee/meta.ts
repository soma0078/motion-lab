import type { TechniqueMeta } from '../types'

export default {
  name: '마키',
  english: 'marquee',
  meaning: '글자 · 로고가 한 방향으로 끝없이 흐름',
  tags: ['흐르는', '끝없이 도는', '전광판처럼'],
  section: 'loop',
  order: 10,
  param: 'loop',
  fit: 'both',
  docs: { motion: 'https://motion.dev/docs/react-transitions', gsap: 'https://gsap.com/docs/v3/HelperFunctions/helpers/seamlessLoop' },
  prompt: () => '마키(marquee)로 글자와 로고가 한 방향으로 끊김 없이 계속 흐르게 해.'
} satisfies TechniqueMeta
