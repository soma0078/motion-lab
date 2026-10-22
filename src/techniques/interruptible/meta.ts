import type { TechniqueMeta } from '../types'

export default {
  name: '인터럽트 가능한 전환',
  english: 'interruptible',
  meaning: '움직이는 도중에 다시 눌러도 멈췄다 처음부터 가지 않고, 지금 위치에서 방향을 바꿈',
  section: 'app',
  order: 40,
  param: '250 / 22',
  rn: [
    'x.value = withSpring(target, { damping: 22, stiffness: 250 })'
  ],
  fit: 'rn',
  docs: { rn: 'https://docs.swmansion.com/react-native-reanimated/docs/animations/withSpring/' },
  params: [
    { key: 'stiffness', label: 'stiffness', min: 100, max: 600, step: 10, default: 250 },
    { key: 'damping', label: 'damping', min: 10, max: 50, step: 1, default: 22 }
  ],
  prompt: (v) =>
    `전환 도중에 다시 눌러도 멈췄다 처음부터 가지 않고, 지금 위치에서 새 목표로 스프링(stiffness ${v.stiffness}, damping ${v.damping})으로 방향을 바꾸게.`,
  snippet: {
    rn: (v) => `x.value = withSpring(target, { stiffness: ${v.stiffness}, damping: ${v.damping} })  // 진행 중에도 같은 코드로 재호출`
  }
} satisfies TechniqueMeta
