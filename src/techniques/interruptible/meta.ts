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
    { key: 'stiffness', label: 'stiffness', min: 100, max: 600, step: 10, default: 250, effect: '목표로 향하는 힘이에요. 클수록 도중에 방향을 바꿔도 빠르게 새 목표로 돌아서요.' },
    { key: 'damping', label: 'damping', min: 10, max: 50, step: 1, default: 22, effect: '출렁임을 줄이는 힘이에요. 낮으면 도착하며 흔들리고, 높으면 부드럽게 멈춰요.' }
  ],
  prompt: (v) => `인터럽트 가능한 전환(interruptible)으로 전환 도중에 다시 눌러도 멈췄다 처음부터 가지 않게 하고, 지금 위치에서 새 목표로 스프링(stiffness ${v.stiffness}, damping ${v.damping})을 써서 방향을 바꾸게 해.`,
  snippet: {
    rn: (v) => `x.value = withSpring(target, { stiffness: ${v.stiffness}, damping: ${v.damping} })  // 진행 중에도 같은 코드로 재호출`
  }
} satisfies TechniqueMeta
