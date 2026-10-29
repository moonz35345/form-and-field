import { translator, localizedHref, type Locale } from "@/lib/i18n";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, ArrowRight, Plus } from "lucide-react";
import { services } from "@/lib/site";
export function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="eyebrow">
      <span />
      {children}
    </p>
  );
}
export function ServiceCards({ locale }: { locale: Locale }) {
  const t = translator(locale);
  return (
    <div className="service-grid">
      {services.map((s) => (
        <Link
          className="service-card"
          key={s.number}
          href={localizedHref(`/services#service-${s.number}`, locale)}
        >
          <div className="service-photo">
            <Image
              src={s.image}
              alt={
                s.number === "03"
                  ? t("Warm, minimal bathroom with natural finishes")
                  : s.number === "02"
                    ? t("Light-filled contemporary kitchen")
                    : t("Considered living space with natural materials")
              }
              fill
              sizes="(max-width: 700px) 100vw, 33vw"
            />
            <span className="round-arrow">
              <ArrowUpRight size={21} />
            </span>
          </div>
          <div className="service-card-heading">
            <h3>{t(s.name)}</h3>
            <span>{s.number}</span>
          </div>
          <p>{t(s.text)}</p>
        </Link>
      ))}
    </div>
  );
}
const faqs = [
  [
    "Where does Form & Field work?",
    "This is a fictional European renovation studio created as a portfolio demo. Locations, services and projects are illustrative. A real studio would confirm its service area during your first conversation.",
  ],
  [
    "Can you help before I have a clear brief?",
    "Absolutely. Start with what is working, what is not, and how you would like your home to feel. A discovery conversation would turn those thoughts into a practical project brief.",
  ],
  [
    "How are budgets and timelines agreed?",
    "A real project would begin with a site visit and an itemised scope. Costs, allowances, milestones and dependencies would be agreed in writing before work starts. Any changes would require your approval.",
  ],
  [
    "Can I stay at home during a renovation?",
    "It depends on the scale, access and safety requirements. A phased renovation may be possible; a whole-home transformation may require temporary accommodation. This would be discussed early.",
  ],
  [
    "What happens when I submit an enquiry?",
    "You will see a demo confirmation in your browser. No information is sent or stored, and no consultation is booked. Please use sample details when trying the form.",
  ],
];
export function FAQ({ locale }: { locale: Locale }) {
  const t = translator(locale);
  return (
    <section className="section shell faq-section">
      <div>
        <Eyebrow>{t("A LITTLE CLARITY")}</Eyebrow>
        <h2>
          {t("Good questions.")}
          <br />
          <em>{t("Thoughtful answers.")}</em>
        </h2>
        <p className="muted">
          {t("A few things you might be wondering")}
          <br />
          {t("before we begin.")}
        </p>
        <Link className="text-link" href={localizedHref("/contact", locale)}>
          {t("Have another question?")} <ArrowUpRight size={17} />
        </Link>
      </div>
      <div className="faq-list">
        {faqs.map(([q, a]) => (
          <details key={t(q)}>
            <summary>
              {t(q)}
              <Plus size={18} />
            </summary>
            <p>{t(a)}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
export function CTA({ locale }: { locale: Locale }) {
  const t = translator(locale);
  return (
    <section className="cta-section">
      <div className="shell cta-inner">
        <div>
          <Eyebrow>{t("THE NEXT CHAPTER STARTS HERE")}</Eyebrow>
          <h2>
            {t("There’s a better way")}
            <br />
            {t("to feel")} <em>{t("at home.")}</em>
          </h2>
        </div>
        <div>
          <p>
            {t("Tell us what you have in mind.")}
            <br />
            {t("We’ll help you see what’s possible.")}
          </p>
          <Link
            className="button button-cream"
            href={localizedHref("/contact", locale)}
          >
            {t("Let’s start a conversation")} <ArrowUpRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}
export function Footer({ locale }: { locale: Locale }) {
  const t = translator(locale);
  return (
    <footer>
      <div className="shell footer-top">
        <Link className="brand footer-brand" href={localizedHref("/", locale)}>
          form <i>&</i> field<span className="sr-only"> {t("home")}</span>
        </Link>
        <p>{t("Considered spaces. Lasting possibilities.")}</p>
        <nav aria-label={t("Footer navigation")}>
          <Link href={localizedHref("/services", locale)}>{t("Services")}</Link>
          <Link href={localizedHref("/about", locale)}>{t("About")}</Link>
          <Link href={localizedHref("/contact", locale)}>
            {t("Contact")} <ArrowRight size={13} />
          </Link>
        </nav>
      </div>
      <div className="shell footer-bottom">
        <span>
          © {new Date().getFullYear()}{" "}
          {t("Form & Field. A fictional renovation studio.")}
        </span>
        <span>{t("Portfolio demo · No real enquiries are sent.")}</span>
      </div>
    </footer>
  );
}
