"use client";

import { useState, useMemo } from "react";
import { useLocale, useTranslations } from "next-intl";

type Mode = "deposit" | "installment";

export default function SavingsCalculator() {
  const t = useTranslations("SavingsCalculator");
  const locale = useLocale();
  const numberLocale = locale === "ko" ? "ko-KR" : "en-US";

  const fmt = (n: number) =>
    locale === "ko" ? `${Math.round(n).toLocaleString(numberLocale)}${t("currencyUnit")}` : `${Math.round(n).toLocaleString(numberLocale)} ${t("currencyUnit")}`;

  const [mode, setMode] = useState<Mode>("installment");
  const [amountInput, setAmountInput] = useState("500,000");
  const [rate, setRate] = useState("3.5");
  const [months, setMonths] = useState("12");

  const handleAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/,/g, "");
    if (/^\d*$/.test(raw)) setAmountInput(raw ? parseInt(raw).toLocaleString(numberLocale) : "");
  };

  const result = useMemo(() => {
    const amount = parseFloat(amountInput.replace(/,/g, "")) || 0;
    const r = parseFloat(rate) / 100;
    const n = parseInt(months) || 0;
    if (amount <= 0 || n <= 0) return null;

    if (mode === "deposit") {
      const maturity = amount * Math.pow(1 + r / 12, n);
      return { principal: amount, interest: maturity - amount, maturity };
    }
    const principal = amount * n;
    const interest = amount * (n * (n + 1)) / 2 * (r / 12);
    return { principal, interest, maturity: principal + interest };
  }, [amountInput, rate, months, mode]);

  return (
    <div>
      <div className="bg-white rounded-2xl border border-gray-200 p-6 mb-6">
        <h2 className="font-bold text-gray-800 mb-4">{t("inputTitle")}</h2>
        <div className="grid grid-cols-2 gap-1 mb-4">
          {(["installment", "deposit"] as Mode[]).map((m) => (
            <button
              key={m}
              onClick={() => setMode(m)}
              className={`py-3 rounded-lg text-sm font-medium transition-colors ${
                mode === m ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {m === "installment" ? t("modeInstallment") : t("modeDeposit")}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm text-gray-600 mb-1">
              {mode === "installment" ? t("monthlyAmount") : t("depositAmount")}
            </label>
            <div className="relative">
              <input
                type="text"
                value={amountInput}
                onChange={handleAmount}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 pr-8 text-right focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">{t("currencyUnit")}</span>
            </div>
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">{t("rate")}</label>
            <div className="relative">
              <input
                type="number"
                value={rate}
                onChange={(e) => setRate(e.target.value)}
                step="0.1" min="0" max="100"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 pr-8 text-right focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">%</span>
            </div>
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">{t("months")}</label>
            <div className="relative">
              <input
                type="number"
                value={months}
                onChange={(e) => setMonths(e.target.value)}
                min="1" max="600"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 pr-14 text-right focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">{t("monthsUnit")}</span>
            </div>
          </div>
        </div>
      </div>

      {result && (
        <div className="bg-blue-600 rounded-2xl p-6 text-white">
          <p className="text-sm opacity-75 mb-4">{t("resultTitle")}</p>
          <p className="text-4xl font-bold mb-4">{fmt(result.maturity)}</p>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white/10 rounded-xl p-4">
              <p className="text-xs opacity-75 mb-1">{t("principal")}</p>
              <p className="text-lg font-bold">{fmt(result.principal)}</p>
            </div>
            <div className="bg-white/10 rounded-xl p-4">
              <p className="text-xs opacity-75 mb-1">{t("interest")}</p>
              <p className="text-lg font-bold">{fmt(result.interest)}</p>
            </div>
          </div>
          <p className="text-xs opacity-60 mt-3">{t("pretaxNote")}</p>
        </div>
      )}
    </div>
  );
}
