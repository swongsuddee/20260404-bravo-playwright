import test, { expect } from "@playwright/test";
/*
<select id="seatType" data-testid="select-seat-type" class="input">
  <option value="standard">Standard</option>   <--- index: 0, value: "standard", label: "Standard"
  <option value="vip">VIP</option>             <--- index: 1, value: "vip", label: "VIP"
  <option value="sofa">Sofa</option>           <--- index: 2, value: "sofa", label: "Sofa"
</select>
*/

//#region Select & Dropdown Operations
test("Select option from dropdown value", async ({ page }) => {
  // Setup
  await page.goto(
    "/playwright-playground/sessions/session-2-basic-operations#2-5"
  );

  // Actions
  await page.getByTestId("select-seat-type").selectOption("vip");
  // await page.getByTestId("select-seat-type").selectOption({ value: "vip"});

  // Assertion
  await expect(page.getByTestId("value-seatType")).toHaveText("vip");
});

test("Select option from dropdown index", async ({ page }) => {
  // Setup
  await page.goto(
    "/playwright-playground/sessions/session-2-basic-operations#2-5"
  );

  // Actions
  // index begin at 0
  // index           0         1      2
  // seatType = ["standard", "vip", "sofa"]
  await page.getByTestId("select-seat-type").selectOption({ index: 2 });

  // Assertion
  await expect(page.getByTestId("value-seatType")).toHaveText("sofa");
});

test("Select option from dropdown label", async ({ page }) => {
  // Setup
  await page.goto(
    "/playwright-playground/sessions/session-2-basic-operations#2-5"
  );

  // Actions
  await page.getByTestId("select-seat-type").selectOption({ label: "VIP" });

  // Assertion
  await expect(page.getByTestId("value-seatType")).toHaveText("vip");
});

test("Custom dropdown selection", async ({ page }) => {
  // Setup
  await page.goto(
    "/playwright-playground/sessions/session-2-basic-operations#2-5"
  );

  // Actions
  await page.getByTestId("dropdown-country").click();
  await page.getByTestId("country-Nepal").click();

  // Assertion
  await expect(page.getByTestId("value-country")).toHaveText("Nepal");
  await expect(page.getByTestId("dropdown-country")).toHaveText(/Nepal/);
  await expect(page.getByTestId("dropdown-country")).toContainText("Nepal");
});

test("Multi-select dropdown", async ({ page }) => {
  // Setup
  await page.goto(
    "/playwright-playground/sessions/session-2-basic-operations#2-5"
  );

  // Actions
  const selectLanguages = page.getByTestId("select-languages");
  await selectLanguages.selectOption([
    "TypeScript",
    "Python"
  ]);

  // Assertion
  await expect(page.getByTestId("value-languages")).toHaveText(
    "ts, python"
  );

  // Read selected <option> values directly from the native <select> element
  // to validate the real form state (not just rendered text).
  const values = await selectLanguages.evaluate((el) => {
    const select = el as any;
    return Array.from(select.selectedOptions).map((o: any) => o.value);
  });
  expect(values).toEqual(["ts", "python"]);
});

test("Multi-select custom dropdown", async ({ page }) => {
  // Setup
  await page.goto(
    "/playwright-playground/sessions/session-2-basic-operations#2-5"
  );

  // Actions
  await page.getByTestId("dropdown-tags").click();
  // await page.getByRole("option", { name: "Playwright" }).click();
  await page.getByTestId("tag-Playwright").click();
  await page.getByRole("option", { name: "API" }).click();

  // Assertion
  await expect(page.getByTestId("value-tags")).toHaveText(
    "Playwright, API"
  );
});
//#endregion
