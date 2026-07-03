import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import UnitConverter from "../../components/tools/UnitConverter";
import AdBanner from "../../components/AdBanner";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "UnitPage" });
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    alternates: {
      languages: {
        ko: "/unit-converter",
        en: "/en/unit-converter",
      },
    },
  };
}

export default async function UnitConverterPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("UnitPage");

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">{t("h1")}</h1>
        <p className="text-sm text-gray-500 mt-1">{t("subtitle")}</p>
      </div>

      <AdBanner />
      <UnitConverter />
      <AdBanner />
    </div>
  );
}
