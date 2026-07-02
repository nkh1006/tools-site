"use client";

import { useState, useMemo } from "react";

type RepaymentType = "equal-installment" | "equal-principal" | "balloon";

interface Schedule {
  month: number;
  payment: number;
  principal: number;
  interest: number;
  balance: number;
}

function formatKRW(value: number) {
  return value.toLocaleString("ko-KR") + "원";
}

function calcEqualInstallment(p: number, r: number, n: number): Schedule[] {
  if (r === 0) {
    const payment = p / n;
    return Array.from({ length: n }, (_, i) => ({
      month: i + 1,
      payment: Math.round(payment),
      principal: Math.round(payment),
      interest: 0,
      balance: Math.max(0, Math.round(p - payment * (i + 1))),
    }));
  }
  const payment = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
  let balance = p;
  return Array.from({ length: n }, (_, i) => {
    const interest = balance * r;
    const principal = payment - interest;
    balance -= principal;
    return {
      month: i + 1,
      payment: Math.round(payment),
      principal: Math.round(principal),
      interest: Math.round(interest),
      balance: Math.max(0, Math.round(balance)),
    };
  });
}

function calcEqualPrincipal(p: number, r: number, n: number): Schedule[] {
  const monthlyPrincipal = p / n;
  let balance = p;
  return Array.from({ length: n }, (_, i) => {
    const interest = balance * r;
    const payment = monthlyPrincipal + interest;
    balance -= monthlyPrincipal;
    return {
      month: i + 1,
      payment: Math.round(payment),
      principal: Math.round(monthlyPrincipal),
      interest: Math.round(interest),
      balance: Math.max(0, Math.round(balance)),
    };
  });
}

function calcBalloon(p: number, r: number, n: number): Schedule[] {
  const interest = Math.round(p * r);
  return Array.from({ length: n }, (_, i) => ({
    month: i + 1,
    payment: i === n - 1 ? p + interest : interest,
    principal: i === n - 1 ? p : 0,
    interest,
    balance: i === n - 1 ? 0 : p,
  }));
}

const REPAYMENT_LABELS: Record<RepaymentType, string> = {
  "equal-installment": "원리금균등",
  "equal-principal": "원금균등",
  balloon: "만기일시",
};

export default function LoanCalculator() {
  const [principal, setPrincipal] = useState("100,000,000");
  const [rate, setRate] = useState("4.5");
  const [months, setMonths] = useState("360");
  const [type, setType] = useState<RepaymentType>("equal-installment");
  const [showSchedule, setShowSchedule] = useState(false);

  const result = useMemo(() => {
    const p = parseFloat(principal.replace(/,/g, "")) || 0;
    const r = parseFloat(rate) / 100 / 12;
    const n = parseInt(months) || 0;
    if (p <= 0 || n <= 0) return null;
    const schedule =
      type === "equal-installment"
        ? calcEqualInstallment(p, r, n)
        : type === "equal-principal"
        ? calcEqualPrincipal(p, r, n)
        : calcBalloon(p, r, n);
    return {
      schedule,
      totalPayment: schedule.reduce((s, r) => s + r.payment, 0),
      totalInterest: schedule.reduce((s, r) => s + r.interest, 0),
    };
  }, [principal, rate, months, type]);

  const handlePrincipal = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/,/g, "");
    if (/^\d*$/.test(raw))
      setPrincipal(raw ? parseInt(raw).toLocaleString("ko-KR") : "");
  };

  return (
    <div>
      {/* 입력 */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 mb-6">
        <h2 className="font-bold text-gray-800 mb-4">대출 조건 입력</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-gray-600 mb-1">대출 원금</label>
            <div className="relative">
              <input
                type="text"
                value={principal}
                onChange={handlePrincipal}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 pr-8 text-right focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">원</span>
            </div>
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">연이자율</label>
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
            <label className="block text-sm text-gray-600 mb-1">대출 기간</label>
            <div className="relative">
              <input
                type="number"
                value={months}
                onChange={(e) => setMonths(e.target.value)}
                min="1" max="600"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 pr-14 text-right focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">개월</span>
            </div>
            {months && (
              <p className="text-xs text-gray-400 mt-1 text-right">
                {Math.floor(parseInt(months) / 12)}년 {parseInt(months) % 12}개월
              </p>
            )}
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">상환 방식</label>
            <div className="grid grid-cols-3 gap-1">
              {(Object.keys(REPAYMENT_LABELS) as RepaymentType[]).map((t) => (
                <button
                  key={t}
                  onClick={() => setType(t)}
                  className={`py-3 rounded-lg text-sm font-medium transition-colors ${
                    type === t ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {REPAYMENT_LABELS[t]}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 결과 */}
      {result && (
        <>
          <div className="bg-blue-600 rounded-2xl p-6 mb-6 text-white">
            <p className="text-sm opacity-75 mb-4">[{REPAYMENT_LABELS[type]}] 계산 결과</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                {
                  label: type === "balloon" ? "월 이자" : type === "equal-principal" ? "첫 달 납입금" : "월 납입금",
                  value: formatKRW(result.schedule[0].payment),
                },
                { label: "총 이자", value: formatKRW(result.totalInterest) },
                { label: "총 납입금", value: formatKRW(result.totalPayment) },
              ].map((item) => (
                <div key={item.label} className="bg-white/10 rounded-xl p-4">
                  <p className="text-xs opacity-75 mb-1">{item.label}</p>
                  <p className="text-lg font-bold whitespace-nowrap">{item.value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* 상환 스케줄 */}
          <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
            <button
              onClick={() => setShowSchedule(!showSchedule)}
              className="w-full flex items-center justify-between px-6 py-4 hover:bg-gray-50 transition-colors"
            >
              <span className="font-medium text-gray-800">상환 스케줄</span>
              <span className="text-gray-400 text-sm">{showSchedule ? "▲ 접기" : "▼ 펼치기"}</span>
            </button>
            {showSchedule && (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50 border-t border-gray-200">
                    <tr>
                      {["회차", "납입금", "원금", "이자", "잔액"].map((h) => (
                        <th key={h} className="px-4 py-3 text-right text-xs font-medium text-gray-500 first:text-center">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {result.schedule.map((row) => (
                      <tr key={row.month} className="hover:bg-gray-50">
                        <td className="px-4 py-2.5 text-center text-gray-400">{row.month}</td>
                        <td className="px-4 py-2.5 text-right font-medium">{row.payment.toLocaleString()}</td>
                        <td className="px-4 py-2.5 text-right text-blue-600">{row.principal.toLocaleString()}</td>
                        <td className="px-4 py-2.5 text-right text-red-500">{row.interest.toLocaleString()}</td>
                        <td className="px-4 py-2.5 text-right text-gray-400">{row.balance.toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
