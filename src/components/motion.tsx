"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export function Motion() {
  const pathname = usePathname();
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // Animate only committed content. Navigation never waits for an animation
    // promise or a provider that can unmount when the language changes.
    const main = document.getElementById("main");
    const arrival = main?.animate?.(
      [
        { opacity: 0.35, transform: "translateY(12px)" },
        { opacity: 1, transform: "translateY(0)" },
      ],
      { duration: 560, easing: "cubic-bezier(0.22, 1, 0.36, 1)" },
    );
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.06, rootMargin: "0px 0px -30px 0px" },
    );
    document
      .querySelectorAll(
        "main .section, .service-detail, .about-banner, .contact-layout",
      )
      .forEach((element) => {
        // Keep above-the-fold content visible while the page arrives.
        if (element.getBoundingClientRect().top < window.innerHeight) return;
        element.classList.add("reveal-section");
        observer.observe(element);
      });
    return () => {
      observer.disconnect();
      arrival?.cancel();
    };
  }, [pathname]);
  return null;
}
