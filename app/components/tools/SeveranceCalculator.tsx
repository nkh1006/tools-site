"use client";

import { useState, useMemo } from "react";
import { useLocale, useTranslations } from "next-intl";

function calcSeverance(startDateStr: string, endDateStr: string, last3MonthsPay: number) {
  const start = new Date(startDateStr);
  const end = new Date(endDateStr);
  if (isNaN(start.getTime()) || isNaN(end.getTime()) || start >= end || last3MonthsPay <= 0) return null;

  const serviceDays = Math.floor((end.getTime() - start.getTime()) / 86400000);

  const threeMonthsAgo = new Date(end);
  threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);
  const days3Months = Math.floor((end.getTime() - threeMonthsAgo.getTime()) / 86400000);

  const avgDailyWage = last3MonthsPay / days3Months;
  const severance = Math.round(avgDailyWage * 30 * (serviceDays / 365));

  return { serviceDays, days3Months, avgDailyWage: Math.round(avgDailyWage), severance, eligible: serviceDays >= 365 };
}

export default function SeveranceCalculator() {
  const t = useTranslations("SeveranceCalculator");
  const locale = useLocale();
  const numberLocale = locale === "ko" ? "ko-KR" : "en-US";

  const fmt = (n: number) =>
    locale === "ko" ? `${n.toLocaleString(numberLocale)}${t("currencyUnit")}` : `${n.toLocaleString(numberLocale)} ${t("currencyUnit")}`;

  const [startDate, setStartDate] = useState("2022-01-01");
  const [endDate, setEndDate] = useState(() => new Date().toISOString().slice(0, 10));
  const [payInput, setPayInput] = useState("12,000,000");

  const handlePay = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/,/g, "");
    if (/^\d*$/.test(raw)) setPayInput(raw ? parseInt(raw).toLocaleString(numberLocale) : "");
  };

  const result = useMemo(() => {
    const pay = parseFloat(payInput.replace(/,/g, "")) || 0;
    return calcSeverance(startDate, endDate, pay);
  }, [startDate, endDate, payInput]);

  return (
    <div>
      <div className="bg-white rounded-2xl border border-gray-200 p-6 mb-6">
        <h2 className="font-bold text-gray-800 mb-4">{t("inputTitle")}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-gray-600 mb-1">{t("startDate")}</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">{t("endDate")}</label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="sm:col-span-2">
            <label className="block text-sm text-gray-600 mb-1">{t("last3MonthsPay")}</label>
            <div className="relative">
              <input
                type="text"
                value={payInput}
                onChange={handlePay}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 pr-8 text-right focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">{t("currencyUnit")}</span>
            </div>
          </div>
        </div>
      </div>

      {result && (
        <div className="bg-blue-600 rounded-2xl p-6 text-white">
          <p className="text-sm opacity-75 mb-4">{t("resultTitle")}</p>
          <p className="text-4xl font-bold mb-4">{fmt(result.severance)}</p>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white/10 rounded-xl p-4">
              <p className="text-xs opacity-75 mb-1">{t("serviceDays")}</p>
              <p className="text-lg font-bold">{t("daysValue", { days: result.serviceDays.toLocaleString() })}</p>
            </div>
            <div className="bg-white/10 rounded-xl p-4">
              <p className="text-xs opacity-75 mb-1">{t("avgDailyWage")}</p>
              <p className="text-lg font-bold">{fmt(result.avgDailyWage)}</p>
            </div>
          </div>
          {!result.eligible && (
            <p className="text-sm bg-white/10 rounded-xl p-3 mt-3">{t("notEligible")}</p>
          )}
        </div>
      )}
    </div>
  );
}
