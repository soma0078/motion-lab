import type { TechniqueMeta } from '../types'

export default {
  name: '호버',
  english: 'hover',
  meaning: '포인터가 올라가 있는 동안',
  tags: ['살짝 떠오르는', '색이 바뀌는'],
  section: 'interaction',
  order: 10,
  param: '0.15s',
  fit: 'motion',
  docs: { motion: 'https://motion.dev/docs/react-gestures', gsap: 'https://gsap.com/resources/React/' },
  prompt: () => '호버(hover) 상태에서 포인터가 올라가 있는 동안 버튼이 0.15s 만에 살짝 떠오르며 색이 바뀌게 하고, 포인터가 나가면 되돌아오게 해.'
} satisfies TechniqueMeta
