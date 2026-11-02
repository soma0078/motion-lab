# 모션 기법 어휘집

> motion-lab 의 `src/techniques/*/meta.ts` 에서 생성됨 (`npm run vocab`). 직접 고치지 않는다.

애니메이션 · 인터랙션을 구현할 때 이 문서의 **표준 용어**로 말하고 이해한다.

- 요청에 표준 용어가 나오면 아래 정의와 API 를 따른다. "부드럽게", "세련되게" 같은 말만 있으면 가까운 기법을 제안하고 수치를 묻는다
- 수치가 요청에 있으면 그대로 쓴다. 없으면 각 기법의 **기본 수치**를 쓰고, 쓴 값을 알려 준다
- 라이브러리는 프로젝트에 이미 있는 것을 쓴다. 둘 다 없으면 추천 쪽을 제안한다
- 모든 모션은 `prefers-reduced-motion` 을 존중한다 (Motion: `<MotionConfig reducedMotion="user">` · GSAP: `gsap.matchMedia()`)

## 시간 · 곡선

무엇을 움직이든 가장 먼저 정하는 것들이에요. 얼마나 빨리, 어떤 가감속으로, 어떤 순서로 움직일지를 다뤄요

### 이징 (easing)

시작 · 끝의 가감속 곡선. — 둘 다 무난

- **Motion**: `ease: [0.25, 1, 0.5, 1]`
- **GSAP**: `ease: 'power3.out'`
- **기본 수치**: 길이 1.4s (0.4~2.4)
- **공식 문서**: [motion.dev](https://motion.dev/docs/react-transitions) · [gsap.com](https://gsap.com/docs/v3/Eases)

```
이징(easing)을 ease-out-quart 곡선 cubic-bezier(0.25, 1, 0.5, 1)로 정하고, 1.4s 동안 빠르게 출발해 길게 감속하게 해.
구현: Motion — transition={{ duration: 1.4, ease: [0.25, 1, 0.5, 1] }}
```

### 스프링 (spring)

시간 대신 stiffness · damping 같은 물리값으로 움직임. — Motion 추천

- **Motion**: `type: 'spring', stiffness, damping, mass`
  - 또는 visualDuration: 0.4, bounce: 0.25 (stiffness 주면 무시)
- **GSAP**: `진짜 스프링 없음 → 'elastic.out(1, 0.3)' 근사`
- **기본 수치**: stiffness 220 (50~600) · damping 8 (2~40)
- **공식 문서**: [motion.dev](https://motion.dev/docs/react-transitions) · [gsap.com](https://gsap.com/docs/v3/Eases/CustomBounce)

```
스프링(spring)으로 stiffness 220, damping 8, mass 0.6을 써서 출렁이며 제자리로 돌아오게 해.
구현: Motion — transition={{ type: 'spring', stiffness: 220, damping: 8, mass: 0.6 }}
```

### 오버슈트 (overshoot)

목표 지점을 살짝 넘었다가 돌아옴. — 둘 다 무난

- **Motion**: `ease: 'backOut'`
- **GSAP**: `ease: 'back.out(1.7)'`
- **기본 수치**: 넘는 정도 0.55 (0~1)
- **공식 문서**: [motion.dev](https://motion.dev/docs/react-transitions) · [gsap.com](https://gsap.com/docs/v3/Eases)

```
오버슈트(overshoot)로 목표를 살짝 넘었다 돌아오게 해. 곡선은 cubic-bezier(0.34, 1.55, 0.64, 1), 길이는 0.9s로 해.
구현: Motion — transition={{ duration: 0.9, ease: [0.34, 1.55, 0.64, 1] }}
```

### 키프레임 (keyframe)

시간 위 지점별로 정한 값. 사이는 보간. — 둘 다 무난

- **Motion**: `x: [0, 80, 40]`
- **GSAP**: `keyframes: [{ x: 80 }, { x: 40 }]`
- **공식 문서**: [motion.dev](https://motion.dev/docs/react-animation) · [gsap.com](https://gsap.com/resources/keyframes/)

```
키프레임(keyframe)으로 시간 위 네 지점에 값을 정하고, 그 사이는 보간되며 순서대로 지나가게 해.
구현: Motion — x: [0, 80, 40]
```

### 스태거 (stagger)

여러 요소의 시작을 일정 간격으로 어긋나게. — 둘 다 무난

- **Motion**: `컴포넌트: 부모 variant transition: { delayChildren: stagger(0.08) }`
  - staggerChildren 은 deprecated
- **GSAP**: `stagger: 0.08`
- **기본 수치**: 간격 0.08s (0.02~0.3) · 각 길이 0.5s (0.2~1.2)
- **공식 문서**: [motion.dev](https://motion.dev/docs/stagger) · [gsap.com](https://gsap.com/resources/getting-started/Staggers)

```
스태거(stagger)로 항목마다 0.08s 간격을 두고, 하나씩 0.5s ease-out-quart로 아래에서 올라오게 해.
구현: Motion — 부모 variant transition: { delayChildren: stagger(0.08) } · 자식 { duration: 0.5, ease: [0.25, 1, 0.5, 1] }
```

### 타임라인 (timeline)

여러 모션을 한 줄에 놓고 겹침 · 순서를 정해 통째로 재생 · 되감기. — GSAP 추천

- **Motion**: `useAnimate() → animate([[a, …], [b, …, { at: '<' }]])`
- **GSAP**: `gsap.timeline({ defaults }) + 위치 '<' · '>' · '-=0.2' · '<0.1'`
- **공식 문서**: [motion.dev](https://motion.dev/docs/animate) · [gsap.com](https://gsap.com/docs/v3/GSAP/Timeline/)

```
타임라인(timeline)으로 여러 모션을 한 줄에 놓고 0s · 0.35s처럼 시작 시점을 정해 겹치거나 순서대로 재생하게 해. 통째로 재생하고 되감을 수 있게 해.
구현: GSAP — gsap.timeline({ defaults }) + 위치 '<' · '>' · '-=0.2' · '<0.1'
```

## 나타남 · 전환

요소가 나타나고 사라지거나 다른 요소로 바뀌는 순간이에요

### 페이드 인 · 아웃 (fade in · out)

투명도로 나타나고 사라짐. — 둘 다 무난

- **Motion**: `initial={{ opacity: 0 }} animate={{ opacity: 1 }}`
- **GSAP**: `autoAlpha: 0 → 1 (0 이면 visibility: hidden · 클릭도 막힘)`
- **공식 문서**: [motion.dev](https://motion.dev/docs/react-animation) · [gsap.com](https://gsap.com/docs/v3/GSAP/CorePlugins/CSS/)

```
페이드 인 · 아웃(fade in · out)으로 요소가 0.6s 동안 투명도만 바뀌며 나타나고 사라지게 해.
구현: Motion — initial={{ opacity: 0 }} animate={{ opacity: 1 }}
```

### 진입 · 퇴장 (enter · exit)

요소가 나타날 때 · 사라질 때의 모션. — Motion 추천

- **Motion**: `<AnimatePresence> + 자식 key + exit`
- **GSAP**: `useGSAP 는 언마운트 시 revert 만 → 퇴장 트윈 onComplete 에서 setState`
- **기본 수치**: 진입 0.4s (0.1~1) · 퇴장 0.25s (0.1~1)
- **공식 문서**: [motion.dev](https://motion.dev/docs/react-animate-presence) · [gsap.com](https://gsap.com/resources/React/)

```
진입 · 퇴장(enter · exit) 모션으로 토스트가 아래 24px에서 0.4s ease-out-quart로 올라오며 나타나게 하고, 사라질 때는 0.25s ease-in으로 위로 빠지게 해. 퇴장은 진입보다 짧게 해.
구현: Motion — <AnimatePresence> + initial={{ y: 24, opacity: 0 }} animate={{ y: 0, opacity: 1, transition: { duration: 0.4 } }} exit={{ y: -12, opacity: 0, transition: { duration: 0.25 } }}
```

### 크로스페이드 (crossfade)

앞 요소가 사라지는 동안 뒤 요소가 겹쳐 나타남. — 둘 다 무난

- **Motion**: `<AnimatePresence> 기본 mode='sync' + absolute 겹치기`
- **GSAP**: `tl.to(a, { autoAlpha: 0 }).to(b, { autoAlpha: 1 }, '<')`
- **공식 문서**: [motion.dev](https://motion.dev/docs/react-animate-presence) · [gsap.com](https://gsap.com/docs/v3/Plugins/Flip/)

```
크로스페이드(crossfade)로 앞 요소가 0.7s 동안 사라지는 사이 뒤 요소가 같은 자리에 겹쳐 나타나게 해.
구현: Motion — <AnimatePresence> 기본 mode='sync' + absolute 겹치기
```

### 마스크 리빌 (mask reveal)

틀 밖을 가린 채 열어 드러냄. — 둘 다 무난

- **Motion**: `overflow-hidden 틀 + y: '110%' → 0`
- **GSAP**: `SplitText.create(el, { type: 'lines', mask: 'lines', autoSplit: true, onSplit })`
- **기본 수치**: 길이 0.9s (0.4~1.6) · 줄 간격 0.12s (0~0.4)
- **공식 문서**: [motion.dev](https://motion.dev/docs/react-animation) · [gsap.com](https://gsap.com/docs/v3/Plugins/SplitText/)

```
마스크 리빌(mask reveal)로 overflow: hidden 틀 아래 110%에서 줄마다 0.12s 스태거를 두고 0.9s ease-out-quart로 올라오게 해. 투명도는 바꾸지 않게 해.
구현: Motion — overflow-hidden 틀 + 줄 y: '110%' → 0, { duration: 0.9, ease: [0.25, 1, 0.5, 1], delay: stagger(0.12) }
```

### 텍스트 스플릿 (split text)

글자 · 단어 · 줄 단위로 쪼개 하나씩 움직임. — GSAP 추천

- **Motion**: `직접 span 분리 + delayChildren: stagger()`
  - splitText 는 Motion+ 유료 (motion-plus)
- **GSAP**: `SplitText.create(el, { type: 'words,chars' })`
- **기본 수치**: 글자 간격 0.06s (0.02~0.2)
- **공식 문서**: [motion.dev](https://motion.dev/docs/react-split-text) · [gsap.com](https://gsap.com/docs/v3/Plugins/SplitText/)

```
텍스트 스플릿(split text)으로 글자 단위로 쪼개고, 0.06s 스태거와 스프링(stiffness 320, damping 18)으로 아래에서 튀어 오르게 해.
구현: GSAP — SplitText.create(el, { type: 'words,chars' }) → gsap.from(split.chars, { yPercent: 110, ease: 'back.out(2)', stagger: 0.06 })
```

### 스크램블 텍스트 (scramble text)

글자가 무작위 문자로 뒤섞이다 원래 글자로 맞춰짐. — GSAP 추천

- **Motion**: `무료 API 없음 → 직접 구현 (interval + 문자 치환)`
- **GSAP**: `scrambleText: { text, chars: 'upperCase', revealDelay: 0.5, speed: 0.3 }`
- **기본 수치**: 길이 1.4s (0.4~3)
- **공식 문서**: [gsap.com](https://gsap.com/docs/v3/Plugins/ScrambleTextPlugin/)

```
스크램블 텍스트(scramble text)로 글자가 무작위 문자로 뒤섞이다가 앞에서부터 1.4s 동안 차례로 원래 글자로 확정되게 해.
구현: GSAP — gsap.to(el, { duration: 1.4, scrambleText: { text, chars: 'upperCase' } })
```

### 숫자 카운트업 (count up)

숫자가 목표값까지 올라감. — 둘 다 무난

- **Motion**: `animate(motionValue, 1000) + useTransform(Math.round)`
  - AnimateNumber 는 Motion+ 유료
- **GSAP**: `const o = { v: 0 }; gsap.to(o, { v: 1000, onUpdate: () => el.textContent = Math.round(o.v).toLocaleString() })`
- **기본 수치**: 길이 1.6s (0.4~3)
- **공식 문서**: [motion.dev](https://motion.dev/docs/react-animate-number) · [gsap.com](https://gsap.com/docs/v3/GSAP/CorePlugins/Snap)

```
숫자 카운트업(count up)으로 숫자가 0에서 목표값까지 1.6s 동안 ease-out-quart로 올라가 끝에서 감속하게 해. 정수로 표시하고 천 단위마다 콤마를 표시해.
구현: Motion — animate(count, target, { duration: 1.6, ease: [0.25, 1, 0.5, 1] }) + useTransform(count, (n) => Math.round(n).toLocaleString())
```

### 공유 레이아웃 전환 (shared layout transition)

같은 요소가 화면 · 상태가 바뀌어도 위치 · 크기를 이어 움직임. — Motion 추천

- **Motion**: `layout · layoutId`
- **GSAP**: `Flip.getState() → 상태 변경 → Flip.from(state, { absolute, targets })`
- **공식 문서**: [motion.dev](https://motion.dev/docs/react-layout-animations) · [gsap.com](https://gsap.com/docs/v3/Plugins/Flip/)

```
공유 레이아웃 전환(shared layout transition)으로 같은 요소가 화면이나 상태가 바뀌어도 위치와 크기를 이어서 움직이게 해.
구현: Motion — layout · layoutId
```

### 페이지 전환 (page transition)

라우트가 바뀔 때 이전 화면이 나가고 새 화면이 들어옴. — Motion 추천

- **Motion**: `<AnimatePresence mode='wait'> + 라우트 key`
- **GSAP**: `퇴장 트윈 onComplete 에서 navigate · 또는 Flip`
- **공식 문서**: [motion.dev](https://motion.dev/docs/react-animate-presence) · [gsap.com](https://gsap.com/resources/React/)

```
페이지 전환(page transition)으로 라우트가 바뀔 때 이전 화면이 나간 뒤 새 화면이 들어오게 해.
구현: Motion — <AnimatePresence mode='wait'> + 라우트 key
```

### 이미지 리빌 (image reveal)

틀이 열리며 이미지가 드러나고, 안쪽 이미지는 확대에서 제자리로. — 둘 다 무난

- **Motion**: `틀 clipPath: 'inset(100% 0% 0% 0%)' → 'inset(0% 0% 0% 0%)'`
- **GSAP**: `tl.from(frame, { clipPath: 'inset(100% 0% 0% 0%)' }).from(img, { scale: 1.3 }, '<')`
- **기본 수치**: 시작 배율 1.3× (1~1.8) · 길이 0.9s (0.4~2)
- **공식 문서**: [motion.dev](https://motion.dev/docs/react-animation) · [gsap.com](https://gsap.com/docs/v3/GSAP/CorePlugins/CSS/)

```
이미지 리빌(image reveal)로 틀이 아래에서 위로 0.9s 동안 열리게 하고, 안쪽 이미지는 1.3배에서 1배로 조금 더 길게 줄어들게 해.
구현: Motion — 틀 clipPath: 'inset(100% 0% 0% 0%)' → 'inset(0% 0% 0% 0%)' (0.9s) · img scale: 1.3 → 1 (1.30s)
```

### 필터 · 색 전환 (filter · color)

흐림 · 흑백 · 색이 서서히 바뀜. — 둘 다 무난

- **Motion**: `filter: 'blur(10px)' → 'blur(0px)' · backgroundColor 보간`
- **GSAP**: `filter: 'blur(10px)' · backgroundColor`
- **공식 문서**: [motion.dev](https://motion.dev/docs/react-animation) · [gsap.com](https://gsap.com/docs/v3/GSAP/CorePlugins/CSS/)

```
필터 · 색 전환(filter · color)으로 요소가 blur(10px)에서 또렷해지고, 흑백에서 원래 색으로 서서히 바뀌게 해.
구현: Motion — filter: 'blur(10px)' → 'blur(0px)' · backgroundColor 보간
```

### View Transitions (view transitions API)

화면 상태가 바뀔 때 브라우저가 이전 · 다음 스냅샷을 이어 붙여 전환. — 브라우저 기본으로 충분

- **Motion**: `animateView(() => update()) (무료 motion 패키지)`
- **GSAP**: `JS 대안: Flip`
- **CSS·Web**: `React 19.3: <ViewTransition> + startTransition (startViewTransition 직접 호출 금지)`
  - 지원 Chrome 111 · Safari 18 · Firefox 144
- **공식 문서**: [motion.dev](https://motion.dev/docs/animate-view) · [gsap.com](https://gsap.com/docs/v3/Plugins/Flip/) · [MDN](https://developer.mozilla.org/en-US/docs/Web/API/View_Transition_API)

```
View Transitions(view transitions API)로 화면 상태가 바뀔 때 브라우저가 이전과 다음 스냅샷을 이어 붙여 전환하게 해.
구현: CSS·Web — React 19.3: <ViewTransition> + startTransition (startViewTransition 직접 호출 금지)
```

## 모양 · 경로

생김새 자체가 바뀌거나 정해진 경로를 따라 움직여요. 주로 SVG로 만들어요

### 모핑 (morphing)

모양 자체가 다른 모양으로 변함. — GSAP 추천

- **Motion**: `d 네이티브 보간 (명령 수 · 종류 같을 때만)`
- **GSAP**: `MorphSVGPlugin (점 개수 · 종류 달라도 됨)`
- **공식 문서**: [motion.dev](https://motion.dev/docs/react-svg-animation) · [gsap.com](https://gsap.com/docs/v3/Plugins/MorphSVGPlugin/)

```
모핑(morphing)으로 원(border-radius 50%)이 둥근 사각형(8%)으로 모양 자체가 바뀌게 해.
구현: GSAP — MorphSVGPlugin (점 개수 · 종류 달라도 됨)
```

### 라인 드로잉 (line drawing)

선이 그려지듯 나타남. — 둘 다 무난

- **Motion**: `pathLength: 0 → 1`
- **GSAP**: `gsap.from(path, { drawSVG: 0 }) (DrawSVGPlugin)`
- **공식 문서**: [motion.dev](https://motion.dev/docs/react-svg-animation) · [gsap.com](https://gsap.com/docs/v3/Plugins/DrawSVGPlugin/)

```
라인 드로잉(line drawing)으로 SVG 선이 pathLength 0에서 1까지 그려지듯 나타나게 해.
구현: Motion — pathLength: 0 → 1
```

### 모션 패스 (motion path)

요소가 정해진 곡선 경로를 따라 이동. — GSAP 추천

- **Motion**: `CSS offset-path + offsetDistance: '0%' → '100%'`
- **GSAP**: `motionPath: { path, align: path, alignOrigin: [0.5, 0.5], autoRotate: true }`
- **공식 문서**: [gsap.com](https://gsap.com/docs/v3/Plugins/MotionPathPlugin/) · [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/offset-path)

```
모션 패스(motion path)로 요소가 정해진 곡선 경로(offset-path)를 따라 이동하게 해.
구현: GSAP — motionPath: { path, align: path, alignOrigin: [0.5, 0.5], autoRotate: true }
```

### 텍스트 경로 (text on path)

글자가 곡선을 따라 흐름. — GSAP 추천

- **Motion**: `<motion.textPath startOffset={mv}> (SVG textPath)`
- **GSAP**: `gsap.to(textPath, { attr: { startOffset: '100%' } })`
- **공식 문서**: [motion.dev](https://motion.dev/docs/react-svg-animation) · [gsap.com](https://gsap.com/docs/v3/GSAP/CorePlugins/Attributes/)

```
텍스트 경로(text on path)로 글자를 곡선 위에 얹고, startOffset을 바꿔 곡선을 따라 흐르게 해.
구현: GSAP — gsap.to(textPath, { attr: { startOffset: '100%' } })
```

## 스크롤

시간 대신 스크롤 위치가 진행도를 정하거나, 스크롤이 재생을 시작해요

### 스크롤 진입 (scroll-triggered reveal)

요소가 화면에 들어오면 자기 시간으로 끝까지 재생. — 둘 다 무난

- **Motion**: `whileInView + viewport={{ once: true }}`
- **GSAP**: `scrollTrigger: { toggleActions: 'play none none reverse' }`
- **공식 문서**: [motion.dev](https://motion.dev/docs/react-scroll-animations) · [gsap.com](https://gsap.com/docs/v3/Plugins/ScrollTrigger/)

```
스크롤 진입(scroll-triggered reveal)으로 요소가 화면에 들어오면 한 번만, 자기 시간으로 끝까지 재생되게 해.
구현: Motion — whileInView + viewport={{ once: true }}
```

### 스크롤 스크러빙 (scroll scrubbing)

스크롤 진행도에 애니메이션을 직접 묶음. — GSAP 추천

- **Motion**: `useScroll({ target, offset: ['start end', 'end start'] }) + useTransform`
- **GSAP**: `scrollTrigger: { scrub: true }`
- **공식 문서**: [motion.dev](https://motion.dev/docs/react-scroll-animations) · [gsap.com](https://gsap.com/docs/v3/Plugins/ScrollTrigger/)

```
스크롤 스크러빙(scroll scrubbing)으로 스크롤 진행도 0~1에 애니메이션 진행을 직접 묶어, 스크롤을 멈추면 애니메이션도 멈추게 해.
구현: GSAP — scrollTrigger: { scrub: true }
```

### 핀 (pin (sticky))

화면을 고정해 둔 채 스크롤로 진행. — GSAP 추천

- **Motion**: `긴 wrapper + CSS position: sticky + useScroll({ target })`
- **GSAP**: `scrollTrigger: { pin: true, end: '+=1500', scrub: true }`
- **공식 문서**: [motion.dev](https://motion.dev/docs/react-scroll-animations) · [gsap.com](https://gsap.com/docs/v3/Plugins/ScrollTrigger/)

```
핀(pin)으로 화면을 고정해 둔 채 스크롤에 따라 안쪽 내용이 진행되게 해.
구현: GSAP — scrollTrigger: { pin: true, end: '+=1500', scrub: true }
```

### 가로 스크롤 (horizontal scroll)

세로로 스크롤하면 섹션이 옆으로 흘러감. — GSAP 추천

- **Motion**: `useScroll({ target, offset: ['start start', 'end end'] }) + useTransform(…, ['0%', '-75%'])`
- **GSAP**: `pin + scrub 트윈 x: -(w - innerWidth), ease: 'none'`
- **공식 문서**: [motion.dev](https://motion.dev/docs/react-scroll-animations) · [gsap.com](https://gsap.com/docs/v3/Plugins/ScrollTrigger/)

```
가로 스크롤(horizontal scroll)로 세로로 스크롤하는 동안 섹션들이 0에서 -75%까지 옆으로 흘러가게 해.
구현: GSAP — pin + scrub 트윈 x: -(w - innerWidth), ease: 'none'
```

### 패럴랙스 (parallax)

레이어마다 스크롤 속도를 달리해 깊이감을 줌. — 둘 다 무난

- **Motion**: `useTransform(scrollYProgress, [0, 1], [0, -200]) · 레이어마다 범위 다르게`
- **GSAP**: `scrub + 레이어별 yPercent`
- **공식 문서**: [motion.dev](https://motion.dev/docs/react-scroll-animations) · [gsap.com](https://gsap.com/docs/v3/Plugins/ScrollSmoother/)

```
패럴랙스(parallax)로 레이어마다 스크롤 속도를 0.2× · 0.5× · 1×로 달리해 깊이감이 생기게 해.
구현: Motion — useTransform(scrollYProgress, [0, 1], [0, -200]) · 레이어마다 범위 다르게
```

### 스크롤 스냅 (scroll snap)

스크롤이 정해진 지점에 맞춰 멈춤. — 둘 다 무난

- **Motion**: `CSS scroll-snap-type (라이브러리 불필요)`
- **GSAP**: `scrollTrigger: { snap: 1 / (n - 1) }`
- **공식 문서**: [gsap.com](https://gsap.com/docs/v3/Plugins/ScrollTrigger/) · [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/scroll-snap-type)

```
스크롤 스냅(scroll snap)으로 스크롤이 항목마다 정해진 지점에 맞춰 멈추게 해.
구현: Motion — CSS scroll-snap-type (라이브러리 불필요)
```

### 섹션 스와이프 (section swipe)

휠 · 터치 한 번에 풀스크린 섹션이 하나씩 넘어감. — GSAP 추천

- **Motion**: `wheel · pointer 이벤트 직접 처리 + AnimatePresence`
- **GSAP**: `Observer.create({ type: 'wheel,touch,pointer', onDown, onUp, tolerance: 10 })`
- **공식 문서**: [gsap.com](https://gsap.com/docs/v3/Plugins/Observer/)

```
섹션 스와이프(section swipe)로 휠이나 터치 한 번에 풀스크린 섹션이 하나씩 넘어가게 해.
구현: GSAP — Observer.create({ type: 'wheel,touch,pointer', onDown, onUp, tolerance: 10 })
```

### 속도 반응 (velocity-based)

스크롤 · 드래그 속도에 따라 기울기 · 흐림이 변함. — Motion 추천

- **Motion**: `useVelocity(scrollY) → useTransform(v, [-400, 400], [-10, 10]) → useSpring`
- **GSAP**: `ScrollTrigger onUpdate: self => skewTo(self.getVelocity() / -300)`
- **공식 문서**: [motion.dev](https://motion.dev/docs/react-use-velocity) · [gsap.com](https://gsap.com/docs/v3/Plugins/ScrollTrigger/getVelocity())

```
속도 반응(velocity-based)으로 스크롤이나 드래그 속도가 빠를수록 기울기와 흐림이 커지게 해.
구현: Motion — useVelocity(scrollY) → useTransform(v, [-400, 400], [-10, 10]) → useSpring
```

### CSS 스크롤 타임라인 (scroll-driven animations)

JS 없이 CSS 만으로 스크롤 진행도에 애니메이션을 묶음. — 브라우저 기본으로 충분

- **Motion**: `스크롤 연동은 가능하면 브라우저 ScrollTimeline 으로 실행 (안 되면 JS)`
- **GSAP**: `ScrollTrigger (JS 계산)`
- **CSS·Web**: `animation-timeline: scroll() · view()`
  - 지원 Chrome 115 · Safari 26 · Firefox 159 → @supports (animation-timeline: scroll()) 로 가드
- **공식 문서**: [motion.dev](https://motion.dev/docs/react-scroll-animations) · [gsap.com](https://gsap.com/docs/v3/Plugins/ScrollTrigger/) · [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_scroll-driven_animations)

```
CSS 스크롤 타임라인(scroll-driven animations)으로 JS 없이 CSS animation-timeline만 써서 스크롤 진행도에 맞춰 애니메이션이 재생되게 해.
구현: CSS·Web — animation-timeline: scroll() · view()
```

## 인터랙션

사용자가 마우스를 올리거나 누르거나 끌 때의 반응이에요

### 호버 (hover)

포인터가 올라가 있는 동안. — Motion 추천

- **Motion**: `whileHover · onHoverStart / onHoverEnd`
- **GSAP**: `const { contextSafe } = useGSAP({ scope })`
- **공식 문서**: [motion.dev](https://motion.dev/docs/react-gestures) · [gsap.com](https://gsap.com/resources/React/)

```
호버(hover) 상태에서 포인터가 올라가 있는 동안 버튼이 0.15s 만에 살짝 떠오르며 색이 바뀌게 하고, 포인터가 나가면 되돌아오게 해.
구현: Motion — whileHover · onHoverStart / onHoverEnd
```

### 마이크로 인터랙션 (micro-interaction)

버튼 · 토글 같은 작은 조작에 붙는 짧은 피드백. — Motion 추천

- **Motion**: `whileTap + spring (키보드 Enter 도 동작)`
- **GSAP**: `onClick → contextSafe(짧은 timeline)`
- **기본 수치**: stiffness 500 (100~900) · damping 30 (5~50)
- **공식 문서**: [motion.dev](https://motion.dev/docs/react-gestures) · [gsap.com](https://gsap.com/docs/v3/GSAP/Timeline/)

```
마이크로 인터랙션(micro-interaction)으로 토글 손잡이가 스프링(stiffness 500, damping 30)으로 짧고 단단하게 이동하게 하고, 하트는 누르면 1.25배로 한 번 튀게 해.
구현: Motion — animate={{ x: on ? 28 : 0 }} transition={{ type: 'spring', stiffness: 500, damping: 30 }}
```

### 마그네틱 (magnetic)

커서 쪽으로 끌려옴. — 둘 다 무난

- **Motion**: `useMotionValue + useSpring(src, { stiffness, damping })`
- **GSAP**: `const xTo = gsap.quickTo(el, 'x', { duration: 0.4, ease: 'power3' })`
- **기본 수치**: 범위 90px (40~140) · 끌림 0.35 (0.1~0.8) · stiffness 220 (50~500) · damping 12 (4~40)
- **공식 문서**: [motion.dev](https://motion.dev/docs/react-use-spring) · [gsap.com](https://gsap.com/docs/v3/GSAP/gsap.quickTo())

```
마그네틱(magnetic) 효과로 커서가 90px 안에 들어오면 버튼이 커서 거리의 35%만큼 끌려오게 해. 따라오고 돌아올 때는 스프링(stiffness 220, damping 12)으로 움직이게 해.
구현: Motion — pointer 오프셋 × 0.35 → useMotionValue → useSpring(mv, { stiffness: 220, damping: 12 })
```

### 러버밴드 (rubber band)

끝을 넘겨 끌면 저항하다 놓으면 되돌아옴. — Motion 추천

- **Motion**: `drag + dragConstraints + dragElastic (0~1)`
- **GSAP**: `Draggable.create(el, { bounds, edgeResistance: 0.65, inertia: true })`
- **기본 수치**: 따라옴 0.35 (0.05~1) · 복귀 damping 14 (5~40)
- **공식 문서**: [motion.dev](https://motion.dev/docs/react-drag) · [gsap.com](https://gsap.com/docs/v3/Plugins/Draggable/)

```
러버밴드(rubber band)로 끌 범위를 넘겨 끌면 거리의 35%만 따라오며 저항하게 하고, 놓으면 bounce(stiffness 400, damping 14)로 되돌아오게 해.
구현: Motion — drag dragConstraints={{ left: 0, right: 0 }} dragElastic={0.35} dragTransition={{ bounceStiffness: 400, bounceDamping: 14 }}
```

### 리스트 재정렬 (reorder)

항목을 끌어 순서를 바꾸면 나머지가 자리를 비켜 줌. — Motion 추천

- **Motion**: `<Reorder.Group values onReorder> + <Reorder.Item value>`
- **GSAP**: `Draggable + 놓을 때 Flip 으로 자리 이동`
- **공식 문서**: [motion.dev](https://motion.dev/docs/react-reorder) · [gsap.com](https://gsap.com/docs/v3/Plugins/Draggable/)

```
리스트 재정렬(reorder)로 항목을 끌어 순서를 바꾸면 나머지 항목이 자리를 비켜 주며 움직이게 해.
구현: Motion — <Reorder.Group values onReorder> + <Reorder.Item value>
```

### 3D 틸트 · 플립 (3D tilt · flip)

perspective 로 카드가 커서 쪽으로 기울거나 뒤집힘. — 둘 다 무난

- **Motion**: `style={{ rotateX, rotateY, transformPerspective: 500 }}`
- **GSAP**: `gsap.to(el, { rotationY: 180 }) (rotateY 별칭도 동작)`
- **기본 수치**: 최대 기울기 18° (5~35) · perspective 500px (200~1200)
- **공식 문서**: [motion.dev](https://motion.dev/docs/react-animation) · [gsap.com](https://gsap.com/docs/v3/GSAP/CorePlugins/CSS/)

```
3D 틸트 · 플립(3D tilt · flip)으로 카드가 perspective 500px에서 커서 쪽으로 최대 18°까지 기울며 스프링으로 따라오게 해. 클릭하면 rotateY 180°로 뒤집히게 해.
구현: Motion — style={{ rotateX, rotateY, transformPerspective: 500 }} · useTransform(pointer, [-1, 1], [-18, 18])
```

### 커스텀 커서 (custom cursor)

기본 커서 대신 따라다니는 원. 올린 요소에 따라 모양이 바뀜. — 둘 다 무난

- **Motion**: `useMotionValue(clientX) + useSpring · pointer-events: none`
  - Cursor 컴포넌트는 Motion+ 유료
- **GSAP**: `gsap.quickTo(cursor, 'x', { duration: 0.6, ease: 'power3' }) + mousemove`
- **기본 수치**: stiffness 300 (50~800) · damping 28 (5~50)
- **공식 문서**: [motion.dev](https://motion.dev/docs/react-use-spring) · [gsap.com](https://gsap.com/docs/v3/GSAP/gsap.quickTo())

```
커스텀 커서(custom cursor)로 기본 커서 대신 점과 원을 그리고, 원은 스프링(stiffness 300, damping 28)으로 한 박자 늦게 따라오게 해. 링크 위에서는 원이 커지게 해.
구현: Motion — useMotionValue(clientX) → useSpring(mv, { stiffness: 300, damping: 28 }) · pointer-events: none
```

### 관성 (inertia (fling))

던지면 속도를 이어받아 미끄러지다 감속해 멈춤. — 둘 다 무난

- **Motion**: `drag 기본 관성 (끄기 dragMomentum={false}) · dragTransition: { power, timeConstant }`
- **GSAP**: `gsap.registerPlugin(Draggable, InertiaPlugin) → Draggable.create(el, { inertia: true, snap })`
- **기본 수치**: power 0.8 (0.2~1.5) · timeConstant 350ms (100~900)
- **공식 문서**: [motion.dev](https://motion.dev/docs/react-drag) · [gsap.com](https://gsap.com/docs/v3/Plugins/InertiaPlugin/)

```
관성(inertia)으로 던진 속도를 이어받아 미끄러지다 감속해 멈추게 하고, 값은 power 0.8, timeConstant 350ms로 해. 벽에 닿으면 튕겨 돌아오게 해.
구현: Motion — drag dragTransition={{ power: 0.8, timeConstant: 350 }}
```

## 앱 · 제스처

손가락으로 끌고 밀고 누르는 앱의 움직임이에요. React Native(Reanimated · Gesture Handler) 기준이고, 데모는 웹에서 같은 움직임을 비슷하게 보여드려요

### 스와이프 액션 (swipe action)

목록 행을 옆으로 밀면 삭제 · 보관 같은 버튼이 드러남. 기준을 넘겨 놓으면 열린 채 멈춤. — React Native 기법

- **React Native**: `<Swipeable renderRightActions={renderDelete} rightThreshold={40} />`
- **기본 수치**: 열림 기준 40px (20~70)
- **공식 문서**: [RN](https://docs.swmansion.com/react-native-gesture-handler/docs/2.x/components/reanimated_swipeable)

```
스와이프 액션(swipe action)으로 목록 행을 왼쪽으로 40px 이상 밀고 놓으면 오른쪽 삭제 버튼이 열린 채 멈추게 하고, 그보다 덜 밀고 놓으면 닫히게 해.
구현: React Native — <Swipeable renderRightActions={renderDelete} rightThreshold={40} overshootRight={false} />
```

### 바텀시트 스냅 (bottom sheet snap)

아래에서 올라온 시트를 끌다 놓으면 가장 가까운 높이(peek · half · full)로 붙음. — React Native 기법

- **React Native**: `<BottomSheet snapPoints={['25%', '50%', '90%']} enableDynamicSizing={false} />`
  - animationConfigs={useBottomSheetSpringConfigs({ damping: 80, stiffness: 500 })}
- **기본 수치**: damping 80 (20~120) · stiffness 500 (100~800)
- **공식 문서**: [RN](https://gorhom.dev/react-native-bottom-sheet/props)

```
바텀시트 스냅(bottom sheet snap)으로 시트가 25% · 50% · 90% 높이에서 멈추게 해. 끌다 놓으면 가장 가까운 높이로 스프링(stiffness 500, damping 80)을 써서 넘치지 않게 붙게 해.
구현: React Native — <BottomSheet snapPoints={['25%', '50%', '90%']} enableDynamicSizing={false} animationConfigs={useBottomSheetSpringConfigs({ damping: 80, stiffness: 500, overshootClamping: true })} />
```

### 당겨서 새로고침 (pull to refresh)

목록 맨 위에서 아래로 당겼다 놓으면 인디케이터가 돌며 새로고침 시작. 끝나면 제자리로 돌아옴. — React Native 기법

- **React Native**: `<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />`
- **기본 수치**: 인디케이터 위치 0px (0~30)
- **공식 문서**: [RN](https://reactnative.dev/docs/refreshcontrol)

```
당겨서 새로고침(pull to refresh)으로 목록 맨 위에서 아래로 당겼다 놓으면 인디케이터가 돌며 새로고침이 시작되게 하고, 끝나면 목록이 제자리로 돌아오게 해. 인디케이터는 위에서 0px 아래에 나타나게 해.
구현: React Native — <RefreshControl refreshing={refreshing} onRefresh={onRefresh} progressViewOffset={0} />
```

### 인터럽트 가능한 전환 (interruptible)

움직이는 도중에 다시 눌러도 멈췄다 처음부터 가지 않고, 지금 위치에서 방향을 바꿈. — React Native 기법

- **React Native**: `x.value = withSpring(target, { damping: 22, stiffness: 250 })`
- **기본 수치**: stiffness 250 (100~600) · damping 22 (10~50)
- **공식 문서**: [RN](https://docs.swmansion.com/react-native-reanimated/docs/animations/withSpring/)

```
인터럽트 가능한 전환(interruptible)으로 전환 도중에 다시 눌러도 멈췄다 처음부터 가지 않게 하고, 지금 위치에서 새 목표로 스프링(stiffness 250, damping 22)을 써서 방향을 바꾸게 해.
구현: React Native — x.value = withSpring(target, { stiffness: 250, damping: 22 })  // 진행 중에도 같은 코드로 재호출
```

### 누르기 피드백 (press feedback)

누르는 동안 살짝 줄어들었다가 놓으면 스프링으로 돌아와, 눌렸다는 걸 손끝으로 알려 줌. — React Native 기법

- **React Native**: `<Pressable onPressIn={() => (s.value = withSpring(0.96))} onPressOut={() => (s.value = withSpring(1))} />`
- **기본 수치**: 눌렸을 때 0.96 (0.85~0.99)
- **공식 문서**: [RN](https://docs.swmansion.com/react-native-reanimated/docs/animations/withSpring/)

```
누르기 피드백(press feedback)으로 누르는 동안 0.96배로 줄어들게 하고, 놓으면 스프링(stiffness 400, damping 12)으로 1배로 돌아오게 해.
구현: React Native — onPressIn={() => (s.value = withSpring(0.96))} onPressOut={() => (s.value = withSpring(1, { stiffness: 400, damping: 12 }))}
```

### 롱프레스 메뉴 (long press menu)

길게 누르면 요소가 떠오르고 옆에 메뉴가 열림. 누르는 시간이 기준을 넘어야 반응. — React Native 기법

- **React Native**: `Gesture.LongPress().minDuration(500).onStart(openMenu)`
- **기본 수치**: 누르는 시간 500ms (300~800)
- **공식 문서**: [RN](https://docs.swmansion.com/react-native-gesture-handler/docs/2.x/gestures/long-press-gesture)

```
롱프레스 메뉴(long press menu)로 카드를 500ms 이상 누르고 있으면 카드가 1.05배로 떠오르게 하고, 옆에 메뉴가 열리게 해.
구현: React Native — Gesture.LongPress().minDuration(500).onStart(() => openMenu())
```

### 컨테이너 트랜스폼 (container transform)

카드가 그대로 늘어나 상세 화면이 됨. 목록과 상세가 같은 요소로 이어져 보임. — React Native 기법

- **React Native**: `<Animated.View sharedTransitionTag="card-1" sharedTransitionStyle={SharedTransition.duration(550)} />`
- **기본 수치**: 시간 550ms (300~900)
- **공식 문서**: [RN](https://docs.swmansion.com/react-native-reanimated/docs/shared-element-transitions/overview/)

```
컨테이너 트랜스폼(container transform)으로 카드를 누르면 550ms 동안 카드가 화면 크기로 늘어나며 상세 화면이 되게 하고, 뒤로 가면 다시 카드로 줄어들게 해.
구현: React Native — <Animated.View sharedTransitionTag={`card-${id}`} sharedTransitionStyle={SharedTransition.duration(550)} />  // 실험적 · native stack
```

### 공유 축 (shared axis)

나가는 화면은 한 방향으로 밀리며 사라지고, 들어오는 화면은 같은 축에서 나타남. 순서 있는 단계에 씀. — React Native 기법

- **React Native**: `<Animated.View key={step} entering={FadeInRight.duration(300)} exiting={FadeOutLeft.duration(300)} />`
- **기본 수치**: 시간 300ms (150~500)
- **공식 문서**: [RN](https://docs.swmansion.com/react-native-reanimated/docs/layout-animations/entering-exiting-animations/)

```
공유 축(shared axis) 전환으로 다음 단계로 넘어갈 때 현재 화면은 왼쪽으로 밀리며 300ms 동안 사라지게 하고, 새 화면은 오른쪽에서 같은 시간에 들어오게 해. 뒤로 가면 반대 방향으로 움직이게 해.
구현: React Native — <Animated.View key={step} entering={FadeInRight.duration(300)} exiting={FadeOutLeft.duration(300)} />
```

### 페이드 스루 (fade through)

서로 관련 없는 화면(탭 전환 등)을 겹치지 않게 전환. 나가는 쪽이 먼저 사라진 뒤 들어오는 쪽이 살짝 커지며 나타남. — React Native 기법

- **React Native**: `<Animated.View key={tab} entering={FadeIn.duration(210).delay(90)} exiting={FadeOut.duration(90)} />`
- **기본 수치**: 나감 90ms (60~200) · 들어옴 210ms (120~400)
- **공식 문서**: [RN](https://docs.swmansion.com/react-native-reanimated/docs/layout-animations/entering-exiting-animations/)

```
페이드 스루(fade through)로 탭을 바꿀 때 현재 화면은 90ms 동안 사라지게 하고, 그다음 새 화면이 210ms 동안 0.92배에서 1배로 커지며 나타나게 해. 두 화면이 겹치지 않게 해.
구현: React Native — <Animated.View key={tab} entering={FadeIn.duration(210).delay(90)} exiting={FadeOut.duration(90)} />
```

### 푸시 · 팝 (push / pop)

새 화면이 옆에서 밀려 들어오고(push) 이전 화면은 살짝 밀려남. 뒤로 가면(pop) 반대로 빠짐. — React Native 기법

- **React Native**: `<Stack.Screen options={{ animation: 'slide_from_right' }} />`
- **기본 수치**: 시간 350ms (200~600)
- **공식 문서**: [RN](https://reactnavigation.org/docs/native-stack-navigator)

```
푸시 · 팝(push / pop) 전환으로 새 화면이 오른쪽에서 350ms 동안 밀려 들어오게 하고, 이전 화면은 왼쪽으로 조금 밀려나게 해. 뒤로 가면 반대로 빠지게 해.
구현: React Native — <Stack.Screen options={{ animation: 'simple_push', animationDuration: 350 }} />  // iOS 에서만 시간 적용
```

### 햅틱 동기화 (haptic sync)

눈금 · 스냅 · 확정 같은 지점에서 움직임과 같은 순간에 진동을 줌. 보이는 것과 느껴지는 것이 맞아야 자연스러움. — React Native 기법

- **React Native**: `Haptics.selectionAsync()`
- **기본 수치**: 눈금 수 5 (3~9)
- **공식 문서**: [RN](https://docs.expo.dev/versions/latest/sdk/haptics/)

```
햅틱 동기화(haptic sync)로 슬라이더를 끌 때 눈금 5개를 지날 때마다 눈금이 튀게 하고, 같은 순간에 가벼운 햅틱(selection)이 나게 해.
구현: React Native — // 눈금 5개 · 값이 눈금을 넘는 순간 한 번
Haptics.selectionAsync()
```

### 스켈레톤 로딩 (skeleton)

데이터가 오기 전에 들어갈 자리를 회색 블록으로 먼저 보여 주고, 천천히 깜빡여 로딩 중임을 알림. — React Native 기법

- **React Native**: `o.value = withRepeat(withTiming(1, { duration: 800 }), -1, true)`
- **기본 수치**: 한 번 800ms (400~1600)
- **공식 문서**: [RN](https://docs.swmansion.com/react-native-reanimated/docs/animations/withRepeat/)

```
스켈레톤 로딩(skeleton)으로 데이터가 오기 전에 자리를 회색 블록으로 채우고, 투명도가 0.4에서 1 사이를 800ms마다 오가며 깜빡이게 해.
구현: React Native — o.value = withRepeat(withTiming(1, { duration: 800 }), -1, true)  // o 초기값 0.4
```

## 반복

입력 없이 계속 반복되는 배경과 로딩 연출이에요

### 마키 (marquee)

글자 · 로고가 한 방향으로 끝없이 흐름. — 둘 다 무난

- **Motion**: `콘텐츠 2벌 + x: ['0%', '-50%'], repeat: Infinity, ease: 'linear'`
  - Ticker 컴포넌트는 Motion+ 유료
- **GSAP**: `콘텐츠 2벌 + xPercent: -50, repeat: -1, ease: 'none'`
- **공식 문서**: [motion.dev](https://motion.dev/docs/react-transitions) · [gsap.com](https://gsap.com/docs/v3/HelperFunctions/helpers/seamlessLoop)

```
마키(marquee)로 글자와 로고가 한 방향으로 끊김 없이 계속 흐르게 해.
구현: Motion — 콘텐츠 2벌 + x: ['0%', '-50%'], repeat: Infinity, ease: 'linear'
```

### 쉬머 (shimmer)

빛줄기가 표면을 훑고 지나감. 주로 로딩 표시. — 둘 다 무난

- **Motion**: `x 반복 · 또는 CSS @keyframes 로 충분`
- **GSAP**: `repeat: -1, repeatDelay: 1 (+ yoyo)`
- **공식 문서**: [motion.dev](https://motion.dev/docs/react-transitions) · [gsap.com](https://gsap.com/docs/v3/GSAP/Tween/)

```
쉬머(shimmer)로 로딩 중인 표면 위를 빛줄기가 1.3s마다 훑고 지나가게 해.
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
