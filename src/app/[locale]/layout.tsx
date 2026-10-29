import { resolveLocale, translator, type PageParams } from "@/lib/i18n";
import type { Metadata, Viewport } from "next";
import { Header } from "@/components/header";
import { Footer } from "@/components/shared";
import { siteUrl } from "@/lib/site";
import { Motion } from "@/components/motion";
import { LocaleProvider } from "@/components/locale-provider";

import { isLocale, locales } from "@/lib/i18n";
import { notFound } from "next/navigation";
import "../globals.css";
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Form & Field — Homes, reconsidered.",
    template: "%s | Form & Field",
  },
  description:
    "A thoughtful approach to premium home renovation. Explore the Form & Field fictional European design and renovation studio.",
  robots: { index: false, follow: true },
  applicationName: "Form & Field",
  category: "architecture",
  icons: { icon: "/icon.svg" },
};
export const viewport: Viewport = {
  themeColor: "#243c32",
  width: "device-width",
  initialScale: 1,
};
export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}
export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
} & PageParams) {
  if (!isLocale((await params).locale)) notFound();
  const locale = await resolveLocale(params);
  const t = translator(locale);
  return (
    <html lang={locale === "en" ? "en-GB" : locale}>
      <body>
        <LocaleProvider locale={locale}>
          <a className="skip-link" href="#main">
            {t("Skip to content")}
          </a>
          <Header locale={locale} />
          <Motion />
          <main id="main">{children}</main>
          <Footer locale={locale} />
        </LocaleProvider>
      </body>
    </html>
  );
}
