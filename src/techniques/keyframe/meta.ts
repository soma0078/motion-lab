import type { TechniqueMeta } from '../types'

export default {
  name: '키프레임',
  english: 'keyframe',
  meaning: '시간 위 지점별로 정한 값. 사이는 보간',
  tags: ['여러 단계로 바뀌는', '중간 지점을 지나는'],
  section: 'timing',
  order: 40,
  param: '4 keys',
  fit: 'both',
  docs: { motion: 'https://motion.dev/docs/react-animation', gsap: 'https://gsap.com/resources/keyframes/' },
  prompt: () => '키프레임(keyframe)으로 시간 위 네 지점에 값을 정하고, 그 사이는 보간되며 순서대로 지나가게 해.'
} satisfies TechniqueMeta
