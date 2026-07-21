import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import CalorieCalculator from "../../components/tools/CalorieCalculator";
import AdBanner from "../../components/AdBanner";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "CaloriePage" });
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    alternates: {
      languages: {
        ko: "/calorie-calculator",
        en: "/en/calorie-calculator",
      },
    },
  };
}

export default async function CalorieCalculatorPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("CaloriePage");

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">{t("h1")}</h1>
        <p className="text-sm text-gray-500 mt-1">{t("subtitle")}</p>
      </div>

      <AdBanner />
      <CalorieCalculator />
      <AdBanner />

      <div className="bg-white rounded-2xl border border-gray-200 p-6 mt-6 space-y-3 text-sm text-gray-600 leading-relaxed">
        <h2 className="font-bold text-gray-800">{t("formulaTitle")}</h2>
        <p>{t("formulaBody")}</p>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 p-6 mt-6 space-y-2 text-sm text-gray-600 leading-relaxed">
        <h2 className="font-bold text-gray-800">{t("exampleTitle")}</h2>
        <p>{t("example1")}</p>
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
