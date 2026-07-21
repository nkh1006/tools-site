import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "../../../i18n/navigation";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Privacy" });
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    alternates: {
      languages: {
        ko: "/privacy-policy",
        en: "/en/privacy-policy",
      },
    },
  };
}

export default async function PrivacyPolicyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Privacy");

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-2">{t("h1")}</h1>
      <p className="text-sm text-gray-400 mb-8">{t("lastUpdated")}</p>

      <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-8 text-sm text-gray-600 leading-relaxed">

        <section>
          <h2 className="text-base font-bold text-gray-800 mb-3">{t("s1Title")}</h2>
          <p>{t("s1Body")}</p>
        </section>

        <section>
          <h2 className="text-base font-bold text-gray-800 mb-3">{t("s2Title")}</h2>
          <p className="mb-2">{t("s2Intro")}</p>
          <ul className="list-disc list-inside space-y-1 pl-2">
            <li>{t("s2Item2")}</li>
            <li>{t("s2Item3")}</li>
          </ul>
        </section>

        <section>
          <h2 className="text-base font-bold text-gray-800 mb-3">{t("s3Title")}</h2>
          <p className="mb-2">{t("s3Body1")}</p>
          <p>{t("s3Body2")}</p>
        </section>

        <section>
          <h2 className="text-base font-bold text-gray-800 mb-3">{t("s4Title")}</h2>
          <p className="mb-2">{t("s4Body1")}</p>
          <p>
            {t("s4Body2Pre")}{" "}
            <a
              href="https://policies.google.com/privacy"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline"
            >
              {t("s4Body2Link")}
            </a>
            {t("s4Body2Post")}
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold text-gray-800 mb-3">{t("s5Title")}</h2>
          <p>{t("s5Body")}</p>
        </section>

        <section>
          <h2 className="text-base font-bold text-gray-800 mb-3">{t("s6Title")}</h2>
          <p>
            {t("s6BodyPre")}{" "}
            <Link href="/contact" className="text-blue-600 underline">
              {t("s6BodyLink")}
            </Link>{" "}
            {t("s6BodyPost")}
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold text-gray-800 mb-3">{t("s7Title")}</h2>
          <p>{t("s7Body")}</p>
        </section>

      </div>
    </div>
  );
}
