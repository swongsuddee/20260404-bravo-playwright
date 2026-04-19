import { test as base } from "@playwright/test";
import { HomePage } from "../../pages/home-page/home-page";
import path from "path";
import { monthsEn } from "../../types/monthes";

base.use({
    baseURL: "https://www.thaiairways.com/"
});

const test = base.extend<{
    homepage: HomePage;
}>({
    homepage: async ({ page }, use) => {
        await page.goto("/th-th");

        await page.context().clearCookies();
        await page.context().addCookies([
            {
                name: "OptanonAlertBoxClosed",
                value: new Date().toISOString(),
                domain: ".thaiairways.com",
                path: "/",
            }
        ]);
        await page.reload();
        const homepage = new HomePage(page);

        await use(homepage);
    }
});

test("Search flights from CNX to HKT", async ({ homepage }) => {
    await homepage.flightSearch.selectFlightType("goAndReturn");
    await homepage.flightSearch.cities[0].airport.selectAirports({
        departure: "CNX",
        destination: "HKT"
    });
    await homepage.flightSearch.cities[0].flightDate.pickFlightDate({
        departDate: { date: 25, month: monthsEn.May, year: 2026 },
        returnDate: { date: 30, month: monthsEn.June, year: 2026 }
    });
    await homepage.flightSearch.passengerClass.selectPassengerClass({
        class: "business",
        adult: 1,
        child: 0,
        infant: 0
    });
    await homepage.flightSearch.clickSearchButton();
});