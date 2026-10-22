import type { TechniqueMeta } from '../types'

export default {
  name: '햅틱 동기화',
  english: 'haptic sync',
  meaning: '눈금 · 스냅 · 확정 같은 지점에서 움직임과 같은 순간에 진동을 줌. 보이는 것과 느껴지는 것이 맞아야 자연스러움',
  section: 'app',
  order: 110,
  param: '5 ticks',
  rn: [
    'Haptics.selectionAsync()'
  ],
  fit: 'rn',
  docs: { rn: 'https://docs.expo.dev/versions/latest/sdk/haptics/' },
  params: [{ key: 'ticks', label: '눈금 수', min: 3, max: 9, step: 1, default: 5 }],
  prompt: (v) => `슬라이더를 끌 때 눈금 ${v.ticks}개를 지날 때마다 눈금이 튀고 같은 순간에 가벼운 햅틱(selection)이 나게.`,
  snippet: {
    rn: (v) => `// 눈금 ${v.ticks}개 · 값이 눈금을 넘는 순간 한 번\nHaptics.selectionAsync()`
  }
} satisfies TechniqueMeta
