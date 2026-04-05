import test, { expect } from "@playwright/test";

//#region Checkbox & Radio Button Operations
test("Checkbox operations", async ({ page }) => {
  // Setup
  await page.goto(
    "/playwright-playground/sessions/session-2-basic-operations#2-5"
  );

  // Actions
  await page.getByTestId("checkbox-meal").check();
  await page.getByTestId("checkbox-meal").click(); // <-- click
  await page.getByTestId("checkbox-meal").check();

  // Assertion
  await expect(page.getByTestId("checkbox-meal")).toBeChecked();
  await expect(page.getByTestId("value-meal")).toHaveText("true");

  // Uncheck
  await page.getByTestId("checkbox-meal").uncheck();
  await page.getByTestId("checkbox-meal").uncheck();

  // Assertion
  await expect(page.getByTestId("checkbox-meal")).not.toBeChecked();
  await expect(page.getByTestId("value-meal")).toHaveText("false");
});

test("Radio button operations", async ({ page }) => {
  // Setup
  await page.goto(
    "/playwright-playground/sessions/session-2-basic-operations#2-5"
  );

  // Assertion - Initial state
  await expect(page.getByTestId("radio-card")).toBeChecked();
  await expect(page.getByTestId("radio-cash")).not.toBeChecked();
  await expect(page.getByTestId("value-payment")).toHaveText("card");

  // Actions
  await page.getByTestId("radio-cash").check();

  // Assertion
  await expect(page.getByTestId("radio-card")).not.toBeChecked();
  await expect(page.getByTestId("radio-cash")).toBeChecked();
  await expect(page.getByTestId("value-payment")).toHaveText("cash");
});

test("Try to uncheck radio button", async ({ page }) => {
  test.skip(true, "Radio button cannot be unchecked directly");

  // Setup
  await page.goto(
    "/playwright-playground/sessions/session-2-basic-operations#2-5"
  );

  // Actions
  // Radio button cannot be unchecked directly
  await page.getByTestId("radio-card").uncheck();

  // Error: locator.uncheck: Cannot uncheck radio button. Radio buttons can only be unchecked by selecting another radio button in the same group.
});
//#endregion


// function check() {
//   // check current status
//   // if current == checked
//   //  no nothing
//   // else
//   //  click
// }