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
  const nextDate = new Date();
  nextDate.setDate(nextDate.getDate() + 3);
  const year = nextDate.getFullYear();
  const month = String(nextDate.getMonth() + 1).padStart(2, "0");
  const day = String(nextDate.getDate()).padStart(2, "0");
  const dateToSelect = `${year}-${month}-${day}`; // Format: YYYY-MM-DD

  // Actions
  await page.getByTestId(`day-${dateToSelect}`).click();

  // Assertion
  const selectedDate = await page.getByTestId("selected-date").innerText();
  expect(selectedDate).toBe(dateToSelect);

});

test("Example time assertion", async () => {
  const variance = 5 * 1000; // milliseconds
  const waitingTime = 4 * 1000;

  const startTime = new Date();
  await new Promise((resolve) => setTimeout(resolve, waitingTime)); // Simulate some operation taking time
  const endTime = new Date();

  const elapsedTimeInSeconds =
    Math.abs(endTime.getTime() - startTime.getTime()) / 1000;

  // Assertion
  expect(elapsedTimeInSeconds).toBeLessThanOrEqual(variance / 1000);
});
//#endregion

test("Date picker Thai Airways", async ({ page }) => {
  const url = "https://www.thaiairways.com/th-th/";
  await page.goto(url);

  // Close cookies consent
  await page.click("#onetrust-accept-btn-handler");

  // Close popup
  // await page.click(".evg-popup > button")

  // Select date & confirm
  await page.getByText('วันที่ไปวันที่กลับ').click()
  await page.locator(
    "xpath=//div[@aria-label='month  2026-04']//div[contains(@class, 'react-datepicker__day--016')]"
  ).click();
  await page.locator(
    "xpath=//div[@aria-label='month  2026-05']//div[contains(@class, 'react-datepicker__day--024')]"
  ).click();
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
  expect(startDate).toBe("16 เม.ย. 2026");
  expect(endDate).toBe("24 พ.ค. 2026");
});

// async function selectDate(element: Locator, date: number, month: monthTh, year: number) {
//   // 1. Select month
//   // 1.1. Check current month
//   const currentMonth = await element
//     .locator("css~=__current-month")
//     .locator(".react-datepicker__month")
//     .getAttribute("aria-label") || "";
//   const currentMonthValue = currentMonth.match(/(\d{4})-(\d{2})/);


//   // 2. Select date
//   // 3. Confirm
// }

// enum monthTh {
//   jan = "ม.ค.",
//   feb = "ก.พ.",
//   mar = "มี.ค.",
//   apr = "เม.ย.",
//   may = "พ.ค.",
//   jun = "มิ.ย.",
//   jul = "ก.ค.",
//   aug = "ส.ค.",
//   sep = "ก.ย.",
//   oct = "ต.ค.",
//   nov = "พ.ย.",
//   dec = "ธ.ค."
// }

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