# Form & Field — design handoff

## Current visual revision

The header includes a compact globe-and-language-code button and a custom dropdown in warm ivory with a fine border, soft shadow and small radius. Options show a language code, native language name and a check mark for the current language. The panel uses a 350 ms eased entrance; reduced-motion preferences disable the animation. Arrow keys, Home/End, first-letter navigation and Escape are supported. Clicking outside closes the panel; Escape returns focus to the button. Opening the language panel closes the mobile navigation. Localised text is server-rendered, with responsive type adjustments for longer German headlines and narrow screens. Language changes retain the current page and use its existing transition.

The current UI uses an architectural split hero: an oversized Manrope heading on a warm stone field, an italic serif accent and a separate interior photograph with a floating concept caption. Manrope is hosted locally and used throughout body text, navigation and primary headings. The serif wordmark and heading accents provide contrast. Service images form a staggered composition; the process section is deep forest and the closing CTA is warm stone.

Desktop navigation uses a fine underline, with no active dot. Section eyebrows use short rules. The mobile menu overlays content with a 500 ms eased entrance, staggered links and an animated two-line toggle. Internal links and language changes use Next.js navigation. After content commits, a 560 ms eased opacity/position animation introduces the main content while the header remains anchored. Navigation does not wait for an animation promise. Below-the-fold sections reveal once on intersection. Reduced-motion preferences disable these animations.

Current review screenshots: `docs/screenshots/redesign-desktop.png`, `redesign-mobile.png`, `redesign-menu.png` and `redesign-services.png`. Earlier screenshots document the initial design.

## Direction

A quiet, architectural renovation brand: warm ivory, deep forest, natural materials and generously spaced editorial typography. Original wordmark paired with a simple interlocking f/f emblem. Inspired at a high level by presentation-led work on Godly.design; not a reproduction of a specific studio.

## Figma reconstruction brief

No Figma file was created because Figma tools were unavailable. This document is a handoff specification, not a substitute link to a claimed design artefact. Build frames at 1440 px desktop and 390 px mobile, using Auto Layout, and extract components from the implemented site. The source code is the visual reference.

Tokens: forest `#243c32`, ivory `#f7f5ef`, body ink `#25372e`, muted `#666b62`, border `#dcded4`, pale section `#eeeee6`. Serif headings use Georgia, italic for emphasis; body uses Arial/Helvetica. Main headings scale from 47–96 px, section headings 36–53 px, body 12–15 px, tracked eyebrow labels 8–10 px. Heading letter spacing -1.3 to -2.3 px. Controls have square corners; circular elements are reserved for small image arrows and the comparison handle.

Desktop container: maximum 1280 px, 56 px side gutters. Mobile: 20 px gutters. Sections: 96 px desktop, 58 px mobile. Header: 94 px desktop, 76 px mobile, sticky, with current-page indicators. Columns collapse at 800/640 px. Navigation becomes an expandable menu below 640 px with Escape support.

Components: wordmark, primary/cream button, underlined link, eyebrow, service image card, section heading, three-tab project selector, before/after slider, four-step process, native accordion row, CTA band, footer, labelled field/error, consent control and confirmation panel.

Home narrative: atmospheric hero → principles → philosophy → service cards → concepts → process → FAQ → CTA. Services alternates image/copy across three detailed scopes. About balances a full-width image, philosophy and three principles. Contact pairs an explanatory sidebar with a deliberately quieter form surface.

Images crop with object-fit: cover. Hero includes a dark gradient to keep white content legible. No custom animation is essential to comprehension; reduced-motion removes decorative transitions and smooth scrolling. Validate a real Figma reconstruction against the browser at 390, 768, 1024 and 1440 px.
