import type { TechniqueMeta } from '../types'

export default {
  name: '스켈레톤 로딩',
  english: 'skeleton',
  meaning: '데이터가 오기 전에 들어갈 자리를 회색 블록으로 먼저 보여 주고, 천천히 깜빡여 로딩 중임을 알림',
  section: 'app',
  order: 120,
  param: '800ms',
  rn: [
    'o.value = withRepeat(withTiming(1, { duration: 800 }), -1, true)'
  ],
  fit: 'rn',
  docs: { rn: 'https://docs.swmansion.com/react-native-reanimated/docs/animations/withRepeat/' },
  params: [{ key: 'duration', label: '한 번', min: 400, max: 1600, step: 100, default: 800, unit: 'ms' }],
  prompt: (v) => `데이터가 오기 전에 자리를 회색 블록으로 채우고, 투명도가 0.4에서 1 사이를 ${v.duration}ms마다 오가며 깜빡이게.`,
  snippet: {
    rn: (v) => `o.value = withRepeat(withTiming(1, { duration: ${v.duration} }), -1, true)  // o 초기값 0.4`
  }
} satisfies TechniqueMeta
