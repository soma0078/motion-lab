import type { TechniqueMeta } from '../types'

export default {
  name: '키프레임',
  english: 'keyframe',
  meaning: '시간 위 지점별로 정한 값. 사이는 보간',
  section: 'timing',
  order: 40,
  param: '4 keys',
  motion: [
    'x: [0, 80, 40]'
  ],
  gsap: [
    'keyframes: [{ x: 80 }, { x: 40 }]'
  ],
  fit: 'both',
  docs: { motion: 'https://motion.dev/docs/react-animation', gsap: 'https://gsap.com/resources/keyframes/' },
  prompt: () => '키프레임(keyframe)으로 시간 위 네 지점에 값을 정하고, 그 사이는 보간되며 순서대로 지나가게 해.'
} satisfies TechniqueMeta
