import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
        <Link href="/" className="text-lg font-bold text-blue-600">
          🧮 계산기모음
        </Link>
        <nav className="hidden sm:flex items-center gap-6 text-sm text-gray-600">
          <Link href="/loan-calculator" className="hover:text-blue-600 transition-colors">
            대출계산기
          </Link>
          <Link href="/bmi-calculator" className="hover:text-blue-600 transition-colors">
            BMI계산기
          </Link>
          <Link href="/unit-converter" className="hover:text-blue-600 transition-colors">
            단위변환
          </Link>
        </nav>
      </div>
    </header>
  );
}
