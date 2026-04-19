import test, { APIRequestContext, APIResponse, expect } from "@playwright/test";

test.use({
    baseURL: "https://jsonplaceholder.typicode.com/"
});

test("Get posts", async ({ request }) => {
    const response = await request.get("/posts"); // https://jsonplaceholder.typicode.com/posts
    expect(response.status()).toBe(200);

    const data = await response.json();
    console.table(data);
    expect(data.length).toBeGreaterThan(0);
    expect(data).toEqual(
        expect.arrayContaining([
            expect.objectContaining({
                id: expect.any(Number),
                userId: expect.any(Number),
                title: expect.any(String),
                body: expect.any(String)
            })
        ])
    );
});

test("Get post by ID", async ({ request }) => {
    const response = await request.get("/posts/{postId}".replace("{postId}", "1"));
    expect(response.status()).toBe(200);

    const data = await response.json();
    console.table(data);
    expect(
        data // actual data
    ).toEqual( // expected data
        expect.objectContaining({
            id: 1,
            userId: expect.any(Number),
            title: expect.any(String),
            body: expect.any(String)
        })
    );
});

test("Get post comments", async ({ request }) => {
    const response = await request.get("/posts/{postId}/comments".replace("{postId}", "1"));
    expect(response.status()).toBe(200);

    const data = await response.json();
    console.table(data);
    expect(data.length).toBeGreaterThan(0);
    expect(data).toEqual(
        expect.arrayContaining([
            expect.objectContaining({
                postId: 1,
                id: expect.any(Number),
                name: expect.any(String),
                email: expect.any(String),
                body: expect.any(String)
            })
        ])
    );

    expect(data).toEqual(
        expect.arrayContaining([
            expect.objectContaining({
                postId: 1,
                id: 2,
                name: "quo vero reiciendis velit similique earum",
                email: "Jayne_Kuhic@sydney.com",
                body: `est natus enim nihil est dolore omnis voluptatem numquam
et omnis occaecati quod ullam at
voluptatem error expedita pariatur
nihil sint nostrum voluptatem reiciendis et`,
            })
        ])
    );
});

test("Get comments from post", async ({ request }) => {
    // const response = await request.get("/comments?postId={postId}".replace("{postId}", "1"));
    const response = await getCommentFromPost(request, 1);
    expect(response.status()).toBe(200);

    const data = await response.json();
    console.table(data);
    expect(data.length).toBeGreaterThan(0);
    expect(data).toEqual(
        expect.arrayContaining([
            expect.objectContaining({
                postId: 1,
                id: expect.any(Number),
                name: expect.any(String),
                email: expect.any(String),
                body: expect.any(String)
            })
        ])
    );
});

async function getCommentFromPost(request: APIRequestContext, postId: number): Promise<APIResponse> {
    const response = await request.get(`/comments?postId=${postId}`);
    return response;
}

test("Create a new post", async ({ request }) => {
    const newPost = {
        title: "foo",
        body: "bar",
        userId: 1
    };

    const response = await request.post(
        "/posts",
        {
            data: newPost,
            headers: {
                "Authorization": "Bearer YOUR_TOKEN_HERE"
            }
        });
    expect(response.status()).toBe(201);

    const data = await response.json();
    console.table(data);
    expect(data).toEqual(
        expect.objectContaining({
            id: expect.any(Number),
            title: "foo",
            body: "bar",
            userId: 1
        })
    );
});

test("Update a post", async ({ request }) => {
    const updatedPost = {
        title: "updated title",
        body: "updated body",
        userId: 1
    };

    const response = await request.put(
        "/posts/1",
        {
            data: updatedPost,
            headers: {
                "Authorization": "Bearer YOUR_TOKEN_HERE",
                "Content-Type": "application/json"
            }
        });
    expect(response.status()).toBe(200);

    const data = await response.json();
    console.table(data);
    expect(data).toEqual(
        expect.objectContaining({
            id: 1,
            title: "updated title",
            body: "updated body",
            userId: 1
        })
    );
});

test("Delete a post", async ({ request }) => {
    const response = await request.delete("/posts/1");
    expect(response.status()).toBe(200);
});

test.describe("Scenario", () => {

    type resp = { resp: APIResponse, data: any[] }
    let initPostResp: resp = { resp: null as any, data: [] };
    let postResp: resp = { resp: null as any, data: [] };
    let updatePostResp: resp = { resp: null as any, data: [] };
    let deletePostResp: resp = { resp: null as any, data: [] };

    const newPost = {
        title: "foo",
        body: "bar",
        userId: 1
    };

    const updatedPost = {
        title: "updated title",
        body: "updated body",
        userId: 1
    };

    test.beforeAll(async ({ request }) => {

        // 1. Get init posts
        initPostResp.resp = await request.get("/posts");
        initPostResp.data = await initPostResp.resp.json();

        // 2. Create new post
        postResp.resp = await request.post("/posts", { data: newPost });
        postResp.data = await postResp.resp.json();

        // 3. Update the post
        updatePostResp.resp = await request.put("/posts/1", { data: updatedPost });
        updatePostResp.data = await updatePostResp.resp.json();

        // 4. Delete the post
        deletePostResp.resp = await request.delete("/posts/1");
        deletePostResp.data = await deletePostResp.resp.json();

    });

    test.describe("Validate GET /posts", () => {

        test("should response 200 OK", () => {
            expect(initPostResp.resp.status()).toBe(200);
            expect(initPostResp.resp.statusText()).toBe("OK");
        });

        test("should return post in correct format", async () => {
            const data = initPostResp.data;
            expect(data).toEqual(
                expect.arrayContaining([
                    expect.objectContaining({
                        id: expect.any(Number),
                        title: expect.any(String),
                        body: expect.any(String),
                        userId: expect.any(Number)
                    })
                ])
            );
        });

    });

    test.describe("Validate POST /posts", () => {

        test("should response 201 Created", () => {
            expect(postResp.resp.status()).toBe(201);
        });

        test("should create a new post", async () => {
            const data = postResp.data;
            expect(data).toEqual(
                expect.objectContaining({
                    id: expect.any(Number),
                    ...newPost
                })
            );
        });

    });

    test.describe("Validate PUT /posts/:id", () => {

        test("should response 200 OK", () => {
            expect(updatePostResp.resp.status()).toBe(200);
        });

        test("should update the post", async () => {
            const data = updatePostResp.data;
            expect(data).toEqual(
                expect.objectContaining({
                    id: 1,
                    ...updatedPost
                })
            );
        });

    });

    test.describe("Validate DELETE /posts/:id", () => {

        test("should response 200 OK", () => {
            expect(deletePostResp.resp.status()).toBe(200);
        });

        // test("should unable to get deleted post", async ({ request }) => {
        //     const response = await request.get(`/posts/${postResp.data!.id}`);
        //     expect(response.status()).toBe(404);
        // });



    });

});

/*

request withdraw from user1 wallet => user1Token => sucess
request withdraw from user1 wallet => user2Token => failed
*/

async function withdrawFromWallet(request: APIRequestContext, userToken: string, amount: number, branch: string) {
    // Implement the logic to withdraw from the wallet using the provided userToken and amount
    const req = await request.post(
        "endpoint",
        {
            data: {
                amount: amount,
                branch: branch
            },
            headers: {
                Authorization: `Bearer ${userToken}`
            }
        }
    )

    return req;
}

const user1Token = "YOUR_TOKEN_HERE"
const user2Token = "YOUR_TOKEN_HERE"
test("example", async ({ request }) => {
    const req1 = await withdrawFromWallet(request, user1Token, 100, "branch1");
    // validate 

    const req2 = await withdrawFromWallet(request, user2Token, 100, "branch1"); // failed
    const req3 = await withdrawFromWallet(request, user1Token, 100, "branch2"); // failed
})