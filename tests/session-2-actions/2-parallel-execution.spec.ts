import test from "@playwright/test";

// Config this test file to execute in parallel mode
// default mode is based on `fullyParallel: true` in `playwright.config.ts`
// test.describe.configure({ mode: "parallel" });

test("Test 1", async ({ }) => {
    console.log("Executing Test 1");
    await new Promise(resolve => setTimeout(resolve, 3000));
    console.log("Finished Test 1");
});

test("Test 2", async ({ }) => {
    console.log("Executing Test 2");
    await new Promise(resolve => setTimeout(resolve, 3000));
    console.log("Finished Test 2");
});

// Example with the "Test 3" that is expected to fail
test("Test 3", async ({ }) => {
    test.fail();
    console.log("Executing Test 3");
    await new Promise(resolve => setTimeout(resolve, 3000));
    console.log("Finished Test 3");
});

test("Test 4", async ({ }) => {
    console.log("Executing Test 4");
    await new Promise(resolve => setTimeout(resolve, 3000));
    console.log("Finished Test 4");
});