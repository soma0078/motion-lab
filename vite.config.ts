import type { IncomingMessage, ServerResponse } from 'node:http'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig, type Plugin } from 'vite'

/**
 * 로컬(npm run dev · npm run preview)용 가짜 /api/copy.
 * 배포에서는 netlify/functions/copy-count.mjs 가 같은 주소 · 같은 응답 모양으로 답한다.
 * 횟수는 메모리에만 있어서 서버를 다시 켜면 아래 예시 값으로 돌아간다
 */
function copyCountMock(): Plugin {
  const SLUG = /^[a-z0-9-]{1,40}$/
  // 인기 기법 섹션이 보이도록 넣은 예시 값. 실제 횟수가 아님
  const counts: Record<string, number> = { stagger: 128, spring: 96, magnetic: 64, 'mask-reveal': 40, easing: 12 }

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
        const { slug } = JSON.parse(body)
        if (typeof slug !== 'string' || !SLUG.test(slug)) throw new Error('bad slug')
        counts[slug] = (counts[slug] ?? 0) + 1
        res.end(JSON.stringify({ count: counts[slug] }))
      } catch {
        res.statusCode = 400
        res.end('{}')
      }
    })
  }

  return {
    name: 'copy-count-mock',
    configureServer: (server) => void server.middlewares.use('/api/copy', handle),
    configurePreviewServer: (server) => void server.middlewares.use('/api/copy', handle)
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), copyCountMock()],
})
