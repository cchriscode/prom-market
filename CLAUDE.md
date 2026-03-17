# 프롬마켓 (PromMarket) — AI 작업 가이드

## 프로젝트 한 줄 요약

AI 프롬프트 마켓플레이스. 크리에이터가 검증된 AI 프롬프트를 등록·판매하고, 구매자가 검색·구매·즉시 사용하는 플랫폼.
PromptBase의 비즈니스 모델 + URR-style 사이드바 레이아웃·디자인 시스템 결합.

---

## 기술 스택

| 분야         | 기술                       | 비고                              |
| ------------ | -------------------------- | --------------------------------- |
| Framework    | Next.js 16 (App Router)    | 서버/클라이언트 통합              |
| Language     | TypeScript (strict)        |                                   |
| Styling      | Tailwind CSS v4            | utility-first                     |
| UI           | shadcn/ui (Radix UI 기반)  | `src/shared/ui/`에 보관           |
| Server State | TanStack Query v5          | API 데이터 캐싱/동기화            |
| Client State | Zustand                    | 장바구니, UI 상태 등 최소한만     |
| 결제         | Stripe (Checkout + Connect)| 판매자 정산은 Stripe Connect      |
| 인증         | NextAuth.js v5             | Google/GitHub/이메일 로그인       |
| DB           | Prisma + PostgreSQL        | ORM                               |
| Storage      | AWS S3 / Cloudflare R2     | 이미지·파일 업로드                |
| 검색         | Meilisearch                | 프롬프트 전문 검색                |

```bash
npm run dev    # 개발 서버
npm run build  # 빌드 검증
```

---

## 파일 구조 — FSD (Feature-Sliced Design)

```
src/
├── app/          # Next.js App Router (라우팅 진입점만)
├── widgets/      # 페이지를 구성하는 큰 UI 블록 (여러 feature 조합)
├── features/     # 단일 사용자 행동 단위 (독립적)
├── entities/     # 도메인 모델 (Prompt, User, Review, Category …)
└── shared/
    ├── api/      # API 클라이언트, fetch 유틸
    ├── lib/      # utils.ts, format.ts, constants.ts
    └── ui/       # shadcn 컴포넌트 (button.tsx, input.tsx …)
```

### 레이어 규칙 (상위 → 하위만 import 가능)

```
app → widgets → features → entities → shared
```

- **app**: 라우트 파일만. 로직 없음, Widget을 `<Page />`에서 렌더링만.
- **widgets**: 여러 feature/entity를 조합하는 구성 레이어. `"use client"` 가능.
- **features**: 하나의 사용자 행동 (로그인, 구매, 프롬프트 등록 등). 타 feature 의존 금지.
- **entities**: 도메인 타입 + 관련 UI 카드/배지. 비즈니스 로직 없음.
- **shared**: 프로젝트 전역 공용 코드. 도메인 개념 없음.

### feature 내부 구조

```
features/<domain>/<feature-name>/
├── ui/         # React 컴포넌트 (PascalCase.tsx)
├── model/      # 상태, hook (useXxx.ts)
├── api/        # fetch 함수 (camelCase.ts)
└── index.ts    # 외부 공개 barrel export
```

### 파일 네이밍

- 컴포넌트: `PascalCase.tsx`
- 훅/유틸/api: `camelCase.ts`
- shadcn UI 파일: `lowercase.tsx` (`button.tsx`, `input.tsx`)
- 모든 레이어 폴더의 barrel: `index.ts`

---

## 주요 라우트 & 페이지

| URL                                | 페이지                | 핵심 widget                                |
| ---------------------------------- | -------------------- | ----------------------------------------- |
| `/`                                | HomePage             | 히어로배너·Featured·Trending·Newest 섹션   |
| `/marketplace`                     | MarketplacePage      | 필터+정렬+프롬프트 그리드                  |
| `/marketplace?category=logo`       | (동일, 필터 적용)     | URL 파라미터로 필터 상태 관리              |
| `/prompt/:slug`                    | PromptDetailPage     | 이미지갤러리·상세정보·구매CTA·리뷰         |
| `/sell`                            | SellPage             | 프롬프트 등록 멀티스텝 폼                  |
| `/sell/:promptId/edit`             | EditPromptPage       | 등록된 프롬프트 수정                       |
| `/hire`                            | HirePage             | 크리에이터 마켓플레이스                    |
| `/create`                          | CreatePage           | AI 앱 빌더 (프롬프트 실행)                 |
| `/apps`                            | AppStorePage         | 크리에이터 앱 목록                         |
| `/search`                          | SearchPage           | 통합 검색 (프롬프트+크리에이터)            |
| `/profile/:username`               | PublicProfilePage    | 판매자 공개 프로필·프롬프트 목록           |
| `/account`                         | AccountPage          | 내 대시보드 (구매/판매/분석/설정 탭)       |
| `/account/purchases`               | PurchasesTab         | 구매한 프롬프트 목록                       |
| `/account/prompts`                 | MyPromptsTab         | 내가 등록한 프롬프트 목록                  |
| `/account/analytics`               | AnalyticsTab         | 판매 분석 대시보드                         |
| `/account/payouts`                 | PayoutsTab           | 정산/출금 내역                             |
| `/account/settings`                | SettingsTab          | 프로필·알림·결제수단·비밀번호              |
| `/chat`                            | ChatPage             | 1:1 메시지 (구매자↔판매자)                 |
| `/login`                           | LoginPage            | 로그인 (소셜/이메일)                       |
| `/register`                        | RegisterPage         | 회원가입                                   |
| `/cart`                            | CartPage             | 장바구니                                   |
| `/leaderboard`                     | LeaderboardPage      | 판매자 랭킹                                |
| `/blog/:slug`                      | BlogPage             | 블로그/공지                                |

---

## 핵심 비즈니스 로직

### 사용자 역할

| 역할        | 설명                                        |
| ----------- | ------------------------------------------ |
| Guest       | 비로그인. 마켓 브라우징만 가능              |
| Buyer       | 로그인 유저. 구매·리뷰·채팅 가능           |
| Seller      | Stripe Connect 연동 완료. 프롬프트 등록 가능 |
| Admin       | 프롬프트 심사·유저 관리 (별도 관리자 페이지) |

### 판매자 등급 (PromptBase Rank 참고)

| 등급          | 조건                    | 혜택                           |
| ------------- | ---------------------- | ------------------------------ |
| 🥉 Bronze     | 첫 판매 완료            | 기본 프로필                    |
| 🥈 Silver     | 판매 50건 이상          | 프로필 뱃지 + 추천 가중치      |
| 🥇 Gold       | 판매 200건 이상         | Featured 후보 우선권           |
| 💎 Diamond    | 판매 1000건 + 평점 4.8↑ | 전용 프로모션 + 수수료 할인    |

### 수수료 구조

| 판매 경로              | 플랫폼 수수료 | 판매자 수익 |
| --------------------- | ------------- | ---------- |
| 마켓플레이스 검색/탐색 | 20%           | 80%        |
| 판매자 직접 링크 공유  | 0%            | 100%       |
| 커스텀 작업 (Hire)     | 10%           | 90%        |

### 구독 모델 (PromMarket Select)

| 항목               | 내용                                  |
| ------------------ | ------------------------------------- |
| 월 구독료          | ₩14,900 / ₩9,900 (런칭 할인)         |
| 월간 다운로드      | 10개 (미사용분 이월, 최대 120개)      |
| AI 생성 크레딧     | 1,000회/월                            |
| 대상 프롬프트      | ∞ Select 아이콘이 붙은 20만+개        |
| 추가 구매          | 즉시 Top Up 가능                      |
| 해지               | 언제든 가능, 약정 없음                |

### 프롬프트 등록 플로우 (판매자)

```
Step 1: 기본 정보
  → AI 모델 선택 (Midjourney, ChatGPT, DALL·E, Claude, Gemini, FLUX, Stable Diffusion, Veo, Sora 등 30+)
  → 프롬프트 타입 선택 (Image / Text / Video)
  → 카테고리 선택 (70+ 카테고리)

Step 2: 프롬프트 작성
  → 프롬프트 텍스트 입력 (변수는 [대괄호]로 표시)
  → 테스트 프롬프트 입력 (변수가 채워진 완성 버전 1개)
  → 프롬프트 설명 (제목, 상세 설명, 사용 사례)

Step 3: 예시 출력물 업로드
  → 이미지/비디오 최대 9개 업로드
  → 썸네일 자동 생성 (3장 선택 가능)
  → 커스텀 썸네일 업로드 (선택)

Step 4: 가격 설정
  → 가격 입력 (Free ~ ₩50,000 / $0.99 ~ $49.99)
  → 할인율 설정 (선택)
  → Select 포함 여부 (선택)

Step 5: 검증 & 제출
  → 검증 링크 입력 (특정 모델)
  → 약관 동의
  → 제출 → 심사 대기 (15분~36시간)
```

### 프롬프트 심사 규칙 (자동 + 수동)

| 거절 사유               | 설명                                           |
| ----------------------- | ---------------------------------------------- |
| 유스케이스 없음          | 구매 가치가 불충분                              |
| 범위 너무 좁음           | [변수]를 추가하여 일반화 필요                   |
| 스타일 불일관            | 예시 출력물 간 스타일이 크게 다름               |
| 낮은 품질                | 오탈자, 의미불명 프롬프트                       |
| 테스트 생성물 불일치     | 심사팀 테스트 결과가 예시와 다름                |
| 너무 단순/추측 가능      | 제목만 봐도 프롬프트를 유추 가능                |
| 기존 프롬프트와 중복     | AI 유사도 검사로 감지                           |
| NSFW                    | 성인/폭력 콘텐츠                                |
| 모델 규칙 위반           | AI 모델의 이용약관 우회                         |
| 표절                    | 공개 출처에서 복사한 프롬프트                   |
| AI 대량 생성             | 수작업이 아닌 자동 생성 의심                    |
| 검증 링크 불일치         | 제출 내용과 검증 링크 내용 불일치               |

### 구매 플로우 (구매자)

```
개별 구매:
  프롬프트 상세 → Add to Cart → Cart 페이지 → Stripe Checkout → 결제 완료
  → 즉시 프롬프트 텍스트 접근 가능 (account/purchases)
  → PDF 인보이스 다운로드 가능

Select 구독 구매:
  Select 가입 → 매월 10개 다운로드 가능
  → ∞ 아이콘 프롬프트 선택 → "Download with Select" 클릭 → 즉시 접근

환불 정책:
  → 구매 후 24시간 이내
  → 프롬프트가 설명대로 작동하지 않는 경우에만
  → 증거 제출 필수
```

### 리뷰 시스템

| 항목           | 규칙                                  |
| -------------- | ------------------------------------- |
| 작성 자격      | 해당 프롬프트 구매자만                |
| 평점           | 1~5 별점                              |
| 텍스트 리뷰    | 선택 사항                             |
| 수정/삭제      | 작성자 본인만 가능                    |
| 판매자 응답    | 채팅으로 리뷰어에게 직접 연락 가능    |

### 프롬프트 노출 랭킹 알고리즘

```
Trending Score = (최근 7일 판매 × 0.4) + (최근 7일 조회 × 0.2) + (즐겨찾기 × 0.2) + (평점 × 0.2)
Featured = 편집팀 수동 선정 (고유한 아이디어 + 높은 일관성)
Search Ranking = 텍스트 관련성(Meilisearch) × 판매·조회·즐겨찾기·리뷰 가중치
```

### 홈페이지 섹션 순서

1. 히어로 배너 캐러셀 (3~5개, 5초 자동 전환, 프로모션/Featured/신기능 소개)
2. Featured Prompts (편집 선정, 가로 스크롤 캐러셀)
3. Trending Prompts (1~30위 넘버링, 가로 스크롤)
4. 카테고리 바로가기 (아이콘 + 라벨 그리드)
5. AI 모델별 인기 (Midjourney / ChatGPT / Gemini 등 탭 전환)
6. Newest Prompts (최신 등록순)
7. 이달의 인기 프롬프트 (월간 Top 15, 넘버링)
8. 판매자 CTA 배너 ("Sell your prompts — 2분이면 시작")
9. Hire CTA 배너 ("전문 프롬프트 엔지니어에게 맡기세요")

---

## 디자인 시스템

### 색상 토큰

| 용도           | Tailwind 클래스       | 값                     |
| -------------- | -------------------- | ---------------------- |
| 주요 CTA       | `bg-primary`         | `#6366F1` (인디고)     |
| 보조 CTA       | `bg-secondary`       | `#0F172A` (슬레이트)   |
| 메인 배경      | `bg-background`      | `#FAFAFA`              |
| 사이드바 배경  | `bg-sidebar`         | `#FFFFFF`              |
| 카드 배경      | `bg-card`            | `#FFFFFF`              |
| hover/selected | `bg-accent`          | `#F1F5F9`              |
| 에러/삭제      | `bg-destructive`     | `#EF4444`              |
| 성공           | `text-success`       | `#22C55E`              |
| 경고           | `text-warning`       | `#F59E0B`              |

### 판매자 등급 색상

| 등급      | 텍스트                  | 배경                     |
| --------- | ---------------------- | ------------------------ |
| Diamond   | `text-seller-diamond`  | `bg-seller-diamond-bg`   |
| Gold      | `text-seller-gold`     | `bg-seller-gold-bg`      |
| Silver    | `text-seller-silver`   | `bg-seller-silver-bg`    |
| Bronze    | `text-seller-bronze`   | `bg-seller-bronze-bg`    |

### 프롬프트 상태 색상

| 상태        | 클래스                    |
| ----------- | ------------------------- |
| 판매중      | `text-prompt-active`      |
| 심사중      | `text-prompt-pending`     |
| 거절됨      | `text-prompt-rejected`    |
| 비활성화    | `text-prompt-inactive`    |

### AI 모델 태그 색상 (이모지 + 라벨)

| 모델            | 이모지 | 배경색        |
| --------------- | ------ | ------------- |
| Midjourney      | ⛵     | `bg-blue-50`  |
| ChatGPT Image   | 🖌️     | `bg-green-50` |
| Gemini Image    | 🍌     | `bg-yellow-50`|
| DALL·E          | 🎨     | `bg-pink-50`  |
| Stable Diffusion| 🖼️     | `bg-purple-50`|
| Claude          | 🤖     | `bg-orange-50`|
| FLUX            | ⚡     | `bg-cyan-50`  |
| Veo             | ✨     | `bg-indigo-50`|
| Sora            | 🎬     | `bg-rose-50`  |
| ChatGPT (Text)  | 💬     | `bg-emerald-50`|
| Grok            | ✖️     | `bg-gray-50`  |

### 레이아웃 치수

| 요소             | 크기                                       |
| ---------------- | ------------------------------------------ |
| GNB 사이드바     | 240px (접힘: 64px)                          |
| 상단 바          | 56px                                        |
| 콘텐츠 max-width | 1280px (마켓플레이스는 full-width 그리드)   |
| 프롬프트 카드    | 그리드: 5열 (1280px), 4열 (1024px), 3열 (768px), 2열 (모바일) |
| 카드 이미지      | aspect-ratio: 1/1 (정사각형)                |

### 타이포그래피

**폰트**: Pretendard Variable (`font-sans`) / JetBrains Mono (`font-mono`, 가격 전용)
**Letter-spacing**: `-0.015em` 전역

| 용도           | Tailwind                             |
| -------------- | ------------------------------------ |
| 페이지 타이틀  | `text-2xl font-bold`                 |
| 섹션 헤더      | `text-xl font-semibold`              |
| 카드 제목      | `text-sm font-semibold`              |
| 가격           | `text-sm font-bold font-mono`        |
| 보조 텍스트    | `text-[13px] text-muted-foreground`  |
| 배지/태그      | `text-xs font-medium`               |

### 디자인 원칙

1. **Border over Shadow** — 분리는 border 먼저, shadow는 hover/모달만
2. **Selective Color** — AI 모델 태그·판매자 등급·시스템 피드백에만 색상. 나머지 모노크롬
3. **Light only** — 다크 모드 미지원 (MVP)
4. **Responsive** — 데스크톱 우선, 반응형 지원 (URR과 다르게 모바일도 지원)
5. **사이드바 레이아웃** — URR과 동일한 좌측 고정 사이드바 패턴

### 애니메이션

| 요소                  | 스펙                                      |
| --------------------- | ----------------------------------------- |
| 사이드바 접기/펼치기  | width 250ms ease-out                      |
| 모달 열림             | fade + scale 95%→100%, 200ms ease-out     |
| 모달 닫힘             | fade + scale 100%→95%, 150ms ease-in      |
| 카드 hover            | shadow-sm→md + translateY(-1px) 150ms     |
| 스켈레톤 shimmer      | gradient sweep 1.5s loop                  |
| Toast 등장            | slide-in-right 300ms, 5s 유지, fade 200ms |
| 이미지 갤러리 전환    | fade 200ms                                |
| 필터 패널 열기/닫기   | slide-down 200ms ease-out                 |

---

## 컴포넌트 설계

### entities/prompt/

```
entities/prompt/
├── model/
│   └── types.ts          # Prompt, PromptCategory, PromptStatus, AIModel 타입
├── ui/
│   ├── PromptCard.tsx     # 마켓플레이스 그리드용 카드
│   ├── PromptCardCompact.tsx  # 리스트뷰용 컴팩트 카드
│   ├── AIModelBadge.tsx   # AI 모델 이모지+라벨 배지
│   ├── PromptTypeBadge.tsx # Image/Text/Video 타입 배지
│   ├── PriceBadge.tsx     # 가격 표시 (할인율 포함)
│   ├── PromptStatusBadge.tsx # 심사중/판매중/거절 상태 배지
│   └── SelectBadge.tsx    # ∞ Select 포함 여부 배지
└── index.ts
```

#### PromptCard 상세 스펙

```tsx
// PromptCard — 마켓플레이스 그리드의 기본 단위
<div className="group flex flex-col rounded-lg border border-border bg-card overflow-hidden cursor-pointer transition-all duration-150 hover:shadow-md hover:-translate-y-px">
  {/* 이미지 영역 — 1:1 정사각형 */}
  <div className="aspect-square bg-muted relative overflow-hidden">
    <img src={thumbnail} className="absolute inset-0 w-full h-full object-cover" />
    {/* 좌상단: AI 모델 배지 */}
    <AIModelBadge model="midjourney" className="absolute top-2 left-2" />
    {/* 우상단: 즐겨찾기 버튼 */}
    <FavoriteButton className="absolute top-2 right-2" />
    {/* 하단: Select 배지 (해당 시) */}
    {isSelect && <SelectBadge className="absolute bottom-2 left-2" />}
    {/* 워터마크 오버레이 (퍼즐 패턴) */}
    <div className="absolute inset-0 pointer-events-none opacity-10 bg-[url('/watermark.svg')]" />
  </div>

  {/* 정보 영역 */}
  <div className="p-3 space-y-1.5">
    <h4 className="text-sm font-semibold line-clamp-2 leading-tight group-hover:text-primary transition-colors">
      {title}
    </h4>
    <div className="flex items-center gap-2">
      <span className="text-[13px] text-muted-foreground">@{sellerUsername}</span>
      {rating && (
        <span className="flex items-center gap-0.5 text-xs">
          <Star size={12} className="fill-yellow-400 text-yellow-400" />
          {rating}
        </span>
      )}
    </div>
    <div className="flex items-center justify-between">
      <PriceBadge price={price} discount={discount} />
      {isFree && <span className="text-xs font-semibold text-success">Free</span>}
    </div>
  </div>
</div>
```

### entities/user/

```
entities/user/
├── model/
│   └── types.ts           # User, SellerProfile, SellerTier 타입
├── ui/
│   ├── SellerTierBadge.tsx # 💎🥇🥈🥉 판매자 등급 배지
│   ├── UserAvatar.tsx      # 아바타 + 온라인 표시
│   └── SellerCard.tsx      # Hire 페이지용 판매자 카드
└── index.ts
```

### entities/review/

```
entities/review/
├── model/
│   └── types.ts           # Review 타입
├── ui/
│   ├── ReviewCard.tsx      # 개별 리뷰 카드
│   ├── RatingStars.tsx     # 1~5 별점 표시/입력
│   └── ReviewSummary.tsx   # 평균 평점 + 분포 바
└── index.ts
```

### entities/category/

```
entities/category/
├── model/
│   └── types.ts            # Category, AIModel 타입 + 상수
├── ui/
│   ├── CategoryChip.tsx    # 필터용 카테고리 칩
│   └── ModelFilterChip.tsx # AI 모델 필터 칩
└── index.ts
```

### features/

```
features/
├── auth/                   # 로그인/회원가입/소셜인증
│   ├── ui/
│   │   ├── LoginForm.tsx
│   │   ├── RegisterForm.tsx
│   │   └── SocialLoginButtons.tsx
│   ├── model/
│   │   └── useAuth.ts
│   └── api/
│       └── authApi.ts
│
├── prompt-upload/          # 프롬프트 등록 (판매자)
│   ├── ui/
│   │   ├── UploadWizard.tsx        # 멀티스텝 폼 컨테이너
│   │   ├── StepBasicInfo.tsx       # Step 1: 모델/타입/카테고리
│   │   ├── StepPromptContent.tsx   # Step 2: 프롬프트 텍스트 + 테스트
│   │   ├── StepExampleOutputs.tsx  # Step 3: 예시 이미지/비디오 업로드
│   │   ├── StepPricing.tsx         # Step 4: 가격/할인/Select
│   │   └── StepReview.tsx          # Step 5: 최종 확인 + 제출
│   ├── model/
│   │   └── useUploadWizard.ts      # 스텝 상태 관리 (Zustand)
│   └── api/
│       └── uploadApi.ts
│
├── prompt-purchase/        # 프롬프트 구매
│   ├── ui/
│   │   ├── AddToCartButton.tsx
│   │   ├── CartSidebar.tsx         # 장바구니 슬라이드 오버
│   │   ├── CheckoutPage.tsx
│   │   └── SelectDownloadButton.tsx # Select 구독 다운로드
│   ├── model/
│   │   └── useCart.ts              # 장바구니 Zustand store
│   └── api/
│       └── purchaseApi.ts
│
├── marketplace-filter/     # 마켓플레이스 필터링
│   ├── ui/
│   │   ├── FilterPanel.tsx         # 좌측 필터 패널 (또는 상단 드롭다운)
│   │   ├── SortDropdown.tsx
│   │   ├── ActiveFilters.tsx       # 현재 적용된 필터 칩 목록
│   │   └── SearchInput.tsx
│   ├── model/
│   │   └── useFilters.ts           # URL 파라미터 동기화
│   └── index.ts
│
├── review/                 # 리뷰 작성/편집
│   ├── ui/
│   │   ├── WriteReviewForm.tsx
│   │   └── ReviewList.tsx
│   ├── model/
│   │   └── useReview.ts
│   └── api/
│       └── reviewApi.ts
│
├── seller-dashboard/       # 판매자 분석 대시보드
│   ├── ui/
│   │   ├── SalesChart.tsx          # 매출 그래프
│   │   ├── ViewsChart.tsx          # 조회수 그래프
│   │   ├── PromptPerformance.tsx   # 개별 프롬프트 성과
│   │   └── PayoutHistory.tsx       # 정산 내역
│   ├── model/
│   │   └── useAnalytics.ts
│   └── api/
│       └── analyticsApi.ts
│
├── chat/                   # 1:1 메시지
│   ├── ui/
│   │   ├── ChatWindow.tsx
│   │   ├── ChatList.tsx
│   │   └── MessageBubble.tsx
│   ├── model/
│   │   └── useChat.ts
│   └── api/
│       └── chatApi.ts
│
├── subscription/           # Select 구독 관리
│   ├── ui/
│   │   ├── SelectPlanCards.tsx
│   │   ├── SubscriptionStatus.tsx
│   │   └── TopUpDialog.tsx
│   ├── model/
│   │   └── useSubscription.ts
│   └── api/
│       └── subscriptionApi.ts
│
└── notification/           # 알림
    ├── ui/
    │   ├── NotificationBell.tsx     # 상단바 알림 아이콘 + 뱃지
    │   ├── NotificationDropdown.tsx
    │   └── NotificationList.tsx
    ├── model/
    │   └── useNotifications.ts
    └── api/
        └── notificationApi.ts
```

### widgets/

```
widgets/
├── layout/
│   ├── AppSidebar.tsx         # 좌측 사이드바 (URR 패턴 차용)
│   ├── TopBar.tsx             # 상단 바 (검색 + 알림 + 프로필)
│   ├── Footer.tsx
│   ├── LayoutShell.tsx        # 전체 레이아웃 프레임
│   └── model/
│       └── useLayout.tsx      # 사이드바 접기/펼치기 상태
│
├── home/
│   ├── HeroBannerCarousel.tsx # 히어로 배너 캐러셀
│   ├── FeaturedSection.tsx    # Featured Prompts 캐러셀
│   ├── TrendingSection.tsx    # Trending 1~30위
│   ├── CategoryGrid.tsx       # 카테고리 바로가기 그리드
│   ├── ModelTabSection.tsx    # AI 모델별 인기 (탭 전환)
│   ├── NewestSection.tsx      # 최신 등록 프롬프트
│   ├── MonthlyPopular.tsx     # 이달의 인기 Top 15
│   ├── SellerCTABanner.tsx    # 판매 유도 배너
│   ├── HomeWidget.tsx         # 위 섹션 모두 조합
│   └── HomePageSkeleton.tsx   # 로딩 스켈레톤
│
├── marketplace/
│   ├── MarketplaceWidget.tsx  # 필터 + 그리드 조합
│   ├── PromptGrid.tsx         # 프롬프트 카드 그리드
│   └── MarketplaceSkeleton.tsx
│
├── prompt-detail/
│   ├── PromptDetailWidget.tsx # 상세 페이지 전체
│   ├── ImageGallery.tsx       # 예시 이미지 갤러리 (메인 + 썸네일)
│   ├── PromptInfo.tsx         # 제목, 판매자, 설명, 메타 정보
│   ├── PurchasePanel.tsx      # 우측: 가격 + Add to Cart + 보장 아이콘
│   ├── ReviewSection.tsx      # 리뷰 목록 + 작성 폼
│   └── RelatedPrompts.tsx     # 관련 프롬프트 추천
│
├── sell/
│   ├── SellWidget.tsx         # 등록 플로우 전체 (UploadWizard 감싸기)
│   └── PromptGuidelines.tsx   # 가이드라인 안내
│
├── account/
│   ├── AccountWidget.tsx      # 계정 탭 전환 컨테이너
│   ├── PurchasesList.tsx      # 구매 내역
│   ├── MyPromptsList.tsx      # 내 프롬프트 관리
│   ├── AnalyticsDashboard.tsx # 판매 분석
│   ├── PayoutSection.tsx      # 정산 관리
│   └── SettingsForm.tsx       # 설정
│
├── profile/
│   ├── PublicProfileWidget.tsx # 공개 프로필
│   ├── ProfileHeader.tsx       # 아바타 + 이름 + 등급 + 통계
│   └── SellerPromptGrid.tsx    # 해당 판매자의 프롬프트 그리드
│
├── search/
│   ├── SearchWidget.tsx        # 검색 결과 페이지
│   └── SearchSuggestions.tsx   # 자동완성
│
├── chat/
│   └── ChatWidget.tsx          # 채팅 페이지 전체
│
└── leaderboard/
    └── LeaderboardWidget.tsx   # 판매자 랭킹 테이블
```

---

## 사이드바 네비게이션 구조

```
┌──────────────────────┐
│  🏪 프롬마켓 (로고)   │  ← 접힘 시 아이콘만
│                      │
│  ── 메인 ──           │
│  🏠 홈                │
│  🛒 마켓플레이스       │
│  🔍 검색              │
│                      │
│  ── 크리에이터 ──     │
│  📤 프롬프트 판매      │
│  💼 Hire              │
│  🎨 앱 빌더           │
│                      │
│  ── 내 카테고리 ──    │  ← 접힘 시 숨김
│  ⛵ Midjourney         │
│  🖌️ ChatGPT Image     │
│  🍌 Gemini Image      │
│  ✨ Veo               │
│  더 보기 (+24)        │
│                      │
│  ─ separator ─        │
│  💬 채팅              │
│                      │
│  ════════════════════ │
│  [아바타] 사용자이름   │  ← 하단 고정
│  💎 Diamond            │
└──────────────────────┘
```

### 사이드바 동작 규칙

- `isSidebarExpanded: boolean` — Zustand로 관리
- 접힘 시: 아이콘만 표시 (64px), 호버 시 툴팁
- 펼침 시: 아이콘 + 라벨 (240px)
- "내 카테고리" 섹션: 사용자가 최근 본/구매한 AI 모델 카테고리 자동 표시
- 하단 사용자 프로필: 아바타 + 이름 + 판매자 등급 배지
- 로그인 전: 하단에 "로그인 / 회원가입" 버튼

### TopBar 구조

```
┌────────────────────────────────────────────────────────────┐
│  [검색 인풋 (expandable)]          [🔔 알림] [장바구니 🛒] │
└────────────────────────────────────────────────────────────┘
```

---

## API 엔드포인트

```
# 인증
POST   /api/auth/register           ← 이메일 회원가입
POST   /api/auth/login              ← 로그인
POST   /api/auth/social/:provider   ← 소셜 로그인 (google, github)
POST   /api/auth/logout             ← 로그아웃
GET    /api/auth/me                 ← 현재 유저 정보

# 프롬프트
GET    /api/prompts                 ← 프롬프트 목록 (필터/정렬/페이지네이션)
GET    /api/prompts/:slug           ← 프롬프트 상세
POST   /api/prompts                 ← 프롬프트 등록 (판매자)
PUT    /api/prompts/:id             ← 프롬프트 수정
DELETE /api/prompts/:id             ← 프롬프트 삭제
GET    /api/prompts/:id/content     ← 프롬프트 텍스트 (구매자만)
POST   /api/prompts/:id/favorite    ← 즐겨찾기 토글

# 마켓플레이스
GET    /api/marketplace/featured    ← Featured 프롬프트
GET    /api/marketplace/trending    ← Trending 프롬프트
GET    /api/marketplace/newest      ← 최신 프롬프트
GET    /api/marketplace/popular     ← 이달의 인기
GET    /api/marketplace/categories  ← 카테고리 목록
GET    /api/marketplace/models      ← AI 모델 목록

# 검색
GET    /api/search?q=...&model=...&category=...&type=...&sort=...&page=...

# 구매
POST   /api/cart/add                ← 장바구니 추가
DELETE /api/cart/:itemId            ← 장바구니 제거
GET    /api/cart                    ← 장바구니 조회
POST   /api/checkout                ← Stripe Checkout 세션 생성
GET    /api/purchases               ← 구매 내역
GET    /api/purchases/:id/invoice   ← 인보이스 PDF

# 구독 (Select)
POST   /api/subscription/create     ← Select 구독 시작
POST   /api/subscription/cancel     ← 구독 취소
GET    /api/subscription/status     ← 구독 상태
POST   /api/subscription/download/:promptId ← Select 다운로드
POST   /api/subscription/topup      ← 크레딧/다운로드 충전

# 리뷰
GET    /api/prompts/:id/reviews     ← 리뷰 목록
POST   /api/prompts/:id/reviews     ← 리뷰 작성
PUT    /api/reviews/:id             ← 리뷰 수정
DELETE /api/reviews/:id             ← 리뷰 삭제

# 판매자
GET    /api/seller/dashboard        ← 판매 통계
GET    /api/seller/analytics        ← 상세 분석 (기간 필터)
GET    /api/seller/payouts          ← 정산 내역
POST   /api/seller/payout-request   ← 조기 출금 요청
GET    /api/seller/prompts          ← 내 프롬프트 목록

# 프로필
GET    /api/profile/:username       ← 공개 프로필
PUT    /api/profile                 ← 프로필 수정

# 채팅
GET    /api/chat/conversations      ← 대화 목록
GET    /api/chat/:conversationId    ← 메시지 목록
POST   /api/chat/:conversationId    ← 메시지 전송
POST   /api/chat/new                ← 새 대화 시작

# 알림
GET    /api/notifications           ← 알림 목록
PUT    /api/notifications/:id/read  ← 읽음 처리
PUT    /api/notifications/read-all  ← 전체 읽음

# 업로드
POST   /api/upload/image            ← 이미지 업로드 (S3/R2)
POST   /api/upload/video            ← 비디오 업로드

# Hire (크리에이터 마켓)
GET    /api/hire/creators           ← 크리에이터 목록
POST   /api/hire/request            ← 커스텀 작업 의뢰
GET    /api/hire/requests           ← 내 의뢰 목록

# 리더보드
GET    /api/leaderboard             ← 판매자 랭킹

# 관리자
GET    /api/admin/prompts/pending   ← 심사 대기 목록
POST   /api/admin/prompts/:id/approve ← 승인
POST   /api/admin/prompts/:id/reject  ← 거절 (사유 포함)
```

인증 헤더: `Authorization: Bearer <accessToken>`
401 응답 시 토큰 자동 갱신 후 재시도.

---

## 데이터 모델 (Prisma 스키마 개요)

```prisma
model User {
  id            String    @id @default(cuid())
  email         String    @unique
  name          String
  username      String    @unique
  avatar        String?
  bio           String?
  role          Role      @default(BUYER)
  sellerTier    SellerTier @default(BRONZE)
  stripeConnectId String?   // Stripe Connect 계정
  totalSales    Int       @default(0)
  totalViews    Int       @default(0)
  rank          Int?
  createdAt     DateTime  @default(now())
  prompts       Prompt[]
  purchases     Purchase[]
  reviews       Review[]
  favorites     Favorite[]
  subscription  Subscription?
}

model Prompt {
  id            String    @id @default(cuid())
  slug          String    @unique
  title         String
  description   String    @db.Text
  promptText    String    @db.Text   // 실제 프롬프트 (구매 후 공개)
  testPrompt    String    @db.Text   // 테스트 프롬프트
  price         Decimal   @db.Decimal(10, 2)
  discount      Int?      // 할인율 %
  isFree        Boolean   @default(false)
  isSelect      Boolean   @default(false) // Select 구독 포함
  status        PromptStatus @default(PENDING)
  type          PromptType   // IMAGE, TEXT, VIDEO
  aiModel       String       // midjourney, chatgpt-image, etc.
  categoryId    String
  category      Category  @relation(fields: [categoryId], references: [id])
  sellerId      String
  seller        User      @relation(fields: [sellerId], references: [id])
  images        PromptImage[]
  reviews       Review[]
  purchases     Purchase[]
  favorites     Favorite[]
  wordCount     Int
  viewCount     Int       @default(0)
  salesCount    Int       @default(0)
  favoriteCount Int       @default(0)
  avgRating     Decimal?  @db.Decimal(2, 1)
  isFeatured    Boolean   @default(false)
  verificationLink String?
  rejectionReason  String?
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
}

model PromptImage {
  id        String  @id @default(cuid())
  url       String
  order     Int
  isThumbnail Boolean @default(false)
  promptId  String
  prompt    Prompt  @relation(fields: [promptId], references: [id])
}

model Category {
  id      String   @id @default(cuid())
  name    String   @unique
  slug    String   @unique
  icon    String?
  prompts Prompt[]
}

model Purchase {
  id        String   @id @default(cuid())
  userId    String
  user      User     @relation(fields: [userId], references: [id])
  promptId  String
  prompt    Prompt   @relation(fields: [promptId], references: [id])
  amount    Decimal  @db.Decimal(10, 2)
  currency  String   @default("USD")
  method    PurchaseMethod // INDIVIDUAL, SELECT
  stripePaymentId String?
  createdAt DateTime @default(now())
}

model Review {
  id        String   @id @default(cuid())
  rating    Int      // 1~5
  comment   String?  @db.Text
  userId    String
  user      User     @relation(fields: [userId], references: [id])
  promptId  String
  prompt    Prompt   @relation(fields: [promptId], references: [id])
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model Favorite {
  id        String   @id @default(cuid())
  userId    String
  user      User     @relation(fields: [userId], references: [id])
  promptId  String
  prompt    Prompt   @relation(fields: [promptId], references: [id])
  createdAt DateTime @default(now())
  @@unique([userId, promptId])
}

model Subscription {
  id              String   @id @default(cuid())
  userId          String   @unique
  user            User     @relation(fields: [userId], references: [id])
  plan            String   // basic, pro
  status          SubStatus // ACTIVE, CANCELLED, EXPIRED
  downloadsLeft   Int      @default(10)
  creditsLeft     Int      @default(1000)
  rolloverDownloads Int    @default(0)
  stripeSubId     String?
  currentPeriodEnd DateTime
  createdAt       DateTime @default(now())
}

enum Role { BUYER, SELLER, ADMIN }
enum SellerTier { BRONZE, SILVER, GOLD, DIAMOND }
enum PromptStatus { PENDING, ACTIVE, REJECTED, INACTIVE }
enum PromptType { IMAGE, TEXT, VIDEO }
enum PurchaseMethod { INDIVIDUAL, SELECT }
enum SubStatus { ACTIVE, CANCELLED, EXPIRED }
```

---

## MVP 개발 단계

### Phase 1 — 코어 (2주)

1. 프로젝트 세팅 (Next.js 16, Tailwind v4, shadcn/ui, FSD 구조)
2. 디자인 시스템 구축 (globals.css, 색상 토큰, 컴포넌트)
3. 레이아웃 (사이드바 + 상단바 + 푸터)
4. 홈페이지 (히어로 + 섹션들, mock 데이터)
5. 인증 (로그인/회원가입 UI)

### Phase 2 — 마켓플레이스 (2주)

6. 마켓플레이스 페이지 (필터 + 정렬 + 프롬프트 그리드)
7. 프롬프트 상세 페이지 (이미지 갤러리 + 정보 + 구매 패널)
8. 검색 페이지 (통합 검색)
9. 카테고리·모델별 필터링

### Phase 3 — 판매자 (2주)

10. 프롬프트 등록 멀티스텝 폼
11. 이미지/비디오 업로드
12. 판매자 대시보드 (분석 + 정산)
13. 내 프롬프트 관리 (수정/삭제)

### Phase 4 — 결제 & 계정 (1주)

14. 장바구니 + Stripe Checkout 연동
15. 구매 내역 + 프롬프트 접근
16. Select 구독 UI
17. 계정 설정

### Phase 5 — 소셜 & 부가 (1주)

18. 리뷰 시스템
19. 채팅 (1:1 메시지)
20. 알림 시스템
21. 공개 프로필 + 리더보드

### Phase 6 — 폴리시 (1주)

22. 스켈레톤 로딩 전체 적용
23. SEO 최적화 (메타 태그, OG 이미지)
24. 에러 핸들링 + 빈 상태 UI
25. 반응형 대응 (태블릿/모바일)

---

## 브랜치 전략

```
main                      # 프로덕션. 직접 push 금지.
dev                       # 통합 브랜치. PR로만 merge.
feat/<scope>              # 기능 개발. dev에서 분기.
fix/<scope>               # 버그 수정.
chore/<scope>             # 설정·의존성·문서.
```

### AI 에이전트 작업 규칙

1. **에이전트 1개 = 브랜치 1개** — 작업 전 브랜치 지정 필수
2. **분기점은 항상 `dev`** — `git checkout -b feat/<scope> dev`
3. **`dev`, `main`에 직접 push 금지**
4. **작업 완료 후 PR 생성** — 사람이 검토 후 merge
5. **빌드 통과 필수** — `npm run build` 통과하는 상태로만 push

---

## Mock 데이터 구조

Phase 1~2에서는 실제 API 없이 mock 데이터로 UI를 먼저 구현한다.
mock 파일은 `src/shared/lib/mocks/` 아래에 배치.

```
mocks/
├── prompts.ts          # 프롬프트 목록 (30개+)
├── categories.ts       # 카테고리 목록
├── models.ts           # AI 모델 목록
├── user.ts             # 현재 로그인 유저
├── reviews.ts          # 리뷰 데이터
├── home.ts             # 홈페이지 섹션별 데이터
├── sellers.ts          # 판매자 목록 (리더보드용)
└── notifications.ts    # 알림 데이터
```

---

## 참고 문서

- `docs/PRD.md` — 이 파일의 비즈니스 규칙 요약본
- `docs/ARCHITECTURE.md` — FSD 레이어 규칙, API, 인프라
- `docs/designsystem.md` — 색상 토큰, 컴포넌트 스펙, 애니메이션
- 참고 프로젝트: `github.com/KTCloud-TechUp/urr-frontend` (feat/discord-notification 브랜치)
  - 사이드바 레이아웃, FSD 구조, 디자인 패턴 참고
- 참고 사이트: `promptbase.com` — 비즈니스 모델, 기능 범위 참고