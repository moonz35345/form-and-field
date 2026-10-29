"use client";
import { translator } from "@/lib/i18n";

import Image from "next/image";
import { useState } from "react";
import { ArrowUpRight, MoveHorizontal } from "lucide-react";
const projects = [
  {
    name: "The light-filled townhouse",
    place: "AMSTERDAM, NL",
    type: "Whole-home renovation",
    image: "/images/hero.jpg",
    before: "/images/before.jpg",
    text: "A softer palette, a more open plan, and room to slow down. An imagined transformation of a city townhouse.",
  },
  {
    name: "A place to gather",
    place: "COPENHAGEN, DK",
    type: "Kitchen & living",
    image: "/images/kitchen.jpg",
    before: "/images/before.jpg",
    text: "Natural materials and purposeful storage bring warmth to an illustrative Scandinavian kitchen concept.",
  },
  {
    name: "The quiet retreat",
    place: "ANTWERP, BE",
    type: "Bathroom renovation",
    image: "/images/bathroom.jpg",
    before: "/images/before.jpg",
    text: "A calm, tactile sanctuary inspired by boutique European interiors. A conceptual bathroom renovation.",
  },
];
export function ProjectGallery() {
  const locale = useLocale();
  const t = translator(locale);
  const [active, setActive] = useState(0);
  const [position, setPosition] = useState(52);
  const project = projects[active];
  return (
    <div className="project-gallery">
      <div
        className="project-tabs"
        role="tablist"
        aria-label={t("Sample projects")}
      >
        {projects.map((p, i) => (
          <button
            key={t(p.name)}
            id={`project-tab-${i}`}
            role="tab"
            aria-selected={active === i}
            aria-controls="project-panel"
            tabIndex={active === i ? 0 : -1}
            onClick={() => {
              setActive(i);
              setPosition(52);
            }}
            onKeyDown={(e) => {
              if (["ArrowRight", "ArrowLeft", "Home", "End"].includes(e.key)) {
                e.preventDefault();
                const n =
                  e.key === "Home"
                    ? 0
                    : e.key === "End"
                      ? 2
                      : (active + (e.key === "ArrowRight" ? 1 : 2)) % 3;
                setActive(n);
                setPosition(52);
                document.getElementById(`project-tab-${n}`)?.focus();
              }
            }}
          >
            {String(i + 1).padStart(2, "0")}
            <span>{t(p.name)}</span>
          </button>
        ))}
      </div>
      <div
        id="project-panel"
        role="tabpanel"
        aria-labelledby={`project-tab-${active}`}
        tabIndex={0}
      >
        <div className="comparison">
          <Image
            src={project.image}
            alt={`${t(project.name)}: ${t("illustrative finished interior")}`}
            fill
            sizes="(max-width: 800px) 100vw, 85vw"
          />
          <div
            className="before-image"
            style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
          >
            <Image
              src={project.before}
              alt={t(
                "Illustrative unfinished interior; stock photo, not the same property",
              )}
              fill
              sizes="(max-width: 800px) 100vw, 85vw"
            />
          </div>
          <span className="comparison-label label-before">
            {t("BEFORE · CONCEPT")}
          </span>
          <span className="comparison-label label-after">
            {t("AFTER · CONCEPT")}
          </span>
          <div className="slider-line" style={{ left: `${position}%` }}>
            <span>
              <MoveHorizontal size={21} />
            </span>
          </div>
          <input
            aria-label={t("Before and after comparison")}
            aria-valuetext={`${position}% ${t("before concept")}, ${100 - position}% ${t("after concept")}`}
            type="range"
            min="0"
            max="100"
            value={position}
            onChange={(e) => setPosition(Number(e.target.value))}
          />
        </div>
        <div className="project-caption">
          <div>
            <span className="eyebrow">
              {project.place} <span className="separator">/</span>{" "}
              {t(project.type)}
            </span>
            <h3>{t(project.name)}</h3>
          </div>
          <p>{t(project.text)}</p>
          <ArrowUpRight size={28} aria-hidden="true" />
        </div>
      </div>
      <p className="gallery-disclaimer">
        {t(
          "Illustrative concept projects. Stock images show design inspiration, not actual renovations of the same property. Drag the divider or use the arrow keys.",
        )}
      </p>
    </div>
  );
}

import { useLocale } from "@/components/locale-provider";
