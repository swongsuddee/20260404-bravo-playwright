import test, { expect } from "@playwright/test";

//#region Keyboard Operations

/*
Playgroud: "/playwright-playground/sessions/session-2-basic-operations#2-2"
Rules:
  username field : 3–12 characters, Letters only (A–Z), no numbers, No spaces
  password field : At least 6 characters, Must include at least 1 letter, Must include at least 1 number
*/

test("Input text", async ({ page }) => {
  // Arrangement
  await page.goto(
    "/playwright-playground/sessions/session-2-basic-operations#2-2"
  );
  const inputText = "john@mail.com";

  // Actions
  await page.getByPlaceholder("letters only, 3–12 chars").fill(inputText);

  // Assertion
  await expect(page.getByTestId("username-value")).toHaveText(inputText);
});

test("Input with invalid characters", async ({ page }) => {
  // Arrangement
  await page.goto(
    "/playwright-playground/sessions/session-2-basic-operations#2-2"
  );
  const inputText = "john123 !@#";

  // Actions
  const inputLocator = page.getByTestId("input-username")
  await inputLocator.fill(inputText);

  // Assertion
  const inputValue = await inputLocator.inputValue();
  expect(inputValue).toEqual("");
});

test("Input typing", async ({ page }) => {
  // Arrangement
  await page.goto(
    "/playwright-playground/sessions/session-2-basic-operations#2-2"
  );
  const inputText = "john@mail.com";

  // Actions
  await page.click("css=#username");
  await page.keyboard.type(inputText);

  // Assertion
  await expect(page.getByTestId("username-value")).toHaveText(inputText);
  await expect(page.locator("css=#username")).toHaveValue(inputText);
});

test("Input typing invalid characters", async ({ page }) => {
  // Arrangement
  await page.goto(
    "/playwright-playground/sessions/session-2-basic-operations#2-2"
  );
  const inputText = "john123 !@#";

  // Actions
  const inputLocator = page.getByTestId("input-username");
  await inputLocator.click();
  await page.keyboard.type(inputText, { delay: 200 });

  // Assertion
  const inputValue = await inputLocator.inputValue();
  expect(inputValue).toEqual("john!@#");
});

test("Input password with masking", async ({ page }) => {
  // Arrangement
  await page.goto(
    "/playwright-playground/sessions/session-2-basic-operations#2-2"
  );
  const passwordText = "MySecretPassword";

  // Actions
  await page.getByTestId("input-password").fill(passwordText);

  // Assertion
  await expect(page.getByTestId("password-len")).toHaveText(
    passwordText.length.toString()
  );
  await expect(page.getByTestId("input-password")).toHaveValue(passwordText);
});
//#endregion

// sync => synchronous (not concurrent)
// |---t1---|
//          |---t2---|
//                   |---t3---|

// async => asynchronous (concurrent)
// await => wait until ...
// |---t1---|
// |---t2---|
//       |---t3---|

// await |---t1---|
// await          |---t2---|