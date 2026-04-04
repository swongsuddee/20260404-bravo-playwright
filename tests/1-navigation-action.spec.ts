import test, { expect } from "@playwright/test";

/*
Purpose & idea:
This test suite demonstrates basic navigation actions in Playwright, 
including going to a URL, navigating back and forward, and validating page content.
*/

test("Navigate to playgroud", async ({ page }) => {
    // Actions
    // 1. Go to https://swongsuddee.github.io/playwright-playground/sessions/session-1-locators
    await page.goto("/playwright-playground/sessions/session-1-locators");

    // Assertion
    // 2. Find "Session 1 — Locator Finding"
    await expect(
        page.getByRole("heading", { name: "Session 1 — Locator Finding" })
    ).toBeVisible();
});

// Test steps:
// 1. Go to https://swongsuddee.github.io/playwright-playground/sessions/session-1-locators
// 2. Go to https://playwright.dev/docs/test-reporters
// 3. Go back
// 4. Validate "Session 1 — Locator Finding"
test("Try go back", async ({ page }) => {
    // Arrangement
    await page.goto("/playwright-playground/sessions/session-1-locators");
    await page.goto("https://playwright.dev/docs/test-reporters");

    // Actions
    await page.goBack();

    // Assertion
    await expect(
        page.getByRole("heading", { name: "Session 1 — Locator Finding" })
    ).toBeVisible();
});

test("Try go forward", async ({ page }) => {
    // Arrangement
    await page.goto("/playwright-playground/sessions/session-1-locators");
    await page.goto("https://playwright.dev/docs/test-reporters");
    await page.goBack();

    // Actions
    await page.goForward();

    // Assertion
    await expect(
        page.getByRole("heading", { name: "Reporters", exact: true })
    ).toBeVisible();
});