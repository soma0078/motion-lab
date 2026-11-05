import { getStore } from '@netlify/blobs'

const SLUG = /^[a-z0-9-]{1,40}$/
const MAX_TRIES = 5
const STORE = 'copy-counts'

/**
 * 기법별 지시문 복사 횟수.
 *   GET  /api/copy               → { counts: { [slug]: 횟수 } }  카드 표시
 *   POST /api/copy { slug }      → { count }                    복사할 때 1 올림
 */
export default async (req) => {
  if (req.method === 'GET') return readAll()
  if (req.method === 'POST') return increment(req)
  return new Response('Method Not Allowed', { status: 405, headers: { Allow: 'GET, POST' } })
}

async function readAll() {
  // 읽기는 조금 늦게 반영돼도 괜찮아서 기본(eventual) 일관성으로 빠르게 읽는다
  const store = getStore({ name: STORE })
  const { blobs } = await store.list()
  const entries = await Promise.all(blobs.map(async ({ key }) => [key, Number((await store.get(key, { type: 'json' })) ?? 0)]))
  return Response.json({ counts: Object.fromEntries(entries) }, { headers: { 'Cache-Control': 'no-store' } })
}

async function increment(req) {
  let slug
  try {
    ;({ slug } = await req.json())
  } catch {
    return new Response('Bad Request', { status: 400 })
  }
  if (typeof slug !== 'string' || !SLUG.test(slug)) return new Response('Bad Request', { status: 400 })

  const store = getStore({ name: STORE, consistency: 'strong' })

  // ETag 조건부 쓰기로 동시에 눌러도 횟수가 덮어써지지 않게 함
  for (let i = 0; i < MAX_TRIES; i += 1) {
    const current = await store.getWithMetadata(slug, { type: 'json' })
    const next = (current?.data ?? 0) + 1
    const { modified } = await store.setJSON(slug, next, current ? { onlyIfMatch: current.etag } : { onlyIfNew: true })
    if (modified) return Response.json({ count: next })
  }
  return new Response('Conflict', { status: 409 })
}

export const config = { path: '/api/copy' }
