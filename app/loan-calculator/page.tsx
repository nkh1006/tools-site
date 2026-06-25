import type { Metadata } from "next";
import LoanCalculator from "../components/tools/LoanCalculator";
import AdBanner from "../components/AdBanner";

export const metadata: Metadata = {
  title: "대출이자 계산기",
  description:
    "원리금균등, 원금균등, 만기일시 상환 방식별 월 납입금과 총 이자를 계산해드립니다.",
};

export default function LoanCalculatorPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">💰 대출이자 계산기</h1>
        <p className="text-sm text-gray-500 mt-1">
          원리금균등 · 원금균등 · 만기일시 상환 방식별 이자를 계산해보세요
        </p>
      </div>

      <AdBanner />
      <LoanCalculator />
      <AdBanner />

      <div className="bg-white rounded-2xl border border-gray-200 p-6 mt-6 space-y-3 text-sm text-gray-600 leading-relaxed">
        <h2 className="font-bold text-gray-800">상환 방식 안내</h2>
        <p><strong className="text-gray-700">원리금균등:</strong> 매달 동일한 금액 납입. 예측 가능한 월 납입금.</p>
        <p><strong className="text-gray-700">원금균등:</strong> 매달 동일한 원금 납입. 총 이자가 상대적으로 적음.</p>
        <p><strong className="text-gray-700">만기일시:</strong> 기간 중 이자만 납입 후 만기에 원금 일시 상환.</p>
      </div>
    </div>
  );
}
