import { useTranslations } from "next-intl";

export default function AdBanner({ size = "horizontal" }: { size?: "horizontal" | "square" }) {
  const t = useTranslations("AdBanner");
  const cls =
    size === "horizontal"
      ? "h-24 w-full"
      : "h-60 w-full";

  return (
    <div className={`${cls} bg-gray-200 rounded-xl flex items-center justify-center text-gray-400 text-sm my-4`}>
      {t("placeholder")}
    </div>
  );
}
