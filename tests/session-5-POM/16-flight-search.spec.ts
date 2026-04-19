import test from "@playwright/test";
import { monthsEn } from "../../pages/home-page/flight-search-component";
import { HomePage } from "../../pages/home-page/home-page";

test.use({
    baseURL: "https://www.thaiairways.com/",
});

test("Search flights from CNX to HKT", async ({ page }) => {
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

    const homepage: HomePage = new HomePage(page);

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

test("Search multi-city flights CNX to HKT and BKK", async ({ page }) => {
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

    const homepage: HomePage = new HomePage(page);

    await homepage.flightSearch.selectFlightType("multiCity");
    await homepage.flightSearch.cities[0].airport.selectAirports({
        departure: "CNX",
        destination: "HKT"
    });
    await homepage.flightSearch.cities[0].flightDate.pickFlightDate({
        departDate: { date: 25, month: monthsEn.May, year: 2026 }
    });

    await homepage.flightSearch.addCity();
    await homepage.flightSearch.cities[1].airport.selectAirports({
        departure: "HKT",
        destination: "BKK"
    });
    await homepage.flightSearch.cities[1].flightDate.pickFlightDate({
        departDate: { date: 28, month: monthsEn.May, year: 2026 }
    });

    await homepage.flightSearch.clickSearchButton();
});
