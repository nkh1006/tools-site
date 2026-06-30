import type { Metadata } from "next";
import SalaryCalculator from "../components/tools/SalaryCalculator";
import AdBanner from "../components/AdBanner";

export const metadata: Metadata = {
  title: "연봉 실수령액 계산기",
  description:
    "연봉을 입력하면 4대보험(국민연금·건강보험·고용보험)과 소득세를 공제한 월 실수령액을 바로 계산합니다. 2024년 최신 공제율 적용.",
};

export default function SalaryCalculatorPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">💵 연봉 실수령액 계산기</h1>
        <p className="text-sm text-gray-500 mt-1">4대보험 + 소득세 공제 후 월 실수령액 계산 (2024년 기준)</p>
      </div>
      <AdBanner />
      <SalaryCalculator />
      <AdBanner />
    </div>
  );
}
