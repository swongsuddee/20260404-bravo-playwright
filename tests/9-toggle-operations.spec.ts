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

/**
 * Toggle switch helper function
 * @param action "on" | "off"
 * @param page Playwright Page object
 * @returns
 */
async function toggleSwitch(action: "on" | "off", page: Page): Promise<void> {
  const isChecked = await page.getByTestId("toggle").getAttribute("aria-checked");
  if (action === "on" && isChecked === "false") {
    await page.getByTestId("toggle").check();
  } else if (action === "off" && isChecked === "true") {
    await page.getByTestId("toggle").uncheck();
  }
  return;
}

test("Toggel on", async ({ page }) => {
  // Setup
  await page.goto(
    "/playwright-playground/sessions/session-2-basic-operations#2-7"
  );

  // Actions
  await toggleSwitch("on", page);

  // Assertion
  const isChecked = await page.getByTestId("toggle").getAttribute("aria-checked");
  expect(isChecked).toBe("true");

  await expect(page.getByTestId("toggle-label")).toHaveText("ON");
});

test("Toggel off", async ({ page }) => {
  // Setup
  await page.goto(
    "/playwright-playground/sessions/session-2-basic-operations#2-7"
  );

  // Actions
  await toggleSwitch("off", page);

  // Assertion
  const isChecked = await page.getByTestId("toggle").getAttribute("aria-checked");
  expect(isChecked).toBe("false");

  await expect(page.getByTestId("toggle-label")).toHaveText("OFF");
});

//#endregion
