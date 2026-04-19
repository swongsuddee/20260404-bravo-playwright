import test, { expect, Page } from "@playwright/test";

//#region Toggele Operations
test("Click toggle switch", async ({ page }) => {
  // Setup
  await page.goto(
    "/playwright-playground/sessions/session-2-basic-operations#2-7"
  );

  // Actions
  await page.getByTestId("toggle").click();

  // Assertion
  const isChecked = await page.getByTestId("toggle").getAttribute("aria-checked");
  expect(isChecked).toBe("true");

  await expect(page.getByTestId("toggle-label")).toHaveText("ON");
});

test("Toggle switch operations", async ({ page }) => {
  // Setup
  await page.goto(
    "/playwright-playground/sessions/session-2-basic-operations#2-7"
  );

  // Actions - Check
  await page.getByTestId("toggle").check();

  // Assertion
  const isChecked = await page.getByTestId("toggle").getAttribute("aria-checked");
  expect(isChecked).toBe("true");

  await expect(page.getByTestId("toggle-label")).toHaveText("ON");
});

test("Untoggle switch operations", async ({ page }) => {
  // Setup
  await page.goto(
    "/playwright-playground/sessions/session-2-basic-operations#2-7"
  );

  // Actions - Uncheck
  await page.getByTestId("toggle").uncheck();

  // Assertion
  const isChecked = await page.getByTestId("toggle").getAttribute("aria-checked");
  expect(isChecked).toBe("false");

  await expect(page.getByTestId("toggle-label")).toHaveText("OFF");
});
