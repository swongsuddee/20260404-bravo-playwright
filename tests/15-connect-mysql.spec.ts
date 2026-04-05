import test from "@playwright/test";
import { connect, disconnect } from "../mysql/connect-mysql";
import { addUser, deleteUser, getUsers } from "../mysql/user-table";

test.beforeAll(async () => {
    await connect();
});

test("test connection to MySQL", async () => {
    const rows = await getUsers();
    console.log(rows);
});

test("add a new user", async () => {
    const currentTime = new Date().getTime();
    const result = await addUser(`user_${currentTime}@example.com`, "hashed_pw_2", "Bob Smith");
    console.log(result);
});

test("delete a user", async () => {
    const rows = await getUsers();
    const userId = rows[rows.length - 1].id;
    const result = await deleteUser(userId);
    console.log(result);
});

test.afterAll(async () => {
    await disconnect();
});
