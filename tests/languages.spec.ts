import { test, expect } from "@playwright/test";

const languages = [
  {
    locale: "de",
    headline: "Räume für",
    service: "Renovierungsleistungen",
    about: "Ein durchdachter Ansatz",
    contact: "Sprechen wir über Ihr Zuhause",
    error: "Bitte geben Sie mindestens 2 Zeichen ein.",
    submit: "Demo-Anfrage absenden",
    confirmation: "Es wurde nichts versendet oder gespeichert.",
  },
  {
    locale: "nl",
    headline: "Ruimte om",
    service: "Renovatiediensten",
    about: "Een doordachte aanpak",
    contact: "Vertel ons over uw woning",
    error: "Vul minimaal 2 tekens in.",
    submit: "Demo-aanvraag versturen",
    confirmation: "Er is niets verstuurd of opgeslagen.",
  },
  {
    locale: "tr",
    headline: "Daha iyi",
    service: "Yenileme hizmetleri",
    about: "Özenli bir yaklaşım",
    contact: "Evinizi konuşalım",
    error: "Lütfen en az 2 karakter girin.",
    submit: "Demo talebi gönder",
    confirmation: "Hiçbir bilgi gönderilmedi veya kaydedilmedi.",
  },
];
test("translated copy fits a narrow 320px viewport", async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 900 });
  for (const locale of ["de", "nl", "tr"])
    for (const path of ["", "/services", "/about", "/contact"]) {
      await page.goto(`/${locale}${path}`);
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
        `${locale}${path} must fit at 320px`,
      ).toBeTruthy();
    }
});
for (const language of languages) {
  test(`${language.locale}: translated pages, metadata, navigation and form`, async ({
    page,
    request,
    isMobile,
  }) => {
    const { locale } = language;
    for (const [path, title] of [
      ["", null],
      ["/services", language.service],
      ["/about", language.about],
      ["/contact", language.contact],
    ] as const) {
      const response = await request.get(`/${locale}${path}`);
      expect(response.ok()).toBeTruthy();
      const html = await response.text();
      expect(html).toContain(`lang="${locale}"`);
      expect(html).toContain('hrefLang="de"');
      await page.goto(`/${locale}${path}`);
      if (title) await expect(page).toHaveTitle(new RegExp(title));
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
      ).toBeTruthy();
    }
    await page.goto(`/${locale}`);
    await expect(page.locator("h1")).toContainText(language.headline);
    await expect(page.locator(".language-current")).toHaveText(
      locale.toUpperCase(),
    );
    if (isMobile) {
      await page.locator("#menu-toggle").click();
      await page.locator(`#mobile-nav a[href='/${locale}/contact']`).click();
    } else
      await page.locator(`.desktop-nav a[href='/${locale}/contact']`).click();
    await expect(page).toHaveURL(`/${locale}/contact`);
    await page.getByRole("button", { name: language.submit }).click();
    await expect(page.getByText(language.error, { exact: true })).toBeVisible();
    await page.locator("#name").fill("Demo Person");
    await page.locator("#email").fill("demo@example.com");
    await page.locator("#location").fill("Amsterdam");
    await page.locator("#service").selectOption("kitchen");
    await page
      .locator("#message")
      .fill(
        "Demo project: a new kitchen with practical storage and natural materials.",
      );
    await page.locator("#consent").check();
    await page.getByRole("button", { name: language.submit }).click();
    await expect(page.getByRole("status")).toContainText(language.confirmation);
  });
}
test("language switching keeps the page and project query, and supports browser back", async ({
  page,
}) => {
  await page.goto("/contact?service=kitchen");
  for (const locale of ["de", "nl", "tr", "en"]) {
    await page.locator("#language-toggle").click();
    await page.locator(`.language-option[data-locale="${locale}"]`).click();
    await expect(page).toHaveURL(
      `${locale === "en" ? "" : "/" + locale}/contact?service=kitchen`,
    );
    await expect(page.locator("#service")).toHaveValue("kitchen");
    await expect(page.locator("html")).toHaveAttribute(
      "lang",
      locale === "en" ? "en-GB" : locale,
    );
  }
  await page.goBack();
  await expect(page).toHaveURL("/tr/contact?service=kitchen");
  await expect(page.locator(".language-current")).toHaveText("TR");
});
test("language dropdown supports keyboard focus, dismissal and the mobile menu", async ({
  page,
  isMobile,
}) => {
  await page.goto("/de");
  const trigger = page.locator("#language-toggle");
  await trigger.focus();
  await trigger.press("ArrowDown");
  await expect(
    page.getByRole("menuitemradio", { name: "English", exact: true }),
  ).toBeFocused();
  await page.keyboard.press("End");
  await expect(
    page.getByRole("menuitemradio", { name: "Türkçe", exact: true }),
  ).toBeFocused();
  await page.keyboard.press("Home");
  await page.keyboard.press("ArrowUp");
  await expect(
    page.getByRole("menuitemradio", { name: "Türkçe", exact: true }),
  ).toBeFocused();
  await page.keyboard.press("Escape");
  await expect(trigger).toBeFocused();
  await expect(trigger).toHaveAttribute("aria-expanded", "false");
  await trigger.click();
  await expect(
    page.getByRole("menuitemradio", { name: "Deutsch", exact: true }),
  ).toHaveAttribute("aria-checked", "true");
  // Use an uncovered point; the mobile panel deliberately overlays the heading.
  await page.mouse.click(10, 450);
  await expect(trigger).toHaveAttribute("aria-expanded", "false");
  if (isMobile) {
    await page.locator("#menu-toggle").click();
    await expect(page.locator("#menu-toggle")).toHaveAttribute(
      "aria-expanded",
      "true",
    );
  }
  await trigger.click();
  if (isMobile)
    await expect(page.locator("#menu-toggle")).toHaveAttribute(
      "aria-expanded",
      "false",
    );
  expect(
    await page.locator(".language-panel").evaluate((el) => {
      const r = el.getBoundingClientRect();
      return r.left >= 0 && r.right <= innerWidth;
    }),
  ).toBeTruthy();
  await page
    .getByRole("menuitemradio", { name: "Nederlands", exact: true })
    .click();
  await expect(page).toHaveURL("/nl");
  await expect(trigger).toHaveAttribute("aria-expanded", "false");
});
test("unsupported locales return 404 and the sitemap includes every language", async ({
  request,
}) => {
  expect((await request.get("/fr")).status()).toBe(404);
  const xml = await (await request.get("/sitemap.xml")).text();
  for (const locale of ["de", "nl", "tr"])
    for (const path of ["", "/services", "/about", "/contact"])
      expect(xml).toContain(`/${locale}${path}</loc>`);
});
