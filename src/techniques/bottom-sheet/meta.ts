import type { TechniqueMeta } from '../types'

export default {
  name: '바텀시트 스냅',
  english: 'bottom sheet snap',
  meaning: '아래에서 올라온 시트를 끌다 놓으면 가장 가까운 높이(peek · half · full)로 붙음',
  section: 'app',
  order: 20,
  param: '80 / 500',
  rn: [
    '<BottomSheet snapPoints={[\'25%\', \'50%\', \'90%\']} enableDynamicSizing={false} />',
    'animationConfigs={useBottomSheetSpringConfigs({ damping: 80, stiffness: 500 })}'
  ],
  fit: 'rn',
  docs: { rn: 'https://gorhom.dev/react-native-bottom-sheet/props' },
  params: [
    { key: 'damping', label: 'damping', min: 20, max: 120, step: 5, default: 80, effect: '놓은 뒤 출렁임을 잠재우는 힘이에요. 낮을수록 스냅 지점 근처에서 더 흔들리고, 높을수록 튕김 없이 멈춰요.' },
    { key: 'stiffness', label: 'stiffness', min: 100, max: 800, step: 50, default: 500, effect: '시트를 스냅 지점으로 끌어당기는 힘이에요. 클수록 빠르고 팽팽하게 붙어요.' }
  ],
  prompt: (v) => `바텀시트 스냅(bottom sheet snap)으로 시트가 25% · 50% · 90% 높이에서 멈추게 해. 끌다 놓으면 가장 가까운 높이로 스프링(stiffness ${v.stiffness}, damping ${v.damping})을 써서 넘치지 않게 붙게 해.`
} satisfies TechniqueMeta
