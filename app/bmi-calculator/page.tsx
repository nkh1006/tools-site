import type { Metadata } from "next";
import BmiCalculator from "../components/tools/BmiCalculator";
import AdBanner from "../components/AdBanner";

export const metadata: Metadata = {
  title: "BMI 계산기",
  description: "키와 몸무게를 입력하면 체질량지수(BMI)와 비만도를 계산해드립니다.",
};

export default function BmiPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">⚖️ BMI 계산기</h1>
        <p className="text-sm text-gray-500 mt-1">
          키와 몸무게로 체질량지수와 비만도를 확인하세요
        </p>
      </div>

      <AdBanner />
      <BmiCalculator />
      <AdBanner />
    </div>
  );
}
