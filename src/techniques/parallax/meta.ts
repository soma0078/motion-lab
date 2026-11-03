import type { TechniqueMeta } from '../types'

export default {
  name: '패럴랙스',
  english: 'parallax',
  meaning: '레이어마다 스크롤 속도를 달리해 깊이감을 줌',
  section: 'scroll',
  order: 50,
  param: '0.2× 0.5× 1×',
  fit: 'both',
  docs: { motion: 'https://motion.dev/docs/react-scroll-animations', gsap: 'https://gsap.com/docs/v3/Plugins/ScrollSmoother/' },
  prompt: () => '패럴랙스(parallax)로 레이어마다 스크롤 속도를 0.2× · 0.5× · 1×로 달리해 깊이감이 생기게 해.'
} satisfies TechniqueMeta
