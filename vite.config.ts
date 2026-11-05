import type { IncomingMessage, ServerResponse } from 'node:http'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig, type Plugin } from 'vite'

/**
 * 로컬(npm run dev · npm run preview)용 가짜 /api/like.
 * 배포에서는 netlify/functions/like-count.mjs 가 같은 주소 · 같은 응답 모양으로 답한다.
 * 합계는 메모리에만 있어서 서버를 다시 켜면 아래 예시 값으로 돌아간다
 */
function likeCountMock(): Plugin {
  const SLUG = /^[a-z0-9-]{1,40}$/
  // 카드에 합계가 보이도록 넣은 예시 값. 실제 좋아요가 아님
  const counts: Record<string, number> = { stagger: 42, spring: 35, magnetic: 21, 'mask-reveal': 9, easing: 3 }

  const handle = (req: IncomingMessage, res: ServerResponse) => {
    res.setHeader('Content-Type', 'application/json')
    if (req.method === 'GET') {
      res.end(JSON.stringify({ counts }))
      return
    }
    if (req.method !== 'POST') {
      res.statusCode = 405
      res.end('{}')
      return
    }
    let body = ''
    req.on('data', (chunk) => (body += chunk))
    req.on('end', () => {
      try {
        const { slug, delta } = JSON.parse(body)
        if (typeof slug !== 'string' || !SLUG.test(slug) || (delta !== 1 && delta !== -1)) throw new Error('bad request')
        counts[slug] = Math.max(0, (counts[slug] ?? 0) + delta)
        res.end(JSON.stringify({ count: counts[slug] }))
      } catch {
        res.statusCode = 400
        res.end('{}')
      }
    })
  }

  return {
    name: 'like-count-mock',
    configureServer: (server) => void server.middlewares.use('/api/like', handle),
    configurePreviewServer: (server) => void server.middlewares.use('/api/like', handle)
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), likeCountMock()],
})
