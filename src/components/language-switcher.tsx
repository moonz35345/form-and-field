"use client";
import {
  localeNames,
  locales,
  localizedHref,
  stripLocale,
  translator,
  type Locale,
} from "@/lib/i18n";

import { usePathname, useRouter } from "next/navigation";
import { Globe2, ChevronDown, Check } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";

import { useLocale } from "./locale-provider";
export function LanguageSwitcher({ onOpen }: { onOpen?: () => void }) {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const t = translator(locale);
  const [open, setOpen] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const menu = useRef<HTMLDivElement>(null);
  const initialFocus = useRef(0);
  const menuId = useId();
  const labelId = useId();
  function focusItem(index: number) {
    menu.current
      ?.querySelectorAll<HTMLButtonElement>('[role="menuitemradio"]')
      [index]?.focus();
  }
  function show(index = locales.indexOf(locale)) {
    initialFocus.current = index;
    onOpen?.();
    setOpen(true);
  }
  function close(restoreFocus = false) {
    setOpen(false);
    if (restoreFocus) trigger.current?.focus();
  }
  useEffect(() => {
    setOpen(false);
  }, [pathname, locale]);
  useEffect(() => {
    if (!open) return;
    // Let the opening styles become visible before moving keyboard focus.
    let focusFrame = 0;
    const frame = requestAnimationFrame(() => {
      focusFrame = requestAnimationFrame(() => focusItem(initialFocus.current));
    });
    const outside = (event: PointerEvent) => {
      if (!root.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", outside);
    return () => {
      cancelAnimationFrame(frame);
      cancelAnimationFrame(focusFrame);
      document.removeEventListener("pointerdown", outside);
    };
  }, [open]);
  function changeLanguage(next: Locale) {
    close(true);
    if (next === locale) return;
    const target = localizedHref(stripLocale(pathname), next);
    router.push(target + window.location.search + window.location.hash);
  }
  return (
    <div
      className="language-switcher"
      ref={root}
      data-open={open}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null))
          setOpen(false);
      }}
      onKeyDown={(event) => {
        if (event.key === "Escape") {
          event.preventDefault();
          event.stopPropagation();
          close(true);
        }
      }}
    >
      <button
        ref={trigger}
        type="button"
        id="language-toggle"
        className="language-trigger"
        aria-label={`${t("Choose language")}: ${localeNames[locale]}`}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={menuId}
        onClick={() => (open ? close() : show())}
        onKeyDown={(event) => {
          if (event.key === "ArrowDown" || event.key === "ArrowUp") {
            event.preventDefault();
            show(event.key === "ArrowUp" ? locales.length - 1 : 0);
          }
        }}
      >
        <Globe2 size={16} strokeWidth={1.5} aria-hidden="true" />
        <span className="language-current">{locale.toUpperCase()}</span>
        <ChevronDown
          className="language-chevron"
          size={12}
          aria-hidden="true"
        />
      </button>
      <div
        id={menuId}
        className="language-panel"
        data-open={open}
        aria-hidden={!open}
        inert={!open}
      >
        <p className="language-panel-heading" id={labelId}>
          {t("Choose language")}
        </p>
        <div
          role="menu"
          ref={menu}
          aria-labelledby={labelId}
          onKeyDown={(event) => {
            const items = Array.from(
              menu.current?.querySelectorAll<HTMLButtonElement>(
                '[role="menuitemradio"]',
              ) ?? [],
            );
            const index = items.indexOf(
              document.activeElement as HTMLButtonElement,
            );
            if (["ArrowDown", "ArrowUp", "Home", "End"].includes(event.key)) {
              event.preventDefault();
              focusItem(
                event.key === "Home"
                  ? 0
                  : event.key === "End"
                    ? items.length - 1
                    : (index +
                        (event.key === "ArrowDown" ? 1 : items.length - 1)) %
                      items.length,
              );
            } else if (
              event.key.length === 1 &&
              !event.ctrlKey &&
              !event.metaKey &&
              !event.altKey
            ) {
              const next = locales.findIndex((code) =>
                localeNames[code]
                  .toLocaleLowerCase()
                  .startsWith(event.key.toLocaleLowerCase()),
              );
              if (next >= 0) {
                event.preventDefault();
                focusItem(next);
              }
            }
          }}
        >
          {locales.map((code) => (
            <button
              key={code}
              type="button"
              role="menuitemradio"
              aria-checked={locale === code}
              tabIndex={-1}
              className="language-option"
              data-locale={code}
              onClick={() => changeLanguage(code)}
            >
              <span className="language-option-code" aria-hidden="true">
                {code.toUpperCase()}
              </span>
              <span lang={code}>{localeNames[code]}</span>
              {locale === code && (
                <Check size={15} strokeWidth={1.7} aria-hidden="true" />
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
