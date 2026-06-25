import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white mt-8 py-6 text-center text-xs text-gray-400">
      <div className="flex items-center justify-center gap-4 mb-3">
        <Link href="/about" className="hover:text-gray-600 transition-colors">
          서비스 소개
        </Link>
        <span>·</span>
        <Link href="/privacy-policy" className="hover:text-gray-600 transition-colors">
          개인정보처리방침
        </Link>
        <span>·</span>
        <Link href="/contact" className="hover:text-gray-600 transition-colors">
          문의하기
        </Link>
      </div>
      <p>본 계산기는 참고용이며 실제 결과와 다를 수 있습니다.</p>
      <p className="mt-1">© 2026 계산기모음. All rights reserved.</p>
    </footer>
  );
}
