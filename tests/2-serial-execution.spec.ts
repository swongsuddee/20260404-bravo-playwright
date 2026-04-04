import test from "@playwright/test"

// Config this test file to execute in serial mode
test.describe.configure({ mode: "serial" });

test("Serial Test 1", async ({ }) => {
    console.log("Executing Test 1");
    await new Promise(resolve => setTimeout(resolve, 3000));
    console.log("Finished Test 1");
});

test("Serial Test 2", async ({ }) => {
    console.log("Executing Test 2");
    await new Promise(resolve => setTimeout(resolve, 3000));
    console.log("Finished Test 2");
});

// Example with the "Test 3" that is expected to fail
// So "Test 4" will not be executed
test("Serial Test 3", async ({ }) => {
    test.fail();
    console.log("Executing Test 3");
    await new Promise(resolve => setTimeout(resolve, 3000));
    console.log("Finished Test 3");
});

test("Serial Test 4", async ({ }) => {
    console.log("Executing Test 4");
    await new Promise(resolve => setTimeout(resolve, 3000));
    console.log("Finished Test 4");
});