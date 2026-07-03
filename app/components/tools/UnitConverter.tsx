"use client";

import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";

type Category = "length" | "weight" | "temperature" | "area";

interface Unit {
  labelKey: string;
  toBase: (v: number) => number;
  fromBase: (v: number) => number;
}

const UNITS: Record<Category, { labelKey: string; units: Record<string, Unit> }> = {
  length: {
    labelKey: "categoryLength",
    units: {
      mm: { labelKey: "unitMm", toBase: (v) => v / 1000, fromBase: (v) => v * 1000 },
      cm: { labelKey: "unitCm", toBase: (v) => v / 100, fromBase: (v) => v * 100 },
      m: { labelKey: "unitM", toBase: (v) => v, fromBase: (v) => v },
      km: { labelKey: "unitKm", toBase: (v) => v * 1000, fromBase: (v) => v / 1000 },
      inch: { labelKey: "unitInch", toBase: (v) => v * 0.0254, fromBase: (v) => v / 0.0254 },
      ft: { labelKey: "unitFt", toBase: (v) => v * 0.3048, fromBase: (v) => v / 0.3048 },
      mile: { labelKey: "unitMile", toBase: (v) => v * 1609.34, fromBase: (v) => v / 1609.34 },
    },
  },
  weight: {
    labelKey: "categoryWeight",
    units: {
      mg: { labelKey: "unitMg", toBase: (v) => v / 1e6, fromBase: (v) => v * 1e6 },
      g: { labelKey: "unitG", toBase: (v) => v / 1000, fromBase: (v) => v * 1000 },
      kg: { labelKey: "unitKg", toBase: (v) => v, fromBase: (v) => v },
      t: { labelKey: "unitT", toBase: (v) => v * 1000, fromBase: (v) => v / 1000 },
      lb: { labelKey: "unitLb", toBase: (v) => v * 0.453592, fromBase: (v) => v / 0.453592 },
      oz: { labelKey: "unitOz", toBase: (v) => v * 0.0283495, fromBase: (v) => v / 0.0283495 },
    },
  },
  temperature: {
    labelKey: "categoryTemperature",
    units: {
      c: { labelKey: "unitC", toBase: (v) => v, fromBase: (v) => v },
      f: { labelKey: "unitF", toBase: (v) => (v - 32) * (5 / 9), fromBase: (v) => v * (9 / 5) + 32 },
      k: { labelKey: "unitK", toBase: (v) => v - 273.15, fromBase: (v) => v + 273.15 },
    },
  },
  area: {
    labelKey: "categoryArea",
    units: {
      "cm2": { labelKey: "unitCm2", toBase: (v) => v / 1e4, fromBase: (v) => v * 1e4 },
      "m2": { labelKey: "unitM2", toBase: (v) => v, fromBase: (v) => v },
      "km2": { labelKey: "unitKm2", toBase: (v) => v * 1e6, fromBase: (v) => v / 1e6 },
      pyeong: { labelKey: "unitPyeong", toBase: (v) => v * 3.30579, fromBase: (v) => v / 3.30579 },
      acre: { labelKey: "unitAcre", toBase: (v) => v * 4046.86, fromBase: (v) => v / 4046.86 },
    },
  },
};

export default function UnitConverter() {
  const t = useTranslations("UnitConverter");
  const locale = useLocale();
  const numberLocale = locale === "ko" ? "ko-KR" : "en-US";

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
    return rounded.toLocaleString(numberLocale, { maximumFractionDigits: 8 });
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
            {t(UNITS[c].labelKey)}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 p-6">
        <div className="grid grid-cols-1 gap-4">
          {/* 입력 */}
          <div>
            <label className="block text-sm text-gray-600 mb-1">{t("inputValue")}</label>
            <input
              type="number"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm text-gray-600 mb-1">{t("fromUnit")}</label>
              <select
                value={fromUnit}
                onChange={(e) => setFromUnit(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                {unitKeys.map((k) => (
                  <option key={k} value={k}>{t(cat.units[k].labelKey)}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">{t("toUnit")}</label>
              <select
                value={toUnit}
                onChange={(e) => setToUnit(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                {unitKeys.map((k) => (
                  <option key={k} value={k}>{t(cat.units[k].labelKey)}</option>
                ))}
              </select>
            </div>
          </div>

          {/* 결과 */}
          <div className="bg-purple-50 rounded-xl p-5 text-center">
            <p className="text-sm text-gray-500 mb-1">
              {inputValue} {t(cat.units[fromUnit]?.labelKey)} =
            </p>
            <p className="text-3xl font-bold text-purple-700">
              {convert()}
            </p>
            <p className="text-sm text-gray-500 mt-1">{t(cat.units[toUnit]?.labelKey)}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
