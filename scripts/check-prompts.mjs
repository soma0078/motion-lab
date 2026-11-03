// 지시문 작성 규칙 검사. 사용: npm run check:prompts
//   1. 기법 용어 "이름(원어)" 가 문장 안에 들어 있다 (원어의 괄호 보충은 빼도 된다. 예: 관성(inertia))
//   2. 명령체: 문장마다 "~해." 로 끝난다
//   3. 슬라이더 최소 · 기본 · 최대값 어디서도 undefined · NaN 이 나오지 않는다
//   4. 둘째 줄은 추천 라이브러리가 있는 기법에만 "~구현해." 한 문장. "둘 다 무난"(both)은 한 줄로 끝난다
import { readdirSync, existsSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const dir = join(root, 'src/techniques')
const load = async (path) => import(pathToFileURL(path).href)
const { buildPrompt, defaultValues } = await load(join(dir, 'prompt.ts'))

const failures = []
let checked = 0

for (const slug of readdirSync(dir)) {
  const metaPath = join(dir, slug, 'meta.ts')
  if (!existsSync(metaPath)) continue
  const technique = { slug, ...(await load(metaPath)).default }
  const fail = (message) => failures.push(`${slug}: ${message}`)

  const params = technique.params ?? []
  const pick = (which) => Object.fromEntries(params.map((p) => [p.key, p[which]]))
  const variants = [defaultValues(technique), ...(params.length ? [pick('min'), pick('max')] : [])]

  for (const values of variants) {
    const text = technique.prompt(values)
    if (/undefined|NaN/.test(text)) fail(`값이 비어 있음 → ${text}`)

    const english = technique.english.replace(/\s*\(.*\)$/, '')
    if (!text.includes(technique.name)) fail(`용어 "${technique.name}" 가 문장에 없음`)
    if (!text.toLowerCase().includes(english.toLowerCase())) fail(`원어 "${english}" 가 문장에 없음`)

    // 소수점(0.5s)에는 뒤에 공백이 없어서 ". " 로 문장을 나눌 수 있다
    for (const sentence of text.split(/(?<=\.)\s+/)) {
      if (!sentence.endsWith('해.')) fail(`명령체("~해.")로 끝나지 않음 → ${sentence}`)
    }

    const lines = buildPrompt(technique, values).split('\n')
    if (technique.fit === 'both' && lines.length !== 1) fail(`둘 다 무난인데 구현 줄이 붙음 → ${lines[1]}`)
    if (technique.fit !== 'both' && !lines[1]?.endsWith('구현해.')) fail(`추천(${technique.fit})인데 구현 줄이 없음`)
  }
  checked += 1
}

const unique = [...new Set(failures)]
if (unique.length) {
  console.error(`지시문 규칙 위반 ${unique.length}건\n- ${unique.join('\n- ')}`)
  process.exit(1)
}
console.log(`지시문 ${checked}개 모두 규칙에 맞음`)
