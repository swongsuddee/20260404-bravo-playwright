import test from "@playwright/test";

/*
purpose & idea:
This spec demonstrates how Playwright hooks run at different scopes:
- Global hooks: test.beforeAll, test.beforeEach, test.afterEach, test.afterAll
- Group-level hooks inside test.describe("Login Tests")
- Nested grouping with test.describe("Subgroup 1")

The tests mainly print log messages to show hook execution order and lifecycle flow
before/after each test and before/after all tests in both global and describe scopes.
*/

test.beforeAll(async ({ }) => {
    // Setup code before all tests
    console.log("Before all tests");
});

test.beforeEach(async ({ }) => {
    // Setup code before each test
    console.log("   Before each test");
});

// Group of test cases (scenarios)
test.describe("Login Tests", () => {

    test.beforeAll(async ({ }) => {
        console.log("   Before all tests in Login Tests");
    });

    test.beforeEach(async ({ }) => {
        console.log("      Before each test in Login Tests");
    });

    test("Test 1", async ({ }) => {
        console.log("      Executing Test 1");
    });

    test("Test 2", async ({ }) => {
        console.log("      Executing Test 2");
    });

    // test cases 1,2,3 ...
    // sub-group
    test.describe("Subgroup 1", () => {

        test("Test 3", async ({ }) => {
            console.log("         Executing Test 3");
        });

    });

    test.afterEach(async ({ }) => {
        console.log("      After each test in Login Tests");
    });

});

test.afterEach(async ({ }) => {
    // Cleanup code after each test
    console.log("   After each test");
});

test.afterAll(async ({ }) => {
    // Cleanup code after all tests
    console.log("After all tests");
});
