"use client";

import { useState, useMemo } from "react";
import { useTranslations } from "next-intl";

type Gender = "male" | "female";
type Activity = "sedentary" | "light" | "moderate" | "active" | "veryActive";

const ACTIVITY_FACTORS: Record<Activity, number> = {
  sedentary: 1.2,
  light: 1.375,
  moderate: 1.55,
  active: 1.725,
  veryActive: 1.9,
};

export default function CalorieCalculator() {
  const t = useTranslations("CalorieCalculator");
  const [gender, setGender] = useState<Gender>("male");
  const [age, setAge] = useState("30");
  const [height, setHeight] = useState("170");
  const [weight, setWeight] = useState("65");
  const [activity, setActivity] = useState<Activity>("light");

  const result = useMemo(() => {
    const a = parseFloat(age);
    const h = parseFloat(height);
    const w = parseFloat(weight);
    if (!a || !h || !w) return null;
    const bmr = gender === "male" ? 10 * w + 6.25 * h - 5 * a + 5 : 10 * w + 6.25 * h - 5 * a - 161;
    const tdee = bmr * ACTIVITY_FACTORS[activity];
    return { bmr: Math.round(bmr), tdee: Math.round(tdee), lose: Math.round(tdee - 500), gain: Math.round(tdee + 500) };
  }, [gender, age, height, weight, activity]);

  const activityKeys: Activity[] = ["sedentary", "light", "moderate", "active", "veryActive"];

  return (
    <div>
      <div className="bg-white rounded-2xl border border-gray-200 p-6 mb-6">
        <h2 className="font-bold text-gray-800 mb-4">{t("inputTitle")}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm text-gray-600 mb-1">{t("gender")}</label>
            <div className="grid grid-cols-2 gap-1">
              {(["male", "female"] as Gender[]).map((g) => (
                <button
                  key={g}
                  onClick={() => setGender(g)}
                  className={`py-3 rounded-lg text-sm font-medium transition-colors ${
                    gender === g ? "bg-green-500 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {g === "male" ? t("male") : t("female")}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">{t("age")}</label>
            <div className="relative">
              <input
                type="number"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                min="1" max="120"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 pr-10 text-right focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">{t("ageUnit")}</span>
            </div>
          </div>
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
        <label className="block text-sm text-gray-600 mb-1">{t("activity")}</label>
        <select
          value={activity}
          onChange={(e) => setActivity(e.target.value as Activity)}
          className="w-full border border-gray-300 rounded-lg px-3 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          {activityKeys.map((k) => (
            <option key={k} value={k}>{t(`activity_${k}`)}</option>
          ))}
        </select>
      </div>

      {result && (
        <div className="bg-green-500 rounded-2xl p-6 text-white">
          <p className="text-sm opacity-75 mb-4">{t("resultTitle")}</p>
          <div className="grid grid-cols-2 gap-3 mb-3">
            <div className="bg-white/10 rounded-xl p-4">
              <p className="text-xs opacity-75 mb-1">{t("bmr")}</p>
              <p className="text-lg font-bold">{t("kcal", { value: result.bmr.toLocaleString() })}</p>
            </div>
            <div className="bg-white/10 rounded-xl p-4">
              <p className="text-xs opacity-75 mb-1">{t("tdee")}</p>
              <p className="text-lg font-bold">{t("kcal", { value: result.tdee.toLocaleString() })}</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white/10 rounded-xl p-4">
              <p className="text-xs opacity-75 mb-1">{t("loseGoal")}</p>
              <p className="text-lg font-bold">{t("kcal", { value: result.lose.toLocaleString() })}</p>
            </div>
            <div className="bg-white/10 rounded-xl p-4">
              <p className="text-xs opacity-75 mb-1">{t("gainGoal")}</p>
              <p className="text-lg font-bold">{t("kcal", { value: result.gain.toLocaleString() })}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
