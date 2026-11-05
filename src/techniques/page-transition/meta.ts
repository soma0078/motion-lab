import type { TechniqueMeta } from '../types'

export default {
  name: '페이지 전환',
  english: 'page transition',
  meaning: '라우트가 바뀔 때 이전 화면이 나가고 새 화면이 들어옴',
  tags: ['화면이 넘어가는', '나갔다 들어오는'],
  section: 'transition',
  order: 90,
  param: "mode='wait'",
  fit: 'motion',
  docs: { motion: 'https://motion.dev/docs/react-animate-presence', gsap: 'https://gsap.com/resources/React/' },
  prompt: () => '페이지 전환(page transition)으로 라우트가 바뀔 때 이전 화면이 나간 뒤 새 화면이 들어오게 해.'
} satisfies TechniqueMeta
