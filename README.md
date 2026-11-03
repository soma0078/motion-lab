# Motion Lab

모션 기법 사전. 원하는 움직임의 정확한 이름을 찾고, 어떤 값을 바꾸면 무엇이 달라지는지 데모로 확인할 수 있습니다. 웹(Motion · GSAP · CSS)과 앱(React Native) 기법을 함께 다룹니다.

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="docs/preview-dark.png">
  <img src="docs/preview.png" alt="Motion Lab 첫 화면: 모션 기법 사전 소개와 용어 하나가 조절하는 값 넷으로 이어지는 도면">
</picture>

"부드럽게", "통통 튀게" 같은 말은 사람마다 다르게 받아들입니다. Motion Lab은 모션을 `스태거`, `마스크 리빌`, `오버슈트`처럼 업계에서 통하는 표준 용어로 정리하고, 기법마다 `stiffness`, `damping` 같은 값이 무엇을 바꾸는지 보여 줍니다. 찾은 용어와 지금 값은 명령문 지시문으로 복사해 AI에게 그대로 전달할 수 있습니다.

## Features

- **기법 사전**: 모션 기법을 한글 표준 용어와 원어로 정리하고, 카드마다 실시간 데모를 보여 줍니다.
- **조절하는 값**: 슬라이더가 있는 기법은 값을 움직이면 데모가 그 값으로 다시 재생되고, 값마다 바꾸면 무엇이 달라지는지 설명이 붙어 있습니다.
- **앱 · 제스처 (React Native)**: 스와이프 액션, 바텀시트 스냅, 당겨서 새로고침, 인터럽트 가능한 전환, 누르기 피드백, 롱프레스 메뉴, 컨테이너 트랜스폼, 공유 축, 페이드 스루, 푸시 · 팝, 햅틱 동기화, 스켈레톤 로딩 12개를 React Native(Reanimated · Gesture Handler 등) 기준으로 정리했습니다. 데모는 웹에서 같은 움직임을 비슷하게 보여 주고, 지시문은 React Native로 구현하라는 문장으로 끝납니다.
- **지시문 미리보기와 복사**: 지금 슬라이더 값이 담긴 지시문이 카드 안에 바로 보이고, 작은 버튼으로 복사합니다. 특정 라이브러리를 추천하는 기법만 지시문 끝에 그 라이브러리로 구현하라는 문장이 붙습니다.
- **복사 횟수 · 인기 기법**: 카드마다 지시문이 복사된 횟수를 보여 주고, 히어로 아래에 복사가 가장 많은 기법 5개를 슬라이드로 보여 줍니다 (Motion drag 로 마우스 · 터치로 끌거나, 버튼으로 한 장씩). 횟수는 배포된 사이트의 Netlify Functions · Blobs 에 기록됩니다. 로컬 `npm run dev` · `npm run preview` 에서는 `vite.config.ts` 의 가짜 `/api/copy` 가 예시 횟수로 답하고, 복사한 횟수는 서버를 끄면 사라집니다.
- **공식 문서**: 기법마다 motion.dev · gsap.com · MDN · React Native 관련 문서로 이어지는 링크가 있습니다.
- **검색 · 테마**: 기법 이름, 영문 이름, 뜻, 조절하는 값 이름(예: `damping`)으로 찾을 수 있고 (`/` 로 바로 검색), 라이트 · 다크 테마를 지원합니다.

<img src="docs/card.png" alt="기법 카드: 용어, 데모, 뜻, 조절하는 값과 효과 설명, 지시문 미리보기, 복사 버튼, 공식 문서" width="360">

Motion 추천 기법인 스프링 카드에서 복사하면 이런 지시문이 만들어집니다. 둘 다 무난한 기법은 첫 줄만 복사됩니다.

```
스프링(spring)으로 stiffness 220, damping 8, mass 0.6을 써서 출렁이며 제자리로 돌아오게 해.
Motion으로 구현해.
```

## Getting Started

Node.js 20.19 이상 (또는 22.12 이상)이 필요합니다.

```bash
git clone https://github.com/soma0078/motion-lab.git
cd motion-lab
npm install
npm run dev
```

| 명령 | 설명 |
| --- | --- |
| `npm run dev` | 개발 서버 실행 |
| `npm run build` | 타입 검사 후 프로덕션 빌드 |
| `npm run preview` | 빌드 결과 미리보기 |
| `npm run lint` | oxlint 실행 |
| `npm run check:prompts` | 지시문 작성 규칙 검사 |

`check:prompts` 는 `meta.ts` 를 Node 로 바로 읽어서, `.ts` 타입 제거가 기본으로 켜진 Node(24 등)가 필요합니다.

## Tech Stack

React 19 · Vite · TypeScript · Tailwind CSS v4 · [motion](https://motion.dev) · lucide-react · Pretendard · JetBrains Mono

## Project Structure

```
src/components/   헤더 · 히어로 · 인기 기법 슬라이드 · 기법 카드 · 섹션 제목 · 테마 · 복사 횟수 훅
src/index.css     디자인 토큰 (라이트 · 다크) · 뉴모피즘 그림자 · 설계도 격자
src/techniques/
  <slug>/
    meta.ts     용어 · 뜻 · 섹션 · 추천 · 공식 문서 · 수치 슬라이더와 값마다 효과 설명 · 지시문(prompt)
    demo.tsx    카드 데모 (default export 컴포넌트 하나)
    demo.css    선택. 데모 전용 스타일
  _shared/      데모 공용 훅 · 부품
  registry.ts   폴더를 자동으로 읽어 섹션별 목록을 만듦
  sections.ts   섹션 순서 · 제목 · 설명
  prompt.ts     슬라이더 기본값 · 카드에서 복사할 지시문 만들기
scripts/check-prompts.mjs       지시문 작성 규칙 검사
netlify/functions/copy-count.mjs   복사 횟수 읽기(GET) · 올리기(POST)
```

기법 하나가 폴더 하나입니다. 폴더를 추가하거나 삭제하면 홈 화면에 그대로 반영됩니다.

지시문(`meta.ts` 의 `prompt`)은 기법 용어를 `이름(원어)`로 문장 안에 넣고, 문장마다 `~해.`로 끝나는 명령체로 씁니다. 둘째 줄은 Motion · GSAP · 브라우저 기본 · React Native 를 추천하는 기법에만 붙고(예: `Motion으로 구현해.`), 둘 다 무난한 기법은 라이브러리를 정하지 않습니다. 세부 API 와 코드는 쓰는 AI 가 정합니다. `npm run check:prompts`가 이 규칙을 검사합니다.

## Notes

기법 설명 · 조절하는 값 · 공식 문서 링크는 [motion.dev](https://motion.dev/docs), [gsap.com](https://gsap.com/docs/v3/), [MDN](https://developer.mozilla.org)의 공식 문서와 대조했습니다 (2026-10 기준, motion 14 · GSAP 3.15). 이후 버전에서는 달라질 수 있습니다.

React Native 기법은 [Reanimated](https://docs.swmansion.com/react-native-reanimated/) 4.x, [Gesture Handler](https://docs.swmansion.com/react-native-gesture-handler/) 2.x, [React Navigation](https://reactnavigation.org/), [@gorhom/bottom-sheet](https://gorhom.dev/react-native-bottom-sheet/), [Expo Haptics](https://docs.expo.dev/versions/latest/sdk/haptics/) 문서를 기준으로 정리했습니다 (2026-10). 데모는 웹에서 같은 움직임을 비슷하게 보여 주는 것이고, 실제 React Native 앱에서 실행해 확인한 것은 아닙니다.
