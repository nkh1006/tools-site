"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

interface BmiResult {
  bmi: number;
  label: string;
  color: string;
  advice: string;
}

export default function BmiCalculator() {
  const t = useTranslations("BmiCalculator");
  const [height, setHeight] = useState("170");
  const [weight, setWeight] = useState("65");

  function getBmiResult(bmi: number): BmiResult {
    if (bmi < 18.5)
      return { bmi, label: t("underLabel"), color: "text-blue-500", advice: t("underAdvice") };
    if (bmi < 23)
      return { bmi, label: t("normalLabel"), color: "text-green-500", advice: t("normalAdvice") };
    if (bmi < 25)
      return { bmi, label: t("overLabel"), color: "text-yellow-500", advice: t("overAdvice") };
    if (bmi < 30)
      return { bmi, label: t("obese1Label"), color: "text-orange-500", advice: t("obese1Advice") };
    return { bmi, label: t("obese2Label"), color: "text-red-600", advice: t("obese2Advice") };
  }

  const result =
    height && weight
      ? getBmiResult(parseFloat(weight) / Math.pow(parseFloat(height) / 100, 2))
      : null;

  const bmiLevels = [
    { label: t("levelUnderShort"), range: "~18.4", color: "bg-blue-400" },
    { label: t("levelNormalShort"), range: "18.5~22.9", color: "bg-green-400" },
    { label: t("levelOverShort"), range: "23~24.9", color: "bg-yellow-400" },
    { label: t("levelObese1Short"), range: "25~29.9", color: "bg-orange-400" },
    { label: t("levelObese2Short"), range: "30~", color: "bg-red-500" },
  ];

  return (
    <div>
      <div className="bg-white rounded-2xl border border-gray-200 p-6 mb-6">
        <h2 className="font-bold text-gray-800 mb-4">{t("inputTitle")}</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-gray-600 mb-1">{t("height")}</label>
            <div className="relative">
              <input
                type="number"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                min="100" max="250"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 pr-10 text-right focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">cm</span>
            </div>
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">{t("weight")}</label>
            <div className="relative">
              <input
                type="number"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                min="20" max="300"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 pr-10 text-right focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">kg</span>
            </div>
          </div>
        </div>
      </div>

      {result && (
        <div className="bg-white rounded-2xl border border-gray-200 p-6 mb-6">
          <div className="text-center mb-6">
            <p className="text-sm text-gray-500 mb-1">{t("myBmi")}</p>
            <p className="text-5xl font-bold text-gray-900 mb-2">
              {result.bmi.toFixed(1)}
            </p>
            <p className={`text-xl font-bold ${result.color}`}>{result.label}</p>
            <p className="text-sm text-gray-500 mt-2">{result.advice}</p>
          </div>

          {/* BMI 바 */}
          <div className="flex rounded-full overflow-hidden h-4 mb-3">
            {bmiLevels.map((l) => (
              <div key={l.label} className={`${l.color} flex-1`} />
            ))}
          </div>
          <div className="flex text-xs text-gray-400">
            {bmiLevels.map((l) => (
              <div key={l.label} className="flex-1 text-center">
                <div className="font-medium text-gray-600">{l.label}</div>
                <div>{l.range}</div>
              </div>
            ))}
          </div>

          {/* 표준 체중 */}
          <div className="mt-6 bg-gray-50 rounded-xl p-4 text-center">
            <p className="text-sm text-gray-500">{t("standardRangeTitle")}</p>
            <p className="font-bold text-gray-800 mt-1">
              {(18.5 * Math.pow(parseFloat(height) / 100, 2)).toFixed(1)}kg ~{" "}
              {(22.9 * Math.pow(parseFloat(height) / 100, 2)).toFixed(1)}kg
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
