import type { Metadata } from "next";
import {
  locales,
  localizedHref,
  ogLocales,
  translator,
  type Locale,
} from "./i18n";
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://formandfield.example";
export function pageMetadata(
  title: string,
  description: string,
  path: string,
  locale: Locale = "en",
): Metadata {
  const t = translator(locale);
  return {
    metadataBase: new URL(siteUrl),
    title,
    description,
    alternates: {
      canonical: localizedHref(path, locale),
      languages: Object.fromEntries([
        ...locales.map((code) => [code, localizedHref(path, code)]),
        ["x-default", path],
      ]),
    },
    openGraph: {
      title: `${title} | Form & Field`,
      description,
      url: localizedHref(path, locale),
      siteName: "Form & Field",
      locale: ogLocales[locale],
      alternateLocale: locales
        .filter((code) => code !== locale)
        .map((code) => ogLocales[code]),
      type: "website",
      images: [
        {
          url: "/opengraph-image",
          width: 1200,
          height: 630,
          alt: t("Form & Field — Thoughtfully renovated. Beautifully lived."),
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/opengraph-image"],
    },
  };
}
export const services = [
  {
    name: "Whole-home renovation",
    text: "A considered transformation, from the first floor plan to the very last detail.",
    image: "/images/living.jpg",
    number: "01",
    detail:
      "Layout planning, material palettes, coordinated trades and a carefully managed fit-out. One coherent vision for your entire home.",
  },
  {
    name: "Kitchens & living spaces",
    text: "Beautifully practical spaces for slow mornings, shared meals and everyday life.",
    image: "/images/kitchen.jpg",
    number: "02",
    detail:
      "Bespoke cabinetry, thoughtful storage, lighting plans and durable natural surfaces, designed around the way you cook, gather and unwind.",
  },
  {
    name: "Bathrooms & retreats",
    text: "Quiet sanctuaries that bring a little more calm to your daily routine.",
    image: "/images/bathroom.jpg",
    number: "03",
    detail:
      "A complete approach to wet rooms and bathrooms: spatial planning, waterproofing, considered fixtures and tactile finishes.",
  },
];
