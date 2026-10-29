import { test, expect } from "@playwright/test";

test("language changes and browser history do not produce transition timeouts", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (error) =>
    errors.push(`${error.name}: ${error.message}`),
  );
  await page.goto("/de/contact?service=kitchen");
  for (const locale of ["nl", "tr", "en", "de"]) {
    await page.locator("#language-toggle").click();
    await page.locator(`.language-option[data-locale="${locale}"]`).click();
    await expect(page).toHaveURL(
      `${locale === "en" ? "" : "/" + locale}/contact?service=kitchen`,
    );
    await expect(page.locator("#service")).toHaveValue("kitchen");
  }
  await page.goBack();
  await expect(page).toHaveURL("/contact?service=kitchen");
  await page.goForward();
  await expect(page).toHaveURL("/de/contact?service=kitchen");
  const historyLength = await page.evaluate(() => history.length);
  await page.locator("#language-toggle").click();
  await page.locator('.language-option[data-locale="de"]').click();
  expect(await page.evaluate(() => history.length)).toBe(historyLength);
  // The reported browser error appears only after the native DOM-update timeout.
  await page.waitForTimeout(5500);
  await expect(page.locator("#language-toggle")).toBeEnabled();
  expect(errors).toEqual([]);
});

test("a slow language response leaves the current page usable", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (error) =>
    errors.push(`${error.name}: ${error.message}`),
  );
  let delayed = false;
  await page.route(
    (url) => url.pathname === "/nl/contact",
    async (route) => {
      if (route.request().headers()["rsc"] === "1") {
        delayed = true;
        await new Promise((resolve) => setTimeout(resolve, 4500));
      }
      await route.continue();
    },
  );
  await page.goto("/de/contact?service=kitchen");
  await page.locator("#language-toggle").click();
  await page.locator('.language-option[data-locale="nl"]').click();
  await expect(page.locator("#language-toggle")).toHaveAttribute(
    "aria-expanded",
    "false",
  );
  await page.locator("#name").fill("Still responsive");
  await expect(page.locator("#name")).toHaveValue("Still responsive");
  await expect(page).toHaveURL("/nl/contact?service=kitchen", {
    timeout: 15000,
  });
  expect(delayed).toBeTruthy();
  await expect(page.locator("#service")).toHaveValue("kitchen");
  expect(errors).toEqual([]);
});
