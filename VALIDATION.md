# Verification

## Runtime transition timeout fix

Reproduced `TimeoutError: Transition was aborted because of timeout in DOM update` when switching from German Contact to Dutch Contact in the development server. The former transition provider could unmount during the locale change before resolving its native DOM-update callback. Replaced its links/router with Next.js navigation and removed the dependency. Main content now animates after React commits, with cleanup and reduced-motion support; no navigation waits on an animation callback.

The original development-server reproduction no longer reports a page error. Production build and TypeScript pass. New desktop/mobile regression checks monitor runtime errors across repeated language changes, back/forward history and selecting the current language, including a wait beyond the original timeout. Another check delays a language response by 4.5 seconds and verifies the current form remains usable.

## Language options

The custom language dropdown revision passes production build and TypeScript checks. The browser suite now contains 22 checks, including keyboard focus/wrapping, Escape focus restoration, outside-click dismissal, current-language marking, panel containment and coordination with mobile navigation. Desktop and mobile screenshots are in `docs/screenshots/language-picker-desktop.png` and `language-picker-mobile.png`.

English, German, Dutch and Turkish are available through the responsive header selector. Production build and TypeScript pass with 16 prerendered language/page combinations. `npm run check:translations` verifies 229 complete four-language entries and 203 static translation calls. The browser suite now contains 20 desktop/mobile checks, including translated pages and metadata, localized form errors and confirmation, language switching with query preservation, browser history, invalid locale 404 responses, sitemap language coverage and all translated pages at 320px. Visual reviews cover the three new languages. A separate text audit found no untranslated English copy on the translated pages.

## Visual and motion revision

The redesigned split hero, staggered service imagery, Manrope typography and native page transitions passed production build, TypeScript and all eight existing desktop/mobile browser tests. An additional browser check confirmed that an internal navigation invokes the native View Transition API, all four pages fit widths of 320, 375, 768, 1024 and 1440 px without horizontal overflow, and reduced-motion disables hero animation. Desktop/mobile screenshots were visually reviewed. No active navigation dot remains.

Verified locally on 29 October 2026 using Node.js 24.22.1, Next.js 16.4.3, TypeScript 5.9.3 and Google Chrome on Windows.

- `npm run build`: passed. All four pages and metadata routes prerender successfully.
- `npm run typecheck`: passed with no TypeScript errors.
- `npm run test:e2e`: eight browser tests passed across desktop and mobile Chrome viewports.
- Installed dependency audit: zero known vulnerabilities reported by npm at installation time.
- Sitemap, robots and generated Open Graph image return HTTP 200 with the expected XML, text and PNG content types.
- Visual review: desktop Home, mobile Home, mobile Contact and the before/after comparison. Screenshots are in `docs/screenshots/`.

Browser coverage includes each page's title, primary heading, successful image decoding, horizontal overflow, responsive navigation, keyboard slider changes, project tab selection and keyboard navigation, FAQ expansion, service preselection, empty and malformed form validation, successful demo confirmation, absence of submission POST requests and resetting the form.

The first production build caught a missing flex display declaration in the generated Open Graph artwork; corrected and rebuilt successfully. The first browser attempt encountered another project already serving on port 3000; the suite now uses isolated port 3107. A direct-child test runner handles production-server cleanup on Windows.

The site is a local deliverable, not a hosted deployment. Figma tools were unavailable, so `DESIGN.md` provides the implementation's design handoff; no Figma file was created. Automated checks and visual review do not certify every browser or replace a comprehensive manual accessibility audit. Demo metadata intentionally prevents indexing until the project is adapted for a real business.
