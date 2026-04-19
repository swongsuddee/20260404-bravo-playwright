# Bravo Playwright Learning Project

This repository is a Playwright learning project written in TypeScript. It contains UI test examples, API test examples, MySQL integration samples, and early Page Object Model structure.

The project uses:

- `@playwright/test` for browser automation, assertions, and API testing
- `typescript` for typed test code
- `dotenv` for loading local environment variables
- `mysql2` for database examples

## What is in this repo

The examples are grouped by topic:

- `tests/session-1/` for basic Playwright examples and locator practice
- `tests/session-2-actions/` for browser actions such as navigation, hooks, mouse, keyboard, dropdowns, date pickers, uploads, downloads, scrolling, and toggles
- `tests/session-3-api/` for API testing examples using `jsonplaceholder.typicode.com`
- `tests/session-4-connect-db/` for MySQL connection examples
- `pages/` for reusable page and component classes
- `tests/pages/` for a page object used by the seat-booking example
- `specs/` for test-planning notes

There is also a beginner note in [0-sync-and-async.md](/Users/jojoe/repository/4-Bravo/20260404-bravo-playwright/tests/session-2-actions/0-sync-and-async.md).

## Prerequisites

Install these first:

- Node.js 18 or newer
- npm
- Git
- MySQL 8+ only if you want to run the database examples

## Install

```bash
git clone https://github.com/swongsuddee/20260404-bravo-playwright.git
cd 20260404-bravo-playwright
npm install
npx playwright install
```

## Environment variables

Create a `.env` file in the project root if you want to run the MySQL examples.

```env
MYSQL_HOST=127.0.0.1
MYSQL_PORT=3306
MYSQL_USER=root
MYSQL_PASSWORD=your_password
MYSQL_DATABASE=demo_shop
```

These values are loaded from `playwright.config.ts`.

## Database setup

To prepare the sample database, run:

```bash
mysql -u root -p < mysql/init-db.sql
```

This creates the demo schema used by the MySQL examples in `tests/session-4-connect-db/`.

## Run tests

The project does not define custom `npm` scripts yet, so use Playwright commands directly.

```bash
# run all tests
npx playwright test

# run one file
npx playwright test tests/session-2-actions/6-select-dropdown.spec.ts

# run one folder
npx playwright test tests/session-2-actions/

# run one browser project
npx playwright test --project=chromium

# run in headed mode
npx playwright test --headed

# debug mode
npx playwright test --debug

# list discovered tests
npx playwright test --list

# open the HTML report
npx playwright show-report
```

## Playwright configuration

Current configuration highlights from [playwright.config.ts](/Users/jojoe/repository/4-Bravo/20260404-bravo-playwright/playwright.config.ts):

- `testDir` is `./tests`
- `fullyParallel` is enabled
- `reporter` is `html`
- `baseURL` is `https://swongsuddee.github.io/`
- browser projects are configured for Chromium, Firefox, and WebKit
- a `connect-db-setup` project is declared for `*.setup.ts` files, although no setup file currently exists under `tests/`

## Project structure

```text
.
├── assets/                           # files used by upload tests
├── downloads/                        # downloaded sample files
├── mysql/
│   ├── connect-mysql.ts              # MySQL connection helper
│   ├── delete-user.sql               # delete query
│   ├── init-db.sql                   # demo schema setup
│   ├── insert-new-user.sql           # insert query
│   ├── select-user.sql               # select query
│   └── user-table.ts                 # helper functions around the users table
├── pages/
│   ├── base-component.ts             # reusable component base class
│   ├── base-page.ts                  # reusable page base class
│   └── home-page/
│       ├── booking-component.ts      # Thai Airways booking component work-in-progress
│       └── home-page.ts              # home page wrapper
├── specs/
│   ├── README.md
│   └── playwright-playground-test-plan.md
├── tests/
│   ├── pages/
│   │   └── seat-booking.page.ts      # page object used in session 1
│   ├── session-1/
│   │   ├── example.spec.ts
│   │   ├── note.md
│   │   └── seat-selection.spec.ts
│   ├── session-2-actions/
│   │   ├── 0-sync-and-async.md
│   │   ├── 1-navigation-action.spec.ts
│   │   ├── 2-describe-and-hooks.spec.ts
│   │   ├── 2-parallel-execution.spec.ts
│   │   ├── 2-serial-execution.spec.ts
│   │   ├── 2-test-template.spec.ts
│   │   ├── 3-text.spec.ts
│   │   ├── 4-mouse-action.spec.ts
│   │   ├── 5-keyboard-operations.spec.ts
│   │   ├── 6-select-dropdown.spec.ts
│   │   ├── 7-checkbox-radio.spec.ts
│   │   ├── 8-date-time-picker.spec.ts
│   │   ├── 9-toggle-operations.spec.ts
│   │   ├── 10-upload-operations.spec.ts
│   │   ├── 11-download-operations.spec.ts
│   │   ├── 12-scrolling-operations.spec.ts
│   │   └── 13-colossal-operations.spec.ts
│   ├── session-3-api/
│   │   └── 14-api-testing.spec.ts
│   ├── session-4-connect-db/
│   │   └── 15-connect-mysql.spec.ts
│   └── session-5-POM/
│       └── POM.excalidraw
├── package.json
├── playwright.config.ts
├── tsconfig.json
└── README.md
```

## Learning path

If you are new to the repo, this order is a practical starting point:

1. `tests/session-1/example.spec.ts`
2. `tests/session-1/seat-selection.spec.ts`
3. `tests/session-2-actions/0-sync-and-async.md`
4. `tests/session-2-actions/1-navigation-action.spec.ts`
5. `tests/session-2-actions/2-describe-and-hooks.spec.ts`
6. `tests/session-2-actions/2-parallel-execution.spec.ts`
7. `tests/session-2-actions/2-serial-execution.spec.ts`
8. `tests/session-2-actions/2-test-template.spec.ts`
9. `tests/session-2-actions/3-text.spec.ts`
10. `tests/session-2-actions/4-mouse-action.spec.ts`
11. `tests/session-2-actions/5-keyboard-operations.spec.ts`
12. `tests/session-2-actions/6-select-dropdown.spec.ts`
13. `tests/session-2-actions/7-checkbox-radio.spec.ts`
14. `tests/session-2-actions/8-date-time-picker.spec.ts`
15. `tests/session-2-actions/9-toggle-operations.spec.ts`
16. `tests/session-2-actions/10-upload-operations.spec.ts`
17. `tests/session-2-actions/11-download-operations.spec.ts`
18. `tests/session-2-actions/12-scrolling-operations.spec.ts`
19. `tests/session-2-actions/13-colossal-operations.spec.ts`
20. `tests/session-3-api/14-api-testing.spec.ts`
21. `tests/session-4-connect-db/15-connect-mysql.spec.ts`

## Notes

- This repo is a learning workspace, not a finished production framework.
- UI tests use the configured `baseURL` plus explicit external URLs in some examples.
- API tests use `https://jsonplaceholder.typicode.com/`.
- Database tests require a working MySQL instance and a valid `.env` file.
- Upload tests use files from `assets/`.
- Download examples write into `downloads/`.
