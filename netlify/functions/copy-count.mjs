import { getStore } from '@netlify/blobs'

const SLUG = /^[a-z0-9-]{1,40}$/
const MAX_TRIES = 5

export default async (req) => {
  if (req.method !== 'POST') return new Response('Method Not Allowed', { status: 405 })

  let slug
  try {
    ;({ slug } = await req.json())
  } catch {
    return new Response('Bad Request', { status: 400 })
  }
  if (typeof slug !== 'string' || !SLUG.test(slug)) return new Response('Bad Request', { status: 400 })

  const store = getStore({ name: 'copy-counts', consistency: 'strong' })

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
