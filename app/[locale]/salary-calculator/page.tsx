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

      <div className="bg-white rounded-2xl border border-gray-200 p-6 mt-6 space-y-2 text-sm text-gray-600 leading-relaxed">
        <h2 className="font-bold text-gray-800">{t("stepsTitle")}</h2>
        <ol className="list-decimal list-inside space-y-1.5">
          <li>{t("step1")}</li>
          <li>{t("step2")}</li>
          <li>{t("step3")}</li>
          <li>{t("step4")}</li>
          <li>{t("step5")}</li>
          <li>{t("step6")}</li>
          <li>{t("step7")}</li>
          <li>{t("step8")}</li>
        </ol>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 p-6 mt-6 space-y-2 text-sm text-gray-600 leading-relaxed">
        <h2 className="font-bold text-gray-800">{t("exampleTitle")}</h2>
        <p>{t("example1")}</p>
        <p>{t("example2")}</p>
        <p className="text-gray-500 pt-2">{t("rateNote")}</p>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 p-6 mt-6">
        <h2 className="font-bold text-gray-800 mb-3">{t("faqTitle")}</h2>
        <div className="space-y-4">
          {t.raw("faq").map((item: { q: string; a: string }, i: number) => (
            <div key={i}>
              <p className="text-sm font-medium text-gray-800">Q. {item.q}</p>
              <p className="text-sm text-gray-600 leading-relaxed mt-1">A. {item.a}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
