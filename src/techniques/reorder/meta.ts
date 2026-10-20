import type { TechniqueMeta } from '../types'

export default {
  name: '리스트 재정렬',
  english: 'reorder',
  meaning: '항목을 끌어 순서를 바꾸면 나머지가 자리를 비켜 줌',
  section: 'interaction',
  order: 50,
  param: 'layout',
  motion: [
    '<Reorder.Group values onReorder> + <Reorder.Item value>',
    'axis 자동 감지 · 가장자리로 끌면 컨테이너 자동 스크롤'
  ],
  gsap: [
    'Draggable + 놓을 때 Flip 으로 자리 이동'
  ],
  fit: 'motion',
  docs: { motion: 'https://motion.dev/docs/react-reorder', gsap: 'https://gsap.com/docs/v3/Plugins/Draggable/' }
} satisfies TechniqueMeta
