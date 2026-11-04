import { getStore } from '@netlify/blobs'

const SLUG = /^[a-z0-9-]{1,40}$/
const MAX_TRIES = 5
const STORE = 'like-counts'

/**
 * 기법별 좋아요 합계. 한 사람이 최대 7까지 주는 한도는 브라우저(src/components/likes.ts)가 지킨다.
 *   GET  /api/like                    → { counts: { [slug]: 합계 } }
 *   POST /api/like { slug, delta }    → { count }   delta 는 1 또는 -1. 합계는 0 아래로 내려가지 않는다
 */
export default async (req) => {
  if (req.method === 'GET') return readAll()
  if (req.method === 'POST') return change(req)
  return new Response('Method Not Allowed', { status: 405, headers: { Allow: 'GET, POST' } })
}

async function readAll() {
  // 읽기는 조금 늦게 반영돼도 괜찮아서 기본(eventual) 일관성으로 빠르게 읽는다
  const store = getStore({ name: STORE })
  const { blobs } = await store.list()
  const entries = await Promise.all(blobs.map(async ({ key }) => [key, Number((await store.get(key, { type: 'json' })) ?? 0)]))
  return Response.json({ counts: Object.fromEntries(entries) }, { headers: { 'Cache-Control': 'no-store' } })
}

async function change(req) {
  let slug, delta
  try {
    ;({ slug, delta } = await req.json())
  } catch {
    return new Response('Bad Request', { status: 400 })
  }
  if (typeof slug !== 'string' || !SLUG.test(slug) || (delta !== 1 && delta !== -1)) return new Response('Bad Request', { status: 400 })

  const store = getStore({ name: STORE, consistency: 'strong' })

  // ETag 조건부 쓰기로 동시에 눌러도 합계가 덮어써지지 않게 함
  for (let i = 0; i < MAX_TRIES; i += 1) {
    const current = await store.getWithMetadata(slug, { type: 'json' })
    const next = Math.max(0, (current?.data ?? 0) + delta)
    const { modified } = await store.setJSON(slug, next, current ? { onlyIfMatch: current.etag } : { onlyIfNew: true })
    if (modified) return Response.json({ count: next })
  }
  return new Response('Conflict', { status: 409 })
}

export const config = { path: '/api/like' }
