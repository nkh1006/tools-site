import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import BmiCalculator from "../../components/tools/BmiCalculator";
import AdBanner from "../../components/AdBanner";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "BmiPage" });
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    alternates: {
      languages: {
        ko: "/bmi-calculator",
        en: "/en/bmi-calculator",
      },
    },
  };
}

export default async function BmiPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("BmiPage");

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">{t("h1")}</h1>
        <p className="text-sm text-gray-500 mt-1">{t("subtitle")}</p>
      </div>

      <AdBanner />
      <BmiCalculator />
      <AdBanner />

      <div className="bg-white rounded-2xl border border-gray-200 p-6 mt-6 space-y-3 text-sm text-gray-600 leading-relaxed">
        <h2 className="font-bold text-gray-800">{t("formulaTitle")}</h2>
        <p>{t("formulaBody")}</p>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 p-6 mt-6 space-y-2 text-sm text-gray-600 leading-relaxed">
        <h2 className="font-bold text-gray-800">{t("categoryTitle")}</h2>
        <p>{t("categoryUnder")}</p>
        <p>{t("categoryNormal")}</p>
        <p>{t("categoryOver")}</p>
        <p>{t("categoryObese1")}</p>
        <p>{t("categoryObese2")}</p>
        <p className="text-gray-500 pt-2">{t("categoryNote")}</p>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 p-6 mt-6 space-y-3 text-sm text-gray-600 leading-relaxed">
        <h2 className="font-bold text-gray-800">{t("limitationsTitle")}</h2>
        <p>{t("limitationsBody")}</p>
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
