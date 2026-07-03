import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "../../../i18n/navigation";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "About" });
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    alternates: {
      languages: {
        ko: "/about",
        en: "/en/about",
      },
    },
  };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("About");

  const toolLinks = [
    { emoji: "💰", nameKey: "loan", href: "/loan-calculator" },
    { emoji: "⚖️", nameKey: "bmi", href: "/bmi-calculator" },
    { emoji: "📐", nameKey: "unit", href: "/unit-converter" },
  ];
  const homeT = await getTranslations({ locale, namespace: "Home" });
  const toolNames: Record<string, string> = {
    loan: homeT("loanTitle"),
    bmi: homeT("bmiTitle"),
    unit: homeT("unitTitle"),
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-2">{t("h1")}</h1>
      <p className="text-sm text-gray-500 mb-8">{t("subtitle")}</p>

      <div className="space-y-4">
        {/* 소개 */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6">
          <h2 className="font-bold text-gray-800 mb-3">{t("introTitle")}</h2>
          <p className="text-sm text-gray-600 leading-relaxed">{t("introBody")}</p>
        </div>

        {/* 제공 서비스 */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6">
          <h2 className="font-bold text-gray-800 mb-4">{t("servicesTitle")}</h2>
          <div className="space-y-3">
            {toolLinks.map((tool) => (
              <Link
                key={tool.href}
                href={tool.href}
                className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 hover:bg-blue-50 hover:text-blue-600 transition-colors"
              >
                <span className="text-xl">{tool.emoji}</span>
                <span className="text-sm font-medium text-gray-700">{toolNames[tool.nameKey]}</span>
                <span className="ml-auto text-gray-400 text-xs">{t("goto")}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* 운영 방침 */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6">
          <h2 className="font-bold text-gray-800 mb-3">{t("policyTitle")}</h2>
          <ul className="text-sm text-gray-600 leading-relaxed space-y-2">
            <li className="flex gap-2">
              <span className="text-blue-500 font-bold">·</span>
              {t("policy1")}
            </li>
            <li className="flex gap-2">
              <span className="text-blue-500 font-bold">·</span>
              {t("policy2")}
            </li>
            <li className="flex gap-2">
              <span className="text-blue-500 font-bold">·</span>
              {t("policy3")}
            </li>
            <li className="flex gap-2">
              <span className="text-blue-500 font-bold">·</span>
              {t("policy4")}
            </li>
          </ul>
        </div>

        {/* 문의 */}
        <div className="bg-blue-50 rounded-2xl border border-blue-100 p-6 text-center">
          <p className="text-sm text-gray-600 mb-3">{t("contactPrompt")}</p>
          <Link
            href="/contact"
            className="inline-block bg-blue-600 text-white text-sm font-medium px-6 py-2.5 rounded-lg hover:bg-blue-700 transition-colors"
          >
            {t("contactButton")}
          </Link>
        </div>
      </div>
    </div>
  );
}
