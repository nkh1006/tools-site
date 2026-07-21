"use client";

import { useState, useMemo } from "react";
import { useTranslations } from "next-intl";

function calcDueDate(lmpStr: string) {
  const lmp = new Date(lmpStr);
  if (isNaN(lmp.getTime())) return null;
  const dueDate = new Date(lmp.getTime() + 280 * 86400000);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  lmp.setHours(0, 0, 0, 0);

  const daysSinceLmp = Math.floor((today.getTime() - lmp.getTime()) / 86400000);
  const weeksPregnant = Math.floor(daysSinceLmp / 7);
  const daysRemainder = daysSinceLmp % 7;
  const daysUntilDue = Math.round((dueDate.getTime() - today.getTime()) / 86400000);

  return { dueDate, weeksPregnant, daysRemainder, daysUntilDue };
}

export default function DueDateCalculator() {
  const t = useTranslations("DueDateCalculator");
  const [lmp, setLmp] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() - 70);
    return d.toISOString().slice(0, 10);
  });

  const result = useMemo(() => calcDueDate(lmp), [lmp]);

  const formatDate = (d: Date) =>
    `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, "0")}.${String(d.getDate()).padStart(2, "0")}`;

  return (
    <div>
      <div className="bg-white rounded-2xl border border-gray-200 p-6 mb-6">
        <h2 className="font-bold text-gray-800 mb-4">{t("inputTitle")}</h2>
        <label className="block text-sm text-gray-600 mb-1">{t("lmpDate")}</label>
        <input
          type="date"
          value={lmp}
          onChange={(e) => setLmp(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>

      {result && (
        <div className="bg-green-500 rounded-2xl p-6 text-white">
          <p className="text-sm opacity-75 mb-2">{t("dueDateLabel")}</p>
          <p className="text-4xl font-bold mb-4">{formatDate(result.dueDate)}</p>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white/10 rounded-xl p-4">
              <p className="text-xs opacity-75 mb-1">{t("currentWeek")}</p>
              <p className="text-lg font-bold">
                {t("weeksDays", { weeks: result.weeksPregnant, days: result.daysRemainder })}
              </p>
            </div>
            <div className="bg-white/10 rounded-xl p-4">
              <p className="text-xs opacity-75 mb-1">{t("daysUntilDue")}</p>
              <p className="text-lg font-bold">
                {result.daysUntilDue >= 0
                  ? t("daysLeft", { days: result.daysUntilDue })
                  : t("daysPast", { days: Math.abs(result.daysUntilDue) })}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
