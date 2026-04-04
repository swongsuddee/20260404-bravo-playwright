### Priority order — use the first one that works:
```
page.getByRole('button', { name: 'Submit' })        // 1. Role (default)
page.getByLabel('Email address')                     // 2. Label (form fields)
page.getByText('Welcome back')                       // 3. Text (non-interactive)
page.getByPlaceholder('Search...')                    // 4. Placeholder
page.getByAltText('Company logo')                    // 5. Alt text (images)
page.getByTitle('Close dialog')                      // 6. Title attribute
page.getByTestId('checkout-summary')                 // 7. Test ID (last semantic option)
page.locator('css=.legacy-widget >> internal:role=button') // 8. CSS/XPath (last resort)
```

### Example project structure
```
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