import { translator, resolveLocale, type PageParams } from "@/lib/i18n";
import { ContactForm } from "@/components/contact-form";
import { Eyebrow } from "@/components/shared";
import { pageMetadata } from "@/lib/site";
import { ArrowDownRight } from "lucide-react";
export async function generateMetadata({ params }: PageParams) {
  const locale = await resolveLocale(params);
  const t = translator(locale);
  return pageMetadata(
    t("Let’s talk about your home"),
    t(
      "Try the Form & Field demo enquiry form. Share a project idea and explore a thoughtfully designed renovation consultation experience.",
    ),
    "/contact",
    locale,
  );
}
export default async function Contact({ params }: PageParams) {
  const locale = await resolveLocale(params);
  const t = translator(locale);
  return (
    <>
      <section className="shell page-intro contact-intro">
        <Eyebrow>{t("LET’S MAKE ROOM FOR POSSIBILITY")}</Eyebrow>
        <h1>
          {t("Every good home")}
          <br />
          {t("starts with")} <em>{t("a conversation.")}</em>
        </h1>
      </section>
      <section className="shell contact-layout">
        <aside>
          <h2>
            {t("A few ideas.")}
            <br />
            {t("A whole new perspective.")}
          </h2>
          <p>
            {t(
              "Whether you have a detailed plan or just the feeling that something could be better, this is a good place to start.",
            )}
          </p>
          <div className="contact-steps">
            <span>{t("WHAT WOULD HAPPEN NEXT")}</span>
            <p>
              <b>01</b> {t("A first conversation about your vision")}
            </p>
            <p>
              <b>02</b> {t("A considered look at your space")}
            </p>
            <p>
              <b>03</b> {t("A clear scope and a way forward")}
            </p>
          </div>
          <div className="demo-note">
            <ArrowDownRight size={25} />
            <h3>{t("A note about this website")}</h3>
            <p>
              {t(
                "Form & Field is a fictional studio. This form demonstrates the experience only. Please use sample details. There is no email delivery, data storage or booking.",
              )}
            </p>
          </div>
        </aside>
        <ContactForm />
      </section>
    </>
  );
}
