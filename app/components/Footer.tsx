import { useTranslations } from "next-intl";
import { Link } from "../../i18n/navigation";

export default function Footer() {
  const t = useTranslations("Footer");

  return (
    <footer className="border-t border-gray-200 bg-white mt-8 py-6 text-center text-xs text-gray-400">
      <div className="flex items-center justify-center gap-4 mb-3">
        <Link href="/about" className="hover:text-gray-600 transition-colors">
          {t("about")}
        </Link>
        <span>·</span>
        <Link href="/privacy-policy" className="hover:text-gray-600 transition-colors">
          {t("privacy")}
        </Link>
        <span>·</span>
        <Link href="/contact" className="hover:text-gray-600 transition-colors">
          {t("contact")}
        </Link>
      </div>
      <p>{t("disclaimer")}</p>
      <p className="mt-1">{t("copyright")}</p>
    </footer>
  );
}
