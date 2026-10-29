import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site";
import { locales, localizedHref } from "@/lib/i18n";
export default function sitemap(): MetadataRoute.Sitemap {
  return locales.flatMap((locale) =>
    ["/", "/services", "/about", "/contact"].map((path) => ({
      url: `${siteUrl}${localizedHref(path, locale)}`,
      alternates: {
        languages: Object.fromEntries(
          locales.map((code) => [
            code,
            `${siteUrl}${localizedHref(path, code)}`,
          ]),
        ),
      },
      changeFrequency: "monthly",
      priority: path === "/" ? 1 : 0.8,
    })),
  );
}
