import test, { expect } from "@playwright/test"

test("Left click action", async ({ page }) => {
    // Arrangement
    await page.goto("/playwright-playground/sessions/session-2-basic-operations#2-1");

    // Actions
    // { name: "Save" } => Save, save, xxx save xxx
    // { name: "Save", exact: true } => Save <= exactly matched
    const buttonLocator = page.getByRole("button", { name: "Save", exact: true });
    // await buttonLocator.click({ button: "left" }); // default button
    await buttonLocator.click();

    // Assertions
    await expect(page.getByText("Saved", { exact: true })).toBeVisible();
    await expect(page.getByTestId("status-text")).toHaveText("Saved");
});

test("Right click action", async ({ page }) => {
    // Arrangement
    await page.goto("/playwright-playground/sessions/session-2-basic-operations#2-1");

    // Actions
    const buttonLocator = page.getByRole("button", { name: "save" });
    await buttonLocator.click({ button: "right" });
});

test("Double click action", async ({ page }) => {
    // Arrangement
    await page.goto("/playwright-playground/sessions/session-2-basic-operations#2-1");

    // Actions
    const buttonLocator = page.getByRole("button", { name: "Double click me" });
    await buttonLocator.dblclick();

    // Assertions
    await expect(page.getByText("Double Saved", { exact: true })).toBeVisible();
    await expect(page.getByTestId("status-text")).toHaveText("Double Saved");

});

test("Hover action", async ({ page }) => {
    // Arrangement
    await page.goto("/playwright-playground/sessions/session-2-basic-operations#2-1");

    // Actions
    const buttonLocator = page.getByTestId("hover-target");
    await buttonLocator.hover();

    // Assertions
    await expect(page.getByText("Tooltip visible ✅", { exact: true })).toBeVisible();
});

test("Check disabled button", async ({ page }) => {
    // Arrangement
    await page.goto("/playwright-playground/sessions/session-2-basic-operations#2-1");
    await page.getByRole("checkbox").uncheck();

    // Actions
    const buttonLocator = page.getByRole("button", { name: "Save", exact: true });
    const buttonStatusDisabled = await buttonLocator.isDisabled();
    const buttonStatusEnabled = await buttonLocator.isEnabled();

    // Assertions
    await expect(buttonLocator).toBeDisabled();
    expect(buttonStatusDisabled).toBe(true);
    expect(buttonStatusEnabled).toBe(false);
});