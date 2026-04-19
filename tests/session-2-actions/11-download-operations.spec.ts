import test, { expect } from "@playwright/test";

//#region Download Operations
// Import fs module for file system operations
import fs from "fs";

// Note: Make sure to set "acceptDownloads: true" in playwright.config.ts or in the test.use() method.
// Also, make sure the "downloads" folder exists in the project root.
test.use({ acceptDownloads: true });

test("File download", async ({ page }) => {
  // Setup
  await page.goto(
    "/playwright-playground/sessions/session-2-basic-operations#2-9"
  );

  // Actions
  const [download] = await Promise.all([
    page.waitForEvent("download"), // Waits for the download to start
    page.getByTestId("btn-download").click(), // Triggers the download
  ]);

  // Save downloaded file to a specific path
  const downloadPath = "./downloads/downloaded-example-2.txt";
  await download.saveAs(downloadPath);

  // Assertion
  const isExist = fs.existsSync(downloadPath);
  expect(isExist).toBeTruthy();

  const content = fs.readFileSync(downloadPath, "utf-8");
  expect(content).toMatch(/Ticket generated at:/);
});
//#endregion
