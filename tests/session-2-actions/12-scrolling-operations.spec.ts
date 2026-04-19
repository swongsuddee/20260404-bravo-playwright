import test, { expect } from "@playwright/test";

//#region Scrolling Operations
test("Scroll to element", async ({ page }) => {
  // Setup
  await page.goto(
    "/playwright-playground/sessions/session-2-basic-operations#2-10"
  );

  // Actions
  const targetElement1 = page.getByTestId("item-9");
  await targetElement1.scrollIntoViewIfNeeded();

  const targetElement2 = page.getByTestId("item-19");
  await targetElement2.scrollIntoViewIfNeeded();

  // Assertion
  await expect(targetElement2).toBeVisible();
});

test("Scroll by specific times", async ({ page }) => {
  // Setup
  await page.goto(
    "/playwright-playground/sessions/session-2-basic-operations#2-10"
  );

  // Actions - Scroll down 3 times
  let scrolls = 3;
  do {
    const items = await page.locator("css=div[data-testid^='item-']").all();
    const lastItem = items[items.length - 1];
    await lastItem.scrollIntoViewIfNeeded();
    await page.waitForTimeout(5000);
  } while (--scrolls);

  // Assertion
  const targetElement = page.getByTestId("item-29");
  await expect(targetElement).toBeVisible();
});

test("Scroll by press PageDown key", async ({ page }) => {
  // Setup
  await page.goto(
    "/playwright-playground/sessions/session-2-basic-operations#2-10"
  );

  // Actions - Scroll down 3 times
  let scrolls = 3;
  do {
    await page.keyboard.press("PageDown");
    await page.waitForTimeout(5000);
  } while (--scrolls);

  // Assertion
  const targetElement = page.getByTestId("item-29");
  await expect(targetElement).toBeVisible();
});

test("Scroll to buttom and top of the page", async ({ page }) => {
  // Setup
  await page.goto(
    "/playwright-playground/sessions/session-2-basic-operations#2-10"
  );

  // Scroll to bottom first
  await page.evaluate(() => {
    window.scrollTo(0, document.body.scrollHeight);
  });
  await page.waitForTimeout(5000);

  await page.evaluate(() => {
    window.scrollTo(0, document.body.scrollHeight);
  });
  await page.waitForTimeout(5000);

  // Actions - Scroll to top
  await page.evaluate(() => {
    window.scrollTo(0, 0);
  });

  // Assertion
  const headerElement = page.getByTestId("rendered-count");
  await expect(headerElement).toBeVisible();
});
//#endregion
