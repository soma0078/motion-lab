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
  params: [{ key: 'threshold', label: '열림 기준', min: 20, max: 70, step: 5, default: 40, unit: 'px', effect: '놓았을 때 열린 채 멈추는 기준 거리예요. 이보다 덜 밀면 닫히고, 작을수록 조금만 밀어도 열려요.' }],
  prompt: (v) => `스와이프 액션(swipe action)으로 목록 행을 왼쪽으로 ${v.threshold}px 이상 밀고 놓으면 오른쪽 삭제 버튼이 열린 채 멈추게 하고, 그보다 덜 밀고 놓으면 닫히게 해.`,
  snippet: {
    rn: (v) => `<Swipeable renderRightActions={renderDelete} rightThreshold={${v.threshold}} overshootRight={false} />`
  }
} satisfies TechniqueMeta
