import type { TechniqueMeta } from '../types'

export default {
  name: '공유 축',
  english: 'shared axis',
  meaning: '나가는 화면은 한 방향으로 밀리며 사라지고, 들어오는 화면은 같은 축에서 나타남. 순서 있는 단계에 씀',
  section: 'app',
  order: 80,
  param: '300ms',
  rn: [
    '<Animated.View key={step} entering={FadeInRight.duration(300)} exiting={FadeOutLeft.duration(300)} />'
  ],
  fit: 'rn',
  docs: { rn: 'https://docs.swmansion.com/react-native-reanimated/docs/layout-animations/entering-exiting-animations/' },
  params: [{ key: 'duration', label: '시간', min: 150, max: 500, step: 25, default: 300, unit: 'ms' }],
  prompt: (v) => `다음 단계로 넘어갈 때 현재 화면은 왼쪽으로 밀리며 ${v.duration}ms 동안 사라지고, 새 화면은 오른쪽에서 같은 시간에 들어오게. 뒤로 가면 반대로.`,
  snippet: {
    rn: (v) => `<Animated.View key={step} entering={FadeInRight.duration(${v.duration})} exiting={FadeOutLeft.duration(${v.duration})} />`
  }
} satisfies TechniqueMeta
