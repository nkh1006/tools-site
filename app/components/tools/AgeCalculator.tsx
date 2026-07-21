"use client";

import { useState, useMemo } from "react";
import { useTranslations } from "next-intl";

function calcAge(birthDateStr: string, refDateStr: string) {
  const birth = new Date(birthDateStr);
  const ref = new Date(refDateStr);
  if (isNaN(birth.getTime()) || isNaN(ref.getTime()) || birth > ref) return null;

  let internationalAge = ref.getFullYear() - birth.getFullYear();
  const hadBirthday =
    ref.getMonth() > birth.getMonth() ||
    (ref.getMonth() === birth.getMonth() && ref.getDate() >= birth.getDate());
  if (!hadBirthday) internationalAge--;

  const yearAge = ref.getFullYear() - birth.getFullYear();
  const koreanAge = yearAge + 1;
  const daysLived = Math.floor((ref.getTime() - birth.getTime()) / 86400000);

  return { internationalAge, yearAge, koreanAge, daysLived };
}

export default function AgeCalculator() {
  const t = useTranslations("AgeCalculator");
  const [birthDate, setBirthDate] = useState("1995-06-15");
  const [refDate, setRefDate] = useState(() => new Date().toISOString().slice(0, 10));

  const result = useMemo(() => calcAge(birthDate, refDate), [birthDate, refDate]);

  return (
    <div>
      <div className="bg-white rounded-2xl border border-gray-200 p-6 mb-6">
        <h2 className="font-bold text-gray-800 mb-4">{t("inputTitle")}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-gray-600 mb-1">{t("birthDate")}</label>
            <input
              type="date"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">{t("refDate")}</label>
            <input
              type="date"
              value={refDate}
              onChange={(e) => setRefDate(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
        </div>
      </div>

      {result && (
        <div className="bg-purple-600 rounded-2xl p-6 text-white">
          <p className="text-sm opacity-75 mb-4">{t("resultTitle")}</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              { label: t("internationalAge"), value: `${result.internationalAge}${t("ageUnit")}` },
              { label: t("yearAge"), value: `${result.yearAge}${t("ageUnit")}` },
              { label: t("koreanAge"), value: `${result.koreanAge}${t("ageUnit")}` },
            ].map((item) => (
              <div key={item.label} className="bg-white/10 rounded-xl p-4">
                <p className="text-xs opacity-75 mb-1">{item.label}</p>
                <p className="text-lg font-bold">{item.value}</p>
              </div>
            ))}
          </div>
          <p className="text-sm opacity-75 mt-4">
            {t("daysLived", { days: result.daysLived.toLocaleString() })}
          </p>
        </div>
      )}
    </div>
  );
}
