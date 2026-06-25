import Link from "next/link";
import AdBanner from "./components/AdBanner";

const tools = [
  {
    href: "/loan-calculator",
    emoji: "💰",
    title: "대출이자 계산기",
    desc: "원리금균등, 원금균등, 만기일시 상환별 월 납입금과 총 이자 계산",
    category: "금융",
  },
  {
    href: "/bmi-calculator",
    emoji: "⚖️",
    title: "BMI 계산기",
    desc: "키와 몸무게로 체질량지수(BMI)와 비만도를 계산",
    category: "건강",
  },
  {
    href: "/unit-converter",
    emoji: "📐",
    title: "단위 변환기",
    desc: "길이, 무게, 온도, 넓이 등 다양한 단위 변환",
    category: "변환",
  },
];

const categoryColors: Record<string, string> = {
  금융: "bg-blue-100 text-blue-700",
  건강: "bg-green-100 text-green-700",
  변환: "bg-purple-100 text-purple-700",
};

export default function Home() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      {/* 히어로 */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          무료 온라인 계산기 모음
        </h1>
        <p className="text-gray-500">
          대출, 건강, 단위변환 등 자주 쓰는 계산기를 한 곳에서
        </p>
      </div>

      <AdBanner size="horizontal" />

      {/* 툴 그리드 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
        {tools.map((tool) => (
          <Link
            key={tool.href}
            href={tool.href}
            className="bg-white rounded-2xl border border-gray-200 p-5 hover:shadow-md hover:border-blue-300 transition-all group"
          >
            <div className="flex items-start justify-between mb-3">
              <span className="text-3xl">{tool.emoji}</span>
              <span
                className={`text-xs font-medium px-2 py-1 rounded-full ${categoryColors[tool.category]}`}
              >
                {tool.category}
              </span>
            </div>
            <h2 className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors mb-1">
              {tool.title}
            </h2>
            <p className="text-sm text-gray-500 leading-relaxed">{tool.desc}</p>
          </Link>
        ))}
      </div>

      <AdBanner size="horizontal" />
    </div>
  );
}
