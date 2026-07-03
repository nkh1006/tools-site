# Tools Site — 개발 가이드

이 프로젝트는 Google AdSense 수익화를 목적으로 한 **멀티툴 웹사이트**입니다.
하나의 도메인 안에 여러 무료 온라인 도구(계산기, 변환기 등)를 제공합니다.

---

## 기술 스택

- **Framework**: Next.js (App Router) + TypeScript
- **Styling**: Tailwind CSS
- **Font**: Noto Sans KR (`next/font/google`)
- **i18n**: next-intl (한국어 기본, 영어는 `/en/*` 접두사)
- **Deploy**: Vercel
- **Ads**: Google AdSense

---

## 다국어(i18n) 구조

- 라이브러리: `next-intl`, 라우팅 설정은 `i18n/routing.ts` (`locales: ["ko", "en"]`, `defaultLocale: "ko"`, `localePrefix: "as-needed"`)
- 한국어는 접두사 없이 기존 URL 그대로 (`/loan-calculator`), 영어는 `/en/*` (`/en/loan-calculator`)
- 모든 라우트는 `app/[locale]/...` 아래에 위치. `app/[locale]/layout.tsx`가 사실상 루트 레이아웃 역할
- 번역 문자열은 `messages/ko.json`, `messages/en.json`에 네임스페이스별로 관리 (예: `LoanPage`, `LoanCalculator`, `Header`, `Footer`, `Home` 등)
- 언어 전환 링크는 `i18n/navigation.ts`에서 export하는 `Link`/`usePathname`/`useRouter` (next/link, next/navigation 대신 항상 이걸 사용)
- 미들웨어는 `proxy.ts` (Next 16부터 `middleware.ts` 대신 `proxy.ts` 컨벤션 사용, `next-intl/middleware`의 `createMiddleware(routing)` 그대로 사용)
- 헤더의 언어 스위처(`app/components/Header.tsx`)는 `usePathname()`으로 현재 경로를 얻고 `locale` prop만 바꿔 `Link`를 렌더링

---

## 프로젝트 구조

```
app/
├── [locale]/
│   ├── layout.tsx               # 루트 레이아웃 역할: 공통 헤더/푸터, AdSense 스크립트, generateMetadata
│   ├── page.tsx                 # 홈: 전체 tool 목록 카드
│   └── tool-slug/
│       └── page.tsx             # 각 tool의 라우트 페이지 (Server Component + generateMetadata)
├── globals.css
├── sitemap.ts                   # 두 언어 URL + hreflang alternates 포함
├── robots.ts
├── components/
│   ├── Header.tsx                # 사이트 공통 헤더 (네비게이션 + 언어 스위처)
│   ├── Footer.tsx                 # 사이트 공통 푸터
│   ├── AdBanner.tsx               # AdSense 광고 배너 컴포넌트
│   └── tools/
│       └── ToolName.tsx           # 각 tool의 인터랙티브 로직 (Client Component)
i18n/
├── routing.ts                    # locales, defaultLocale, localePrefix 정의
├── navigation.ts                 # locale-aware Link/usePathname/useRouter
└── request.ts                    # next-intl 요청별 locale/messages 설정
messages/
├── ko.json
└── en.json
proxy.ts                          # next-intl 미들웨어 (Next 16의 middleware.ts 후신)
```

---

## 새 Tool 추가 방법

tool 하나를 추가할 때 **4곳**을 작업한다.

### 1. `app/components/tools/NewTool.tsx`
- 반드시 `"use client"` 선언
- 계산/변환 로직과 UI를 모두 담는 Client Component
- 외부 라이브러리 없이 순수 React + 브라우저 API만 사용 (단, 텍스트는 하드코딩하지 말고 `useTranslations`/`useLocale` (from `next-intl`) 사용)

### 2. `messages/ko.json`, `messages/en.json` — 네임스페이스 추가
tool 페이지용(`NewToolPage`)과 컴포넌트용(`NewTool`) 네임스페이스를 각각 추가하고 두 언어 모두 채운다.

### 3. `app/[locale]/new-tool/page.tsx`
```tsx
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import NewTool from "../../components/tools/NewTool";
import AdBanner from "../../components/AdBanner";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "NewToolPage" });
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    alternates: {
      languages: { ko: "/new-tool", en: "/en/new-tool" },
    },
  };
}

export default async function NewToolPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("NewToolPage");

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">{t("h1")}</h1>
        <p className="text-sm text-gray-500 mt-1">{t("subtitle")}</p>
      </div>
      <AdBanner />
      <NewTool />
      <AdBanner />
    </div>
  );
}
```

### 4. `app/[locale]/page.tsx` — tools 배열에 항목 추가 (Home 네임스페이스 키 사용)
```ts
{
  href: "/new-tool",
  emoji: "🔧",
  title: t("newToolTitle"),
  desc: t("newToolDesc"),
  category: "finance",   // finance | health | convert (categoryColors 키와 일치)
}
```

### 5. `app/components/Header.tsx` — 네비게이션에 링크 추가 (`Header` 네임스페이스에 키 추가 후 `t()`로 참조)
- 또한 `app/sitemap.ts`의 `PATHS` 배열에도 새 경로 추가

---

## 컴포넌트 작성 규칙

### AdBanner
- tool 컨텐츠 **위/아래** 각 1개 배치 (tool page 기준)
- 홈페이지는 tool 그리드 **위/아래** 각 1개
- AdSense 실제 코드 연결 시 `AdBanner.tsx`만 수정하면 전체 적용됨

### Tool 컴포넌트
- 상태: `useState` / 계산: `useMemo` 활용
- 숫자 입력 로케일 포맷은 `useLocale()` 값에 따라 `ko-KR` / `en-US`로 분기 (`toLocaleString`)
- 화면에 노출되는 모든 문자열은 `useTranslations`를 통해 가져오며 하드코딩 금지
- 결과 영역은 파란색 카드 (`bg-blue-600 text-white rounded-2xl`)
- 입력 영역은 흰색 카드 (`bg-white rounded-2xl border border-gray-200`)

### 색상 시스템
| 용도 | 클래스 |
|------|--------|
| 주요 액션/결과 | `bg-blue-600` |
| 성공/건강 관련 | `bg-green-500` |
| 변환/유틸 | `bg-purple-600` |
| 배경 | `bg-gray-50` |
| 카드 | `bg-white border border-gray-200 rounded-2xl` |

---

## SEO 규칙

- 각 `page.tsx`에서 `generateMetadata({ params })` (async, `getTranslations`로 번역된 title/description 사용) 반드시 작성
- `title`은 layout의 template(`%s | 온라인 계산기` / `%s | Online Calculator`)에 의해 자동 조합됨
- `description`은 80~160자, 키워드 자연스럽게 포함 (ko/en 둘 다)
- `generateMetadata`에서 `alternates.languages`로 ko/en 상호 hreflang 링크 지정 (`{ ko: "/path", en: "/en/path" }`)
- `h1` 태그는 페이지당 1개, tool 이름으로
- SEO용 설명 텍스트 블록을 tool 아래에 추가 (텍스트 콘텐츠가 많을수록 유리), 두 언어 모두 작성
- 새 라우트를 추가하면 `app/sitemap.ts`의 `PATHS`에도 반영해야 sitemap.xml에 두 언어 URL이 함께 등록됨

---

## AdSense 설정

- 스크립트: `app/[locale]/layout.tsx` `<head>` 안에 1개만 삽입
- `ca-pub-XXXXXXXXXXXXXXXXX` 부분을 실제 Publisher ID로 교체
- 광고 슬롯 ID는 `AdBanner.tsx`에서 관리
- 자동 광고(Auto Ads) 사용 시 스크립트만 있으면 자동 적용됨

---

## 브랜치 전략

- `master`: 배포 브랜치 (Vercel 연동)
- 새 tool 작업 시 바로 master에 커밋해도 무방 (소규모 프로젝트)

---

## 도메인별 복제 방법

같은 구조로 새 도메인 사이트를 만들 때:
1. 이 레포를 템플릿으로 새 레포 생성
2. `app/[locale]/layout.tsx`의 metadata(`Meta` 네임스페이스, `messages/*.json`)와 `app/sitemap.ts`의 `BASE_URL` 수정
3. `messages/ko.json`, `messages/en.json`의 `Header.brand` 등 브랜드명 수정
4. AdSense Publisher ID 및 슬롯 ID 교체
5. 해당 도메인 특화 tool 위주로 구성
