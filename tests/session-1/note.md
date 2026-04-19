### Priority order — use the first one that works:
This topic is about **how to choose a locator in Playwright**.

When Playwright needs to find an element on the page, do not start with CSS or XPath right away.
Use the most meaningful locator first. If that does not work, move to the next option.

Why this order matters:

- your test becomes easier to read
- your test is closer to how a real user finds things
- your test is less likely to break when the HTML layout changes

Use this priority:

```ts
page.getByRole('button', { name: 'Submit' })              // 1. Best default for buttons, links, checkboxes, headings
page.getByLabel('Email address')                          // 2. Best for form fields
page.getByText('Welcome back')                            // 3. Good for visible text
page.getByPlaceholder('Search...')                       // 4. Useful for inputs with placeholder text
page.getByAltText('Company logo')                         // 5. Best for images
page.getByTitle('Close dialog')                           // 6. Use when title is the clearest signal
page.getByTestId('checkout-summary')                      // 7. Good fallback when semantic locators are not available
page.locator('css=.legacy-widget >> internal:role=button') // 8. Last resort
```

What each one means:

- `getByRole()`: use this first for interactive elements like buttons, links, checkboxes, radio buttons, and headings.
- `getByLabel()`: use this for form inputs connected to a visible label such as "Email address" or "Password".
- `getByText()`: use this when the visible text itself is the clearest way to find the element.
- `getByPlaceholder()`: use this for inputs that show helper text inside the box.
- `getByAltText()`: use this for images.
- `getByTitle()`: use this when the element has a meaningful `title` attribute.
- `getByTestId()`: use this when the app provides a stable test ID for automation.
- `locator('css=...')` or XPath: use only when better locators are not possible.

Simple rule:

- prefer **user-facing meaning** first
- prefer **test IDs** when semantic locators are not enough
- use **CSS/XPath** only as a backup

Example:

```ts
// Better
await page.getByRole('button', { name: 'Login' }).click();

// Less good
await page.locator('#login-btn').click();
```

Why is the first one better?

- it is easier to understand
- it still works even if the CSS class or HTML structure changes
- it matches what the user sees: a button named "Login"

The example project structure was moved to `README.md` under `### Example project structure`.
