import type { TechniqueMeta } from '../types'

export default {
  name: '공유 레이아웃 전환',
  english: 'shared layout transition',
  meaning: '같은 요소가 화면 · 상태가 바뀌어도 위치 · 크기를 이어 움직임',
  section: 'transition',
  order: 80,
  param: 'layoutId',
  motion: [
    'layout · layoutId',
    '따로 렌더되는 형제 <LayoutGroup> · 스크롤 안 layoutScroll · 비율 바뀌면 layout=\'position\''
  ],
  gsap: [
    'Flip.getState() → 상태 변경 → Flip.from(state, { absolute, targets })',
    'React: 렌더 후(useLayoutEffect) 호출 · data-flip-id'
  ],
  fit: 'motion',
  docs: { motion: 'https://motion.dev/docs/react-layout-animations', gsap: 'https://gsap.com/docs/v3/Plugins/Flip/' }
} satisfies TechniqueMeta
