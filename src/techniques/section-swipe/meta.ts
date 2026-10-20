import type { TechniqueMeta } from '../types'

export default {
  name: '섹션 스와이프',
  english: 'section swipe',
  meaning: '휠 · 터치 한 번에 풀스크린 섹션이 하나씩 넘어감',
  section: 'scroll',
  order: 70,
  param: '1 tick = 1',
  motion: [
    'wheel · pointer 이벤트 직접 처리 + AnimatePresence'
  ],
  gsap: [
    'Observer.create({ type: \'wheel,touch,pointer\', onDown, onUp, tolerance: 10 })'
  ],
  fit: 'gsap',
  docs: { gsap: 'https://gsap.com/docs/v3/Plugins/Observer/' }
} satisfies TechniqueMeta
