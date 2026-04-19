import { Locator } from "@playwright/test";
import { BaseComponent } from "../base-component";

export class BookingComponent extends BaseComponent {


}

class DepartureDestinationComponent extends BaseComponent {

    // Private properties : Can be accessed only in the same class
    private departureField: Locator = this.element.getByTitle("จาก");
    private departureInput: Locator = this.element.getByRole("textbox", { name: "จาก" });

    private destinationField: Locator = this.element.getByTitle("ถึง");
    private destinationInput: Locator = this.element.getByRole("textbox", { name: "ถึง" });

    private airportDropdown: Locator = this.element.locator("css=.dropdown-item");

    // Public properties : Can be accessed from outside the class
    public airports: AirpostDropdown = new AirpostDropdown(this.page, this.airportDropdown);

    public async selectDepartureAirport(airportCode: string): Promise<void> {
        await this.departureField.click();
        await this.departureInput.fill(airportCode);
        await this.airports.selectAirport(airportCode);
    }

    public async selectDestinationAirport(airportCode: string): Promise<void> {
        await this.destinationField.click();
        await this.destinationInput.fill(airportCode);
        await this.airports.selectAirport(airportCode);
    }

}

class AirpostDropdown extends BaseComponent {

    private dropdownItems: Locator = this.element.locator("xpath=//div[contains(@class, 'flex-column')]/div");

    public async selectAirport(airportCode: string): Promise<void> {
        await this.dropdownItems.getByText(airportCode).click();
    }

}

class FlighDateComponent extends BaseComponent {

    private boardingDateField: Locator = this.element.getByTitle("ขาไป-กลับ");

    private calendarLocator: Locator = this.element.locator("css=.react-datepicker");

    public calendar: Calendar = new Calendar(this.page, this.calendarLocator);

    public async pickFlightDate(
        boardingDate: { date: number; monthIndex: number; year: number },
        returnDate?: { date: number; monthIndex: number; year: number }
    ) {
        await this.boardingDateField.click();
        await this.selectBoardingDate(boardingDate.date, boardingDate.monthIndex, boardingDate.year);
        if (returnDate) {
            await this.selectReturnDate(returnDate.date, returnDate.monthIndex, returnDate.year);
        }
        await this.calendar.confirmCalendar();
    }

    async selectBoardingDate(date: number, monthIndex: number, year: number) {
        const targetMonthLabel = `${year}-${String(monthIndex + 1).padStart(2, "0")}`;
        const boardingMonthElement = await this.calendar.selectMonth(targetMonthLabel);
        const dateText = String(date).padStart(2, "0");
        await this.calendar.selectDate(boardingMonthElement, dateText);
    }

    async selectReturnDate(date: number, monthIndex: number, year: number) {
        const returnMonthLabel = `${year}-${String(monthIndex + 1).padStart(2, "0")}`;
        const returnMonthElement = await this.calendar.selectMonth(returnMonthLabel);
        const returnDateText = String(date).padStart(2, "0");
        await this.calendar.selectDate(returnMonthElement, returnDateText);
    }

}

class Calendar extends BaseComponent {

    private currentMonthLocator: Locator = this.element.locator("xpath=(//div[@class='react-datepicker__month'])[1]");
    private confirmButton: Locator = this.element.getByRole("button", { name: "ยืนยัน" });

    public async selectMonth(targetMonth: string): Promise<Locator> {
        const regexMonthFormat = /(\d{4})-(\d{2})/; // ex: month  2026-04

        // 1. get current display month
        const currentMonthText = await this.currentMonthLocator.getAttribute("aria-label");
        const monthNumber = currentMonthText?.match(regexMonthFormat)?.[0];

        // 2. if current month is not target month, click next month button
        if (monthNumber !== targetMonth) {
            const nextMonthButtonLocator = this.element.getByLabel("Next Month");
            await nextMonthButtonLocator.click();

            // 3. Recursively call selectMonth until the target month is found
            return this.selectMonth(targetMonth);
        }

        return this.currentMonthLocator;
    }

    public async selectDate(element: Locator, targetDate: string): Promise<void> {
        const dateLocator = element.locator(`xpath=//div[contains(@class, 'react-datepicker__day--0${targetDate}')]`).first();
        await dateLocator.click();
    }

    public async confirmCalendar(): Promise<void> {
        await this.confirmButton.click();
    }

}
