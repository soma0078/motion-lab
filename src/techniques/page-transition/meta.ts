import type { TechniqueMeta } from '../types'

export default {
  name: '페이지 전환',
  english: 'page transition',
  meaning: '라우트가 바뀔 때 이전 화면이 나가고 새 화면이 들어옴',
  section: 'transition',
  order: 90,
  param: "mode='wait'",
  motion: [
    '<AnimatePresence mode=\'wait\'> + 라우트 key'
  ],
  gsap: [
    '퇴장 트윈 onComplete 에서 navigate · 또는 Flip'
  ],
  fit: 'motion',
  docs: { motion: 'https://motion.dev/docs/react-animate-presence', gsap: 'https://gsap.com/resources/React/' }
} satisfies TechniqueMeta
