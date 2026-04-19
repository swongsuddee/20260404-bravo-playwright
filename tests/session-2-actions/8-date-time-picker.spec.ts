import test, { expect, Locator } from "@playwright/test";

//#region Date & time picker Operations
test("Date picker operation", async ({ page }) => {
  // Setup
  await page.goto(
    "/playwright-playground/sessions/session-2-basic-operations#2-6"
  );
  const nextDate = new Date();
  nextDate.setDate(nextDate.getDate() + 3);
  const year = nextDate.getFullYear();
  const month = String(nextDate.getMonth() + 1).padStart(2, "0");
  const day = String(nextDate.getDate()).padStart(2, "0");
  const dateToSelect = `${year}-${month}-${day}`; // Format: YYYY-MM-DD

  // Actions
  await page.getByTestId("input-date").fill(dateToSelect);

  // Assertion
  const selectedDate = await page.getByTestId("input-date").inputValue();
  expect(selectedDate).toBe(dateToSelect);
});

test("Custome date picker", async ({ page }) => {
  // Setup
  await page.goto(
    "/playwright-playground/sessions/session-2-basic-operations#2-6"
  );
  await page.getByTestId("toggle-custom-picker").check();
  const dateToSelect = `2026-02-12`;

  // Actions
  await page.getByTestId(`day-${dateToSelect}`).click();

  // Assertion
  const selectedDate = await page.getByTestId("selected-date").innerText();
  expect(selectedDate).toBe(dateToSelect);

});

test("Example time assertion", async () => {
  const variance = 5;
  const waitingTime = 4 * 1000;

  const startTime = new Date();
  await new Promise((resolve) => setTimeout(resolve, waitingTime)); // Simulate some operation taking time
  const endTime = new Date();

  const elapsedTimeInSeconds =
    Math.abs(endTime.getTime() - startTime.getTime()) / 1000;

  // Assertion
  expect(elapsedTimeInSeconds).toBeLessThanOrEqual(variance);
});
//#endregion

//#region Thai Airways example
test("Date picker Thai Airways", async ({ page }) => {
  const url = "https://www.thaiairways.com/th-th/";
  await page.goto(url);

  // Close cookies consent
  await page.click("#onetrust-accept-btn-handler");

  // Close popup
  // await page.click(".evg-popup > button")

  // Select date & confirm
  await page.getByTitle("ขาไป-กลับ").click();

  // Select date directly by specific date to locator
  // await page.locator(
  //   "xpath=//div[@aria-label='month  2026-04']//div[contains(@class, 'react-datepicker__day--016')]"
  // ).click();
  // await page.locator(
  //   "xpath=//div[@aria-label='month  2026-05']//div[contains(@class, 'react-datepicker__day--024')]"
  // ).click();

  // Change to this instead, using the selectDate function
  const datePicker = page.locator(".react-datepicker");

  const currentDate = new Date();
  const bordingDate = new Date(currentDate.setDate(currentDate.getDate() + 3));
  const returnDate = new Date(currentDate.setDate(currentDate.getDate() + 10));

  await pickFlightDate(
    datePicker,
    { date: bordingDate.getDate(), monthIndex: bordingDate.getMonth(), year: bordingDate.getFullYear() },
    { date: returnDate.getDate(), monthIndex: returnDate.getMonth(), year: returnDate.getFullYear() }
  );
  await page.getByRole("button", { name: "ยืนยัน" }).click();

  // Validate 
  const startDateLocator = page.locator(
    "xpath=//div[@title='ขาไป-กลับ']//div[text()='วันที่ไป']/../div[2]"
  );
  const endDateLocator = page.locator(
    "xpath=//div[@title='ขาไป-กลับ']//div[text()='ไป-กลับ']/../div[2]"
  );
  const startDate = await startDateLocator.textContent();
  const endDate = await endDateLocator.textContent();
  expect(startDate).toBe(`${bordingDate.getDate()} ${monthTh[bordingDate.getMonth()]} ${bordingDate.getFullYear()}`); // ex: "24 พ.ค. 2026"
  expect(endDate).toBe(`${returnDate.getDate()} ${monthTh[returnDate.getMonth()]} ${returnDate.getFullYear()}`); // ex: "24 พ.ค. 2026"
});

async function pickFlightDate(
  element: Locator,
  boardingDate: { date: number; monthIndex: number; year: number },
  returnDate?: { date: number; monthIndex: number; year: number }
) {

  // 0. Common function 
  async function selectMonth(targetMonth: string) {
    const regexMonthFormat = /(\d{4})-(\d{2})/; // ex: month  2026-04

    // 1. get current display month
    const currentMonthLocator = element.locator("xpath=(//div[@class='react-datepicker__month'])[1]")
    const currentMonthText = await currentMonthLocator.getAttribute("aria-label");
    const monthNumber = currentMonthText?.match(regexMonthFormat)?.[0];

    // 2. if current month is not target month, click next month button
    if (monthNumber !== targetMonth) {
      const nextMonthButtonLocator = element.getByLabel("Next Month");
      await nextMonthButtonLocator.click();

      // 3. Recursively call selectMonth until the target month is found
      return selectMonth(targetMonth);
    }

    return currentMonthLocator;
  }

  async function selectDate(element: Locator, targetDate: string) {
    const dateLocator = element.locator(`xpath=//div[contains(@class, 'react-datepicker__day--0${targetDate}')]`).first();
    await dateLocator.click();
  }

  // 1. Get current month
  const targetMonthLabel = `${boardingDate.year}-${String(boardingDate.monthIndex + 1).padStart(2, "0")}`;
  const boardingMonthElement = await selectMonth(targetMonthLabel);

  // 2. Select boarding date
  // 2.1 check if boarding date is in past
  if (new Date(boardingDate.year, boardingDate.monthIndex, boardingDate.date) < new Date()) {
    throw new Error("Boarding date is in the past");
  }
  const dateText = String(boardingDate.date).padStart(2, "0");
  await selectDate(boardingMonthElement, dateText);

  // 3. if no return date, exit function
  if (!returnDate) {
    return;
  }

  // 4. Select return date
  // 4.1 if return date is in past throw error
  if (new Date(returnDate.year, returnDate.monthIndex, returnDate.date) < new Date()) {
    throw new Error("Return date is in the past");
  }

  // 4.2 if return date is before boarding date throw error
  if (new Date(returnDate.year, returnDate.monthIndex, returnDate.date) < new Date(boardingDate.year, boardingDate.monthIndex, boardingDate.date)) {
    throw new Error("Return date is before boarding date");
  }

  // 4.3 if return date be in current month, continue next step
  // 4.4 if return date be in next month, continue next step
  // 4.5 if return date be in a more than next 2 months, select [>] button until found
  const returnMonthLabel = `${returnDate.year}-${String(returnDate.monthIndex + 1).padStart(2, "0")}`;
  const returnMonthElement = await selectMonth(returnMonthLabel);

  // 4.6 select return date
  const returnDateText = String(returnDate.date).padStart(2, "0");
  await selectDate(returnMonthElement, returnDateText);
}

enum monthTh {
  "ม.ค.", // index: 0
  "ก.พ.",
  "มี.ค.",
  "เม.ย.", // index: 3
  "พ.ค.",
  "มิ.ย.",
  "ก.ค.",
  "ส.ค.",
  "ก.ย.",
  "ต.ค.",
  "พ.ย.",
  "ธ.ค.", // index: 11
}
//#endregion

//#region Validate current time
test("Validate current time", async ({ page }) => {
  const url = "https://www.timeanddate.com/worldclock/";
  await page.goto(url);

  const timeLocator = page.locator("xpath=//div/a[@title='Bangkok']/following-sibling::span");
  const timeStr = await timeLocator.textContent();
  const time = convertTime(timeStr || "00:00:00"); // 00:00:00

  const variant = 5000;

  const currentTime = new Date();
  const currentTimeInHours = currentTime.getHours() + currentTime.getMinutes() / 60 + currentTime.getSeconds() / 3600;
  const timeDifference = Math.abs(time - currentTimeInHours) * 3600 * 1000;
  expect(timeDifference).toBeLessThanOrEqual(variant);
});

function convertTime(timeStr: string) {
  const timeDigits = timeStr?.match(/\d+/g);
  if (!timeDigits) {
    throw new Error("Time not found");
  }
  const time = Number(timeDigits[0]) + Number(timeDigits[1]) / 60 + Number(timeDigits[2]) / 3600;
  return time;
}
//#endregion