"use client";
import {
  translator,
  localizedHref,
  stripLocale,
  type Locale,
} from "@/lib/i18n";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { LanguageSwitcher } from "./language-switcher";
export function Header({ locale }: { locale: Locale }) {
  const t = translator(locale);
  const path = stripLocale(usePathname());
  const [open, setOpen] = useState(false);
  useEffect(() => {
    setOpen(false);
  }, [path, locale]);
  useEffect(() => {
    if (!open) return;
    const close = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        document.getElementById("menu-toggle")?.focus();
      }
    };
    document.addEventListener("keydown", close);
    return () => document.removeEventListener("keydown", close);
  }, [open]);
  return (
    <header className="site-header">
      <div className="shell header-inner">
        <Link
          href={localizedHref("/", locale)}
          className="brand"
          aria-label={t("Form and Field home")}
        >
          <span className="brand-symbol" aria-hidden="true">
            f<span>f</span>
          </span>
          <span>
            form <i>&</i> field<small>{t("HOMES, RECONSIDERED.")}</small>
          </span>
        </Link>
        <nav className="desktop-nav" aria-label={t("Main navigation")}>
          {[
            [t("Home"), "/"],
            [t("Services"), "/services"],
            [t("About"), "/about"],
            [t("Contact"), "/contact"],
          ].map(([label, href]) => (
            <Link
              key={href}
              href={localizedHref(href, locale)}
              aria-current={path === href ? "page" : undefined}
            >
              {t(label)}
            </Link>
          ))}
        </nav>
        <Link
          className="button header-cta"
          href={localizedHref("/contact", locale)}
        >
          {t("Let’s talk about your home")} <ArrowUpRight size={16} />
        </Link>
        <LanguageSwitcher onOpen={() => setOpen(false)} />
        <button
          id="menu-toggle"
          className="menu-toggle"
          aria-label={open ? t("Close menu") : t("Open menu")}
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen(!open)}
        >
          <span
            className={`menu-lines ${open ? "is-open" : ""}`}
            aria-hidden="true"
          >
            <span />
            <span />
          </span>
        </button>
      </div>
      <nav
        id="mobile-nav"
        className="mobile-nav"
        aria-label={t("Mobile navigation")}
        aria-hidden={!open}
        inert={!open}
        data-open={open}
      >
        {[
          [t("Home"), "/"],
          [t("Services"), "/services"],
          [t("About"), "/about"],
          [t("Contact"), "/contact"],
        ].map(([label, href]) => (
          <Link
            href={localizedHref(href, locale)}
            key={href}
            onClick={() => setOpen(false)}
            aria-current={path === href ? "page" : undefined}
          >
            {t(label)}
          </Link>
        ))}
      </nav>
    </header>
  );
}
