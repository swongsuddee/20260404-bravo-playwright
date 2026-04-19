## Locator Priority Order

This note is about choosing the right Playwright locator.

Do not start with CSS or XPath unless you have a real reason. Start with the locator that best matches how a user or assistive technology understands the page.

Why this matters:

- tests are easier to read
- tests break less often when layout or classes change
- locators stay closer to real user behavior

## Preferred order

Use the first option that gives you a stable and clear locator:

```ts
page.getByRole('button', { name: 'Submit' })     // 1. Best default for interactive elements
page.getByLabel('Email address')                 // 2. Best for labeled form fields
page.getByPlaceholder('Search...')               // 3. Good for inputs with meaningful placeholder text
page.getByText('Welcome back')                   // 4. Good when visible text is the real contract
page.getByAltText('Company logo')                // 5. Best for images
page.getByTitle('Close dialog')                  // 6. Use when title is the clearest signal
page.getByTestId('checkout-summary')             // 7. Best fallback for stable automation hooks
page.locator('.legacy-widget .submit-btn')       // 8. Last resort
page.locator('//button[@data-kind=\"submit\"]')  // 9. XPath only when other options are not practical
```

## What each locator is for

- `getByRole()`: prefer this first for buttons, links, checkboxes, radios, headings, dialogs, tabs, tables, and other semantic elements.
- `getByLabel()`: use this for form controls connected to a visible label, such as email, password, or search fields.
- `getByPlaceholder()`: use this when the placeholder is stable and meaningful, but prefer `getByLabel()` if both exist.
- `getByText()`: use this when visible text is the clearest and most stable thing the user sees.
- `getByAltText()`: use this for images that have meaningful alt text.
- `getByTitle()`: use this when the element exposes a stable `title` attribute and there is no better semantic locator.
- `getByTestId()`: use this when semantic locators are weak, duplicated, dynamic, or unavailable.
- `locator('css=...')`: use this only when you need structural targeting that user-facing locators cannot express cleanly.
- `locator('xpath=...')` or `locator('//...')`: use this as the final fallback, usually for legacy or hard-to-reach DOM structures.

## Practical rules

- Prefer user-facing meaning first.
- Prefer accessible locators over implementation details.
- Prefer `getByTestId()` over fragile classes like `.btn-primary` or `.card > div:nth-child(2)`.
- Use chaining to narrow scope before dropping to CSS or XPath.
- Avoid `nth()` unless the order is part of the requirement.

## Good examples

```ts
await page.getByRole('button', { name: 'Login' }).click();
await page.getByLabel('Email').fill('user@example.com');
await page.getByTestId('dropdown-country').click();
await page.getByRole('option', { name: 'API' }).click();
```

These match patterns already used in this repo, for example:

- buttons and headings with `getByRole()`
- inputs with `getByLabel()` or `getByRole('textbox', ...)`
- stable widgets with `getByTestId()`

## Less good examples

```ts
await page.locator('#login-btn').click();
await page.locator('.form > div:nth-child(2) > input').fill('user@example.com');
await page.locator('//div[3]/button[2]').click();
```

These are harder to understand and easier to break.

## Better fallback pattern

If a locator is too broad, narrow the scope first:

```ts
const bookingPanel = page.getByTestId('booking-panel');
await bookingPanel.getByRole('button', { name: 'Confirm' }).click();
```

This is usually better than writing one long CSS or XPath selector.

## Simple decision guide

1. Can I find it by role and accessible name?
2. If not, can I find it by label, placeholder, text, alt text, or title?
3. If not, does the app expose a stable test ID?
4. If not, use CSS.
5. Use XPath only when CSS or semantic locators cannot express the target clearly.

## Repo-specific note

This repository intentionally shows a mix of locator styles for learning purposes. In production-style tests, the default should still be:

- `getByRole()` first
- other semantic locators second
- `getByTestId()` as a stable fallback
- CSS/XPath only when necessary
