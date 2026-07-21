"use client";

import { useState, useMemo } from "react";
import { useTranslations } from "next-intl";

function calcDday(targetDateStr: string) {
  const target = new Date(targetDateStr);
  if (isNaN(target.getTime())) return null;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  target.setHours(0, 0, 0, 0);
  const diffDays = Math.round((target.getTime() - today.getTime()) / 86400000);
  const weeks = Math.floor(Math.abs(diffDays) / 7);
  return { diffDays, weeks };
}

export default function DdayCalculator() {
  const t = useTranslations("DdayCalculator");
  const [targetDate, setTargetDate] = useState(() => {
    const d = new Date();
    d.setMonth(d.getMonth() + 1);
    return d.toISOString().slice(0, 10);
  });

  const result = useMemo(() => calcDday(targetDate), [targetDate]);

  const label =
    result === null
      ? ""
      : result.diffDays === 0
      ? "D-DAY"
      : result.diffDays > 0
      ? `D-${result.diffDays}`
      : `D+${Math.abs(result.diffDays)}`;

  return (
    <div>
      <div className="bg-white rounded-2xl border border-gray-200 p-6 mb-6">
        <h2 className="font-bold text-gray-800 mb-4">{t("inputTitle")}</h2>
        <label className="block text-sm text-gray-600 mb-1">{t("targetDate")}</label>
        <input
          type="date"
          value={targetDate}
          onChange={(e) => setTargetDate(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
      </div>

      {result && (
        <div className="bg-purple-600 rounded-2xl p-6 text-white text-center">
          <p className="text-sm opacity-75 mb-2">{t("resultTitle")}</p>
          <p className="text-5xl font-bold mb-3">{label}</p>
          <p className="text-sm opacity-75">
            {result.diffDays >= 0
              ? t("weeksUntil", { weeks: result.weeks })
              : t("weeksSince", { weeks: result.weeks })}
          </p>
        </div>
      )}
    </div>
  );
}
