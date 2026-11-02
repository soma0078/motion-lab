import type { TechniqueMeta } from '../types'

export default {
  name: '페이드 스루',
  english: 'fade through',
  meaning: '서로 관련 없는 화면(탭 전환 등)을 겹치지 않게 전환. 나가는 쪽이 먼저 사라진 뒤 들어오는 쪽이 살짝 커지며 나타남',
  section: 'app',
  order: 90,
  param: '90 / 210',
  rn: [
    '<Animated.View key={tab} entering={FadeIn.duration(210).delay(90)} exiting={FadeOut.duration(90)} />'
  ],
  fit: 'rn',
  docs: { rn: 'https://docs.swmansion.com/react-native-reanimated/docs/layout-animations/entering-exiting-animations/' },
  params: [
    { key: 'out', label: '나감', min: 60, max: 200, step: 10, default: 90, unit: 'ms', effect: '이전 화면이 사라지는 시간이에요. 짧게 둬야 새 화면이 기다리지 않고 들어와요.' },
    { key: 'in', label: '들어옴', min: 120, max: 400, step: 10, default: 210, unit: 'ms', effect: '새 화면이 나타나며 살짝 커지는 시간이에요. 나감보다 길게 두면 새 화면에 시선이 가요.' }
  ],
  prompt: (v) => `페이드 스루(fade through)로 탭을 바꿀 때 현재 화면은 ${v.out}ms 동안 사라지게 하고, 그다음 새 화면이 ${v.in}ms 동안 0.92배에서 1배로 커지며 나타나게 해. 두 화면이 겹치지 않게 해.`,
  snippet: {
    rn: (v) => `<Animated.View key={tab} entering={FadeIn.duration(${v.in}).delay(${v.out})} exiting={FadeOut.duration(${v.out})} />`
  }
} satisfies TechniqueMeta
