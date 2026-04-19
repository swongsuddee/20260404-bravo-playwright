# Bravo Playwright Learning Project

This repository is a Playwright learning project written in TypeScript. It is organized as a small workshop-style codebase with examples for browser actions, test structure, API testing, and a basic MySQL integration.

The project uses:

- `@playwright/test` for the test runner, assertions, and browser automation
- `typescript` for typed test files
- `dotenv` for loading values from `.env`
- `mysql2` for the database examples

## What this project covers

The examples are grouped by learning topic:

- `tests/session-1/` for introductory Playwright examples
- `tests/session-2-actions/` for action-focused lessons such as navigation, hooks, mouse, keyboard, uploads, downloads, scrolling, API testing, and MySQL usage
- `tests/session-3-connect-db/` for setup-related database experiments

There is also a short beginner note in [tests/session-2-actions/0-sync-and-async.md](/Users/jojoe/repository/4-Bravo/20260404-bravo-playwright/tests/session-2-actions/0-sync-and-async.md) that explains synchronous vs asynchronous code and `await`.

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

If you want to run the MySQL examples, create a `.env` file in the project root.

```env
MYSQL_HOST=127.0.0.1
MYSQL_PORT=3306
MYSQL_USER=root
MYSQL_PASSWORD=your_password
MYSQL_DATABASE=demo_shop
```

These values are loaded by `playwright.config.ts` and used by the files in `mysql/`.

## Database setup

To prepare the sample database, run the SQL file in `mysql/init-db.sql`.

Example:

```bash
mysql -u root -p < mysql/init-db.sql
```

This creates the demo schema used by the MySQL test examples.

## Run tests

```bash
# run all tests
npx playwright test

# run one file
npx playwright test tests/session-2-actions/4-mouse-action.spec.ts

# run one folder
npx playwright test tests/session-2-actions/

# run in headed mode
npx playwright test --headed

# debug mode
npx playwright test --debug

# open the HTML report
npx playwright show-report
```

## Project structure

```text
.
├── assets/                          # files used by upload tests
├── downloads/                       # saved files from download tests
├── mysql/
│   ├── connect-mysql.ts             # MySQL connection helpers
│   ├── delete-user.sql              # delete query
│   ├── init-db.sql                  # demo schema setup
│   ├── insert-new-user.sql          # insert query
│   ├── select-user.sql              # select query
│   └── user-table.ts                # table helper functions
├── specs/
│   ├── README.md
│   └── playwright-playground-test-plan.md
├── tests/
│   ├── pages/
│   │   └── seat-booking.page.ts
│   ├── session-1/
│   │   ├── example.spec.ts
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
│   │   ├── 13-colossal-operations.spec.ts
│   │   ├── 14-api-testing.spec.ts
│   │   └── 15-connect-mysql.spec.ts
│   └── session-3-connect-db/
│       └── connect-db.setup.ts
├── playwright.config.ts
├── package.json
├── tsconfig.json
└── README.md
```

### Example project structure

This is a larger example of how a real Playwright project can be organized when it grows beyond a small learning repo.

```text
playwright-project/
├─ package.json
├─ playwright.config.ts
├─ tsconfig.json
├─ .env
├─ .env.sit
├─ .env.uat
├─ .env.prod
├─ .gitignore
├─ README.md
│
├─ configs/
│  ├─ env.config.ts
│  ├─ project.config.ts
│  ├─ db.config.ts
│  ├─ mail.config.ts
│  └─ api.config.ts
│
├─ fixtures/
│  ├─ base.fixture.ts
│  ├─ ui.fixture.ts
│  ├─ api.fixture.ts
│  ├─ admin.fixture.ts
│  ├─ public.fixture.ts
│  ├─ db.fixture.ts
│  └─ mail.fixture.ts
│
├─ tests/
│  ├─ ui/
│  │  ├─ admin/
│  │  │  ├─ auth/
│  │  │  │  └─ login.spec.ts
│  │  │  ├─ users/
│  │  │  │  ├─ create-user.spec.ts
│  │  │  │  └─ search-user.spec.ts
│  │  │  └─ dashboard/
│  │  │     └─ dashboard-overview.spec.ts
│  │  │
│  │  └─ public/
│  │     ├─ home/
│  │     │  └─ landing-page.spec.ts
│  │     ├─ auth/
│  │     │  ├─ register.spec.ts
│  │     │  └─ login.spec.ts
│  │     └─ profile/
│  │        └─ public-profile.spec.ts
│  │
│  ├─ api/
│  │  ├─ auth/
│  │  │  ├─ login-api.spec.ts
│  │  │  └─ refresh-token.spec.ts
│  │  ├─ users/
│  │  │  ├─ get-user.spec.ts
│  │  │  ├─ create-user.spec.ts
│  │  │  └─ delete-user.spec.ts
│  │  └─ health/
│  │     └─ health-check.spec.ts
│  │
│  ├─ integrations/
│  │  ├─ email/
│  │  │  ├─ verify-registration-email.spec.ts
│  │  │  └─ verify-reset-password-email.spec.ts
│  │  ├─ mongodb/
│  │  │  └─ verify-document-created.spec.ts
│  │  ├─ postgresql/
│  │  │  └─ verify-row-created.spec.ts
│  │  └─ cross-system/
│  │     └─ user-registration-e2e.spec.ts
│  │
│  └─ smoke/
│     ├─ admin-smoke.spec.ts
│     ├─ public-smoke.spec.ts
│     └─ api-smoke.spec.ts
│
├─ pages/
│  ├─ admin/
│  │  ├─ login.page.ts
│  │  ├─ dashboard.page.ts
│  │  └─ users.page.ts
│  └─ public/
│     ├─ landing.page.ts
│     ├─ login.page.ts
│     ├─ register.page.ts
│     └─ profile.page.ts
│
├─ api/
│  ├─ clients/
│  │  ├─ auth.client.ts
│  │  ├─ user.client.ts
│  │  └─ base.client.ts
│  │
│  ├─ models/
│  │  ├─ requests/
│  │  │  ├─ login.request.ts
│  │  │  └─ create-user.request.ts
│  │  └─ responses/
│  │     ├─ login.response.ts
│  │     └─ user.response.ts
│  │
│  ├─ schemas/
│  │  ├─ user.schema.ts
│  │  └─ auth.schema.ts
│  │
│  └─ services/
│     ├─ auth.service.ts
│     └─ user.service.ts
│
├─ db/
│  ├─ mongodb/
│  │  ├─ mongo.client.ts
│  │  ├─ mongo.users.repo.ts
│  │  └─ mongo.tokens.repo.ts
│  │
│  ├─ postgresql/
│  │  ├─ postgres.client.ts
│  │  ├─ postgres.users.repo.ts
│  │  └─ postgres.orders.repo.ts
│  │
│  ├─ queries/
│  │  ├─ users.sql.ts
│  │  └─ orders.sql.ts
│  │
│  └─ data-mappers/
│     ├─ user.mapper.ts
│     └─ order.mapper.ts
│
├─ mail/
│  ├─ gmail.client.ts
│  ├─ gmail.search.ts
│  ├─ gmail.parser.ts
│  └─ mail.models.ts
│
├─ test-data/
│  ├─ static/
│  │  ├─ users.json
│  │  ├─ admins.json
│  │  └─ products.json
│  │
│  ├─ factories/
│  │  ├─ user.factory.ts
│  │  ├─ admin.factory.ts
│  │  └─ order.factory.ts
│  │
│  └─ seeds/
│     ├─ user.seed.ts
│     └─ admin.seed.ts
│
├─ utils/
│  ├─ logger.ts
│  ├─ date.util.ts
│  ├─ random.util.ts
│  ├─ retry.util.ts
│  ├─ poll.util.ts
│  ├─ file.util.ts
│  └─ mask.util.ts
│
├─ helpers/
│  ├─ auth.helper.ts
│  ├─ user.helper.ts
│  ├─ cleanup.helper.ts
│  └─ assertion.helper.ts
│
├─ assertions/
│  ├─ api.assert.ts
│  ├─ ui.assert.ts
│  ├─ db.assert.ts
│  └─ mail.assert.ts
│
├─ reporters/
│  ├─ custom-reporter.ts
│  └─ attachments/
│
├─ scripts/
│  ├─ seed-data.ts
│  ├─ cleanup-data.ts
│  ├─ run-smoke.ts
│  └─ generate-report.ts
│
├─ global-setup/
│  ├─ global-setup.ts
│  └─ global-teardown.ts
│
└─ artifacts/
   ├─ screenshots/
   ├─ videos/
   ├─ traces/
   ├─ logs/
   ├─ api/
   ├─ db/
   └─ mail/
```

## Playwright configuration

The current Playwright config includes:

- `testDir: './tests'`
- `fullyParallel: true`
- `reporter: 'html'`
- `baseURL: 'https://swongsuddee.github.io/'`
- browser projects for Chromium, Firefox, and WebKit
- a setup project named `connect-db-setup`

The setup file currently exists at `tests/session-3-connect-db/connect-db.setup.ts`, but its sample code is commented out. So the setup project is configured, but it does not actively connect to the database yet.

## Learning path

If you are new to Playwright, this order is a good starting point:

1. `tests/session-1/example.spec.ts`
2. `tests/session-2-actions/0-sync-and-async.md`
3. `tests/session-2-actions/1-navigation-action.spec.ts`
4. `tests/session-2-actions/2-describe-and-hooks.spec.ts`
5. `tests/session-2-actions/2-parallel-execution.spec.ts`
6. `tests/session-2-actions/2-serial-execution.spec.ts`
7. `tests/session-2-actions/2-test-template.spec.ts`
8. `tests/session-2-actions/3-text.spec.ts`
9. `tests/session-2-actions/4-mouse-action.spec.ts`
10. `tests/session-2-actions/5-keyboard-operations.spec.ts`
11. `tests/session-2-actions/6-select-dropdown.spec.ts`
12. `tests/session-2-actions/7-checkbox-radio.spec.ts`
13. `tests/session-2-actions/8-date-time-picker.spec.ts`
14. `tests/session-2-actions/9-toggle-operations.spec.ts`
15. `tests/session-2-actions/10-upload-operations.spec.ts`
16. `tests/session-2-actions/11-download-operations.spec.ts`
17. `tests/session-2-actions/12-scrolling-operations.spec.ts`
18. `tests/session-2-actions/13-colossal-operations.spec.ts`
19. `tests/session-2-actions/14-api-testing.spec.ts`
20. `tests/session-2-actions/15-connect-mysql.spec.ts`
21. `tests/session-1/seat-selection.spec.ts`

## Notes

- This repo is designed for learning, not as a finished production automation framework.
- Database tests require a working MySQL instance and a valid `.env` file.
- Upload tests use files from `assets/`.
- Download tests save output into `downloads/`.
- API tests use `jsonplaceholder.typicode.com`, not the `baseURL` site.
