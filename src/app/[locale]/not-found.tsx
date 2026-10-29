"use client";
import { translator, localizedHref } from "@/lib/i18n";

import Link from "next/link";
export default function NotFound() {
  const locale = useLocale();
  const t = translator(locale);
  return (
    <section className="shell page-intro">
      <p className="eyebrow">{t("404 / A LITTLE OFF PLAN")}</p>
      <h1>
        {t("Let’s find your")}
        <br />
        <em>{t("way home.")}</em>
      </h1>
      <p>{t("The page you are looking for isn’t here.")}</p>
      <Link className="button" href={localizedHref("/", locale)}>
        {t("Back to home ↗")}
      </Link>
    </section>
  );
}

import { useLocale } from "@/components/locale-provider";
