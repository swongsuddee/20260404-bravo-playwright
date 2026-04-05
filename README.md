# Bravo Playwright Learning Project

## Overview

This repository is a Playwright learning project built around a public QA playground and a few integration examples. The project uses Playwright Test with TypeScript as the main test stack, adds `dotenv` for environment-variable loading, and uses `mysql2` for MySQL connection examples. The configured test directory is `./tests`, the default HTML reporter is enabled, and the shared `baseURL` points to `https://swongsuddee.github.io/`. Browser projects are configured for Chromium, Firefox, and WebKit, with a separate setup project named `connect-db-setup`. 

## Packages used in this project

### Core test packages
- `@playwright/test`  
  Main Playwright test runner, fixtures, assertions, tracing, and reporter support.
- `typescript`  
  TypeScript compiler for writing and checking test code.
- `@types/node`  
  Node.js type definitions for TypeScript.
- `ts-node`  
  TypeScript execution support for Node-based utilities and project tooling.

### Supporting packages
- `dotenv`  
  Loads environment variables from `.env` into the Playwright config and database layer.
- `mysql2`  
  Promise-based MySQL client used for database connection and CRUD-style examples.

## How to prepare the test project

### 1. Prerequisites
Install these first:
- Node.js 18 or newer
- npm
- Git
- MySQL 8+ only if you want to run the database examples

### 2. Clone and install
```bash
git clone https://github.com/swongsuddee/20260404-bravo-playwright.git
cd 20260404-bravo-playwright
npm install
npx playwright install
```

### 3. Create `.env` for MySQL tests
The Playwright config loads variables from `.env`, and the MySQL pool reads `MYSQL_HOST`, `MYSQL_PORT`, `MYSQL_USER`, `MYSQL_PASSWORD`, and `MYSQL_DATABASE`. Create a file like this if you plan to run database-related tests:

```env
MYSQL_HOST=127.0.0.1
MYSQL_PORT=3306
MYSQL_USER=root
MYSQL_PASSWORD=your_password
MYSQL_DATABASE=demo_shop
```

### 4. Prepare folders used by tests
This repo already contains:
- `assets/` for upload test files
- `downloads/` for saved download files

If you recreate this project elsewhere, keep those folders because upload and download tests rely on local files and saved artifacts.

### 5. Initialize the demo database
If you want to run MySQL tests, execute the SQL in `mysql/init-db.sql` first. That script creates a database named `demo_shop` and creates tables including `users`, `products`, `orders`, and `order_items`.

Example:
```bash
mysql -u root -p < mysql/init-db.sql
```

### 6. Run tests
```bash
# all tests
npx playwright test

# headed debugging
npx playwright test --headed --debug

# one file
npx playwright test tests/1-navigation-action.spec.ts

# one folder
npx playwright test tests/session-1/

# open HTML report
npx playwright show-report
```

## Project structure

```text
.
├── assets/                     # files used by upload tests
├── downloads/                  # saved files from download tests
├── mysql/
│   ├── connect-mysql.ts        # MySQL pool creation and disconnect helpers
│   ├── init-db.sql             # demo schema setup
│   ├── insert-new-user.sql     # insert statement used by user-table helper
│   ├── select-user.sql         # select statement used by user-table helper
│   ├── delete-user.sql         # delete statement used by user-table helper
│   └── user-table.ts           # table-level helper functions for users
├── specs/
│   └── playwright-playground-test-plan.md
├── tests/
│   ├── pages/
│   │   └── seat-booking.page.ts
│   ├── session-1/
│   │   └── seat-selection.spec.ts
│   ├── *.spec.ts               # learning examples by topic
│   ├── connect-db.setup.ts     # setup project file
│   ├── example.spec.ts         # starter sample from Playwright style
│   └── seed.spec.ts            # placeholder seed test
├── playwright.config.ts
├── package.json
└── README.md
```

## Purpose and idea of each test file

### `tests/example.spec.ts`
A minimal starter example. It verifies the Playwright website title and the "Get started" navigation flow. Use it as the simplest reference for test syntax, basic assertions, tagging, and page interaction.

### `tests/1-navigation-action.spec.ts`
Introduces page navigation fundamentals. It covers `page.goto()`, opening a second page, using `page.goBack()`, and checking that the expected page heading is visible afterward. This file teaches the basic browser movement model.

### `tests/2-describe-and-hooks.spec.ts`
Explains Playwright test lifecycle behavior. It uses global hooks and nested `test.describe()` hooks, with console logging to show execution order. The point is to understand scope, setup timing, and teardown timing.

### `tests/2-parallel-execution.spec.ts`
Demonstrates parallel execution. The tests wait for a few seconds so the execution pattern is easy to observe. One test is marked as an expected failure to show that parallel tests do not block unrelated tests.

### `tests/2-serial-execution.spec.ts`
Demonstrates serial execution mode with `test.describe.configure({ mode: "serial" })`. It shows how a failure in one serial test can stop later tests in the same chain. This is useful for understanding dependent workflows.

### `tests/2-test-template.spec.ts`
Shows a simple data-driven pattern. A small array of test data is looped to generate multiple tests dynamically, each sending a request with different payload values. The idea is reusable template-based coverage.

### `tests/3-text.spec.ts`
Focuses on reading text from the DOM. The comments explain the difference between `textContent()` and `innerText()`, especially around hidden content and rendering behavior. This file is for text assertion basics and DOM visibility awareness.

### `tests/4-mouse-action.spec.ts`
Covers mouse-based interaction concepts. Based on the repository README and file naming, this file is intended for click-related behaviors, hover-like interactions, and validating state changes triggered by pointer actions.

### `tests/5-keyboard-operations.spec.ts`
Covers keyboard input patterns. The repository README positions it as the place for key combinations, navigation, and form input handling. Treat it as the reference file for keyboard-driven UI testing.

### `tests/6-select-dropdown.spec.ts`
Targets dropdown interaction scenarios. Based on the file name and project structure, this file is for selecting options from standard or custom select controls and validating the chosen values.

### `tests/7-checkbox-radio.spec.ts`
Targets checkbox and radio-button behavior. The purpose is to practice selection logic, exclusive choice handling, checked-state assertions, and UI rules tied to those controls.

### `tests/8-date-time-picker.spec.ts`
Targets date and time picker components. The purpose is to practice selecting dates, handling calendar widgets, and validating date/time-related UI behavior.

### `tests/9-toggle-operations.spec.ts`
Targets toggle and switch controls. The idea is to verify on/off state changes and any dependent UI response triggered by those state transitions.

### `tests/10-upload-operations.spec.ts`
Covers file upload flows. It includes single-file and multi-file upload examples using `setInputFiles()`, then validates uploaded file names and preview output. This is the main reference for file input testing.

### `tests/11-download-operations.spec.ts`
Covers file download handling. It enables `acceptDownloads`, waits for the download event, saves the file into `./downloads`, then verifies both file existence and file content. This teaches Playwright download control and local file assertions.

### `tests/12-scrolling-operations.spec.ts`
Covers scroll strategies. It shows scrolling to an element, repeated scrolling by locating the last rendered item, using `PageDown`, and scrolling to the bottom and back to the top with `page.evaluate()`. This is useful for lazy-loaded or long pages.

### `tests/13-colossal-operations.spec.ts`
Covers drag-to-scroll interaction on a large horizontal content area. It calculates the viewport bounding box, performs a mouse drag, and then checks that the expected banner content appears. This is useful for carousels and large scrollable surfaces.

### `tests/14-api-testing.spec.ts`
This is the API learning file. It uses `request` against `https://jsonplaceholder.typicode.com/` for GET, POST, PUT, and DELETE examples, validates response status codes and response body shapes, and also includes a grouped scenario using `beforeAll` to prepare multiple API responses. It is the main reference for Playwright API testing basics.

A detail worth noting: one test expects `userId: 12` for `GET /posts/1`, which does not match the typical JSONPlaceholder payload for post `1`. That assertion likely needs correction before treating the file as a stable reference.

### `tests/15-connect-mysql.spec.ts`
This is the MySQL integration example. It connects before all tests, reads users, inserts a generated user, deletes the last user, and disconnects after all tests. Use it to learn the basic pattern for DB-backed tests, not yet as a hardened production test suite.

### `tests/connect-db.setup.ts`
Configured as a Playwright setup project dependency in `playwright.config.ts`, but the file content is currently commented out. In practice, it acts as a placeholder for future shared database setup. Right now, it does not establish a live DB connection by itself.

### `tests/seed.spec.ts`
A placeholder seed file. It contains only a stub test and no real implementation. This suggests the repo author planned a data-seeding flow but has not implemented it yet.

## Supporting test files

### `tests/pages/seat-booking.page.ts`
This is the Page Object Model for the seat-booking practice flow. It wraps locators and business-level actions such as selecting seats, checking pricing, checking the agreement checkbox, and validating button state. Its purpose is to keep the spec readable and reusable.

### `tests/session-1/seat-selection.spec.ts`
This is the most structured UI scenario in the repo. It uses the `SeatBookingPage` POM and validates seat selection, deselection, multi-seat pricing, and seat list state. It is the clearest example of how to turn a playground exercise into a realistic end-to-end UI scenario.

## MySQL helper layer

### `mysql/connect-mysql.ts`
Creates a MySQL connection pool from environment variables and exposes `connect()` and `disconnect()` helpers. This is the shared DB connection entry point.

### `mysql/user-table.ts`
Acts as a small table helper or repository layer for user operations. It is referenced by `15-connect-mysql.spec.ts` for reading users and doing insert/delete actions.

### `mysql/init-db.sql`
Bootstraps the demo schema. Use it before running DB-related tests.

### `mysql/select-user.sql`, `mysql/insert-new-user.sql`, `mysql/delete-user.sql`
These SQL files keep raw queries outside the test code. The idea is cleaner test code and easier query reuse.

## Notes and caveats

- The project is designed as a learning suite more than a finished production framework.
- The browser projects depend on `connect-db-setup`, but that setup file is currently commented out.
- Database tests require a working MySQL instance and a valid `.env` file.
- Upload tests require the image files in `assets/`.
- Download tests save files under `downloads/` and validate their contents.
- API tests are independent from the UI playground because they point to JSONPlaceholder instead of the site configured in `baseURL`.

## Suggested learning order

1. `example.spec.ts`
2. `1-navigation-action.spec.ts`
3. `2-describe-and-hooks.spec.ts`
4. `2-parallel-execution.spec.ts`
5. `2-serial-execution.spec.ts`
6. `2-test-template.spec.ts`
7. `3-text.spec.ts`
8. `4-mouse-action.spec.ts`
9. `5-keyboard-operations.spec.ts`
10. `6-select-dropdown.spec.ts`
11. `7-checkbox-radio.spec.ts`
12. `8-date-time-picker.spec.ts`
13. `9-toggle-operations.spec.ts`
14. `10-upload-operations.spec.ts`
15. `11-download-operations.spec.ts`
16. `12-scrolling-operations.spec.ts`
17. `13-colossal-operations.spec.ts`
18. `14-api-testing.spec.ts`
19. `15-connect-mysql.spec.ts`
20. `tests/session-1/seat-selection.spec.ts`

