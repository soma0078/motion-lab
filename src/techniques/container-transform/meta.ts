import type { TechniqueMeta } from '../types'

export default {
  name: '컨테이너 트랜스폼',
  english: 'container transform',
  meaning: '카드가 그대로 늘어나 상세 화면이 됨. 목록과 상세가 같은 요소로 이어져 보임',
  section: 'app',
  order: 70,
  param: '550ms',
  rn: [
    '<Animated.View sharedTransitionTag="card-1" sharedTransitionStyle={SharedTransition.duration(550)} />'
  ],
  fit: 'rn',
  docs: { rn: 'https://docs.swmansion.com/react-native-reanimated/docs/shared-element-transitions/overview/' },
  params: [{ key: 'duration', label: '시간', min: 300, max: 900, step: 50, default: 550, unit: 'ms' }],
  prompt: (v) => `카드를 누르면 ${v.duration}ms 동안 카드가 화면 크기로 늘어나며 상세 화면이 되고, 뒤로 가면 다시 카드로 줄어들게.`,
  snippet: {
    rn: (v) =>
      `<Animated.View sharedTransitionTag={\`card-\${id}\`} sharedTransitionStyle={SharedTransition.duration(${v.duration})} />  // 실험적 · native stack`
  }
} satisfies TechniqueMeta
