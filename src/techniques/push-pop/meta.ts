import type { TechniqueMeta } from '../types'

export default {
  name: '푸시 · 팝',
  english: 'push / pop',
  meaning: '새 화면이 옆에서 밀려 들어오고(push) 이전 화면은 살짝 밀려남. 뒤로 가면(pop) 반대로 빠짐',
  section: 'app',
  order: 100,
  param: '350ms',
  rn: [
    '<Stack.Screen options={{ animation: \'slide_from_right\' }} />'
  ],
  fit: 'rn',
  docs: { rn: 'https://reactnavigation.org/docs/native-stack-navigator' },
  params: [{ key: 'duration', label: '시간', min: 200, max: 600, step: 50, default: 350, unit: 'ms', effect: '새 화면이 밀려 들어오는 시간이에요. 이전 화면도 같은 시간 동안 조금 밀려나요.' }],
  prompt: (v) => `푸시 · 팝(push / pop) 전환으로 새 화면이 오른쪽에서 ${v.duration}ms 동안 밀려 들어오게 하고, 이전 화면은 왼쪽으로 조금 밀려나게 해. 뒤로 가면 반대로 빠지게 해.`,
  snippet: {
    rn: (v) => `<Stack.Screen options={{ animation: 'simple_push', animationDuration: ${v.duration} }} />  // iOS 에서만 시간 적용`
  }
} satisfies TechniqueMeta
