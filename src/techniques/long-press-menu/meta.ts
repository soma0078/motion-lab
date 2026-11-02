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
  params: [{ key: 'minDuration', label: '누르는 시간', min: 300, max: 800, step: 50, default: 500, unit: 'ms', effect: '메뉴가 열리기까지 눌러야 하는 시간이에요. 짧으면 실수로 열리기 쉽고, 길면 기다리는 느낌이 들어요.' }],
  prompt: (v) => `롱프레스 메뉴(long press menu)로 카드를 ${v.minDuration}ms 이상 누르고 있으면 카드가 1.05배로 떠오르게 하고, 옆에 메뉴가 열리게 해.`
} satisfies TechniqueMeta
