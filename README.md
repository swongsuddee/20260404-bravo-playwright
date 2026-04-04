# Playwright Practice Project

This project is a hands-on Playwright test suite for learning core automation concepts:
- navigation and browser history actions
- test organization with `describe` and hooks
- parallel vs serial execution
- data-driven test templates
- text extraction/assertions
- mouse interactions

## Tech Stack

- `@playwright/test` (test runner + assertions)
- TypeScript test files in `tests/`
- HTML reporter

## Prerequisites

- Node.js 18+ (LTS recommended)
- npm

## Installation

1. Install dependencies:

	```bash
	npm install
	```

2. Install Playwright browser binaries:

	```bash
	npx playwright install
	```

## Run Tests

Run all tests:

```bash
npx playwright test
```

Run one file:

```bash
npx playwright test tests/1-navigation-action.spec.ts
```

Run in headed mode:

```bash
npx playwright test --headed
```

Open HTML report:

```bash
npx playwright show-report
```

## Project Configuration Notes

- `playwright.config.ts` sets:
  - `testDir: ./tests`
  - `fullyParallel: true`
  - `reporter: 'html'`
  - `baseURL: https://swongsuddee.github.io/`

Because `baseURL` is configured, tests can use paths such as:

```ts
await page.goto('/playwright-playground/sessions/session-1-locators');
```

## Test Files: Purpose and Idea

### `tests/1-navigation-action.spec.ts`

**Purpose:** Learn basic browser navigation flow.

**Idea:** Demonstrates `page.goto()`, `page.goBack()`, and `page.goForward()` with assertions to confirm the expected page heading after navigation.

---

### `tests/2-describe-and-hooks.spec.ts`

**Purpose:** Understand hook lifecycle and scope.

**Idea:** Uses `beforeAll`, `beforeEach`, `afterEach`, and `afterAll` at global and `describe` levels. Console logs illustrate the order that setup/cleanup hooks run.

---

### `tests/2-parallel-execution.spec.ts`

**Purpose:** Show behavior of parallel execution.

**Idea:** Multiple tests include delays to visualize concurrent execution. Contains `test.fail()` example to mark an expected failure without stopping independent parallel tests.

---

### `tests/2-serial-execution.spec.ts`

**Purpose:** Show behavior of serial execution mode.

**Idea:** File is configured with `test.describe.configure({ mode: 'serial' })`. If one test fails (here intentionally expected with `test.fail()`), later tests in the same serial group are skipped.

---

### `tests/2-test-template.spec.ts`

**Purpose:** Demonstrate data-driven testing (template pattern).

**Idea:** Iterates over a dataset and generates test cases dynamically. Each case sends different request payload data to the same endpoint pattern.

---

### `tests/3-text.spec.ts`

**Purpose:** Learn text reading APIs and visibility behavior.

**Idea:** Compares `textContent()` vs `innerText()` (including hidden/display-none scenarios), and demonstrates `allTextContents()` / `allInnerTexts()` for list-like elements.

---

### `tests/4-mouse-action.spec.ts`

**Purpose:** Practice mouse interactions and element state checks.

**Idea:** Covers left click, right click, double click, hover, and disabled-state verification with Playwright assertions (`toBeVisible`, `toHaveText`, `toBeDisabled`).

---

### `tests/example.spec.ts`

**Purpose:** Starter sample from Playwright scaffold.

**Idea:** Demonstrates simple UI checks on `playwright.dev`, including title assertion, link click, and heading visibility check (with test metadata tag usage).

## Suggested Learning Path

1. Start with `1-navigation-action.spec.ts`
2. Continue with `2-describe-and-hooks.spec.ts`
3. Compare `2-parallel-execution.spec.ts` and `2-serial-execution.spec.ts`
4. Practice data-driven style in `2-test-template.spec.ts`
5. Explore text and DOM behavior in `3-text.spec.ts`
6. Finish with interactions in `4-mouse-action.spec.ts`

