import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// 한글 웹폰트. 화면에 나온 글자가 든 조각만 내려받는 dynamic subset
import 'pretendard/dist/web/variable/pretendardvariable-dynamic-subset.css'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
