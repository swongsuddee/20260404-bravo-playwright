# Synchronous vs Asynchronous

These words describe how tasks happen over time.

## 1. Synchronous

- Do one task first.
- Wait for it to finish.
- Then start the next task.
- Everything happens in order, one by one.

Example:

- brush teeth -> finish
- wear clothes -> finish
- leave home

Timeline:

```text
|---t1---|
         |---t2---|
                  |---t3---|
```

This means:

- `t1` finishes before `t2` starts
- `t2` finishes before `t3` starts

## 2. Asynchronous

- A task starts, but the program does not always block everything.
- Another task can happen while the first task is still in progress.
- This is useful for things that take time, like loading a page, waiting for a button, or reading data from a server.

Timeline:

```text
|---t1---------|
|---t2---|
     |---t3---|
```

This means some tasks overlap in time.

## 3. What `await` Means

- `await` = "wait here until this async task is finished"
- It is used with asynchronous code.
- It makes the code easier to read because it looks step-by-step.

Example idea:

```ts
await task1;
await task2;
```

Timeline:

```text
await |---t1---|
await          |---t2---|
```

This means:

- start `task1`
- wait until `task1` is done
- start `task2`
- wait until `task2` is done

## 4. Simple Real-Life Example

Synchronous:

- boil water -> finish
- add noodles -> finish
- eat

Asynchronous:

- start boiling water
- while waiting, prepare the bowl
- when water is ready, add noodles

## 5. In Playwright

Most browser actions are asynchronous because the browser needs time.

Example:

```ts
await page.goto("https://example.com");
await page.click("button");
await page.fill("#name", "John");
```

Why use `await` here?

- `page.goto()` needs time to open the page
- `page.click()` needs time to perform the click
- `page.fill()` needs time to type into the input

If you do not use `await`, the next line may run too early. That can cause errors because the previous action is not finished yet.

## Short Summary

- `synchronous` = one task at a time, in order
- `asynchronous` = tasks can take time and may overlap
- `await` = wait until an async task finishes
