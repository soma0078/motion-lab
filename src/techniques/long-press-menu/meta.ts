import type { TechniqueMeta } from '../types'

export default {
  name: '롱프레스 메뉴',
  english: 'long press menu',
  meaning: '길게 누르면 요소가 떠오르고 옆에 메뉴가 열림. 누르는 시간이 기준을 넘어야 반응',
  section: 'app',
  order: 60,
  param: 'minDuration 500',
  rn: [
    'Gesture.LongPress().minDuration(500).onStart(openMenu)'
  ],
  fit: 'rn',
  docs: { rn: 'https://docs.swmansion.com/react-native-gesture-handler/docs/2.x/gestures/long-press-gesture' },
  params: [{ key: 'minDuration', label: '누르는 시간', min: 300, max: 800, step: 50, default: 500, unit: 'ms' }],
  prompt: (v) => `카드를 ${v.minDuration}ms 이상 누르고 있으면 카드가 1.05배로 떠오르고 옆에 메뉴가 열리게.`,
  snippet: {
    rn: (v) => `Gesture.LongPress().minDuration(${v.minDuration}).onStart(() => openMenu())`
  }
} satisfies TechniqueMeta
