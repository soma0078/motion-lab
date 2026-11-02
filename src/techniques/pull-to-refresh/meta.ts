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
  params: [{ key: 'offset', label: '인디케이터 위치', min: 0, max: 30, step: 5, default: 0, unit: 'px', effect: '인디케이터가 나타나는 세로 위치예요. 클수록 목록 위쪽에서 더 아래로 내려와 보여요.' }],
  prompt: (v) => `당겨서 새로고침(pull to refresh)으로 목록 맨 위에서 아래로 당겼다 놓으면 인디케이터가 돌며 새로고침이 시작되게 하고, 끝나면 목록이 제자리로 돌아오게 해. 인디케이터는 위에서 ${v.offset}px 아래에 나타나게 해.`
} satisfies TechniqueMeta
