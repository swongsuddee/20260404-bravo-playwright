import { test, expect } from '@playwright/test';

/*
Actions with text: textContent(), allTextContent(), innerText(), and allInnerText()

Purpose & idea
- `textContent()` retrieves the text content of an element, including hidden elements.
- `innerText()` retrieves the visible text content of an element, excluding hidden elements.

Note: DOM rendering behavior may vary slightly across browser engines.
Behaviour of DOMs:
- `display: none`
    - Element is removed from layout flow (it takes no space).
    - Element is not rendered on screen and cannot be interacted with.
    - Good use cases:
        - conditional rendering (hide/show section completely)
        - loading states where inactive content should not affect layout
        - feature flags / role-based UI where element should not appear at all

- `visibility: hidden`
    - Element remains in layout flow (it still takes space).
    - Element is not visible, and users cannot interact with it.
    - Good use cases:
        - temporarily hiding text/icon while preserving alignment
        - reserving space to prevent layout shift (CLS)
        - reveal-on-hover/focus patterns where stable layout is required
*/


test("Get text content and inner text on display-none element", async ({ page }) => {
    await page.goto("/playwright-playground/sessions/session-2-basic-operations#2-3");

    const textLocator = page.getByTestId("display-none-text");
    const textContent = await textLocator.textContent();
    const textInner = await textLocator.innerText();
    // const text = await page.getByTestId("display-none-text").textContent();

    console.log("textContent: ", textContent);
    console.log("innerText: ", textInner);
    expect(textContent).toBe(
        "element is removed from layout and not visible to the user"
    );
    expect(textInner).toBe(
        "element is removed from layout and not visible to the user"
    );

    // alternative way to validate text on screen
    // await expect(
    //     page.getByText("element is removed from layout and not visible to the user")
    // ).toBeVisible()
});

test("Get text content and inner text on hidden element", async ({ page }) => {
    await page.goto("/playwright-playground/sessions/session-2-basic-operations#2-3");

    const textLocator = page.getByTestId("visibility-hidden-text");
    const textContent = await textLocator.textContent();
    const textInner = await textLocator.innerText();
    // const text = await page.getByTestId("hidden-text").textContent();

    console.log("textContent: ", textContent);
    console.log("innerText: ", textInner);
    expect(textContent).toBe(
        "element keeps its space but text is invisible"
    );
    expect(textInner).toBe(
        ""
    );
});

test("Get all text content and all inner text on display-none element", async ({ page }) => {
    await page.goto("/playwright-playground/sessions/session-1-locators");

    await page.getByTestId("seat-1D").click()
    await page.getByTestId("seat-2D").click()

    const textLocator = page.getByTestId("seat-list").locator("xpath=//li");
    const textContents = await textLocator.allTextContents();
    const innerTexts = await textLocator.allInnerTexts();

    console.log(textContents);
    console.log(innerTexts);
    expect(textContents).toEqual([
        '1D', '2D'
    ]);
    expect(innerTexts).toEqual([
        '1D', '2D'
    ]);
});