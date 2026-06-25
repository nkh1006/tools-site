"use client";

import { useState } from "react";

type Category = "length" | "weight" | "temperature" | "area";

interface Unit {
  label: string;
  toBase: (v: number) => number;
  fromBase: (v: number) => number;
}

const UNITS: Record<Category, { label: string; units: Record<string, Unit> }> = {
  length: {
    label: "길이",
    units: {
      mm: { label: "밀리미터 (mm)", toBase: (v) => v / 1000, fromBase: (v) => v * 1000 },
      cm: { label: "센티미터 (cm)", toBase: (v) => v / 100, fromBase: (v) => v * 100 },
      m: { label: "미터 (m)", toBase: (v) => v, fromBase: (v) => v },
      km: { label: "킬로미터 (km)", toBase: (v) => v * 1000, fromBase: (v) => v / 1000 },
      inch: { label: "인치 (inch)", toBase: (v) => v * 0.0254, fromBase: (v) => v / 0.0254 },
      ft: { label: "피트 (ft)", toBase: (v) => v * 0.3048, fromBase: (v) => v / 0.3048 },
      mile: { label: "마일 (mile)", toBase: (v) => v * 1609.34, fromBase: (v) => v / 1609.34 },
    },
  },
  weight: {
    label: "무게",
    units: {
      mg: { label: "밀리그램 (mg)", toBase: (v) => v / 1e6, fromBase: (v) => v * 1e6 },
      g: { label: "그램 (g)", toBase: (v) => v / 1000, fromBase: (v) => v * 1000 },
      kg: { label: "킬로그램 (kg)", toBase: (v) => v, fromBase: (v) => v },
      t: { label: "톤 (t)", toBase: (v) => v * 1000, fromBase: (v) => v / 1000 },
      lb: { label: "파운드 (lb)", toBase: (v) => v * 0.453592, fromBase: (v) => v / 0.453592 },
      oz: { label: "온스 (oz)", toBase: (v) => v * 0.0283495, fromBase: (v) => v / 0.0283495 },
    },
  },
  temperature: {
    label: "온도",
    units: {
      c: { label: "섭씨 (°C)", toBase: (v) => v, fromBase: (v) => v },
      f: { label: "화씨 (°F)", toBase: (v) => (v - 32) * (5 / 9), fromBase: (v) => v * (9 / 5) + 32 },
      k: { label: "켈빈 (K)", toBase: (v) => v - 273.15, fromBase: (v) => v + 273.15 },
    },
  },
  area: {
    label: "넓이",
    units: {
      "cm2": { label: "제곱센티미터 (cm²)", toBase: (v) => v / 1e4, fromBase: (v) => v * 1e4 },
      "m2": { label: "제곱미터 (m²)", toBase: (v) => v, fromBase: (v) => v },
      "km2": { label: "제곱킬로미터 (km²)", toBase: (v) => v * 1e6, fromBase: (v) => v / 1e6 },
      pyeong: { label: "평 (坪)", toBase: (v) => v * 3.30579, fromBase: (v) => v / 3.30579 },
      acre: { label: "에이커 (acre)", toBase: (v) => v * 4046.86, fromBase: (v) => v / 4046.86 },
    },
  },
};

export default function UnitConverter() {
  const [category, setCategory] = useState<Category>("length");
  const [fromUnit, setFromUnit] = useState("m");
  const [toUnit, setToUnit] = useState("km");
  const [inputValue, setInputValue] = useState("1");

  const cat = UNITS[category];
  const unitKeys = Object.keys(cat.units);

  const convert = () => {
    const v = parseFloat(inputValue);
    if (isNaN(v)) return "";
    const base = cat.units[fromUnit]?.toBase(v);
    const result = cat.units[toUnit]?.fromBase(base);
    if (result === undefined) return "";
    const rounded = parseFloat(result.toPrecision(8));
    return rounded.toLocaleString("ko-KR", { maximumFractionDigits: 8 });
  };

  const handleCategoryChange = (c: Category) => {
    setCategory(c);
    const keys = Object.keys(UNITS[c].units);
    setFromUnit(keys[0]);
    setToUnit(keys[1]);
  };

  return (
    <div>
      {/* 카테고리 */}
      <div className="flex gap-2 mb-6 flex-wrap">
        {(Object.keys(UNITS) as Category[]).map((c) => (
          <button
            key={c}
            onClick={() => handleCategoryChange(c)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              category === c ? "bg-purple-600 text-white" : "bg-white border border-gray-300 text-gray-600 hover:border-purple-400"
            }`}
          >
            {UNITS[c].label}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 p-6">
        <div className="grid grid-cols-1 gap-4">
          {/* 입력 */}
          <div>
            <label className="block text-sm text-gray-600 mb-1">변환할 값</label>
            <input
              type="number"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm text-gray-600 mb-1">변환 전</label>
              <select
                value={fromUnit}
                onChange={(e) => setFromUnit(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                {unitKeys.map((k) => (
                  <option key={k} value={k}>{cat.units[k].label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">변환 후</label>
              <select
                value={toUnit}
                onChange={(e) => setToUnit(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                {unitKeys.map((k) => (
                  <option key={k} value={k}>{cat.units[k].label}</option>
                ))}
              </select>
            </div>
          </div>

          {/* 결과 */}
          <div className="bg-purple-50 rounded-xl p-5 text-center">
            <p className="text-sm text-gray-500 mb-1">
              {inputValue} {cat.units[fromUnit]?.label} =
            </p>
            <p className="text-3xl font-bold text-purple-700">
              {convert()}
            </p>
            <p className="text-sm text-gray-500 mt-1">{cat.units[toUnit]?.label}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
