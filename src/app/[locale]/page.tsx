import {
  translator,
  localizedHref,
  resolveLocale,
  type PageParams,
} from "@/lib/i18n";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowDown,
  ArrowUpRight,
  Check,
  Leaf,
  Ruler,
  Layers3,
} from "lucide-react";
import { CTA, Eyebrow, FAQ, ServiceCards } from "@/components/shared";
import { ProjectGallery } from "@/components/project-gallery";
import { pageMetadata } from "@/lib/site";
export async function generateMetadata({ params }: PageParams) {
  const locale = await resolveLocale(params);
  const t = translator(locale);
  return pageMetadata(
    t("Thoughtfully renovated. Beautifully lived."),
    t(
      "Discover Form & Field, a fictional premium home renovation studio creating considered European interiors.",
    ),
    "/",
    locale,
  );
}
export default async function Home({ params }: PageParams) {
  const locale = await resolveLocale(params);
  const t = translator(locale);
  return (
    <>
      <section className="hero">
        <Image
          className="hero-image"
          src="/images/hero.jpg"
          alt={t(
            "Sunlit European living room with soft neutral furnishings, timber and sculptural lighting",
          )}
          fill
          priority
          sizes="100vw"
        />
        <div className="hero-shade" />
        <div className="shell hero-content">
          <Eyebrow>{t("INDEPENDENT DESIGN & RENOVATION STUDIO")}</Eyebrow>
          <h1>
            {t("Spaces for")}
            <br />
            <em>{t("better living.")}</em>
          </h1>
          <p>
            {t("A fresh perspective on the place you call home.")}
            <br />
            {t("Thoughtfully designed. Beautifully brought to life.")}
          </p>
          <Link
            className="button button-cream"
            href={localizedHref("/services", locale)}
          >
            {t("Discover what’s possible")} <ArrowUpRight size={18} />
          </Link>
        </div>
        <div className="shell hero-bottom">
          <span>{t("HOMES, RECONSIDERED.")}</span>
          <a href="#approach">
            {t("A little further down")} <ArrowDown size={15} />
          </a>
          <span className="hero-location">
            {t("EUROPEAN DESIGN SENSIBILITY")}
          </span>
        </div>
        <a className="hero-project-note" href="#projects">
          <span className="hero-project-number">01 / 03</span>
          <span>
            {t("The townhouse concept")}
            <small>{t("NATURAL LIGHT. A NEW PERSPECTIVE.")}</small>
          </span>
          <ArrowUpRight size={24} />
        </a>
      </section>
      <div className="principles-strip">
        <div className="shell">
          <span>
            <Ruler size={18} /> {t("Designed around you")}
          </span>
          <span>
            <Layers3 size={18} /> {t("Crafted with care")}
          </span>
          <span>
            <Leaf size={18} /> {t("Made to last")}
          </span>
          <span className="strip-note">
            {t("GOOD SPACES. BETTER EVERYDAY.")}
          </span>
        </div>
      </div>
      <section id="approach" className="section shell intro-section">
        <div>
          <Eyebrow>{t("MORE THAN A RENOVATION")}</Eyebrow>
          <h2>
            {t("We see the potential.")}
            <br />
            <em>{t("You feel the difference.")}</em>
          </h2>
        </div>
        <div className="intro-copy">
          <p>
            {t(
              "A home is more than the sum of its rooms. It’s the light in the morning, the space to gather, the details that simply feel right.",
            )}
          </p>
          <p className="muted">
            {t(
              "At Form & Field, we bring design and renovation together. One thoughtful process, from your first idea to a home that feels entirely your own.",
            )}
          </p>
          <Link className="text-link" href={localizedHref("/about", locale)}>
            {t("Get to know our approach")} <ArrowUpRight size={17} />
          </Link>
        </div>
      </section>
      <section className="section services-section">
        <div className="shell">
          <div className="section-heading">
            <div>
              <Eyebrow>{t("WHAT WE DO")}</Eyebrow>
              <h2>
                {t("Your home.")} <em>{t("Reimagined.")}</em>
              </h2>
            </div>
            <Link
              className="text-link"
              href={localizedHref("/services", locale)}
            >
              {t("Explore our services")} <ArrowUpRight size={17} />
            </Link>
          </div>
          <ServiceCards locale={locale} />
        </div>
      </section>
      <section id="projects" className="section shell projects-section">
        <div className="section-heading">
          <div>
            <Eyebrow>{t("THE ART OF POSSIBILITY")}</Eyebrow>
            <h2>
              {t("A new perspective.")}
              <br />
              <em>{t("A different kind of home.")}</em>
            </h2>
          </div>
          <p className="muted section-aside">
            {t("Explore three sample transformations.")}
            <br />
            {t("Small details. A meaningful difference.")}
          </p>
        </div>
        <ProjectGallery />
      </section>
      <section className="process-section section">
        <div className="shell">
          <div className="section-heading">
            <div>
              <Eyebrow>{t("A CLEAR PATH, FROM THE START")}</Eyebrow>
              <h2>
                {t("Big change.")}
                <br />
                <em>{t("A considered process.")}</em>
              </h2>
            </div>
            <p className="muted section-aside">
              {t("Renovating should feel exciting.")}
              <br />
              {t("Knowing what comes next helps.")}
            </p>
          </div>
          <div className="process-grid">
            {[
              [
                "01",
                t("Listen & discover"),
                t(
                  "We start with your home, your routines and what you would love to change.",
                ),
              ],
              [
                "02",
                t("Design & refine"),
                t(
                  "Together, we shape a clear vision, material palette and considered plan.",
                ),
              ],
              [
                "03",
                t("Build & care"),
                t(
                  "A coordinated renovation with clear communication at every milestone.",
                ),
              ],
              [
                "04",
                t("Settle & enjoy"),
                t(
                  "The final details, a thoughtful handover, and space for your next chapter.",
                ),
              ],
            ].map(([n, heading, d]) => (
              <div key={n}>
                <span className="process-number">{n}</span>
                <h3>{t(heading)}</h3>
                <p>{t(d)}</p>
              </div>
            ))}
          </div>
          <p className="process-footnote">
            <Check size={15} />{" "}
            {t("Clear scope. Considered materials. No surprises by design.")}
          </p>
        </div>
      </section>
      <FAQ locale={locale} />
      <CTA locale={locale} />
    </>
  );
}
