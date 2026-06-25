# Tools Site — 개발 가이드

이 프로젝트는 Google AdSense 수익화를 목적으로 한 **멀티툴 웹사이트**입니다.
하나의 도메인 안에 여러 무료 온라인 도구(계산기, 변환기 등)를 제공합니다.

---

## 기술 스택

- **Framework**: Next.js (App Router) + TypeScript
- **Styling**: Tailwind CSS
- **Font**: Noto Sans KR (`next/font/google`)
- **Deploy**: Vercel
- **Ads**: Google AdSense

---

## 프로젝트 구조

```
app/
├── layout.tsx                  # 루트 레이아웃: 공통 헤더/푸터, AdSense 스크립트
├── page.tsx                    # 홈: 전체 tool 목록 카드
├── globals.css
├── components/
│   ├── Header.tsx              # 사이트 공통 헤더 (네비게이션 포함)
│   ├── Footer.tsx              # 사이트 공통 푸터
│   ├── AdBanner.tsx            # AdSense 광고 배너 컴포넌트
│   └── tools/
│       └── ToolName.tsx        # 각 tool의 인터랙티브 로직 (Client Component)
└── tool-slug/
    └── page.tsx                # 각 tool의 라우트 페이지 (Server Component + metadata)
```

---

## 새 Tool 추가 방법

tool 하나를 추가할 때 **3개 파일**만 작업한다.

### 1. `app/components/tools/NewTool.tsx`
- 반드시 `"use client"` 선언
- 계산/변환 로직과 UI를 모두 담는 Client Component
- 외부 라이브러리 없이 순수 React + 브라우저 API만 사용

### 2. `app/new-tool/page.tsx`
```tsx
import type { Metadata } from "next";
import NewTool from "../components/tools/NewTool";
import AdBanner from "../components/AdBanner";

export const metadata: Metadata = {
  title: "Tool 이름",          // layout의 template으로 "Tool 이름 | 온라인 계산기" 가 됨
  description: "tool 설명 (검색엔진용, 80~160자)",
};

export default function NewToolPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">이모지 Tool 이름</h1>
        <p className="text-sm text-gray-500 mt-1">부제목</p>
      </div>
      <AdBanner />
      <NewTool />
      <AdBanner />
    </div>
  );
}
```

### 3. `app/page.tsx` — tools 배열에 항목 추가
```ts
{
  href: "/new-tool",
  emoji: "🔧",
  title: "Tool 이름",
  desc: "카드에 표시될 한 줄 설명",
  category: "카테고리",   // 금융 | 건강 | 변환 | 텍스트 | 이미지
}
```

### 4. `app/components/Header.tsx` — 네비게이션에 링크 추가

---

## 컴포넌트 작성 규칙

### AdBanner
- tool 컨텐츠 **위/아래** 각 1개 배치 (tool page 기준)
- 홈페이지는 tool 그리드 **위/아래** 각 1개
- AdSense 실제 코드 연결 시 `AdBanner.tsx`만 수정하면 전체 적용됨

### Tool 컴포넌트
- 상태: `useState` / 계산: `useMemo` 활용
- 숫자 입력은 항상 한국어 로케일 포맷 (`toLocaleString("ko-KR")`)
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

- 각 page.tsx에서 `export const metadata` 반드시 작성
- `title`은 layout의 template(`%s | 온라인 계산기`)에 의해 자동 조합됨
- `description`은 80~160자, 키워드 자연스럽게 포함
- `h1` 태그는 페이지당 1개, tool 이름으로
- SEO용 설명 텍스트 블록을 tool 아래에 추가 (텍스트 콘텐츠가 많을수록 유리)

---

## AdSense 설정

- 스크립트: `app/layout.tsx` `<head>` 안에 1개만 삽입
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
2. `app/layout.tsx`의 사이트명/metadata 수정
3. `app/components/Header.tsx`의 브랜드명 수정
4. AdSense Publisher ID 및 슬롯 ID 교체
5. 해당 도메인 특화 tool 위주로 구성
