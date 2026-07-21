"use client";

import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname } from "../../i18n/navigation";

export default function Header() {
  const t = useTranslations("Header");
  const locale = useLocale();
  const pathname = usePathname();
  const otherLocale = locale === "ko" ? "en" : "ko";

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
        <Link href="/" className="text-lg font-bold text-blue-600">
          {t("brand")}
        </Link>
        <nav className="hidden sm:flex items-center gap-6 text-sm text-gray-600">
          <Link href="/loan-calculator" className="hover:text-blue-600 transition-colors">
            {t("navLoan")}
          </Link>
          <Link href="/bmi-calculator" className="hover:text-blue-600 transition-colors">
            {t("navBmi")}
          </Link>
          <Link href="/unit-converter" className="hover:text-blue-600 transition-colors">
            {t("navUnit")}
          </Link>
          <Link href="/salary-calculator" className="hover:text-blue-600 transition-colors">
            {t("navSalary")}
          </Link>
          <div className="relative group">
            <button className="flex items-center gap-1 hover:text-blue-600 transition-colors">
              {t("navMore")}
              <span className="text-xs">▾</span>
            </button>
            <div className="absolute left-0 top-full pt-2 hidden group-hover:block">
              <div className="bg-white border border-gray-200 rounded-xl shadow-lg py-2 w-48">
                <Link href="/age-calculator" className="block px-4 py-2 hover:bg-gray-50 hover:text-blue-600 transition-colors">
                  {t("navAge")}
                </Link>
                <Link href="/severance-calculator" className="block px-4 py-2 hover:bg-gray-50 hover:text-blue-600 transition-colors">
                  {t("navSeverance")}
                </Link>
                <Link href="/vat-calculator" className="block px-4 py-2 hover:bg-gray-50 hover:text-blue-600 transition-colors">
                  {t("navVat")}
                </Link>
                <Link href="/dday-calculator" className="block px-4 py-2 hover:bg-gray-50 hover:text-blue-600 transition-colors">
                  {t("navDday")}
                </Link>
                <Link href="/calorie-calculator" className="block px-4 py-2 hover:bg-gray-50 hover:text-blue-600 transition-colors">
                  {t("navCalorie")}
                </Link>
                <Link href="/savings-calculator" className="block px-4 py-2 hover:bg-gray-50 hover:text-blue-600 transition-colors">
                  {t("navSavings")}
                </Link>
                <Link href="/due-date-calculator" className="block px-4 py-2 hover:bg-gray-50 hover:text-blue-600 transition-colors">
                  {t("navDueDate")}
                </Link>
              </div>
            </div>
          </div>
          <Link
            href={pathname}
            locale={otherLocale}
            className="text-xs font-medium border border-gray-300 rounded-full px-3 py-1 hover:border-blue-400 hover:text-blue-600 transition-colors"
          >
            {t("switchTo")}
          </Link>
        </nav>
      </div>
    </header>
  );
}
