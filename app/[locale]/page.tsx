import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "../../i18n/navigation";
import AdBanner from "../components/AdBanner";

const categoryColors: Record<string, string> = {
  finance: "bg-blue-100 text-blue-700",
  health: "bg-green-100 text-green-700",
  convert: "bg-purple-100 text-purple-700",
};

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Home");

  const tools = [
    {
      href: "/loan-calculator",
      emoji: "💰",
      title: t("loanTitle"),
      desc: t("loanDesc"),
      category: "finance",
    },
    {
      href: "/bmi-calculator",
      emoji: "⚖️",
      title: t("bmiTitle"),
      desc: t("bmiDesc"),
      category: "health",
    },
    {
      href: "/unit-converter",
      emoji: "📐",
      title: t("unitTitle"),
      desc: t("unitDesc"),
      category: "convert",
    },
    {
      href: "/salary-calculator",
      emoji: "💵",
      title: t("salaryTitle"),
      desc: t("salaryDesc"),
      category: "finance",
    },
  ];

  const categoryLabels: Record<string, string> = {
    finance: t("categoryFinance"),
    health: t("categoryHealth"),
    convert: t("categoryConvert"),
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      {/* 히어로 */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{t("title")}</h1>
        <p className="text-gray-500">{t("subtitle")}</p>
      </div>

      <AdBanner size="horizontal" />

      {/* 툴 그리드 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
        {tools.map((tool) => (
          <Link
            key={tool.href}
            href={tool.href}
            className="bg-white rounded-2xl border border-gray-200 p-5 hover:shadow-md hover:border-blue-300 transition-all group"
          >
            <div className="flex items-start justify-between mb-3">
              <span className="text-3xl">{tool.emoji}</span>
              <span
                className={`text-xs font-medium px-2 py-1 rounded-full ${categoryColors[tool.category]}`}
              >
                {categoryLabels[tool.category]}
              </span>
            </div>
            <h2 className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors mb-1">
              {tool.title}
            </h2>
            <p className="text-sm text-gray-500 leading-relaxed">{tool.desc}</p>
          </Link>
        ))}
      </div>

      <AdBanner size="horizontal" />
    </div>
  );
}
