// meta.ts 들을 읽어 AI 에게 줄 어휘집 하나로 만든다. Node 24 의 TS 타입 제거로 .ts 를 바로 import.
// 사용: npm run vocab  →  motion-vocabulary.md + skills 저장소의 motion-vocabulary 스킬 references
import { readdirSync, existsSync, writeFileSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const dir = join(root, 'src/techniques')
const load = async (path) => (await import(pathToFileURL(path).href))

const { SECTIONS } = await load(join(dir, 'sections.ts'))
const { buildPrompt, defaultValues } = await load(join(dir, 'prompt.ts'))
const { UI_ELEMENTS } = await load(join(dir, 'ui-elements.ts'))

const techniques = []
for (const slug of readdirSync(dir)) {
  const meta = join(dir, slug, 'meta.ts')
  if (existsSync(meta)) techniques.push({ slug, ...(await load(meta)).default })
}

const FIT = { motion: 'Motion 추천', gsap: 'GSAP 추천', both: '둘 다 무난', native: '브라우저 기본으로 충분', rn: 'React Native 기법' }
const list = (label, lines) => (lines?.length ? [`- **${label}**: \`${lines[0]}\``, ...lines.slice(1).map((l) => `  - ${l}`)] : [])

const out = [
  '# 모션 기법 어휘집',
  '',
  '> motion-lab 의 `src/techniques/*/meta.ts` 에서 생성됨 (`npm run vocab`). 직접 고치지 않는다.',
  '',
  '애니메이션 · 인터랙션을 구현할 때 이 문서의 **표준 용어**로 말하고 이해한다.',
  '',
  '- 요청에 표준 용어가 나오면 아래 정의와 API 를 따른다. "부드럽게", "세련되게" 같은 말만 있으면 가까운 기법을 제안하고 수치를 묻는다',
  '- 수치가 요청에 있으면 그대로 쓴다. 없으면 각 기법의 **기본 수치**를 쓰고, 쓴 값을 알려 준다',
  '- 라이브러리는 프로젝트에 이미 있는 것을 쓴다. 둘 다 없으면 추천 쪽을 제안한다',
  '- 모든 모션은 `prefers-reduced-motion` 을 존중한다 (Motion: `<MotionConfig reducedMotion="user">` · GSAP: `gsap.matchMedia()`)',
  ''
]


for (const section of SECTIONS) {
  const items = techniques.filter((t) => t.section === section.key).sort((a, b) => a.order - b.order)
  out.push(`## ${section.heading}`, '', section.lead, '')
  for (const t of items) {
    out.push(`### ${t.name} (${t.english})`, '', `${t.meaning}. — ${FIT[t.fit]}`, '')
    out.push(...list('React Native', t.rn), ...list('Motion', t.motion), ...list('GSAP', t.gsap), ...list('CSS·Web', t.native))
    if (t.params) {
      out.push(`- **기본 수치**: ${t.params.map((p) => `${p.label} ${p.default}${p.unit ?? ''} (${p.min}~${p.max})`).join(' · ')}`)
    }
    const docs = Object.entries(t.docs ?? {}).map(([key, url]) => `[${{ motion: 'motion.dev', gsap: 'gsap.com', native: 'MDN', rn: 'RN' }[key]}](${url})`)
    if (docs.length) out.push(`- **공식 문서**: ${docs.join(' · ')}`)
    out.push('', '```', buildPrompt(t, t.fit === 'gsap' || t.fit === 'native' || t.fit === 'rn' ? t.fit : 'motion', defaultValues(t)), '```', '')
  }
}

out.push('## UI 요소', '', '연출이 붙는 대상. 이름이 정확해야 흔한 구현 관례(위치 · 닫힘 방식)까지 따라온다.', '')
out.push('| 표준 용어 | 원어 | 뜻 |', '| --- | --- | --- |', ...UI_ELEMENTS.map((e) => `| ${e.name} | ${e.english} | ${e.meaning} |`), '')

const text = out.join('\n')
writeFileSync(join(root, 'motion-vocabulary.md'), text)
console.log(`motion-vocabulary.md: ${techniques.length} techniques`)

// 여러 PC 에 동기화되는 skills 저장소. 없으면 건너뜀 (커밋은 직접)
const skill = join(root, '../../skills/skills/motion-vocabulary/references')
if (existsSync(skill)) {
  writeFileSync(join(skill, 'vocabulary.md'), text)
  console.log('→ skills/skills/motion-vocabulary/references/vocabulary.md')
}
