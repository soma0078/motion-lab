import type { TechniqueMeta } from '../types'

export default {
  name: '공유 축',
  english: 'shared axis',
  meaning: '나가는 화면은 한 방향으로 밀리며 사라지고, 들어오는 화면은 같은 축에서 나타남. 순서 있는 단계에 씀',
  section: 'app',
  order: 80,
  param: '300ms',
  fit: 'rn',
  docs: { rn: 'https://docs.swmansion.com/react-native-reanimated/docs/layout-animations/entering-exiting-animations/' },
  params: [{ key: 'duration', label: '시간', min: 150, max: 500, step: 25, default: 300, unit: 'ms', effect: '현재 화면이 밀려 나가고 새 화면이 들어오는 시간이에요. 두 화면이 같은 시간을 써요.' }],
  prompt: (v) => `공유 축(shared axis) 전환으로 다음 단계로 넘어갈 때 현재 화면은 왼쪽으로 밀리며 ${v.duration}ms 동안 사라지게 하고, 새 화면은 오른쪽에서 같은 시간에 들어오게 해. 뒤로 가면 반대 방향으로 움직이게 해.`
} satisfies TechniqueMeta
