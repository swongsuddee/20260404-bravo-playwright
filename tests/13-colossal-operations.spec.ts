import test, { expect } from "@playwright/test";

//#region Colosal Operations
test("Colosal drag to scroll", async ({ page }) => {
  // Setup
  await page.goto(
    "/playwright-playground/sessions/session-2-basic-operations#2-11"
  );

  const colosalContainer = page.getByTestId("colossal-loop-viewport");
  const colosalContent = page.getByTestId("colossal-loop-center");

  // Actions - Drag to scroll
  const box = await colosalContainer.boundingBox();
  if (box) {
    const startX = box.x + box.width / 2;
    const startY = box.y + box.height / 2;

    // Drag to left
    await page.mouse.move(startX, startY);
    await page.mouse.down();
    await page.mouse.move(startX - 200, startY, { steps: 10 });
    await page.mouse.up();
    await page.waitForTimeout(1000);
  }

  // Assertion
  const isVisible = await colosalContent.isVisible();
  expect(isVisible).toBeTruthy();

  const labelText = await colosalContent.textContent();
  expect(labelText).toMatch(/Banner 5/);
});
//#endregion
