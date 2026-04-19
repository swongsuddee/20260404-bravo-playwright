# Synchronous vs Asynchronous

These words describe how tasks happen over time.

## 1. Simple Meaning

### Synchronous

- Do one task first.
- Wait for it to finish.
- Then start the next task.
- Everything happens in order, one by one.

Example:

- brush teeth -> finish
- wear clothes -> finish
- leave home

Simple timeline:

```text
|---t1---|
         |---t2---|
                  |---t3---|
```

This means:

- `t1` finishes before `t2` starts
- `t2` finishes before `t3` starts

### Asynchronous

- A task starts, but it does not always block everything else.
- While one task is waiting, another task can continue.
- Multiple tasks can make progress during the same overall period.

Example:

- start boiling water
- while waiting, prepare the bowl
- while waiting, open seasoning packets
- when water is ready, add noodles

Simple timeline:

```text
|---t1---------|
|---t2---|
     |---t3---|
```

This means some tasks overlap in time or take turns making progress.

## 2. Why Asynchronous Can Be Better

Asynchronous work can be better when one task has to wait.

If task `A` is slow, synchronous code may force task `B` and task `C` to wait behind it.
With asynchronous work, `B` and `C` may continue while `A` is waiting.

That means:

- shorter tasks can finish sooner
- the program feels more responsive
- the CPU or runtime does not stay idle while waiting

## 3. What `await` Means

- `await` means "wait here until this async task is finished"
- it is used with asynchronous code
- it makes async code easier to read because it looks step-by-step

Example:

```ts
await task1();
await task2();
```

This means:

- start `task1`
- wait until `task1` is done
- start `task2`
- wait until `task2` is done

Even though JavaScript supports asynchronous work, `await` makes this part behave in sequence.

## 4. In Playwright

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

If you do not use `await`, the next line may run too early.
That can cause errors because the previous action is not finished yet.

## 5. Real-World Cases

### Web browser

- loading HTML
- downloading images
- waiting for API responses
- reacting to button clicks

If everything were synchronous, one slow request could freeze the page.

### Web server

- receive request A
- while waiting for the database, handle request B
- while waiting for another network call, handle request C

This improves responsiveness and throughput.

### Operating system

- one app is waiting for disk
- another app uses CPU
- another app is waiting for network

The scheduler keeps the machine responsive by giving different tasks time to run.

### Node.js / JavaScript runtime

- send HTTP request
- wait for file read
- wait for timer
- continue other work through the event loop

This is why JavaScript can handle many operations without blocking on each one.

### Playwright tests

- open page
- wait for element
- click button
- wait for response

These are asynchronous because the browser needs time for each action.

## 6. Advanced Example

The example below is harder than the sections above, so treat it as a deeper mental model.

In this section, a `worker` means one lane of execution that is doing work over time.
You can think of it as "one thing that can process tasks right now."

Initial state:

| Thread | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Worker 1 |  |  |  |  |  |  |  |  |  |  |  |  |  |  |

User command creates 3 tasks:

| Task | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | Note |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| A |  | A | A | A | A | A | A |  |  |  |  |  |  |  | created at clock 1, needs 6 clocks |
| B |  |  |  | B | B | B |  |  |  |  |  |  |  |  | created at clock 3, needs 3 clocks |
| C |  |  |  |  | C | C | C | C |  |  |  |  |  |  | created at clock 4, needs 4 clocks |

Synchronous timeline:

| Thread | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Worker 1 |  | A | A | A | A | A | A | B | B | B | C | C | C | C |

task A runs from clock 1 to clock 6
task B runs from clock 7 to clock 9
task C runs from clock 10 to clock 13

Asynchronous timeline:

| Thread | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Worker 1 |  | A | A | A | B | A | B | C | A | B | C | A | B | C |

task A starts first
task B gets CPU time soon after it is created
task C also starts before task A is fully finished
task B completes earlier than in the synchronous timeline

In the synchronous example, task `A` blocks everything behind it.
In the asynchronous example, the worker can switch between ready tasks, so shorter work like `B` does not have to wait until `A` is fully done.

## 7. Name of the Algorithm

The asynchronous timeline above is similar to a **Round Robin scheduling** idea.

Round Robin means:

- each ready task gets a small time slice
- after using its slice, the CPU can switch to another ready task
- this helps shorter tasks get a chance earlier instead of waiting behind one long task

Your example:

```text
-AAABABCABCABC
```

shows this idea:

- `A` starts first because it arrives first
- `B` joins later and still gets CPU time early
- `C` joins later and also gets turns
- the CPU rotates across available work instead of finishing `A` completely first

Strictly speaking, real asynchronous programming is not always exactly the same as CPU Round Robin scheduling.
But as a learning model, it helps explain why smaller tasks can finish earlier.

## Short Summary

- `synchronous` = one task at a time, in order
- `asynchronous` = tasks can overlap or take turns making progress
- `await` = wait until an async task finishes
- asynchronous work is useful when tasks spend time waiting
- your advanced example is similar to a Round Robin scheduling idea
