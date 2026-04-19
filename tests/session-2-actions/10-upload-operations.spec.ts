import test, { expect } from "@playwright/test";

//#region Upload Operations
test("Single file upload", async ({ page }) => {
  // Setup
  await page.goto(
    "/playwright-playground/sessions/session-2-basic-operations#2-8"
  );
  const filePath = "./assets/P1836707.jpg";

  // Actions
  await page.getByTestId("single-file-input").setInputFiles(filePath);

  // Assertion
  const uploadedFileNames = await page
    .locator("xpath=//div[@data-testid='single-file-name']")
    .allTextContents();
  expect(uploadedFileNames).toEqual(["P1836707.jpg"]);
});

test("Multiple files upload", async ({ page }) => {
  // Setup
  await page.goto(
    "/playwright-playground/sessions/session-2-basic-operations#2-8"
  );
  const filePaths = ["./assets/P1836707.jpg", "./assets/P1836720.jpg"];

  // Actions
  await page.getByTestId("bulk-file-input").setInputFiles(filePaths);

  // Assertion
  const uploadedFileNames = await page
    .locator("xpath=//div[@data-testid='bulk-file-name']")
    .allTextContents();
  expect(uploadedFileNames).toEqual(["P1836707.jpg", "P1836720.jpg"]);

  // Alternative assertion
  const uploadedFileList = await page.getByTestId("bulk-img-preview").all();
  const fileNames: string[] = [];
  for (const fileElement of uploadedFileList) {
    const fileName = await fileElement.getAttribute("alt");
    fileNames.push(fileName ?? "");
  }
  expect(fileNames).toEqual(["preview-0", "preview-1"]);
});
//#endregion
