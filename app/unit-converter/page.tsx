import type { Metadata } from "next";
import UnitConverter from "../components/tools/UnitConverter";
import AdBanner from "../components/AdBanner";

export const metadata: Metadata = {
  title: "단위 변환기",
  description: "길이, 무게, 온도, 넓이 등 다양한 단위를 변환해드립니다.",
};

export default function UnitConverterPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">📐 단위 변환기</h1>
        <p className="text-sm text-gray-500 mt-1">
          길이 · 무게 · 온도 · 넓이 단위를 간편하게 변환하세요
        </p>
      </div>

      <AdBanner />
      <UnitConverter />
      <AdBanner />
    </div>
  );
}
