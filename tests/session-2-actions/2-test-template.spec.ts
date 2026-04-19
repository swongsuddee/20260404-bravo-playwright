import test from "@playwright/test";

// Template (data driven tests)
const data = [
    {
        name: "Template Test 1",
        value: {
            userName: "u1",
            password: "p1",
            branchId: "b1"
        },
        resp: {
            status: "201",
            branchName: "b1"
        }
    },
    {
        name: "Template Test 2",
        value: {
            userName: "u2",
            password: "p2",
            branchId: "b2"
        },
        resp: {
            status: "201",
            branchName: "b2"
        }
    }
]
for (const item of data) {
    test(item.name, async ({ request }) => {
        await request.post("/your-endpoint", {
            data: item.value
        });
    });
}

