import { test, expect } from "@playwright/test";
test("all four pages render, with unique titles and no horizontal overflow", async ({
  page,
}) => {
  for (const [path, title] of [
    ["/", "Thoughtfully renovated"],
    ["/services", "Renovation services"],
    ["/about", "A considered approach"],
    ["/contact", "Let’s talk"],
  ]) {
    await page.goto(path);
    await expect(page).toHaveTitle(new RegExp(title));
    await expect(page.locator("h1")).toBeVisible();
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= window.innerWidth,
      ),
    ).toBeTruthy();
    for (const image of await page.locator("main img").all()) {
      await image.scrollIntoViewIfNeeded();
      await expect
        .poll(() =>
          image.evaluate(
            (el: HTMLImageElement) => el.complete && el.naturalWidth > 0,
          ),
        )
        .toBeTruthy();
    }
  }
});
test("navigation works at each viewport", async ({ page, isMobile }) => {
  await page.goto("/");
  if (isMobile) {
    await page.getByRole("button", { name: "Open menu" }).click();
    await page
      .getByRole("navigation", { name: "Mobile navigation" })
      .getByRole("link", { name: "About" })
      .click();
  } else {
    await page
      .getByRole("navigation", { name: "Main navigation" })
      .getByRole("link", { name: "About" })
      .click();
  }
  await expect(page).toHaveURL("/about");
});
test("comparison, project tabs and FAQ work using keyboard", async ({
  page,
}) => {
  await page.goto("/");
  const slider = page.getByRole("slider");
  await slider.focus();
  await slider.press("ArrowRight");
  await expect(slider).toHaveValue("53");
  await page.getByRole("tab", { name: /A place to gather/ }).click();
  await expect(page.getByRole("tabpanel")).toContainText("A place to gather");
  await page
    .getByRole("tab", { name: /A place to gather/ })
    .press("ArrowRight");
  await expect(
    page.getByRole("tab", { name: /The quiet retreat/ }),
  ).toHaveAttribute("aria-selected", "true");
  await page
    .getByText("What happens when I submit an enquiry?", { exact: true })
    .click();
  await expect(
    page.getByText("You will see a demo confirmation in your browser.", {
      exact: false,
    }),
  ).toBeVisible();
});
test("form blocks invalid data and confirms a local-only demo submission", async ({
  page,
}) => {
  await page.goto("/contact?service=kitchen");
  await expect(page.getByLabel("What are you planning?")).toHaveValue(
    "kitchen",
  );
  await page.getByRole("button", { name: "Send demo enquiry" }).click();
  await expect(
    page.getByText("Please enter at least 2 characters."),
  ).toBeVisible();
  await page.getByLabel("Your name").fill("Alex Demo");
  await page.getByLabel("Email address").fill("invalid");
  await page.getByRole("button", { name: "Send demo enquiry" }).click();
  await expect(
    page.getByText("Please enter a valid email address."),
  ).toBeVisible();
  await page.getByLabel("Email address").fill("alex@example.com");
  await page.getByLabel("Project location").fill("Amsterdam");
  await page
    .getByLabel("Your vision")
    .fill("A thoughtful kitchen renovation with better storage and lighting.");
  await page.getByLabel("I understand this is a portfolio demo.").check();
  let externalRequests = 0;
  page.on("request", (r) => {
    if (r.method() === "POST") externalRequests++;
  });
  await page.getByRole("button", { name: "Send demo enquiry" }).click();
  await expect(page.getByRole("status")).toContainText(
    "Nothing was sent or stored",
  );
  expect(externalRequests).toBe(0);
  await page.getByRole("button", { name: "Try another enquiry" }).click();
  await expect(page.getByLabel("Your name")).toHaveValue("");
});
