import { translator, resolveLocale, type PageParams } from "@/lib/i18n";
import Image from "next/image";
import { CTA, Eyebrow } from "@/components/shared";
import { pageMetadata } from "@/lib/site";
export async function generateMetadata({ params }: PageParams) {
  const locale = await resolveLocale(params);
  const t = translator(locale);
  return pageMetadata(
    t("A considered approach"),
    t(
      "Meet the philosophy behind Form & Field, a fictional European renovation studio with a thoughtful approach to home.",
    ),
    "/about",
    locale,
  );
}
export default async function About({ params }: PageParams) {
  const locale = await resolveLocale(params);
  const t = translator(locale);
  return (
    <>
      <section className="shell page-intro">
        <Eyebrow>{t("THE FORM & FIELD PHILOSOPHY")}</Eyebrow>
        <h1>
          {t("Good design begins")}
          <br />
          {t("with")} <em>{t("paying attention.")}</em>
        </h1>
        <div className="intro-tail">
          <p>
            {t("To the way light moves. To the things you keep.")}
            <br />
            {t("To the life that happens between the walls.")}
          </p>
          <span>{t("LESS NOISE. MORE MEANING.")}</span>
        </div>
      </section>
      <div className="shell about-banner">
        <Image
          src="/images/living.jpg"
          alt={t(
            "A quiet, light-filled interior with a natural material palette",
          )}
          fill
          priority
          sizes="100vw"
        />
        <span>{t("SPACES FOR REAL LIFE.")}</span>
      </div>
      <section className="section shell intro-section">
        <div>
          <Eyebrow>{t("OUR POINT OF VIEW")}</Eyebrow>
          <h2>
            {t("A thoughtful home.")}
            <br />
            <em>{t("A lasting feeling.")}</em>
          </h2>
        </div>
        <div className="intro-copy">
          <p>
            {t(
              "Form & Field is an imagined independent design and renovation studio, rooted in a simple idea: a home should support the people who live in it.",
            )}
          </p>
          <p className="muted">
            {t(
              "Our design philosophy brings together warm minimalism, practical thinking and a respect for what is already there. Keep what has character. Change what no longer works. Make every new detail earn its place.",
            )}
          </p>
          <p className="muted">
            {t(
              "This portfolio explores how a European renovation business could communicate its work with clarity and care. The studio and projects are fictional; the attention to detail is intentional.",
            )}
          </p>
        </div>
      </section>
      <section className="values-section section">
        <div className="shell">
          <Eyebrow>{t("WHAT GUIDES US")}</Eyebrow>
          <h2>
            {t("Considered in every")} <em>{t("detail.")}</em>
          </h2>
          <div className="values-grid">
            {[
              [
                "01",
                t("People before plans"),
                t(
                  "A beautiful room is only successful when it works for the people using it. Everyday routines shape every design decision.",
                ),
              ],
              [
                "02",
                t("Character over trends"),
                t(
                  "Natural textures, thoughtful proportions and a restrained palette create spaces that feel relevant beyond the moment.",
                ),
              ],
              [
                "03",
                t("Care beyond completion"),
                t(
                  "Clear documentation, considered material choices and practical maintenance guidance are part of a lasting result.",
                ),
              ],
            ].map(([n, heading, d]) => (
              <article key={n}>
                <span className="process-number">{n}</span>
                <h3>{t(heading)}</h3>
                <p>{t(d)}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="section shell approach-note">
        <Eyebrow>{t("A MORE CONSIDERED FOOTPRINT")}</Eyebrow>
        <h2>
          {t("Keep the good.")}
          <br />
          <em>{t("Make room for better.")}</em>
        </h2>
        <p>
          {t(
            "Our proposed approach prioritises repair before replacement, durable materials and layouts that adapt over time. For a real project, material origins, environmental claims and performance would be checked with suppliers rather than assumed.",
          )}
        </p>
      </section>
      <CTA locale={locale} />
    </>
  );
}
