import type { TechniqueMeta } from '../types'

export default {
  name: '당겨서 새로고침',
  english: 'pull to refresh',
  meaning: '목록 맨 위에서 아래로 당겼다 놓으면 인디케이터가 돌며 새로고침 시작. 끝나면 제자리로 돌아옴',
  section: 'app',
  order: 30,
  param: 'offset 0',
  rn: [
    '<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />'
  ],
  fit: 'rn',
  docs: { rn: 'https://reactnative.dev/docs/refreshcontrol' },
  params: [{ key: 'offset', label: '인디케이터 위치', min: 0, max: 30, step: 5, default: 0, unit: 'px' }],
  prompt: (v) =>
    `목록 맨 위에서 아래로 당겼다 놓으면 인디케이터가 돌며 새로고침이 시작되고, 끝나면 목록이 제자리로 돌아오게. 인디케이터는 위에서 ${v.offset}px 아래에 두고.`,
  snippet: {
    rn: (v) => `<RefreshControl refreshing={refreshing} onRefresh={onRefresh} progressViewOffset={${v.offset}} />`
  }
} satisfies TechniqueMeta
