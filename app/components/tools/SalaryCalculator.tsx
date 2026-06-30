"use client";

import { useState, useMemo } from "react";

function fmt(n: number) {
  return n.toLocaleString("ko-KR") + "원";
}

function getEmploymentDeduction(salary: number) {
  if (salary <= 5_000_000) return salary * 0.7;
  if (salary <= 15_000_000) return 3_500_000 + (salary - 5_000_000) * 0.4;
  if (salary <= 45_000_000) return 7_500_000 + (salary - 15_000_000) * 0.15;
  if (salary <= 100_000_000) return 12_000_000 + (salary - 45_000_000) * 0.05;
  return Math.min(14_750_000 + (salary - 100_000_000) * 0.02, 20_000_000);
}

function getIncomeTax(taxable: number) {
  if (taxable <= 0) return 0;
  if (taxable <= 14_000_000) return taxable * 0.06;
  if (taxable <= 50_000_000) return 840_000 + (taxable - 14_000_000) * 0.15;
  if (taxable <= 88_000_000) return 6_240_000 + (taxable - 50_000_000) * 0.24;
  if (taxable <= 150_000_000) return 15_360_000 + (taxable - 88_000_000) * 0.35;
  if (taxable <= 300_000_000) return 37_060_000 + (taxable - 150_000_000) * 0.38;
  return 94_060_000 + (taxable - 300_000_000) * 0.4;
}

export default function SalaryCalculator() {
  const [salaryInput, setSalaryInput] = useState("40,000,000");
  const [dependents, setDependents] = useState(0);

  const result = useMemo(() => {
    const salary = Number(salaryInput.replace(/,/g, ""));
    if (!salary || salary <= 0) return null;

    const monthly = Math.floor(salary / 12);

    // 4대보험 (월)
    const nationalPension = Math.floor(Math.min(monthly, 5_900_000) * 0.045);
    const healthInsurance = Math.floor(monthly * 0.03545);
    const longTermCare = Math.floor(healthInsurance * 0.1295);
    const employmentInsurance = Math.floor(monthly * 0.009);
    const totalInsurance = nationalPension + healthInsurance + longTermCare + employmentInsurance;

    // 근로소득공제
    const employmentIncome = salary - getEmploymentDeduction(salary);

    // 인적공제 (본인 포함)
    const personalDeduction = (dependents + 1) * 1_500_000;

    // 과세표준
    const taxableIncome = Math.max(
      0,
      employmentIncome - personalDeduction - totalInsurance * 12
    );

    // 산출세액
    const calculatedTax = getIncomeTax(taxableIncome);

    // 근로소득세액공제
    let taxCredit = calculatedTax <= 1_300_000
      ? calculatedTax * 0.55
      : 715_000 + (calculatedTax - 1_300_000) * 0.3;
    const taxCreditLimit = salary <= 33_000_000 ? 740_000 : salary <= 70_000_000 ? 660_000 : 500_000;
    taxCredit = Math.min(taxCredit, taxCreditLimit);

    const annualIncomeTax = Math.max(0, calculatedTax - taxCredit);
    const monthlyIncomeTax = Math.floor(annualIncomeTax / 12);
    const monthlyLocalTax = Math.floor(monthlyIncomeTax * 0.1);

    const totalDeduction = totalInsurance + monthlyIncomeTax + monthlyLocalTax;
    const monthlyTakeHome = monthly - totalDeduction;

    return {
      monthly,
      nationalPension,
      healthInsurance,
      longTermCare,
      employmentInsurance,
      monthlyIncomeTax,
      monthlyLocalTax,
      totalDeduction,
      monthlyTakeHome,
      annualTakeHome: monthlyTakeHome * 12,
    };
  }, [salaryInput, dependents]);

  const handleSalaryInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/,/g, "");
    if (/^\d*$/.test(raw))
      setSalaryInput(raw ? parseInt(raw).toLocaleString("ko-KR") : "");
  };

  const deductionRows = result
    ? [
        { label: "국민연금 (4.5%)", value: result.nationalPension },
        { label: "건강보험 (3.545%)", value: result.healthInsurance },
        { label: "장기요양보험", value: result.longTermCare },
        { label: "고용보험 (0.9%)", value: result.employmentInsurance },
        { label: "소득세", value: result.monthlyIncomeTax },
        { label: "지방소득세 (소득세 × 10%)", value: result.monthlyLocalTax },
      ]
    : [];

  return (
    <div>
      {/* 입력 */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 mb-6">
        <h2 className="font-bold text-gray-800 mb-4">급여 조건 입력</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-gray-600 mb-1">연봉</label>
            <div className="relative">
              <input
                type="text"
                value={salaryInput}
                onChange={handleSalaryInput}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 pr-8 text-right focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="40,000,000"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">원</span>
            </div>
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">부양가족 수 (본인 제외)</label>
            <div className="flex gap-2">
              {[0, 1, 2, 3, 4].map((n) => (
                <button
                  key={n}
                  onClick={() => setDependents(n)}
                  className={`flex-1 py-3 rounded-lg text-sm font-medium transition-colors ${
                    dependents === n
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {n}명
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
            <p className="text-sm opacity-75 mb-4">월 실수령액</p>
            <p className="text-4xl font-bold mb-4">{fmt(result.monthlyTakeHome)}</p>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-white/10 rounded-xl p-4">
                <p className="text-xs opacity-75 mb-1">월 급여 (세전)</p>
                <p className="text-lg font-bold">{fmt(result.monthly)}</p>
              </div>
              <div className="bg-white/10 rounded-xl p-4">
                <p className="text-xs opacity-75 mb-1">연 실수령액</p>
                <p className="text-lg font-bold">{fmt(result.annualTakeHome)}</p>
              </div>
            </div>
          </div>

          {/* 공제 내역 */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6">
            <h3 className="font-bold text-gray-800 mb-4">월 공제 내역</h3>
            <div className="space-y-3">
              {deductionRows.map((row) => (
                <div key={row.label} className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">{row.label}</span>
                  <span className="text-sm font-medium text-gray-800">- {fmt(row.value)}</span>
                </div>
              ))}
              <div className="border-t border-gray-200 pt-3 flex justify-between items-center">
                <span className="text-sm font-bold text-gray-800">총 공제액</span>
                <span className="text-sm font-bold text-red-500">- {fmt(result.totalDeduction)}</span>
              </div>
            </div>
          </div>
        </>
      )}

      {/* SEO 설명 */}
      <div className="mt-8 p-6 bg-gray-100 rounded-2xl text-sm text-gray-600 leading-relaxed space-y-2">
        <p className="font-semibold text-gray-700">연봉 실수령액 계산 방법</p>
        <p>연봉 실수령액은 세전 연봉에서 4대보험(국민연금·건강보험·장기요양보험·고용보험)과 소득세·지방소득세를 공제한 금액입니다.</p>
        <p>본 계산기는 2024년 기준 공제율을 적용하며, 실제 수령액은 회사 규정 및 개인 상황에 따라 다를 수 있습니다.</p>
      </div>
    </div>
  );
}
