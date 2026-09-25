# 제이앤제이(J&J) Style Guide

> Version 1.0 · 2026-09-25
> 대상: 제이앤제이 공식 웹사이트 (반응형 웹, PC/Tablet/Mobile)
> 레퍼런스: 위드고(withgo.or.kr), 글로벌 6K 포 워터(global6kforwater.com), 희망조약돌(joyagdol.com), 미래복지재단 미랄(miral.org)

---

## 1. Brand Overview (브랜드 개요)

### 1.1 기본 정보

| 항목 | 내용 |
|---|---|
| 업체명 | 제이앤제이 (J&J) |
| 산업 분야 | 사회복지 / 비영리 후원단체 |
| 브랜드 컬러 | 블루 계열 (신뢰 · 투명성 · 안정감) |
| 핵심 타깃 | 30~60대 정기후원자, 기업 CSR 담당자, 지역사회 수혜자 및 보호자 |
| 톤 앤 매너 | 따뜻하지만 단정한, 신뢰할 수 있는, 사람 중심의 |

### 1.2 핵심 디자인 원칙

1. **Trust First — 신뢰가 보이는 디자인**
   복지·후원 단체의 전환(후원 신청)은 "이 단체를 믿을 수 있는가"에서 결정됩니다. 블루 컬러를 중심으로 넉넉한 여백, 정돈된 그리드, 명확한 숫자(후원금·수혜자 수·사업 실적)를 전면에 배치해 투명성을 시각화합니다. 장식보다 정보의 명료함을 우선합니다.

2. **People-Centered Storytelling — 사람의 이야기로 연결**
   희망조약돌·미랄처럼 수혜자의 실제 사진과 짧은 서사형 카피("스무살의 첫 실패를 후원합니다")를 대형 비주얼로 사용합니다. 사진은 따뜻한 자연광 톤, 인물 중심 크롭을 원칙으로 하며, 이야기 → 공감 → 후원 버튼으로 이어지는 흐름을 모든 섹션에 설계합니다.

3. **Accessible & Calm Motion — 누구나 쉽게, 차분하게 움직이는**
   고령 후원자와 다양한 사용자를 고려해 본문 최소 16px, 명도 대비 WCAG 2.1 AA(4.5:1) 이상, 터치 영역 최소 44×44px을 지킵니다. 애니메이션은 "부드럽게 떠오르는" 느린 ease-out 계열만 사용하며, 과도한 회전·바운스·깜빡임은 금지합니다. `prefers-reduced-motion`을 반드시 지원합니다.

### 1.3 정보 구조 (IA) — 필수 메뉴

| 1Depth (GNB) | 2Depth | 비고 |
|---|---|---|
| **메인페이지** | – | 로고 클릭 시 이동 |
| **소개** | 인사말 · 비전과 미션 · 연혁 · 조직도 · 오시는 길 | 연혁은 타임라인 컴포넌트 |
| **후원** | 정기후원 · 일시후원 · 물품후원 · 기업후원 · 후원 FAQ · 기부금 영수증 안내 | 헤더 우측 `후원하기` CTA 상시 노출 |
| **소식** | 활동소식 · 후원 스토리 · 언론보도 · 갤러리 | 카드형 그리드 게시판 |
| **공지사항** | 공지사항 · 재정 보고(투명경영) | 리스트형 게시판 |

**메인페이지 섹션 구성 (위→아래)**

1. Header (투명 → 스크롤 시 화이트)
2. Hero 슬라이드 (풀스크린 캠페인 비주얼 + 카피 + 후원 CTA)
3. Quick Donation (정기후원 / 일시후원 / 물품후원 / 기업후원 아이콘 4분할)
4. 우리의 약속 (미션 소개 + 이미지 패럴랙스)
5. Impact in Numbers (누적 후원금 · 후원자 수 · 수혜 가정 수 카운터)
6. 진행 중인 캠페인 (모금률 프로그레스 바 카드 슬라이더)
7. 후원 스토리 (대형 이미지 + 인용형 카피)
8. 소식 · 공지사항 (탭 또는 2단 분할)
9. 투명성 인증 배너 (가이드스타·기부금단체 지정 등)
10. 하단 CTA 밴드 ("함께하는 한 걸음이 희망이 됩니다" + 후원 버튼)
11. Footer

---

## 2. Color System (컬러 시스템)

### 2.1 Primary — J&J Blue

브랜드의 핵심 컬러. 로고, GNB 활성 상태, 주요 버튼, 링크, 포인트 텍스트에 사용합니다. **기준색은 `Blue 500 #1F5FD6`** (흰 배경 대비 5.7:1, AA 통과).

| Token | HEX | RGB | 용도 |
|---|---|---|---|
| `--blue-50` | `#EEF4FF` | 238, 244, 255 | 섹션 배경 틴트, 선택된 리스트 행 배경 |
| `--blue-100` | `#D9E6FF` | 217, 230, 255 | 태그/뱃지 배경, 프로그레스 바 트랙 |
| `--blue-200` | `#B4CCFF` | 180, 204, 255 | 비활성 보더, 차트 보조 |
| `--blue-300` | `#82A9F7` | 130, 169, 247 | 아이콘 보조, 일러스트 |
| `--blue-400` | `#4F83EA` | 79, 131, 234 | 다크 배경 위 링크, 포커스 링 |
| **`--blue-500`** | **`#1F5FD6`** | **31, 95, 214** | **Primary 버튼, 링크, 활성 메뉴, 로고** |
| `--blue-600` | `#184CB3` | 24, 76, 179 | Primary 버튼 Hover |
| `--blue-700` | `#133C8F` | 19, 60, 143 | Primary 버튼 Active(Pressed), 강조 헤딩 |
| `--blue-800` | `#0F2F6E` | 15, 47, 110 | 다크 섹션 보조 배경 |
| `--blue-900` | `#0A1F4A` | 10, 31, 74 | 다크 섹션 배경, Footer 배경 |

### 2.2 Secondary

| Token | HEX | RGB | 용도 |
|---|---|---|---|
| `--sky-400` | `#38BDF8` | 56, 189, 248 | 그라디언트 끝점, 일러스트·아이콘 포인트 (텍스트 사용 금지) |
| `--sky-100` | `#E0F4FD` | 224, 244, 253 | 캠페인 카드 배경 틴트 |
| `--warm-500` | `#F97316` | 249, 115, 22 | **후원 강조 포인트** — 하트 아이콘, 모금률 %, 뱃지 "마감임박" |
| `--warm-600` | `#C2410C` | 194, 65, 12 | 후원하기 버튼 배경 (흰 텍스트 대비 5.2:1) |
| `--warm-700` | `#9A3412` | 154, 52, 18 | 후원하기 버튼 Hover |
| `--warm-50` | `#FFF4EC` | 255, 244, 236 | 후원 관련 안내 박스 배경 |

> **Warm 사용 규칙**: 블루가 "신뢰"라면 웜 오렌지는 "행동(후원)"입니다. 한 화면(뷰포트) 내 웜 컬러 면적은 **5% 이하**로 제한하며, `후원하기` 계열 CTA에만 배경색으로 사용합니다.

**Brand Gradient**
```css
--gradient-brand: linear-gradient(135deg, #1F5FD6 0%, #38BDF8 100%);
--gradient-hero-overlay: linear-gradient(180deg, rgba(10,31,74,0) 40%, rgba(10,31,74,0.72) 100%);
```

### 2.3 Background

| Token | HEX | RGB | 용도 |
|---|---|---|---|
| `--bg-default` | `#FFFFFF` | 255, 255, 255 | 기본 페이지 배경, 카드 |
| `--bg-subtle` | `#F7F9FC` | 247, 249, 252 | 교차 섹션 배경 (섹션 구분) |
| `--bg-muted` | `#EEF2F8` | 238, 242, 248 | 입력 필드 disabled, 게시판 헤더 행 |
| `--bg-brand` | `#EEF4FF` | 238, 244, 255 | 브랜드 톤 섹션 (미션, 숫자 섹션) |
| `--bg-inverse` | `#0A1F4A` | 10, 31, 74 | 다크 섹션, Footer, 하단 CTA 밴드 |
| `--bg-dim` | `rgba(10,31,74,0.6)` | – | 모달 딤 |

### 2.4 Text

| Token | HEX | RGB | 대비(흰 배경) | 용도 |
|---|---|---|---|---|
| `--text-strong` | `#111827` | 17, 24, 39 | 17.7:1 | 헤딩, 강조 텍스트 |
| `--text-default` | `#374151` | 55, 65, 81 | 10.3:1 | 본문 |
| `--text-muted` | `#6B7280` | 107, 114, 128 | 4.8:1 | 보조 설명, 날짜, 캡션 |
| `--text-disabled` | `#9CA3AF` | 156, 163, 175 | 2.5:1 | 비활성 텍스트 (정보 전달용 사용 금지) |
| `--text-inverse` | `#FFFFFF` | 255, 255, 255 | – | 다크/컬러 배경 위 텍스트 |
| `--text-inverse-muted` | `rgba(255,255,255,0.72)` | – | – | 다크 배경 위 보조 텍스트 |
| `--text-link` | `#1F5FD6` | 31, 95, 214 | 5.7:1 | 링크 |

### 2.5 Line & Status

| Token | HEX | RGB | 용도 |
|---|---|---|---|
| `--border-default` | `#E5E7EB` | 229, 231, 235 | 카드, 테이블, 구분선 |
| `--border-strong` | `#D1D5DB` | 209, 213, 219 | 인풋 기본 보더 |
| `--success` | `#16A34A` | 22, 163, 74 | 완료, 결제 성공 |
| `--warning` | `#F59E0B` | 245, 158, 11 | 주의 (아이콘/배경 전용) |
| `--error` | `#DC2626` | 220, 38, 38 | 에러 메시지, 필수 표시(*) |
| `--info` | `#1F5FD6` | 31, 95, 214 | 안내 |

### 2.6 CSS Design Tokens

```css
:root {
  /* Primary */
  --blue-50:#EEF4FF; --blue-100:#D9E6FF; --blue-200:#B4CCFF; --blue-300:#82A9F7;
  --blue-400:#4F83EA; --blue-500:#1F5FD6; --blue-600:#184CB3; --blue-700:#133C8F;
  --blue-800:#0F2F6E; --blue-900:#0A1F4A;
  /* Secondary */
  --sky-100:#E0F4FD; --sky-400:#38BDF8;
  --warm-50:#FFF4EC; --warm-500:#F97316; --warm-600:#C2410C; --warm-700:#9A3412;
  /* Background */
  --bg-default:#FFFFFF; --bg-subtle:#F7F9FC; --bg-muted:#EEF2F8; --bg-brand:#EEF4FF; --bg-inverse:#0A1F4A;
  /* Text */
  --text-strong:#111827; --text-default:#374151; --text-muted:#6B7280; --text-disabled:#9CA3AF;
  --text-inverse:#FFFFFF; --text-link:#1F5FD6;
  /* Line & Status */
  --border-default:#E5E7EB; --border-strong:#D1D5DB;
  --success:#16A34A; --warning:#F59E0B; --error:#DC2626;
}
```

---

## 3. Typography (타이포그래피)

### 3.1 Font Family

| 역할 | 폰트 | 사용처 | 로드 |
|---|---|---|---|
| **국문/영문 기본** | **Pretendard Variable** | 전체 UI, 헤딩, 본문 | `cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/variable/pretendardvariable-dynamic-subset.css` |
| 영문 디스플레이 | **Plus Jakarta Sans** (600/700/800) | 영문 섹션 타이틀("OUR MISSION"), 오버라인, 대형 숫자 | Google Fonts |
| 감성 인용 (선택) | **MaruBuri** (마루 부리, 400/600) | 후원 스토리 인용문, 인사말 서명 문구 한정 | 네이버 한글한글 아름답게 CDN |

```css
--font-sans: "Pretendard Variable", Pretendard, -apple-system, BlinkMacSystemFont,
             "Apple SD Gothic Neo", "Malgun Gothic", system-ui, sans-serif;
--font-display: "Plus Jakarta Sans", "Pretendard Variable", sans-serif;
--font-serif: "MaruBuri", "Nanum Myeongjo", serif;
```

**공통 규칙**
- 한글 줄바꿈: `word-break: keep-all; overflow-wrap: break-word;`
- 숫자(후원금, 카운터, 날짜): `font-variant-numeric: tabular-nums;`
- 헤딩 자간은 음수(-0.02 ~ -0.03em), 본문 자간은 -0.01em, 오버라인은 +0.12em
- 굵기는 400 / 500 / 600 / 700 네 가지만 사용 (800은 Display 숫자 한정)

### 3.2 Font Scale

기준: `1rem = 16px`. Desktop(≥1024px) / Mobile(<768px) 이중 스케일, 태블릿은 `clamp()`로 보간합니다.

| Token | Desktop Size | Mobile Size | Line-height | Letter-spacing | Weight | 용도 |
|---|---|---|---|---|---|---|
| `display` | 72px | 40px | 1.2 | -0.03em | 700 | 메인 Hero 카피 |
| `h1` | 56px | 34px | 1.25 | -0.03em | 700 | 서브페이지 비주얼 타이틀 |
| `h2` | 44px | 28px | 1.3 | -0.02em | 700 | 섹션 타이틀 |
| `h3` | 32px | 24px | 1.35 | -0.02em | 700 | 서브 섹션 타이틀 |
| `h4` | 24px | 20px | 1.4 | -0.02em | 600 | 카드 타이틀(대), 모달 타이틀 |
| `h5` | 20px | 18px | 1.45 | -0.01em | 600 | 카드 타이틀(소), 리스트 타이틀 |
| `body-lg` | 18px | 17px | 1.7 | -0.01em | 400 | 리드 문단, 인사말 본문 |
| `body-md` | 16px | 16px | 1.7 | -0.01em | 400 | 기본 본문 (**최소 본문 크기**) |
| `body-sm` | 14px | 14px | 1.6 | -0.005em | 400 | 보조 설명, 테이블 셀 |
| `caption` | 13px | 12px | 1.5 | 0 | 400 | 날짜, 출처, 이미지 캡션 |
| `overline` | 14px | 12px | 1.4 | 0.12em | 700 | 섹션 상단 영문 라벨 (UPPERCASE, `--blue-500`) |
| `number-xl` | 64px | 40px | 1.1 | -0.02em | 800 | Impact 카운터 숫자 |
| `button` | 17px / 15px | 16px / 15px | 1 | -0.01em | 600 | 버튼 L / M |

```css
--fs-display: clamp(2.5rem, 1.6rem + 3.6vw, 4.5rem);
--fs-h1:      clamp(2.125rem, 1.5rem + 2.6vw, 3.5rem);
--fs-h2:      clamp(1.75rem, 1.3rem + 1.9vw, 2.75rem);
--fs-h3:      clamp(1.5rem, 1.25rem + 1vw, 2rem);
--fs-h4:      clamp(1.25rem, 1.15rem + 0.4vw, 1.5rem);
```

### 3.3 섹션 타이틀 조합 패턴

```
[overline]  OUR MISSION               → 14px / 700 / 0.12em / --blue-500
[h2]        모두가 함께 웃는 내일을     → 44px / 700 / --text-strong
[body-lg]   제이앤제이는 ...           → 18px / 400 / --text-muted
간격: overline ↔ h2 = 12px, h2 ↔ body = 20px, 타이틀 블록 ↔ 콘텐츠 = 56px (Mobile 32px)
```

---

## 4. UI Components (주요 UI 컴포넌트 형태)

### 4.0 Foundation — Layout, Spacing, Radius, Shadow

**Grid & Breakpoints**

| Breakpoint | 범위 | Columns | Gutter | Side Margin | Container |
|---|---|---|---|---|---|
| Mobile | 0–767px | 4 | 16px | 20px | 100% |
| Tablet | 768–1023px | 8 | 24px | 32px | 100% |
| Desktop | 1024–1439px | 12 | 24px | 40px | max 1280px |
| Wide | ≥1440px | 12 | 32px | auto | max 1320px |

**Spacing (4px base)**: `4 · 8 · 12 · 16 · 20 · 24 · 32 · 40 · 48 · 56 · 64 · 80 · 120 · 160`
- 섹션 상하 패딩: Desktop **160px** / Tablet **120px** / Mobile **80px**
- 카드 내부 패딩: Desktop 32px / Mobile 24px

**Radius**

| Token | 값 | 적용 |
|---|---|---|
| `--radius-xs` | 4px | 체크박스, 태그(소) |
| `--radius-sm` | 8px | 뱃지, 툴팁 |
| `--radius-md` | 12px | 인풋, 셀렉트, 게시판 검색바 |
| `--radius-lg` | 20px | 카드, 모달 |
| `--radius-xl` | 32px | Hero 내 이미지 박스, 대형 배너 |
| `--radius-full` | 9999px | 버튼(Pill), 칩, 아바타, 프로그레스 바 |

> 레퍼런스(희망조약돌·미랄)의 부드러운 인상을 따라 **버튼은 Pill, 카드는 20px**을 기본으로 합니다. 직각(0px)은 풀블리드 이미지·테이블에만 허용합니다.

**Shadow (블루 톤 섀도로 차갑지 않게)**

| Token | 값 | 적용 |
|---|---|---|
| `--shadow-xs` | `0 1px 2px rgba(10,31,74,0.06)` | 인풋, 칩 |
| `--shadow-sm` | `0 4px 12px rgba(10,31,74,0.06)` | 카드 기본 |
| `--shadow-md` | `0 12px 32px rgba(10,31,74,0.10)` | 카드 Hover, 드롭다운, 스크롤된 헤더 |
| `--shadow-lg` | `0 24px 56px rgba(10,31,74,0.16)` | 모달, 플로팅 후원 버튼 |
| `--shadow-brand` | `0 12px 28px rgba(31,95,214,0.28)` | Primary 버튼 Hover |

### 4.1 Header / GNB

| 속성 | 값 |
|---|---|
| 높이 | Desktop 88px → 스크롤 80px 이후 **72px** / Mobile 60px 고정 |
| 초기 상태 (메인 Hero 위) | 배경 `transparent`, 로고·메뉴 `#FFFFFF` |
| 스크롤 상태 | 배경 `rgba(255,255,255,0.92)` + `backdrop-filter: blur(12px)`, 하단 보더 `1px solid --border-default`, 텍스트 `--text-strong` |
| 메뉴 폰트 | 18px / 600 / 메뉴 간격 56px |
| 활성/Hover | 텍스트 `--blue-500` + 하단 2px 바 (폭 0 → 100%, 0.3s) |
| 2Depth | 전체 폭 메가메뉴, 배경 `#FFFFFF`, 상단 보더 1px, 높이 auto(패딩 40px 0), 각 1Depth 하단 정렬 컬럼 / 항목 16px 400, 행간 40px |
| 우측 유틸 | `후원하기` 버튼 (Warm, Pill, 높이 44px, 패딩 0 24px) + 햄버거(모바일) |
| 스크롤 방향 | 아래로 스크롤 시 헤더 숨김(`translateY(-100%)`), 위로 스크롤 시 재노출 — 0.4s |

**Mobile 메뉴**: 우측 슬라이드 풀스크린 패널(배경 `#FFFFFF`), 1Depth 20px/700 아코디언, 하단 고정 `정기후원하기` 풀폭 버튼(높이 56px).

### 4.2 Buttons

| Variant | 배경 | 텍스트 | 보더 | Hover | Active |
|---|---|---|---|---|---|
| **Primary** | `--blue-500` | `#FFF` | none | `--blue-600` + `--shadow-brand` + `translateY(-2px)` | `--blue-700`, translateY(0) |
| **Donate** (후원 전용) | `--warm-600` | `#FFF` | none | `--warm-700` + 하트 아이콘 `scale(1.15)` | `#7C2D12` |
| **Secondary** | `#FFF` | `--blue-500` | `1.5px solid --blue-500` | 배경 `--blue-50` | 배경 `--blue-100` |
| **Ghost** | transparent | `--text-strong` | `1px solid --border-strong` | 보더 `--text-strong` | 배경 `--bg-muted` |
| **Inverse** (다크 배경) | `#FFF` | `--blue-900` | none | 배경 `--blue-50` | – |
| **Text Link** | – | `--blue-500` | – | 밑줄 + 화살표 `translateX(4px)` | – |

| Size | Height | Padding (좌우) | Font | Icon | Radius |
|---|---|---|---|---|---|
| L | 56px | 32px | 17px / 600 | 20px | 9999px |
| M | 48px | 24px | 16px / 600 | 18px | 9999px |
| S | 40px | 16px | 15px / 600 | 16px | 9999px |
| XS | 32px | 12px | 14px / 500 | 14px | 9999px |

- 아이콘-텍스트 간격 8px, 화살표 아이콘은 텍스트 우측
- Disabled: 배경 `--bg-muted`, 텍스트 `--text-disabled`, `cursor: not-allowed`, 그림자·모션 제거
- Focus: `outline: 3px solid rgba(31,95,214,0.4); outline-offset: 2px;` (`:focus-visible` 한정)
- 모바일에서 주요 CTA는 풀폭(`width: 100%`)

### 4.3 Cards

**A. 캠페인 카드 (진행 중인 캠페인 / 후원)**
- 배경 `#FFF`, radius 20px, `--shadow-sm`, 보더 없음, `overflow: hidden`
- 썸네일 비율 **4:3**, 상단 좌측 뱃지(예: `정기후원` = `--blue-100` 배경 + `--blue-700` 텍스트, `마감임박` = `--warm-50` + `--warm-600`), 뱃지 radius 8px, 13px/600, 패딩 4px 10px
- 본문 패딩 28px: 카테고리(caption, `--blue-500`) → 타이틀(h5, 최대 2줄 말줄임) → 모금 프로그레스 바 → 모금액/목표액(body-sm, 모금률 %는 `--warm-500` 700)
- 프로그레스 바: 높이 8px, 트랙 `--blue-100`, 필 `--gradient-brand`, radius 9999px
- Hover: `translateY(-8px)` + `--shadow-md`, 이미지 `scale(1.06)` (0.6s)

**B. 소식 카드 (활동소식 / 후원 스토리 / 갤러리)**
- 썸네일 **16:10**, radius 20px (이미지 자체에 radius, 카드 배경 없음 — 에디토리얼 스타일)
- 이미지 하단 16px 간격 → 카테고리 칩 → 타이틀(h5 2줄) → 날짜(caption, `--text-muted`)
- Grid: Desktop 3열 / Tablet 2열 / Mobile 1열, column-gap 24px, row-gap 56px

**C. Quick Donation 카드 (메인 4분할)**
- 배경 `--bg-subtle`, radius 20px, 패딩 40px 32px, 보더 `1px solid transparent`
- 64px 라인 아이콘(stroke 2px, `--blue-500`) → 타이틀(h4) → 설명(body-sm) → 우측 하단 화살표 원형 버튼(40px)
- Hover: 배경 `--blue-500`, 텍스트·아이콘 `#FFF`, 화살표 `rotate(-45deg)` (0.4s)

**D. Impact 숫자 카드**
- 배경 없음, 상단 1px 보더 `--border-default` + 패딩 32px 0
- 라벨(body-md, `--text-muted`) → 숫자(number-xl, `--blue-500`) + 단위(h4, `--text-strong`, 숫자와 4px 간격)

### 4.4 Form Elements

| 요소 | 스펙 |
|---|---|
| Input / Select | 높이 **52px**(Mobile 48px), 패딩 0 16px, radius 12px, 배경 `#FFF`, 보더 `1px solid --border-strong`, 텍스트 16px(모바일 iOS 줌 방지 위해 최소 16px) |
| Placeholder | `--text-disabled` |
| Hover | 보더 `--text-muted` |
| Focus | 보더 `1.5px solid --blue-500` + `box-shadow: 0 0 0 4px rgba(31,95,214,0.12)` |
| Error | 보더 `--error`, 하단 메시지 13px `--error`, 좌측 ! 아이콘 |
| Disabled | 배경 `--bg-muted`, 텍스트 `--text-disabled` |
| Label | 15px / 600 / `--text-strong`, 인풋과 8px 간격, 필수는 `*` `--error` |
| Helper text | 13px / `--text-muted`, 인풋 하단 6px |
| Textarea | min-height 160px, 패딩 16px, `resize: vertical` |
| Checkbox / Radio | 22px, 체크박스 radius 6px, 체크 시 배경 `--blue-500`, 라벨과 10px 간격, 클릭 영역 44px |
| 후원 금액 선택 | Chip 그리드(3만/5만/10만/직접입력), 높이 56px, radius 12px, 선택 시 보더 2px `--blue-500` + 배경 `--blue-50` + 텍스트 `--blue-700` 700 |
| 필드 간격 | 필드 사이 24px, 그룹 사이 48px |

### 4.5 Board (공지사항 · 재정보고)

- 상단: 총 게시물 수(`총 <b>128</b>건`, `--blue-500`) + 우측 검색바(셀렉트 120px + 인풋 280px + 검색 버튼, 높이 48px)
- 테이블: 상단 보더 **2px solid `--text-strong`**, 행 높이 72px(Mobile 카드형 전환), 행 하단 1px `--border-default`
- 컬럼: 번호(80px, 중앙) / 제목(auto, 좌측, 16px 500) / 작성일(140px, `--text-muted`) / 조회수(100px)
- 고정 공지: 번호 대신 `공지` 뱃지(`--blue-500` 배경, 흰 텍스트, radius 9999px), 행 배경 `--bg-brand`
- Hover: 행 배경 `--bg-subtle`, 제목 `--blue-500` + 밑줄
- NEW 표시: 3일 이내 게시물 제목 우측 `N` 원형 뱃지 16px `--warm-500`
- Pagination: 버튼 40×40px, radius 9999px, 현재 페이지 `--blue-500` 배경 + 흰 텍스트, 간격 4px, 좌우 화살표 포함
- 상세: 제목 h3 → 메타(작성일·조회수, caption) → 구분선 → 본문(body-lg, 최대폭 800px) → 첨부파일 박스(`--bg-subtle`, radius 12px) → 이전/다음 글 → `목록` 버튼(Ghost M)

### 4.6 Tabs · Chips · Badges

- **Tabs (라인형)**: 높이 56px, 16px/600, 비활성 `--text-muted`, 활성 `--text-strong` + 하단 2px `--blue-500` 인디케이터(탭 간 슬라이드 이동 0.4s)
- **Tabs (세그먼트형, 소식/공지 전환)**: 컨테이너 배경 `--bg-muted`, radius 9999px, 패딩 4px / 활성 탭 `#FFF` + `--shadow-xs`
- **Chip (필터)**: 높이 40px, 패딩 0 18px, radius 9999px, 보더 1px `--border-default` / 선택 시 배경 `--text-strong` + 흰 텍스트

### 4.7 Hero (메인 비주얼)

- 높이 `100svh` (최소 640px, 최대 1080px), 배경 이미지 `object-fit: cover` + `--gradient-hero-overlay`
- 카피 영역: 좌측 하단 정렬, 하단 여백 160px(Mobile 96px), 최대폭 760px
  - overline(흰색 72%) → display(흰색) → body-lg(흰색 80%) → 버튼 그룹(Donate L + Inverse Ghost L, 간격 12px)
- 슬라이드 컨트롤: 우측 하단 — `01 / 04` 카운터(Plus Jakarta Sans 16px) + 프로그레스 라인(120px × 2px, 흰색 30% 트랙 / 흰색 필) + 이전·다음·일시정지 버튼(40px 원형, 보더 1px 흰색 40%)
- 스크롤 인디케이터: 하단 중앙, 1px × 48px 라인 루프 애니메이션

### 4.8 기타 컴포넌트

- **플로팅 후원 버튼**: 우측 하단 고정(right 24px, bottom 24px), 64px 원형, `--warm-600` + 하트 아이콘 + `--shadow-lg`. Hero 영역 통과 후 노출. Mobile에서는 하단 고정 바(높이 64px, `정기후원` / `일시후원` 2분할)로 대체
- **Top 버튼**: 48px 원형, 흰 배경 + `--shadow-md`, 플로팅 버튼 위 12px
- **Sub Visual (서브페이지 상단)**: 높이 400px(Mobile 240px), 이미지 + 다크 오버레이 45%, 중앙에 h1 + breadcrumb(`홈 > 소개 > 인사말`, 14px 흰색 72%) / 하단 2Depth 탭 바(높이 64px, 흰 배경, sticky)
- **Timeline (연혁)**: 좌측 연도(h2, `--blue-500`, sticky) / 우측 월·내용 리스트, 세로 라인 1px `--border-default`, 포인트 원 12px `--blue-500`
- **Modal / Popup**: 최대폭 560px, radius 20px, 패딩 40px, `--shadow-lg`, 딤 `rgba(10,31,74,0.6)`, 하단 `오늘 하루 보지 않기` 체크 + 닫기
- **Footer**: 배경 `--blue-900`, 텍스트 `rgba(255,255,255,0.72)` 14px/1.8, 상단 유틸 링크(개인정보처리방침은 흰색 700) → 기관 정보(대표자·고유번호·주소·연락처) → **후원 계좌 정보 박스**(배경 `rgba(255,255,255,0.06)`, radius 12px, 패딩 20px 24px) → 투명성 인증 로고(흑백 60% 투명도) → Copyright(13px, 흰색 48%). 상하 패딩 80px

### 4.9 Iconography & Imagery

- 아이콘: **Line 스타일**, stroke 1.75–2px, 모서리 round, 24px 그리드 (추천: Phosphor Icons Regular 또는 Lucide)
- 사진: 인물 중심, 자연광, 채도 -5~-10% / 따뜻한 화이트밸런스. 수혜자 얼굴 노출 시 동의 여부 확인, 아동은 뒷모습·부분 크롭 우선
- 이미지 radius: 카드 내부 이미지 = 카드와 동일(20px), 단독 에디토리얼 이미지 = 32px

---

## 5. Animation & Interaction (애니메이션 및 상호작용)

> 레퍼런스(희망조약돌·미랄) 공통 키워드: **부드러운 페이드업 등장, 스태거드 카드 진입, 슬로우 줌 히어로 슬라이드, 숫자 카운트업, 패럴랙스 이미지**. 
> 원칙: "눈에 띄는" 모션이 아니라 "읽기 편하게 안내하는" 모션. 한 번 등장한 요소는 다시 사라지지 않습니다(`once: true`).

### 5.1 Motion Tokens

**Duration**

| Token | 값 | 적용 |
|---|---|---|
| `--dur-instant` | 100ms | 체크박스 체크, 토글 |
| `--dur-fast` | 200ms | 버튼 색상, 링크 컬러, 인풋 포커스 |
| `--dur-base` | 300ms | 버튼 Hover 이동, 드롭다운 열림, 탭 전환 |
| `--dur-moderate` | 400ms | 헤더 숨김/노출, 메가메뉴, 카드 Hover 그림자 |
| `--dur-slow` | 600ms | 카드 이미지 줌, 모달 등장 |
| `--dur-reveal` | 900ms | 스크롤 등장(페이드업) |
| `--dur-hero` | 1200ms | Hero 슬라이드 전환, 텍스트 마스크 리빌 |
| `--dur-kenburns` | 7000ms | Hero 배경 슬로우 줌 |
| `--dur-counter` | 2000ms | 숫자 카운트업 |

**Easing**

| Token | 값 | 성격 / 적용 |
|---|---|---|
| `--ease-standard` | `cubic-bezier(0.4, 0, 0.2, 1)` | 일반 UI 상태 변화 (색상, 보더) |
| `--ease-out-quart` | `cubic-bezier(0.25, 1, 0.5, 1)` | 버튼·카드 Hover, 드롭다운 (빠르게 반응, 부드럽게 정지) |
| `--ease-out-expo` | `cubic-bezier(0.16, 1, 0.3, 1)` | **스크롤 리빌, 텍스트 등장 — 메인 시그니처 이징** |
| `--ease-in-out-cubic` | `cubic-bezier(0.65, 0, 0.35, 1)` | Hero 슬라이드 전환, 탭 인디케이터, 헤더 숨김 |
| `--ease-in` | `cubic-bezier(0.4, 0, 1, 1)` | 퇴장(모달 닫기, 토스트 사라짐) — 등장 시간의 70%로 짧게 |
| `linear` | – | 프로그레스 라인(슬라이드 타이머), 마퀴, Ken Burns |

> GSAP 대응: `--ease-out-expo` ≈ `"expo.out"`, `--ease-out-quart` ≈ `"power3.out"`, `--ease-in-out-cubic` ≈ `"power2.inOut"`

```css
:root {
  --dur-fast:200ms; --dur-base:300ms; --dur-moderate:400ms; --dur-slow:600ms;
  --dur-reveal:900ms; --dur-hero:1200ms;
  --ease-standard:cubic-bezier(0.4,0,0.2,1);
  --ease-out-quart:cubic-bezier(0.25,1,0.5,1);
  --ease-out-expo:cubic-bezier(0.16,1,0.3,1);
  --ease-in-out-cubic:cubic-bezier(0.65,0,0.35,1);
}
```

### 5.2 Hover Interaction

| 대상 | 변화 | Duration / Easing |
|---|---|---|
| Primary 버튼 | 배경 `--blue-600`, `translateY(-2px)`, `--shadow-brand` | 300ms / out-quart |
| Donate 버튼 | 배경 `--warm-700`, 하트 아이콘 `scale(1.15)` 1회 펄스 | 300ms / out-quart |
| 화살표 링크/버튼 | 화살표 `translateX(4px)` | 300ms / out-quart |
| GNB 메뉴 | 하단 2px 바 `scaleX(0→1)`, `transform-origin: left` | 300ms / out-quart |
| 캠페인 카드 | 카드 `translateY(-8px)` + `--shadow-md`, 이미지 `scale(1.06)` | 카드 400ms / 이미지 600ms, out-quart |
| 소식 카드 | 이미지 `scale(1.05)`, 타이틀 `--blue-500` + 밑줄 | 600ms / out-quart |
| Quick Donation | 배경 `--blue-500`로 채움, 화살표 `rotate(-45deg)` | 400ms / out-quart |
| 게시판 행 | 배경 `--bg-subtle` | 200ms / standard |

- Hover 효과는 `@media (hover: hover) and (pointer: fine)` 안에서만 적용 (모바일 sticky hover 방지)
- 모바일 터치 피드백: `:active { transform: scale(0.98); }` 100ms

### 5.3 Transition (페이지 · 상태)

- **헤더**: 스크롤 80px 이후 배경/높이 변경 400ms `--ease-standard`, 방향 감지 숨김/노출 400ms `--ease-in-out-cubic`
- **메가메뉴**: `opacity 0→1` + `translateY(-8px→0)` 300ms out-quart, 닫힘 200ms ease-in, 마우스 이탈 후 150ms 딜레이
- **모바일 메뉴**: 패널 `translateX(100%→0)` 500ms out-expo, 메뉴 항목 60ms 간격 스태거 페이드업
- **모달**: 딤 opacity 300ms / 박스 `opacity 0→1, scale(0.96→1), translateY(16px→0)` 400ms out-expo
- **탭 콘텐츠 전환**: 이전 콘텐츠 opacity 0 (150ms) → 신규 콘텐츠 `opacity 0→1, translateY(12px→0)` 400ms out-quart
- **아코디언(FAQ)**: `grid-template-rows: 0fr → 1fr` 400ms in-out-cubic, 아이콘 `rotate(45deg)`
- **페이지 이동**: 별도 페이지 트랜지션 없이, 서브 비주얼 타이틀이 로드 시 텍스트 리빌(5.4-B)로 등장

### 5.4 Scroll Animation

**A. 기본 페이드업 (Fade Up) — 전 섹션 공통**
- 초기: `opacity: 0; transform: translateY(48px);` (Mobile 32px)
- 트리거: 요소 상단이 뷰포트 **85%** 지점 도달 시 (`start: "top 85%"`)
- 동작: 900ms / `--ease-out-expo`, 1회 재생
- 적용 순서: 섹션 타이틀 블록 → 콘텐츠

**B. 텍스트 마스크 리빌 (Hero · 서브 비주얼 · 섹션 대형 카피)**
- 줄 단위로 `overflow: hidden` 래핑 → 내부 텍스트 `translateY(110%) → 0`
- 1200ms / `--ease-out-expo`, 줄 간 스태거 **120ms**
- Hero 슬라이드 변경 시마다 재실행

**C. 스태거 카드 등장 (캠페인 · 소식 · Quick Donation)**
- 각 카드 페이드업(A와 동일), 카드 간 딜레이 **100ms**, 최대 6개까지 누적(이후 동시)

**D. 이미지 리빌 (미션 섹션 · 후원 스토리)**
- `clip-path: inset(100% 0 0 0) → inset(0 0 0 0)` 1200ms `--ease-in-out-cubic`
- 동시에 내부 이미지 `scale(1.2) → 1` 1600ms out-expo

**E. 패럴랙스**
- 대형 배경 이미지 `yPercent: -10 → 10`, `scrub: true` (스크롤에 1:1 연동)
- 텍스트와 이미지의 속도 차이는 최대 15% 이내 (멀미 방지). Mobile에서는 비활성

**F. 숫자 카운트업 (Impact in Numbers)**
- 뷰포트 70% 진입 시 0 → 목표값, 2000ms, `power2.out`, 천 단위 콤마 실시간 포맷
- 숫자 간 시작 딜레이 150ms, 단위(명·원·가구)는 숫자 완료 직후 `opacity` 페이드 300ms

**G. 모금 프로그레스 바**
- 뷰포트 진입 시 `width 0 → n%` 1400ms `--ease-out-expo`, 동시에 % 숫자 카운트업

**H. Hero 슬라이드 (Swiper)**
- 효과: `fade` (crossFade), 전환 1200ms `--ease-in-out-cubic`
- 자동 재생 **6000ms**, 사용자 조작 후에도 재생 유지, 일시정지 버튼 필수(접근성)
- 활성 슬라이드 배경 Ken Burns: `scale(1.1) → 1` 7000ms linear
- 우측 하단 프로그레스 라인 `scaleX(0 → 1)` 6000ms linear로 타이머 시각화

**I. 캠페인 카드 슬라이더**
- `slidesPerView: 1.2 (Mobile) / 2.3 (Tablet) / 3 (Desktop)`, spaceBetween 24, speed 700ms, 드래그 커서 커스텀 원형(80px, `--blue-500`, "DRAG" 텍스트)

**J. 로고/파트너 마퀴 (투명성·협력기관)**
- 무한 좌측 흐름, 40s linear 1회전, Hover 시 `animation-play-state: paused`

**K. 스무스 스크롤**
- Lenis 사용: `duration: 1.1`, `easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t))`, 모바일 터치는 네이티브 유지(`syncTouch: false`)

### 5.5 구현 예시

```html
<!-- 권장 라이브러리 -->
<script src="https://cdn.jsdelivr.net/npm/gsap@3/dist/gsap.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/gsap@3/dist/ScrollTrigger.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/lenis@1/dist/lenis.min.js"></script>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css" />
<script src="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js"></script>
```

```js
gsap.registerPlugin(ScrollTrigger);
const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Smooth scroll
if (!reduce) {
  const lenis = new Lenis({ duration: 1.1 });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((t) => lenis.raf(t * 1000));
  gsap.ticker.lagSmoothing(0);
}

// A. Fade Up
gsap.utils.toArray('[data-anim="fade-up"]').forEach((el) => {
  gsap.from(el, {
    y: window.innerWidth < 768 ? 32 : 48, opacity: 0,
    duration: 0.9, ease: 'expo.out',
    scrollTrigger: { trigger: el, start: 'top 85%', once: true },
  });
});

// C. Stagger Cards
gsap.utils.toArray('[data-anim="stagger"]').forEach((group) => {
  gsap.from(group.children, {
    y: 48, opacity: 0, duration: 0.9, ease: 'expo.out', stagger: 0.1,
    scrollTrigger: { trigger: group, start: 'top 85%', once: true },
  });
});

// F. Counter
gsap.utils.toArray('[data-counter]').forEach((el) => {
  const target = +el.dataset.counter;
  const obj = { v: 0 };
  gsap.to(obj, {
    v: target, duration: 2, ease: 'power2.out',
    onUpdate: () => (el.textContent = Math.round(obj.v).toLocaleString('ko-KR')),
    scrollTrigger: { trigger: el, start: 'top 70%', once: true },
  });
});

// H. Hero Slider
new Swiper('.hero-swiper', {
  effect: 'fade', fadeEffect: { crossFade: true },
  speed: 1200, loop: true,
  autoplay: { delay: 6000, disableOnInteraction: false },
  pagination: { el: '.hero-pagination', type: 'fraction' },
  navigation: { nextEl: '.hero-next', prevEl: '.hero-prev' },
  a11y: { enabled: true },
});
```

```css
/* 접근성: 모션 최소화 */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
  [data-anim] { opacity: 1 !important; transform: none !important; }
}
```

### 5.6 Motion Do & Don't

| ✅ Do | ❌ Don't |
|---|---|
| `transform`, `opacity`, `clip-path`만 애니메이션 (GPU 가속) | `width/height/top/left` 애니메이션 (프로그레스 바 제외, 가능하면 `scaleX`로 대체) |
| 등장 모션은 1회 (`once: true`) | 스크롤 올릴 때 요소가 다시 사라지는 반복 모션 |
| 한 뷰포트 내 동시 모션 요소 최대 6개 | 섹션마다 다른 종류의 효과 혼용 |
| 이동 거리 48px 이하 | 회전, 바운스(`back`/`elastic`), 3D 플립 |
| Hero 자동 슬라이드에 일시정지 버튼 제공 | 5초 이상 지속되는 자동 재생을 멈출 수 없게 만드는 것 |
| 로딩 후 첫 화면(Hero) 모션은 0.2s 딜레이 후 시작 | 초기 로딩 시 전체 화면 인트로/프리로더 (후원 전환율 저하) |
