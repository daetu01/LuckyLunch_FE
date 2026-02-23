# LuckyLunch_FE (Lunch Jackpot Frontend)

점심 메뉴를 정할 때, 주변 식당 후보를 고르고 포인트로 “베팅”해서 결과를 보는 **런치 잭팟** 서비스의 프론트엔드입니다.

이 저장소는 **프론트 UI/플로우 구현**을 우선으로 하며, 백엔드 API는 추후 연동합니다. (각 페이지/스토어에 `TODO(백엔드)` 참고)

## 1. 주요 화면(프론트 기준)

- **`/`**: 랜딩
- **`/explore`**: 주변 식당 탐색 + 후보 바구니(최대 10)
- **`/rooms/new`**: 방 생성(옵션 설정)
- **`/rooms/join`**: 방 참여(데모)
- **`/rooms/:roomId/dashboard`**: 대시보드(데모 데이터)
- **`/me`**: 마이(유저/포인트 Stub)

## 2. 기술 스택

- **Vue 3**
- **TypeScript**
- **Vite**
- **Vue Router**
- **Pinia**
- **Tailwind CSS v4** (`@tailwindcss/vite`)

## 3. 요구 환경

- Node.js: `package.json`의 `engines.node` 범위 권장
- 패키지 매니저: npm

## 4. 로컬 실행

### 4.1 설치

```bash
npm install
```

### 4.2 개발 서버

```bash
npm run dev
```

- http://localhost:5173/

### 4.3 타입 체크

```bash
npm run type-check
```

### 4.4 빌드

```bash
npm run build
```

## 5. 환경변수

지도 SDK 등을 붙일 때 아래 형태로 확장하는 것을 권장합니다.

### 5.1 Google Maps

- `VITE_GOOGLE_MAPS_API_KEY`

예시: `.env.local`

```bash
VITE_GOOGLE_MAPS_API_KEY=YOUR_KEY_HERE
```

## 6. 아키텍처/구조

```text
src/
  components/
    layout/                  # AppTopNav, AppFooter
  router/
    index.ts                 # routes + scrollBehavior
  stores/
    auth.ts                  # 인증/유저/포인트 Stub
  views/
    LandingView.vue
    ExploreView.vue
    RoomCreateView.vue
    RoomJoinView.vue
    RoomDashboardView.vue
    MeView.vue
  App.vue                    # app shell (TopNav + RouterView + Footer)
  main.ts                    # createApp + pinia + router + global css
  style.css                  # Tailwind entry + 전역 컴포넌트 스타일(btn/card/input)
```

### 6.1 라우팅

- 라우팅은 `src/router/index.ts`에서 정의합니다.
- 각 페이지는 `src/views/*View.vue`에 위치합니다.

### 6.2 상태 관리(Pinia)

- `src/stores/auth.ts`
  - 로그인/로그아웃은 현재 **Stub**입니다.
  - 백엔드 붙일 때 `startGoogleLogin()` 내부를 실제 OAuth 플로우/토큰 교환으로 교체하세요.

### 6.3 스타일링(Tailwind v4)

- Tailwind v4는 `src/style.css`에서 `@import "tailwindcss";` 엔트리 방식입니다.
- `src/style.css`에는 프로젝트 공용 클래스가 있습니다.
  - `btn-primary`, `btn-secondary`, `card`, `apple-card`, `input-field`, `glass-effect`

## 7. 백엔드 연동 포인트(권장)

프론트는 아래 형태로 연결되도록 TODO가 배치되어 있습니다.

### 7.1 탐색

- `GET /places?lat=...&lng=...&radius=...`
- 지도 SDK 적용 시 `ExploreView.vue`의 지도 placeholder를 실제 맵 컴포넌트로 교체

### 7.2 방

- `POST /rooms` (방 생성)
- `POST /rooms/:roomId/join` (참여)
- `GET /rooms/:roomId/dashboard` (집계/타이머/승자)
- 실시간:
  - WebSocket 또는 SSE 권장

### 7.3 인증

- Google OAuth
  - 프론트에서 받은 credential/token을 백엔드로 넘기고
  - 백엔드는 세션/토큰 발급 후 `GET /me`로 프로필 조회

## 8. 트러블슈팅

### 8.1 Tailwind가 적용되지 않는 것처럼 보일 때

- `src/main.ts`에 `import './style.css'`가 있는지 확인
- `vite.config.ts`에 `@tailwindcss/vite` 플러그인이 있는지 확인
- Tailwind v4 엔트리: `src/style.css`에 `@import "tailwindcss";` 사용
- 개발 서버를 완전히 재시작
  - `npm run dev` 중지 후 다시 실행

### 8.2 레이아웃이 깨질 때

- `ExploreView.vue` 등에서 wrapper 태그 누락/중복 여부 확인

## 9. 스크립트

- `npm run dev`: 개발 서버
- `npm run build`: 프로덕션 빌드
- `npm run type-check`: 타입 체크
