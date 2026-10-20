# 모션 기법 어휘집

> motion-lab 의 `src/techniques/*/meta.ts` 에서 생성됨 (`npm run vocab`). 직접 고치지 않는다.

애니메이션 · 인터랙션을 구현할 때 이 문서의 **표준 용어**로 말하고 이해한다.

- 요청에 표준 용어가 나오면 아래 정의와 API 를 따른다. "부드럽게", "세련되게" 같은 말만 있으면 가까운 기법을 제안하고 수치를 묻는다
- 수치가 요청에 있으면 그대로 쓴다. 없으면 각 기법의 **기본 수치**를 쓰고, 쓴 값을 알려 준다
- 라이브러리는 프로젝트에 이미 있는 것을 쓴다. 둘 다 없으면 추천 쪽을 제안한다
- 모든 모션은 `prefers-reduced-motion` 을 존중한다 (Motion: `<MotionConfig reducedMotion="user">` · GSAP: `gsap.matchMedia()`)

## 시간 · 곡선

무엇이 움직이든 먼저 정하는 것. 얼마나 빨리, 어떤 가감속으로, 어떤 순서로

### 이징 (easing)

시작 · 끝의 가감속 곡선. — 둘 다 무난

- **Motion**: `ease: [0.25, 1, 0.5, 1]`
  - 이름: 'easeOut' · 'circOut' · 키프레임별 ease: [...]
- **GSAP**: `ease: 'power3.out'`
  - power1 quad · 2 cubic · 3 quart · 4 quint (= strong)
  - CustomEase.create('id', 'M0,0 C…')
- **기본 수치**: 길이 1.4s (0.4~2.4)
- **공식 문서**: [motion.dev](https://motion.dev/docs/react-transitions) · [gsap.com](https://gsap.com/docs/v3/Eases)

```
이징(easing): ease-out-quart 곡선 cubic-bezier(0.25, 1, 0.5, 1)로 1.4s 동안 빠르게 출발해 길게 감속하게.
구현: Motion — transition={{ duration: 1.4, ease: [0.25, 1, 0.5, 1] }}
```

### 스프링 (spring)

시간 대신 stiffness · damping 같은 물리값으로 움직임. — Motion 추천

- **Motion**: `type: 'spring', stiffness, damping, mass`
  - 또는 visualDuration: 0.4, bounce: 0.25 (stiffness 주면 무시)
- **GSAP**: `진짜 스프링 없음 → 'elastic.out(1, 0.3)' 근사`
  - CustomBounce · CustomWiggle
- **기본 수치**: stiffness 220 (50~600) · damping 8 (2~40)
- **공식 문서**: [motion.dev](https://motion.dev/docs/react-transitions) · [gsap.com](https://gsap.com/docs/v3/Eases/CustomBounce)

```
스프링(spring): 스프링(stiffness 220, damping 8, mass 0.6)으로 출렁이며 제자리로 돌아오게.
구현: Motion — transition={{ type: 'spring', stiffness: 220, damping: 8, mass: 0.6 }}
```

### 오버슈트 (overshoot)

목표 지점을 살짝 넘었다가 돌아옴. — 둘 다 무난

- **Motion**: `ease: 'backOut'`
  - type: 'spring', bounce: 0.4
- **GSAP**: `ease: 'back.out(1.7)'`
- **기본 수치**: 넘는 정도 0.55 (0~1)
- **공식 문서**: [motion.dev](https://motion.dev/docs/react-transitions) · [gsap.com](https://gsap.com/docs/v3/Eases)

```
오버슈트(overshoot): 목표를 살짝 넘었다 돌아오게. 오버슈트 곡선 cubic-bezier(0.34, 1.55, 0.64, 1), 0.9s.
구현: Motion — transition={{ duration: 0.9, ease: [0.34, 1.55, 0.64, 1] }}
```

### 키프레임 (keyframe)

시간 위 지점별로 정한 값. 사이는 보간. — 둘 다 무난

- **Motion**: `x: [0, 80, 40]`
  - transition: { times: [0, 0.6, 1] }
- **GSAP**: `keyframes: [{ x: 80 }, { x: 40 }]`
  - 배열형 { x: [0, 80, 40], easeEach } · %형 { '50%': { x: 80 } }
- **공식 문서**: [motion.dev](https://motion.dev/docs/react-animation) · [gsap.com](https://gsap.com/resources/keyframes/)

```
키프레임(keyframe): 시간 위 지점별로 정한 값. 사이는 보간.
구현: Motion — x: [0, 80, 40]
```

### 스태거 (stagger)

여러 요소의 시작을 일정 간격으로 어긋나게. — 둘 다 무난

- **Motion**: `컴포넌트: 부모 variant transition: { delayChildren: stagger(0.08) }`
  - animate() 에서는 delay: stagger(0.08) · 역순 { from: 'last' }
  - staggerChildren 은 deprecated
- **GSAP**: `stagger: 0.08`
  - stagger: { each: 0.08, from: 'center', grid: 'auto' } · each 와 amount 중 하나
- **기본 수치**: 간격 0.08s (0.02~0.3) · 각 길이 0.5s (0.2~1.2)
- **공식 문서**: [motion.dev](https://motion.dev/docs/stagger) · [gsap.com](https://gsap.com/resources/getting-started/Staggers)

```
스태거(stagger): 스태거로 0.08s 간격을 두고, 하나씩 0.5s ease-out-quart로 아래에서 올라오게.
구현: Motion — 부모 variant transition: { delayChildren: stagger(0.08) } · 자식 { duration: 0.5, ease: [0.25, 1, 0.5, 1] }
```

### 타임라인 (timeline)

여러 모션을 한 줄에 놓고 겹침 · 순서를 정해 통째로 재생 · 되감기. — GSAP 추천

- **Motion**: `useAnimate() → animate([[a, …], [b, …, { at: '<' }]])`
  - at: 숫자 · '+0.5' · '-0.2' · '<+0.2' · 라벨
- **GSAP**: `gsap.timeline({ defaults }) + 위치 '<' · '>' · '-=0.2' · '<0.1'`
  - tl.addLabel('in') → 'in+=0.2'
- **공식 문서**: [motion.dev](https://motion.dev/docs/animate) · [gsap.com](https://gsap.com/docs/v3/GSAP/Timeline/)

```
타임라인(timeline): 여러 모션을 한 줄에 놓고 겹침 · 순서를 정해 통째로 재생 · 되감기.
구현: GSAP — gsap.timeline({ defaults }) + 위치 '<' · '>' · '-=0.2' · '<0.1'
```

## 나타남 · 전환

요소가 생기고, 사라지고, 다른 것으로 바뀌는 순간

### 페이드 인 · 아웃 (fade in · out)

투명도로 나타나고 사라짐. — 둘 다 무난

- **Motion**: `initial={{ opacity: 0 }} animate={{ opacity: 1 }}`
- **GSAP**: `autoAlpha: 0 → 1 (0 이면 visibility: hidden · 클릭도 막힘)`
- **공식 문서**: [motion.dev](https://motion.dev/docs/react-animation) · [gsap.com](https://gsap.com/docs/v3/GSAP/CorePlugins/CSS/)

```
페이드 인 · 아웃(fade in · out): 투명도로 나타나고 사라짐.
구현: Motion — initial={{ opacity: 0 }} animate={{ opacity: 1 }}
```

### 진입 · 퇴장 (enter · exit)

요소가 나타날 때 · 사라질 때의 모션. — Motion 추천

- **Motion**: `<AnimatePresence> + 자식 key + exit`
  - 첫 렌더 생략 initial={false} · useIsPresent / usePresence
- **GSAP**: `useGSAP 는 언마운트 시 revert 만 → 퇴장 트윈 onComplete 에서 setState`
  - 리스트: Flip.from(state, { onEnter, onLeave, absolute: true })
- **기본 수치**: 진입 0.4s (0.1~1) · 퇴장 0.25s (0.1~1)
- **공식 문서**: [motion.dev](https://motion.dev/docs/react-animate-presence) · [gsap.com](https://gsap.com/resources/React/)

```
진입 · 퇴장(enter · exit): 토스트가 아래 24px에서 0.4s ease-out-quart로 올라오며 나타나고, 사라질 때는 0.25s ease-in으로 위로 빠지게. 퇴장은 진입보다 짧게.
구현: Motion — <AnimatePresence> + initial={{ y: 24, opacity: 0 }} animate={{ y: 0, opacity: 1, transition: { duration: 0.4 } }} exit={{ y: -12, opacity: 0, transition: { duration: 0.25 } }}
```

### 크로스페이드 (crossfade)

앞 요소가 사라지는 동안 뒤 요소가 겹쳐 나타남. — 둘 다 무난

- **Motion**: `<AnimatePresence> 기본 mode='sync' + absolute 겹치기`
  - 순차 mode='wait' · 주변 리플로 mode='popLayout'
- **GSAP**: `tl.to(a, { autoAlpha: 0 }).to(b, { autoAlpha: 1 }, '<')`
  - 요소 교체: data-flip-id + Flip.from(state, { fade: true })
- **공식 문서**: [motion.dev](https://motion.dev/docs/react-animate-presence) · [gsap.com](https://gsap.com/docs/v3/Plugins/Flip/)

```
크로스페이드(crossfade): 앞 요소가 사라지는 동안 뒤 요소가 겹쳐 나타남.
구현: Motion — <AnimatePresence> 기본 mode='sync' + absolute 겹치기
```

### 마스크 리빌 (mask reveal)

틀 밖을 가린 채 열어 드러냄. — 둘 다 무난

- **Motion**: `overflow-hidden 틀 + y: '110%' → 0`
  - clipPath: 'inset(0 100% 0 0)' → 'inset(0 0% 0 0)'
- **GSAP**: `SplitText.create(el, { type: 'lines', mask: 'lines', autoSplit: true, onSplit })`
  - onSplit 에서 트윈을 return (리스플릿 때 진행도 유지)
- **기본 수치**: 길이 0.9s (0.4~1.6) · 줄 간격 0.12s (0~0.4)
- **공식 문서**: [motion.dev](https://motion.dev/docs/react-animation) · [gsap.com](https://gsap.com/docs/v3/Plugins/SplitText/)

```
마스크 리빌(mask reveal): overflow: hidden 틀 아래 110%에서 줄마다 0.12s 스태거로 0.9s ease-out-quart로 올라오게. 투명도는 쓰지 않는다.
구현: Motion — overflow-hidden 틀 + 줄 y: '110%' → 0, { duration: 0.9, ease: [0.25, 1, 0.5, 1], delay: stagger(0.12) }
```

### 텍스트 스플릿 (split text)

글자 · 단어 · 줄 단위로 쪼개 하나씩 움직임. — GSAP 추천

- **Motion**: `직접 span 분리 + delayChildren: stagger()`
  - splitText 는 Motion+ 유료 (motion-plus)
- **GSAP**: `SplitText.create(el, { type: 'words,chars' })`
  - chars 만 쓰면 줄바꿈 어색 → words 함께 · smartWrap
  - aria: 'auto' 기본 · 끝나면 revert()
- **기본 수치**: 글자 간격 0.06s (0.02~0.2)
- **공식 문서**: [motion.dev](https://motion.dev/docs/react-split-text) · [gsap.com](https://gsap.com/docs/v3/Plugins/SplitText/)

```
텍스트 스플릿(split text): 글자 단위로 쪼개 0.06s 스태거로, spring(stiffness 320, damping 18)으로 아래에서 튀어 오르게.
구현: GSAP — SplitText.create(el, { type: 'words,chars' }) → gsap.from(split.chars, { yPercent: 110, ease: 'back.out(2)', stagger: 0.06 })
```

### 스크램블 텍스트 (scramble text)

글자가 무작위 문자로 뒤섞이다 원래 글자로 맞춰짐. — GSAP 추천

- **Motion**: `무료 API 없음 → 직접 구현 (interval + 문자 치환)`
- **GSAP**: `scrambleText: { text, chars: 'upperCase', revealDelay: 0.5, speed: 0.3 }`
- **기본 수치**: 길이 1.4s (0.4~3)
- **공식 문서**: [gsap.com](https://gsap.com/docs/v3/Plugins/ScrambleTextPlugin/)

```
스크램블 텍스트(scramble text): 글자가 무작위 문자로 뒤섞이다 앞에서부터 1.4s 동안 차례로 원래 글자로 확정되게.
구현: GSAP — gsap.to(el, { duration: 1.4, scrambleText: { text, chars: 'upperCase' } })
```

### 숫자 카운트업 (count up)

숫자가 목표값까지 올라감. — 둘 다 무난

- **Motion**: `animate(motionValue, 1000) + useTransform(Math.round)`
  - AnimateNumber 는 Motion+ 유료
- **GSAP**: `const o = { v: 0 }; gsap.to(o, { v: 1000, onUpdate: () => el.textContent = Math.round(o.v).toLocaleString() })`
  - 정수만: gsap.to(el, { innerText: 1000, snap: { innerText: 1 } }) (공식 예제 아님)
- **기본 수치**: 길이 1.6s (0.4~3)
- **공식 문서**: [motion.dev](https://motion.dev/docs/react-animate-number) · [gsap.com](https://gsap.com/docs/v3/GSAP/CorePlugins/Snap)

```
숫자 카운트업(count up): 숫자가 0에서 목표값까지 1.6s 동안 ease-out-quart로 올라가 끝에서 감속하게. 정수 · 천 단위 콤마.
구현: Motion — animate(count, target, { duration: 1.6, ease: [0.25, 1, 0.5, 1] }) + useTransform(count, (n) => Math.round(n).toLocaleString())
```

### 공유 레이아웃 전환 (shared layout transition)

같은 요소가 화면 · 상태가 바뀌어도 위치 · 크기를 이어 움직임. — Motion 추천

- **Motion**: `layout · layoutId`
  - 따로 렌더되는 형제 <LayoutGroup> · 스크롤 안 layoutScroll · 비율 바뀌면 layout='position'
- **GSAP**: `Flip.getState() → 상태 변경 → Flip.from(state, { absolute, targets })`
  - React: 렌더 후(useLayoutEffect) 호출 · data-flip-id
- **공식 문서**: [motion.dev](https://motion.dev/docs/react-layout-animations) · [gsap.com](https://gsap.com/docs/v3/Plugins/Flip/)

```
공유 레이아웃 전환(shared layout transition): 같은 요소가 화면 · 상태가 바뀌어도 위치 · 크기를 이어 움직임.
구현: Motion — layout · layoutId
```

### 페이지 전환 (page transition)

라우트가 바뀔 때 이전 화면이 나가고 새 화면이 들어옴. — Motion 추천

- **Motion**: `<AnimatePresence mode='wait'> + 라우트 key`
  - 공유 요소는 layoutId
- **GSAP**: `퇴장 트윈 onComplete 에서 navigate · 또는 Flip`
- **공식 문서**: [motion.dev](https://motion.dev/docs/react-animate-presence) · [gsap.com](https://gsap.com/resources/React/)

```
페이지 전환(page transition): 라우트가 바뀔 때 이전 화면이 나가고 새 화면이 들어옴.
구현: Motion — <AnimatePresence mode='wait'> + 라우트 key
```

### 이미지 리빌 (image reveal)

틀이 열리며 이미지가 드러나고, 안쪽 이미지는 확대에서 제자리로. — 둘 다 무난

- **Motion**: `틀 clipPath: 'inset(100% 0% 0% 0%)' → 'inset(0% 0% 0% 0%)'`
  - 안쪽 img scale: 1.3 → 1 (더 길게)
- **GSAP**: `tl.from(frame, { clipPath: 'inset(100% 0% 0% 0%)' }).from(img, { scale: 1.3 }, '<')`
  - 모양 · 점 개수 · 단위가 같아야 보간 (0 대신 0%)
- **기본 수치**: 시작 배율 1.3× (1~1.8) · 길이 0.9s (0.4~2)
- **공식 문서**: [motion.dev](https://motion.dev/docs/react-animation) · [gsap.com](https://gsap.com/docs/v3/GSAP/CorePlugins/CSS/)

```
이미지 리빌(image reveal): 틀이 아래에서 위로 0.9s 동안 열리고, 안쪽 이미지는 1.3배에서 1배로 조금 더 길게 줄어들게.
구현: Motion — 틀 clipPath: 'inset(100% 0% 0% 0%)' → 'inset(0% 0% 0% 0%)' (0.9s) · img scale: 1.3 → 1 (1.30s)
```

### 필터 · 색 전환 (filter · color)

흐림 · 흑백 · 색이 서서히 바뀜. — 둘 다 무난

- **Motion**: `filter: 'blur(10px)' → 'blur(0px)' · backgroundColor 보간`
  - CSS 변수 '--x' 도 보간
- **GSAP**: `filter: 'blur(10px)' · backgroundColor`
  - CSS 변수 트윈 '--angle': '360deg'
  - 그라디언트 각도는 @property --angle { syntax: '<angle>' } 등록해야 부드러움
- **공식 문서**: [motion.dev](https://motion.dev/docs/react-animation) · [gsap.com](https://gsap.com/docs/v3/GSAP/CorePlugins/CSS/)

```
필터 · 색 전환(filter · color): 흐림 · 흑백 · 색이 서서히 바뀜.
구현: Motion — filter: 'blur(10px)' → 'blur(0px)' · backgroundColor 보간
```

### View Transitions (view transitions API)

화면 상태가 바뀔 때 브라우저가 이전 · 다음 스냅샷을 이어 붙여 전환. — 브라우저 기본으로 충분

- **Motion**: `animateView(() => update()) (무료 motion 패키지)`
  - React 안에서는 layoutId 로도 같은 효과
- **GSAP**: `JS 대안: Flip`
- **CSS·Web**: `React 19.3: <ViewTransition> + startTransition (startViewTransition 직접 호출 금지)`
  - React 밖: document.startViewTransition(() => update())
  - CSS view-transition-name: hero · ::view-transition-old/new(hero)
  - 지원 Chrome 111 · Safari 18 · Firefox 144
- **공식 문서**: [motion.dev](https://motion.dev/docs/animate-view) · [gsap.com](https://gsap.com/docs/v3/Plugins/Flip/) · [MDN](https://developer.mozilla.org/en-US/docs/Web/API/View_Transition_API)

```
View Transitions(view transitions API): 화면 상태가 바뀔 때 브라우저가 이전 · 다음 스냅샷을 이어 붙여 전환.
구현: CSS·Web — React 19.3: <ViewTransition> + startTransition (startViewTransition 직접 호출 금지)
```

## 모양 · 경로

위치가 아니라 생김새 자체가 변하거나, 정해진 길을 따라감. 주로 SVG

### 모핑 (morphing)

모양 자체가 다른 모양으로 변함. — GSAP 추천

- **Motion**: `d 네이티브 보간 (명령 수 · 종류 같을 때만)`
  - 많이 다르면 Flubber · borderRadius 는 style 로 지정
- **GSAP**: `MorphSVGPlugin (점 개수 · 종류 달라도 됨)`
  - circle/rect 는 convertToPath() · 꼬이면 shapeIndex
- **공식 문서**: [motion.dev](https://motion.dev/docs/react-svg-animation) · [gsap.com](https://gsap.com/docs/v3/Plugins/MorphSVGPlugin/)

```
모핑(morphing): 모양 자체가 다른 모양으로 변함.
구현: GSAP — MorphSVGPlugin (점 개수 · 종류 달라도 됨)
```

### 라인 드로잉 (line drawing)

선이 그려지듯 나타남. — 둘 다 무난

- **Motion**: `pathLength: 0 → 1`
  - pathOffset · pathSpacing (0~1)
- **GSAP**: `gsap.from(path, { drawSVG: 0 }) (DrawSVGPlugin)`
  - stroke 지정돼 있어야 보임
- **공식 문서**: [motion.dev](https://motion.dev/docs/react-svg-animation) · [gsap.com](https://gsap.com/docs/v3/Plugins/DrawSVGPlugin/)

```
라인 드로잉(line drawing): 선이 그려지듯 나타남.
구현: Motion — pathLength: 0 → 1
```

### 모션 패스 (motion path)

요소가 정해진 곡선 경로를 따라 이동. — GSAP 추천

- **Motion**: `CSS offset-path + offsetDistance: '0%' → '100%'`
- **GSAP**: `motionPath: { path, align: path, alignOrigin: [0.5, 0.5], autoRotate: true }`
  - start · end (0~1) 로 구간 지정 · MotionPathPlugin
- **공식 문서**: [gsap.com](https://gsap.com/docs/v3/Plugins/MotionPathPlugin/) · [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/offset-path)

```
모션 패스(motion path): 요소가 정해진 곡선 경로를 따라 이동.
구현: GSAP — motionPath: { path, align: path, alignOrigin: [0.5, 0.5], autoRotate: true }
```

### 텍스트 경로 (text on path)

글자가 곡선을 따라 흐름. — GSAP 추천

- **Motion**: `<motion.textPath startOffset={mv}> (SVG textPath)`
- **GSAP**: `gsap.to(textPath, { attr: { startOffset: '100%' } })`
  - 시작값도 % 로 (AttrPlugin 은 단위 변환 안 함)
- **공식 문서**: [motion.dev](https://motion.dev/docs/react-svg-animation) · [gsap.com](https://gsap.com/docs/v3/GSAP/CorePlugins/Attributes/)

```
텍스트 경로(text on path): 글자가 곡선을 따라 흐름.
구현: GSAP — gsap.to(textPath, { attr: { startOffset: '100%' } })
```

## 스크롤

시간 대신 스크롤 위치가 진행도를 정하거나, 스크롤이 재생을 시작함

### 스크롤 진입 (scroll-triggered reveal)

요소가 화면에 들어오면 자기 시간으로 끝까지 재생. — 둘 다 무난

- **Motion**: `whileInView + viewport={{ once: true }}`
  - 여러 개면 variants + delayChildren: stagger()
- **GSAP**: `scrollTrigger: { toggleActions: 'play none none reverse' }`
  - 여러 개면 ScrollTrigger.batch('.card', { onEnter })
- **공식 문서**: [motion.dev](https://motion.dev/docs/react-scroll-animations) · [gsap.com](https://gsap.com/docs/v3/Plugins/ScrollTrigger/)

```
스크롤 진입(scroll-triggered reveal): 요소가 화면에 들어오면 자기 시간으로 끝까지 재생.
구현: Motion — whileInView + viewport={{ once: true }}
```

### 스크롤 스크러빙 (scroll scrubbing)

스크롤 진행도에 애니메이션을 직접 묶음. — GSAP 추천

- **Motion**: `useScroll({ target, offset: ['start end', 'end start'] }) + useTransform`
  - 부드럽게: useSpring(scrollYProgress)
- **GSAP**: `scrollTrigger: { scrub: true }`
  - 부드럽게: scrub: 1 (초 단위로 따라잡음)
- **공식 문서**: [motion.dev](https://motion.dev/docs/react-scroll-animations) · [gsap.com](https://gsap.com/docs/v3/Plugins/ScrollTrigger/)

```
스크롤 스크러빙(scroll scrubbing): 스크롤 진행도에 애니메이션을 직접 묶음.
구현: GSAP — scrollTrigger: { scrub: true }
```

### 핀 (pin (sticky))

화면을 고정해 둔 채 스크롤로 진행. — GSAP 추천

- **Motion**: `긴 wrapper + CSS position: sticky + useScroll({ target })`
- **GSAP**: `scrollTrigger: { pin: true, end: '+=1500', scrub: true }`
  - pin 만 쓰면 고정만 됨 · pinSpacing
- **공식 문서**: [motion.dev](https://motion.dev/docs/react-scroll-animations) · [gsap.com](https://gsap.com/docs/v3/Plugins/ScrollTrigger/)

```
핀(pin (sticky)): 화면을 고정해 둔 채 스크롤로 진행.
구현: GSAP — scrollTrigger: { pin: true, end: '+=1500', scrub: true }
```

### 가로 스크롤 (horizontal scroll)

세로로 스크롤하면 섹션이 옆으로 흘러감. — GSAP 추천

- **Motion**: `useScroll({ target, offset: ['start start', 'end end'] }) + useTransform(…, ['0%', '-75%'])`
  - 300vh 바깥 > sticky 100vh overflow-hidden > motion.div style={{ x }}
- **GSAP**: `pin + scrub 트윈 x: -(w - innerWidth), ease: 'none'`
  - 안쪽 트리거는 containerAnimation: tween (pin · snap 불가)
- **공식 문서**: [motion.dev](https://motion.dev/docs/react-scroll-animations) · [gsap.com](https://gsap.com/docs/v3/Plugins/ScrollTrigger/)

```
가로 스크롤(horizontal scroll): 세로로 스크롤하면 섹션이 옆으로 흘러감.
구현: GSAP — pin + scrub 트윈 x: -(w - innerWidth), ease: 'none'
```

### 패럴랙스 (parallax)

레이어마다 스크롤 속도를 달리해 깊이감을 줌. — 둘 다 무난

- **Motion**: `useTransform(scrollYProgress, [0, 1], [0, -200]) · 레이어마다 범위 다르게`
- **GSAP**: `scrub + 레이어별 yPercent`
  - ScrollSmoother { effects: true } + data-speed · data-lag
- **공식 문서**: [motion.dev](https://motion.dev/docs/react-scroll-animations) · [gsap.com](https://gsap.com/docs/v3/Plugins/ScrollSmoother/)

```
패럴랙스(parallax): 레이어마다 스크롤 속도를 달리해 깊이감을 줌.
구현: Motion — useTransform(scrollYProgress, [0, 1], [0, -200]) · 레이어마다 범위 다르게
```

### 스크롤 스냅 (scroll snap)

스크롤이 정해진 지점에 맞춰 멈춤. — 둘 다 무난

- **Motion**: `CSS scroll-snap-type (라이브러리 불필요)`
- **GSAP**: `scrollTrigger: { snap: 1 / (n - 1) }`
  - snap: { snapTo: 'labels', duration: { min: 0.2, max: 0.6 } }
- **공식 문서**: [gsap.com](https://gsap.com/docs/v3/Plugins/ScrollTrigger/) · [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/scroll-snap-type)

```
스크롤 스냅(scroll snap): 스크롤이 정해진 지점에 맞춰 멈춤.
구현: Motion — CSS scroll-snap-type (라이브러리 불필요)
```

### 섹션 스와이프 (section swipe)

휠 · 터치 한 번에 풀스크린 섹션이 하나씩 넘어감. — GSAP 추천

- **Motion**: `wheel · pointer 이벤트 직접 처리 + AnimatePresence`
- **GSAP**: `Observer.create({ type: 'wheel,touch,pointer', onDown, onUp, tolerance: 10 })`
- **공식 문서**: [gsap.com](https://gsap.com/docs/v3/Plugins/Observer/)

```
섹션 스와이프(section swipe): 휠 · 터치 한 번에 풀스크린 섹션이 하나씩 넘어감.
구현: GSAP — Observer.create({ type: 'wheel,touch,pointer', onDown, onUp, tolerance: 10 })
```

### 속도 반응 (velocity-based)

스크롤 · 드래그 속도에 따라 기울기 · 흐림이 변함. — Motion 추천

- **Motion**: `useVelocity(scrollY) → useTransform(v, [-400, 400], [-10, 10]) → useSpring`
  - style={{ skewY }} · 속도는 px/s 라 수천까지 튐 → 범위 밖은 clamp
- **GSAP**: `ScrollTrigger onUpdate: self => skewTo(self.getVelocity() / -300)`
  - const skewTo = gsap.quickTo(el, 'skewY')
- **공식 문서**: [motion.dev](https://motion.dev/docs/react-use-velocity) · [gsap.com](https://gsap.com/docs/v3/Plugins/ScrollTrigger/getVelocity())

```
속도 반응(velocity-based): 스크롤 · 드래그 속도에 따라 기울기 · 흐림이 변함.
구현: Motion — useVelocity(scrollY) → useTransform(v, [-400, 400], [-10, 10]) → useSpring
```

### CSS 스크롤 타임라인 (scroll-driven animations)

JS 없이 CSS 만으로 스크롤 진행도에 애니메이션을 묶음. — 브라우저 기본으로 충분

- **Motion**: `스크롤 연동은 가능하면 브라우저 ScrollTimeline 으로 실행 (안 되면 JS)`
- **GSAP**: `ScrollTrigger (JS 계산)`
- **CSS·Web**: `animation-timeline: scroll() · view()`
  - view() 에 animation-range: entry 0% cover 40% (요소가 화면에 들어오는 구간)
  - 형제 요소면 공통 부모에 timeline-scope
  - 지원 Chrome 115 · Safari 26 · Firefox 159 → @supports (animation-timeline: scroll()) 로 가드
- **공식 문서**: [motion.dev](https://motion.dev/docs/react-scroll-animations) · [gsap.com](https://gsap.com/docs/v3/Plugins/ScrollTrigger/) · [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_scroll-driven_animations)

```
CSS 스크롤 타임라인(scroll-driven animations): JS 없이 CSS 만으로 스크롤 진행도에 애니메이션을 묶음.
구현: CSS·Web — animation-timeline: scroll() · view()
```

## 인터랙션

사용자가 올리고, 누르고, 끌 때의 반응

### 호버 (hover)

포인터가 올라가 있는 동안. — Motion 추천

- **Motion**: `whileHover · onHoverStart / onHoverEnd`
- **GSAP**: `const { contextSafe } = useGSAP({ scope })`
  - onMouseEnter={contextSafe(() => gsap.to(…))}
- **공식 문서**: [motion.dev](https://motion.dev/docs/react-gestures) · [gsap.com](https://gsap.com/resources/React/)

```
호버(hover): 포인터가 올라가 있는 동안.
구현: Motion — whileHover · onHoverStart / onHoverEnd
```

### 마이크로 인터랙션 (micro-interaction)

버튼 · 토글 같은 작은 조작에 붙는 짧은 피드백. — Motion 추천

- **Motion**: `whileTap + spring (키보드 Enter 도 동작)`
  - whileFocus
- **GSAP**: `onClick → contextSafe(짧은 timeline)`
- **기본 수치**: stiffness 500 (100~900) · damping 30 (5~50)
- **공식 문서**: [motion.dev](https://motion.dev/docs/react-gestures) · [gsap.com](https://gsap.com/docs/v3/GSAP/Timeline/)

```
마이크로 인터랙션(micro-interaction): 토글 손잡이가 spring(stiffness 500, damping 30)으로 짧고 단단하게 이동하고, 하트는 누르면 1.25배로 한 번 튀게.
구현: Motion — animate={{ x: on ? 28 : 0 }} transition={{ type: 'spring', stiffness: 500, damping: 30 }}
```

### 마그네틱 (magnetic)

커서 쪽으로 끌려옴. — 둘 다 무난

- **Motion**: `useMotionValue + useSpring(src, { stiffness, damping })`
  - v14: useFollowValue(src, transition) · spring 외 tween 도 (타입 정의 기준)
- **GSAP**: `const xTo = gsap.quickTo(el, 'x', { duration: 0.4, ease: 'power3' })`
  - mousemove 에서 xTo(v) · y 도 하나 더
- **기본 수치**: 범위 90px (40~140) · 끌림 0.35 (0.1~0.8) · stiffness 220 (50~500) · damping 12 (4~40)
- **공식 문서**: [motion.dev](https://motion.dev/docs/react-use-spring) · [gsap.com](https://gsap.com/docs/v3/GSAP/gsap.quickTo())

```
마그네틱(magnetic): 커서가 90px 안에 들어오면 버튼이 커서 거리의 35%만큼 끌려오게. 따라오고 돌아올 때 spring(stiffness 220, damping 12).
구현: Motion — pointer 오프셋 × 0.35 → useMotionValue → useSpring(mv, { stiffness: 220, damping: 12 })
```

### 러버밴드 (rubber band)

끝을 넘겨 끌면 저항하다 놓으면 되돌아옴. — Motion 추천

- **Motion**: `drag + dragConstraints + dragElastic (0~1)`
  - dragTransition: { bounceStiffness, bounceDamping } · whileDrag
- **GSAP**: `Draggable.create(el, { bounds, edgeResistance: 0.65, inertia: true })`
  - inertia 는 InertiaPlugin 필요
- **기본 수치**: 따라옴 0.35 (0.05~1) · 복귀 damping 14 (5~40)
- **공식 문서**: [motion.dev](https://motion.dev/docs/react-drag) · [gsap.com](https://gsap.com/docs/v3/Plugins/Draggable/)

```
러버밴드(rubber band): 끌 범위를 넘겨 끌면 거리의 35%만 따라오며 저항하고, 놓으면 bounce(stiffness 400, damping 14)로 되돌아오게.
구현: Motion — drag dragConstraints={{ left: 0, right: 0 }} dragElastic={0.35} dragTransition={{ bounceStiffness: 400, bounceDamping: 14 }}
```

### 리스트 재정렬 (reorder)

항목을 끌어 순서를 바꾸면 나머지가 자리를 비켜 줌. — Motion 추천

- **Motion**: `<Reorder.Group values onReorder> + <Reorder.Item value>`
  - axis 자동 감지 · 가장자리로 끌면 컨테이너 자동 스크롤
- **GSAP**: `Draggable + 놓을 때 Flip 으로 자리 이동`
- **공식 문서**: [motion.dev](https://motion.dev/docs/react-reorder) · [gsap.com](https://gsap.com/docs/v3/Plugins/Draggable/)

```
리스트 재정렬(reorder): 항목을 끌어 순서를 바꾸면 나머지가 자리를 비켜 줌.
구현: Motion — <Reorder.Group values onReorder> + <Reorder.Item value>
```

### 3D 틸트 · 플립 (3D tilt · flip)

perspective 로 카드가 커서 쪽으로 기울거나 뒤집힘. — 둘 다 무난

- **Motion**: `style={{ rotateX, rotateY, transformPerspective: 500 }}`
  - 플립 rotateY: 180 + backfaceVisibility: 'hidden'
- **GSAP**: `gsap.to(el, { rotationY: 180 }) (rotateY 별칭도 동작)`
  - 공통 소실점 gsap.set(parent, { perspective: 500 }) · 개별 transformPerspective
- **기본 수치**: 최대 기울기 18° (5~35) · perspective 500px (200~1200)
- **공식 문서**: [motion.dev](https://motion.dev/docs/react-animation) · [gsap.com](https://gsap.com/docs/v3/GSAP/CorePlugins/CSS/)

```
3D 틸트 · 플립(3D tilt · flip): 카드가 커서 쪽으로 최대 18°까지 기울게 (perspective 500px, spring으로 따라옴). 클릭하면 rotateY 180°로 뒤집힘.
구현: Motion — style={{ rotateX, rotateY, transformPerspective: 500 }} · useTransform(pointer, [-1, 1], [-18, 18])
```

### 커스텀 커서 (custom cursor)

기본 커서 대신 따라다니는 원. 올린 요소에 따라 모양이 바뀜. — 둘 다 무난

- **Motion**: `useMotionValue(clientX) + useSpring · pointer-events: none`
  - Cursor 컴포넌트는 Motion+ 유료
- **GSAP**: `gsap.quickTo(cursor, 'x', { duration: 0.6, ease: 'power3' }) + mousemove`
  - 가운데 맞춤 xPercent: -50 · yPercent: -50
- **기본 수치**: stiffness 300 (50~800) · damping 28 (5~50)
- **공식 문서**: [motion.dev](https://motion.dev/docs/react-use-spring) · [gsap.com](https://gsap.com/docs/v3/GSAP/gsap.quickTo())

```
커스텀 커서(custom cursor): 기본 커서 대신 점과 원을 그리고, 원은 spring(stiffness 300, damping 28)으로 한 박자 늦게 따라오게. 링크 위에서는 원이 커짐.
구현: Motion — useMotionValue(clientX) → useSpring(mv, { stiffness: 300, damping: 28 }) · pointer-events: none
```

### 관성 (inertia (fling))

던지면 속도를 이어받아 미끄러지다 감속해 멈춤. — 둘 다 무난

- **Motion**: `drag 기본 관성 (끄기 dragMomentum={false}) · dragTransition: { power, timeConstant }`
  - animate(x, 0, { type: 'inertia', velocity, min, max }) · 기본 power 0.8 · timeConstant 700
- **GSAP**: `gsap.registerPlugin(Draggable, InertiaPlugin) → Draggable.create(el, { inertia: true, snap })`
  - 트윈: InertiaPlugin.track(el, 'x') 후 inertia: { x: 'auto' }
- **기본 수치**: power 0.8 (0.2~1.5) · timeConstant 350ms (100~900)
- **공식 문서**: [motion.dev](https://motion.dev/docs/react-drag) · [gsap.com](https://gsap.com/docs/v3/Plugins/InertiaPlugin/)

```
관성(inertia (fling)): 던지면 속도를 이어받아 미끄러지다 감속해 멈추게 (power 0.8, timeConstant 350ms). 벽에 닿으면 튕겨 돌아옴.
구현: Motion — drag dragTransition={{ power: 0.8, timeConstant: 350 }}
```

## 반복

입력 없이 계속 도는 배경 · 로딩 연출

### 마키 (marquee)

글자 · 로고가 한 방향으로 끝없이 흐름. — 둘 다 무난

- **Motion**: `콘텐츠 2벌 + x: ['0%', '-50%'], repeat: Infinity, ease: 'linear'`
  - Ticker 컴포넌트는 Motion+ 유료
- **GSAP**: `콘텐츠 2벌 + xPercent: -50, repeat: -1, ease: 'none'`
  - 반응형 · 드래그: horizontalLoop(items, { speed, draggable }) 헬퍼
- **공식 문서**: [motion.dev](https://motion.dev/docs/react-transitions) · [gsap.com](https://gsap.com/docs/v3/HelperFunctions/helpers/seamlessLoop)

```
마키(marquee): 글자 · 로고가 한 방향으로 끝없이 흐름.
구현: Motion — 콘텐츠 2벌 + x: ['0%', '-50%'], repeat: Infinity, ease: 'linear'
```

### 쉬머 (shimmer)

빛줄기가 표면을 훑고 지나감. 주로 로딩 표시. — 둘 다 무난

- **Motion**: `x 반복 · 또는 CSS @keyframes 로 충분`
- **GSAP**: `repeat: -1, repeatDelay: 1 (+ yoyo)`
- **공식 문서**: [motion.dev](https://motion.dev/docs/react-transitions) · [gsap.com](https://gsap.com/docs/v3/GSAP/Tween/)

```
쉬머(shimmer): 빛줄기가 표면을 훑고 지나감. 주로 로딩 표시.
구현: Motion — x 반복 · 또는 CSS @keyframes 로 충분
```

## UI 요소

연출이 붙는 대상. 이름이 정확해야 흔한 구현 관례(위치 · 닫힘 방식)까지 따라온다.

| 표준 용어 | 원어 | 뜻 |
| --- | --- | --- |
| 스켈레톤 | skeleton | 로딩 중 내용 자리를 회색 블록으로 표시 |
| 스피너 | spinner | 회전하는 로딩 표시 |
| 토스트 | toast | 잠깐 떴다가 저절로 사라지는 알림 |
| 툴팁 | tooltip | 호버하면 뜨는 작은 설명 |
| 모달 | modal | 화면을 덮고 뜨는 대화상자 |
| 바텀 시트 | bottom sheet | 아래에서 올라오는 패널 |
| 드로어 | drawer | 옆에서 밀려 나오는 패널 |
| 아코디언 | accordion | 머리를 누르면 접고 펼치는 목록 |
| 캐러셀 | carousel | 좌우로 넘기는 슬라이드 묶음 |
