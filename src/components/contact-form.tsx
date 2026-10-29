"use client";
import { translator } from "@/lib/i18n";

import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Check } from "lucide-react";
type Values = {
  name: string;
  email: string;
  location: string;
  service: string;
  budget: string;
  message: string;
  consent: boolean;
};
type Errors = Partial<Record<keyof Values, string>>;
export function ContactForm() {
  const locale = useLocale();
  const t = translator(locale);
  const [values, setValues] = useState<Values>({
    name: "",
    email: "",
    location: "",
    service: "",
    budget: "",
    message: "",
    consent: false,
  });
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState(false);
  const success = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const s = new URLSearchParams(window.location.search).get("service");
    if (s && ["whole-home", "kitchen", "bathroom"].includes(s))
      setValues((v) => ({ ...v, service: s }));
  }, []);
  useEffect(() => {
    if (sent) success.current?.focus();
  }, [sent]);
  function update(key: keyof Values, value: string | boolean) {
    setValues((v) => ({ ...v, [key]: value }));
    setErrors((e) => ({ ...e, [key]: undefined }));
  }
  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const next: Errors = {};
    if (values.name.trim().length < 2)
      next.name = "Please enter at least 2 characters.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim()))
      next.email = "Please enter a valid email address.";
    if (!values.location.trim())
      next.location = "Please enter a city or region.";
    if (!values.service) next.service = "Please select a project type.";
    if (values.message.trim().length < 20)
      next.message = "Please share at least 20 characters about your project.";
    if (!values.consent)
      next.consent = "Please confirm you understand this is a demo.";
    setErrors(next);
    if (Object.keys(next).length) {
      requestAnimationFrame(() =>
        document.getElementById(Object.keys(next)[0])?.focus(),
      );
      return;
    }
    setSent(true);
  }
  const props = (key: keyof Values) => ({
    id: key,
    name: key,
    "aria-invalid": !!errors[key],
    "aria-describedby": errors[key] ? `${key}-error` : undefined,
  });
  const error = (key: keyof Values) =>
    errors[key] ? (
      <span className="field-error" id={`${key}-error`}>
        {t(errors[key]!)}
      </span>
    ) : null;
  if (sent)
    return (
      <div className="form-success" tabIndex={-1} ref={success} role="status">
        <span className="success-icon">
          <Check size={30} />
        </span>
        <p className="eyebrow">{t("DEMO COMPLETE")}</p>
        <h2>{t("A good beginning.")}</h2>
        <p>
          {t(
            "Thanks for trying the Form & Field enquiry experience. Your demo submission was successful.",
          )}
        </p>
        <p className="muted">
          {t(
            "Nothing was sent or stored. No appointment has been booked and no one will contact you.",
          )}
        </p>
        <button
          className="button"
          onClick={() => {
            setSent(false);
            setValues({
              name: "",
              email: "",
              location: "",
              service: "",
              budget: "",
              message: "",
              consent: false,
            });
          }}
        >
          {t("Try another enquiry")} <ArrowUpRight size={17} />
        </button>
      </div>
    );
  return (
    <form className="contact-form" noValidate onSubmit={submit}>
      <div className="form-heading">
        <h2>{t("Tell us a little about it.")}</h2>
        <p>{t("Fields marked * are required. Sample details are welcome.")}</p>
      </div>
      <div className="form-grid">
        <div className="field">
          <label htmlFor="name">{t("Your name *")}</label>
          <input
            {...props("name")}
            autoComplete="name"
            maxLength={100}
            placeholder={t("e.g. Alex Taylor")}
            value={values.name}
            onChange={(e) => update("name", e.target.value)}
            required
          />
          {error("name")}
        </div>
        <div className="field">
          <label htmlFor="email">{t("Email address *")}</label>
          <input
            {...props("email")}
            type="email"
            autoComplete="email"
            maxLength={254}
            placeholder="alex@example.com"
            value={values.email}
            onChange={(e) => update("email", e.target.value)}
            required
          />
          {error("email")}
        </div>
        <div className="field">
          <label htmlFor="location">{t("Project location *")}</label>
          <input
            {...props("location")}
            autoComplete="address-level2"
            maxLength={120}
            placeholder={t("City or region")}
            value={values.location}
            onChange={(e) => update("location", e.target.value)}
            required
          />
          {error("location")}
        </div>
        <div className="field">
          <label htmlFor="service">{t("What are you planning? *")}</label>
          <select
            {...props("service")}
            value={values.service}
            onChange={(e) => update("service", e.target.value)}
            required
          >
            <option value="">{t("Select a project type")}</option>
            <option value="whole-home">{t("Whole-home renovation")}</option>
            <option value="kitchen">{t("Kitchen & living spaces")}</option>
            <option value="bathroom">{t("Bathroom & retreat")}</option>
            <option value="unsure">{t("I’m still exploring")}</option>
          </select>
          {error("service")}
        </div>
        <div className="field full">
          <label htmlFor="budget">
            {t("Indicative investment")} <span>{t("(optional)")}</span>
          </label>
          <select
            {...props("budget")}
            value={values.budget}
            onChange={(e) => update("budget", e.target.value)}
          >
            <option value="">{t("Select a range")}</option>
            <option value="under-30">{t("Under €30,000")}</option>
            <option value="30-75">{t("€30,000–€75,000")}</option>
            <option value="75-150">{t("€75,000–€150,000")}</option>
            <option value="150-plus">{t("€150,000+")}</option>
            <option value="guidance">{t("I’d appreciate guidance")}</option>
          </select>
        </div>
        <div className="field full">
          <label htmlFor="message">{t("Your vision *")}</label>
          <textarea
            {...props("message")}
            rows={5}
            minLength={20}
            maxLength={3000}
            placeholder={t(
              "Tell us about your space, what you would like to change, and any timing you have in mind…",
            )}
            value={values.message}
            onChange={(e) => update("message", e.target.value)}
            required
          />
          {error("message")}
        </div>
      </div>
      <div className="consent">
        <input
          {...props("consent")}
          type="checkbox"
          checked={values.consent}
          onChange={(e) => update("consent", e.target.checked)}
          required
        />
        <label htmlFor="consent">
          {t(
            "I understand this is a portfolio demo. My details will not be sent or stored, and no one will contact me. *",
          )}
        </label>
      </div>
      {error("consent")}
      <button className="button submit-button" type="submit">
        {t("Send demo enquiry")} <ArrowUpRight size={18} />
      </button>
      <p className="form-note">
        {t(
          "A little inspiration starts with a conversation. This one is a demo.",
        )}
      </p>
    </form>
  );
}

import { useLocale } from "@/components/locale-provider";
