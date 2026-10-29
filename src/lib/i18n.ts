import { translations } from "./translations";

export const locales = ["en", "de", "nl", "tr"] as const;
export type Locale = (typeof locales)[number];
export type PageParams = { params: Promise<{ locale: string }> };
export const localeNames: Record<Locale, string> = {
  en: "English",
  de: "Deutsch",
  nl: "Nederlands",
  tr: "Türkçe",
};
export const ogLocales: Record<Locale, string> = {
  en: "en_GB",
  de: "de_DE",
  nl: "nl_NL",
  tr: "tr_TR",
};
export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}
const dictionaries = Object.fromEntries(
  locales.map((locale, index) => [
    locale,
    new Map(translations.map((row) => [row[0], row[index]])),
  ]),
) as Record<Locale, Map<string, string>>;
export function translator(locale: Locale) {
  return (source: string) => dictionaries[locale].get(source) ?? source;
}
export function stripLocale(path: string) {
  return path.replace(/^\/(en|de|nl|tr)(?=\/|$|[?#])/, "") || "/";
}
export function localizedHref(path: string, locale: Locale): string {
  if (!path.startsWith("/") || path.startsWith("//")) return path;
  const clean = stripLocale(path);
  return locale === "en" ? clean : `/${locale}${clean === "/" ? "" : clean}`;
}
export async function resolveLocale(
  params: PageParams["params"],
): Promise<Locale> {
  const { locale } = await params;
  return isLocale(locale) ? locale : "en";
}
