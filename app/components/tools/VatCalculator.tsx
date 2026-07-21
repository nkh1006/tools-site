"use client";

import { useState, useMemo } from "react";
import { useLocale, useTranslations } from "next-intl";

type Mode = "exclusive" | "inclusive";

export default function VatCalculator() {
  const t = useTranslations("VatCalculator");
  const locale = useLocale();
  const numberLocale = locale === "ko" ? "ko-KR" : "en-US";

  const fmt = (n: number) =>
    locale === "ko" ? `${Math.round(n).toLocaleString(numberLocale)}${t("currencyUnit")}` : `${Math.round(n).toLocaleString(numberLocale)} ${t("currencyUnit")}`;

  const [mode, setMode] = useState<Mode>("exclusive");
  const [amountInput, setAmountInput] = useState("1,000,000");

  const handleAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/,/g, "");
    if (/^\d*$/.test(raw)) setAmountInput(raw ? parseInt(raw).toLocaleString(numberLocale) : "");
  };

  const result = useMemo(() => {
    const amount = parseFloat(amountInput.replace(/,/g, "")) || 0;
    if (amount <= 0) return null;
    if (mode === "exclusive") {
      const vat = amount * 0.1;
      return { supply: amount, vat, total: amount + vat };
    }
    const supply = amount / 1.1;
    const vat = amount - supply;
    return { supply, vat, total: amount };
  }, [amountInput, mode]);

  return (
    <div>
      <div className="bg-white rounded-2xl border border-gray-200 p-6 mb-6">
        <h2 className="font-bold text-gray-800 mb-4">{t("inputTitle")}</h2>
        <div className="grid grid-cols-2 gap-1 mb-4">
          {(["exclusive", "inclusive"] as Mode[]).map((m) => (
            <button
              key={m}
              onClick={() => setMode(m)}
              className={`py-3 rounded-lg text-sm font-medium transition-colors ${
                mode === m ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {m === "exclusive" ? t("modeExclusive") : t("modeInclusive")}
            </button>
          ))}
        </div>
        <label className="block text-sm text-gray-600 mb-1">
          {mode === "exclusive" ? t("supplyAmount") : t("totalAmount")}
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

      {result && (
        <div className="bg-blue-600 rounded-2xl p-6 text-white">
          <p className="text-sm opacity-75 mb-4">{t("resultTitle")}</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="bg-white/10 rounded-xl p-4">
              <p className="text-xs opacity-75 mb-1">{t("supplyAmount")}</p>
              <p className="text-lg font-bold">{fmt(result.supply)}</p>
            </div>
            <div className="bg-white/10 rounded-xl p-4">
              <p className="text-xs opacity-75 mb-1">{t("vatAmount")}</p>
              <p className="text-lg font-bold">{fmt(result.vat)}</p>
            </div>
            <div className="bg-white/10 rounded-xl p-4">
              <p className="text-xs opacity-75 mb-1">{t("totalAmount")}</p>
              <p className="text-lg font-bold">{fmt(result.total)}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
