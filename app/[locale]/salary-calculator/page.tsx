import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import SalaryCalculator from "../../components/tools/SalaryCalculator";
import AdBanner from "../../components/AdBanner";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "SalaryPage" });
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    alternates: {
      languages: {
        ko: "/salary-calculator",
        en: "/en/salary-calculator",
      },
    },
  };
}

export default async function SalaryCalculatorPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("SalaryPage");

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">{t("h1")}</h1>
        <p className="text-sm text-gray-500 mt-1">{t("subtitle")}</p>
      </div>
      <AdBanner />
      <SalaryCalculator />
      <AdBanner />
    </div>
  );
}
