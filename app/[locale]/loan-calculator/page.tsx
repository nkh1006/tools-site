import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import LoanCalculator from "../../components/tools/LoanCalculator";
import AdBanner from "../../components/AdBanner";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "LoanPage" });
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    alternates: {
      languages: {
        ko: "/loan-calculator",
        en: "/en/loan-calculator",
      },
    },
  };
}

export default async function LoanCalculatorPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("LoanPage");

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">{t("h1")}</h1>
        <p className="text-sm text-gray-500 mt-1">{t("subtitle")}</p>
      </div>

      <AdBanner />
      <LoanCalculator />
      <AdBanner />

      <div className="bg-white rounded-2xl border border-gray-200 p-6 mt-6 space-y-3 text-sm text-gray-600 leading-relaxed">
        <h2 className="font-bold text-gray-800">{t("guideTitle")}</h2>
        <p><strong className="text-gray-700">{t("guideEqualInstallmentLabel")}:</strong> {t("guideEqualInstallmentDesc")}</p>
        <p><strong className="text-gray-700">{t("guideEqualPrincipalLabel")}:</strong> {t("guideEqualPrincipalDesc")}</p>
        <p><strong className="text-gray-700">{t("guideBalloonLabel")}:</strong> {t("guideBalloonDesc")}</p>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 p-6 mt-6 space-y-3 text-sm text-gray-600 leading-relaxed">
        <h2 className="font-bold text-gray-800">{t("formulaTitle")}</h2>
        <p><strong className="text-gray-700">{t("formulaEqualInstallmentTitle")}</strong><br />{t("formulaEqualInstallmentBody")}</p>
        <p><strong className="text-gray-700">{t("formulaEqualPrincipalTitle")}</strong><br />{t("formulaEqualPrincipalBody")}</p>
        <p><strong className="text-gray-700">{t("formulaBalloonTitle")}</strong><br />{t("formulaBalloonBody")}</p>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 p-6 mt-6 space-y-2 text-sm text-gray-600 leading-relaxed">
        <h2 className="font-bold text-gray-800">{t("exampleTitle")}</h2>
        <p>{t("exampleEqualInstallment")}</p>
        <p>{t("exampleEqualPrincipal")}</p>
        <p>{t("exampleBalloon")}</p>
        <p className="text-gray-500 pt-2">{t("exampleNote")}</p>
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
