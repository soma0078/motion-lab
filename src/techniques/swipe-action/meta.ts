import type { TechniqueMeta } from '../types'

export default {
  name: '스와이프 액션',
  english: 'swipe action',
  meaning: '목록 행을 옆으로 밀면 삭제 · 보관 같은 버튼이 드러남. 기준을 넘겨 놓으면 열린 채 멈춤',
  section: 'app',
  order: 10,
  param: 'threshold 40',
  rn: [
    '<Swipeable renderRightActions={renderDelete} rightThreshold={40} />'
  ],
  fit: 'rn',
  docs: { rn: 'https://docs.swmansion.com/react-native-gesture-handler/docs/2.x/components/reanimated_swipeable' },
  params: [{ key: 'threshold', label: '열림 기준', min: 20, max: 70, step: 5, default: 40, unit: 'px' }],
  prompt: (v) => `목록 행을 왼쪽으로 ${v.threshold}px 이상 밀고 놓으면 오른쪽 삭제 버튼이 열린 채 멈추고, 그보다 덜 밀고 놓으면 닫히게.`,
  snippet: {
    rn: (v) => `<Swipeable renderRightActions={renderDelete} rightThreshold={${v.threshold}} overshootRight={false} />`
  }
} satisfies TechniqueMeta
