import {
  translator,
  localizedHref,
  resolveLocale,
  type PageParams,
} from "@/lib/i18n";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Check } from "lucide-react";
import { CTA, Eyebrow, FAQ } from "@/components/shared";
import { pageMetadata, services } from "@/lib/site";
export async function generateMetadata({ params }: PageParams) {
  const locale = await resolveLocale(params);
  const t = translator(locale);
  return pageMetadata(
    t("Renovation services"),
    t(
      "Explore whole-home renovations, thoughtfully designed kitchens and calm bathrooms with Form & Field.",
    ),
    "/services",
    locale,
  );
}
export default async function Services({ params }: PageParams) {
  const locale = await resolveLocale(params);
  const t = translator(locale);
  return (
    <>
      <section className="shell page-intro">
        <Eyebrow>{t("OUR SERVICES")}</Eyebrow>
        <h1>
          {t("Room for")}
          <br />
          <em>{t("something better.")}</em>
        </h1>
        <div className="intro-tail">
          <p>
            {t("From a single space to a whole new chapter.")}
            <br />
            {t("Thoughtful design and renovation, under one roof.")}
          </p>
          <span>{t("DESIGNED FOR THE WAY YOU LIVE.")}</span>
        </div>
      </section>
      <div className="shell service-details">
        {services.map((s, i) => (
          <section
            id={`service-${s.number}`}
            key={s.number}
            className={`service-detail ${i % 2 ? "reverse" : ""}`}
          >
            <div className="detail-photo">
              <Image
                src={s.image}
                alt={t("Illustrative renovation interior")}
                fill
                sizes="(max-width: 760px) 100vw, 50vw"
              />
            </div>
            <div className="detail-copy">
              <Eyebrow>
                {s.number} {t("/ CONSIDERED FROM EVERY ANGLE")}
              </Eyebrow>
              <h2>{t(s.name)}</h2>
              <p>{t(s.detail)}</p>
              <ul>
                {(i === 0
                  ? [
                      t("Spatial planning & design direction"),
                      t("Materials, finishes & lighting"),
                      t("Coordinated renovation & handover"),
                    ]
                  : i === 1
                    ? [
                        t("Layout & bespoke cabinetry"),
                        t("Worktops, surfaces & appliances"),
                        t("Ambient & task lighting"),
                      ]
                    : [
                        t("Layout & fixture selection"),
                        t("Waterproofing & ventilation"),
                        t("Tile, stone & finishing details"),
                      ]
                ).map((item) => (
                  <li key={t(item)}>
                    <Check size={16} />
                    {t(item)}
                  </li>
                ))}
              </ul>
              <Link
                className="text-link"
                href={localizedHref(
                  `/contact?service=${i === 0 ? "whole-home" : i === 1 ? "kitchen" : "bathroom"}`,
                  locale,
                )}
              >
                {t("Tell us about your project")} <ArrowUpRight size={17} />
              </Link>
            </div>
          </section>
        ))}
      </div>
      <section className="section shell scope-note">
        <Eyebrow>{t("BEFORE WE BEGIN")}</Eyebrow>
        <h2>
          {t("Clarity is part of")} <em>{t("the craft.")}</em>
        </h2>
        <p>
          {t(
            "Every home has its own possibilities and constraints. A real renovation would begin with a site assessment, a detailed scope and a written quotation. Structural work, permissions and specialist services would be confirmed before any commitment.",
          )}
        </p>
        <p className="muted">
          {t(
            "Services on this site are illustrative offerings from a fictional studio.",
          )}
        </p>
      </section>
      <FAQ locale={locale} />
      <CTA locale={locale} />
    </>
  );
}
