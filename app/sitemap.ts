import type { MetadataRoute } from "next";
import { routing } from "../i18n/routing";

const BASE_URL = "https://nltools.net";

const PATHS = [
  "",
  "/loan-calculator",
  "/bmi-calculator",
  "/unit-converter",
  "/salary-calculator",
  "/about",
  "/contact",
  "/privacy-policy",
];

function localizedPath(locale: string, path: string) {
  return locale === routing.defaultLocale ? path || "/" : `/${locale}${path}`;
}

export default function sitemap(): MetadataRoute.Sitemap {
  return PATHS.map((path) => ({
    url: `${BASE_URL}${localizedPath(routing.defaultLocale, path)}`,
    alternates: {
      languages: Object.fromEntries(
        routing.locales.map((locale) => [locale, `${BASE_URL}${localizedPath(locale, path)}`])
      ),
    },
  }));
}
