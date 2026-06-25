import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "서비스 소개",
  description: "계산기모음은 누구나 무료로 사용할 수 있는 온라인 계산기 및 변환기 모음 사이트입니다.",
};

export default function AboutPage() {
  const tools = [
    { emoji: "💰", name: "대출이자 계산기", href: "/loan-calculator" },
    { emoji: "⚖️", name: "BMI 계산기", href: "/bmi-calculator" },
    { emoji: "📐", name: "단위 변환기", href: "/unit-converter" },
  ];

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-2">서비스 소개</h1>
      <p className="text-sm text-gray-500 mb-8">계산기모음이 무엇인지 알아보세요.</p>

      <div className="space-y-4">
        {/* 소개 */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6">
          <h2 className="font-bold text-gray-800 mb-3">계산기모음이란?</h2>
          <p className="text-sm text-gray-600 leading-relaxed">
            계산기모음은 일상생활에서 자주 필요한 계산과 변환을 빠르고 편리하게 할 수 있도록
            도와주는 무료 온라인 도구 모음 사이트입니다. 별도의 앱 설치 없이 누구나 브라우저에서
            바로 사용할 수 있습니다.
          </p>
        </div>

        {/* 제공 서비스 */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6">
          <h2 className="font-bold text-gray-800 mb-4">제공 서비스</h2>
          <div className="space-y-3">
            {tools.map((tool) => (
              <Link
                key={tool.href}
                href={tool.href}
                className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 hover:bg-blue-50 hover:text-blue-600 transition-colors"
              >
                <span className="text-xl">{tool.emoji}</span>
                <span className="text-sm font-medium text-gray-700">{tool.name}</span>
                <span className="ml-auto text-gray-400 text-xs">바로가기 →</span>
              </Link>
            ))}
          </div>
        </div>

        {/* 운영 방침 */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6">
          <h2 className="font-bold text-gray-800 mb-3">운영 방침</h2>
          <ul className="text-sm text-gray-600 leading-relaxed space-y-2">
            <li className="flex gap-2">
              <span className="text-blue-500 font-bold">·</span>
              모든 서비스는 무료로 제공됩니다.
            </li>
            <li className="flex gap-2">
              <span className="text-blue-500 font-bold">·</span>
              이용자의 입력값은 서버에 저장되지 않습니다.
            </li>
            <li className="flex gap-2">
              <span className="text-blue-500 font-bold">·</span>
              계산 결과는 참고용이며 중요한 결정에는 전문가 상담을 권장합니다.
            </li>
            <li className="flex gap-2">
              <span className="text-blue-500 font-bold">·</span>
              지속적으로 새로운 도구를 추가하여 서비스를 확장해 나갑니다.
            </li>
          </ul>
        </div>

        {/* 문의 */}
        <div className="bg-blue-50 rounded-2xl border border-blue-100 p-6 text-center">
          <p className="text-sm text-gray-600 mb-3">
            서비스 관련 문의사항이나 개선 제안이 있으시면 편하게 연락해 주세요.
          </p>
          <Link
            href="/contact"
            className="inline-block bg-blue-600 text-white text-sm font-medium px-6 py-2.5 rounded-lg hover:bg-blue-700 transition-colors"
          >
            문의하기
          </Link>
        </div>
      </div>
    </div>
  );
}
