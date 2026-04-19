import { Locator, Page } from "@playwright/test";
import { BaseComponent } from "../base-component";
import { flightClass } from "../../types/flight-classes";
import { monthsEn } from "../../types/monthes";
import { FlightTypes } from "../../types/flight-types";

export class SearchComponent extends BaseComponent {

    private multiCityFlightTab: Locator = this.page.getByTitle("Multi-city");
    private oneWayFlightTab: Locator = this.page.getByTitle("One-way");
    private returnFlightTab: Locator = this.page.getByTitle("Return");

    private addCityButton: Locator = this.element.getByText("เพิ่มเที่ยวบิน");
    private cityRowLocator: Locator = this.element.locator("xpath=//span[text()='เที่ยวบิน']/../following-sibling::*");
    private searchButton: Locator = this.element.locator("xpath=//button >> text=/ค้นหาเที่ยวบิน/");
    public cities: { airport: DepartureDestinationComponent, flightDate: FlightDateComponent }[] = [];
    public passengerClass: PassengerClass = new PassengerClass(this.page, this.element);

    constructor(page: Page, element: Locator) {
        super(page, element);

        this.cities.push({
            airport: new DepartureDestinationComponent(this.page, element),
            flightDate: new FlightDateComponent(this.page, element)
        });
    }

    public async selectFlightType(flightType: FlightTypes): Promise<void> {
        switch (flightType) {
            case "goAndReturn":
                await this.returnFlightTab.click();
                break;
            case "oneWay":
                await this.oneWayFlightTab.click();
                break;
            case "multiCity":
                await this.multiCityFlightTab.click();
                break;
        }
    }

    public async addCity(element?: Locator): Promise<void> {
        const elementCount = await this.cityRowLocator.count();
        if (elementCount <= this.cities.length) {
            await this.addCityButton.click();
        }
        this.cities.push({
            airport: new DepartureDestinationComponent(this.page, element || this.cityRowLocator.nth(this.cities.length)),
            flightDate: new FlightDateComponent(this.page, element || this.cityRowLocator.nth(this.cities.length))
        });
    }

    public async clickSearchButton(): Promise<void> {
        await this.searchButton.click();
    }

    public removeCity(index: number): void {
        // Not implemented yet 
        this.cities.splice(index, 1);
    }
}

class DepartureDestinationComponent extends BaseComponent {

    // Private properties : Can be accessed only in the same class
    private departureField: Locator = this.element.getByTitle("จาก").first();
    private departureInput: Locator = this.element.locator("css=#input-box-from").first();
    private departureCode: Locator = this.departureInput.locator("xpath=/parent::*/span")

    private destinationField: Locator = this.element.getByTitle("ถึง").first();
    private destinationInput: Locator = this.element.locator("css=#input-box-to").first();

    private switch: Locator = this.element.getByTitle("reverse airports").first();

    private airportDropdown: Locator = this.element.locator("css=.dropdown-item").first();

    // Public properties : Can be accessed from outside the class
    public airports: AirpostDropdown = new AirpostDropdown(this.page, this.airportDropdown);

    public async selectAirports(
        data: {
            departure: string;
            destination?: string;
        }
    ) {
        await this.selectDepartureAirport(data.departure);
        if (data.destination) {
            await this.selectDestinationAirport(data.destination);
        }
    }

    public async selectDepartureAirport(airportCode: string, options?: { outFocus?: boolean }): Promise<void> {
        const isVisible = await this.departureInput.isVisible();
        if (!isVisible) {
            await this.departureField.click();
        }

        const currentCity = (await this.departureCode.textContent())?.trim();
        if (currentCity === airportCode) {
            return;
        }

        await this.departureInput.fill(airportCode);
        await this.airports.selectAirport(airportCode);
        if (options?.outFocus) {
            await this.page.keyboard.press("Enter");
        }
    }

    public async selectDestinationAirport(airportCode: string, options?: { outFocus?: boolean }): Promise<void> {
        const isVisible = await this.destinationInput.isVisible();
        if (!isVisible) {
            await this.destinationField.click();
        }
        await this.destinationInput.fill(airportCode);
        await this.airports.selectAirport(airportCode);
        if (options?.outFocus) {
            await this.page.keyboard.press("Enter");
        }
    }

    public async switchDepartureAndDestination(): Promise<void> {
        await this.switch.click();
    }
}

class AirpostDropdown extends BaseComponent {

    private dropdownItems: Locator = this.element;

    public async selectAirport(airportCode: string): Promise<void> {
        await this.dropdownItems.getByText(airportCode).click();
    }

}

class FlightDateComponent extends BaseComponent {

    private departDateField: Locator = this.element.getByText("วันที่ไป").first();

    private calendarLocator: Locator = this.element.locator("css=.booking-widget-overlay");

    public calendar: Calendar = new Calendar(this.page, this.calendarLocator);

    public async pickFlightDate(
        data: {
            departDate: { date: number; month: monthsEn; year: number },
            returnDate?: { date: number; month: monthsEn; year: number }
        }
    ) {
        await this.departDateField.click();
        await this.selectDepartDate(data.departDate.date, data.departDate.month, data.departDate.year);
        if (data.returnDate) {
            await this.selectReturnDate(data.returnDate.date, data.returnDate.month, data.returnDate.year);
        }
        await this.calendar.confirmCalendar();
    }

    private async selectDepartDate(date: number, monthIndex: number, year: number) {
        const targetMonthLabel = `${year}-${String(monthIndex + 1).padStart(2, "0")}`;
        const departMonthElement = await this.calendar.selectMonth(targetMonthLabel);
        const dateText = String(date).padStart(2, "0");
        await this.calendar.selectDate(departMonthElement, dateText);
    }

    private async selectReturnDate(date: number, monthIndex: number, year: number) {
        const returnMonthLabel = `${year}-${String(monthIndex + 1).padStart(2, "0")}`;
        const returnMonthElement = await this.calendar.selectMonth(returnMonthLabel);
        const returnDateText = String(date).padStart(2, "0");
        await this.calendar.selectDate(returnMonthElement, returnDateText);
    }

}

class Calendar extends BaseComponent {

    private currentMonthLocator: Locator = this.element.locator("xpath=(//div[@class='react-datepicker__month'])[1]");
    private confirmButton: Locator = this.element.getByRole("button", { name: "ยืนยัน" });
    private dateLocatorString: string = "xpath=//div[contains(@class, 'react-datepicker__day--0${targetDate}') and not(contains(@class, 'react-datepicker__day--outside-month'))]";

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
        const dateString = this.dateLocatorString.replace("${targetDate}", targetDate);
        const dateLocator = this.element.locator(dateString).first();
        await dateLocator.click();
    }

    public async confirmCalendar(): Promise<void> {
        await this.confirmButton.click();
    }

}

class PassengerClass extends BaseComponent {

    private passengerClassFieldLocator: Locator = this.element.getByRole("searchbox", { name: "passengerclass" });
    private passengerClassWidgetLocator: Locator = this.element.locator("css=.booking-widget-overlay");

    public classDropdown: ClassDropdown = new ClassDropdown(this.page, this.passengerClassWidgetLocator);

    public async selectPassengerClass(
        data: {
            class: flightClass,
            adult: number,
            child: number,
            infant: number
        }
    ): Promise<void> {
        const isVisible = await this.passengerClassWidgetLocator.isVisible();
        if (!isVisible) {
            await this.passengerClassFieldLocator.click();
        }
        await this.classDropdown.selectClass(data.class);
        await this.classDropdown.confirmPassengerClass();

        await this.classDropdown.adjustAdult(data.adult);
        await this.classDropdown.adjustChild(data.child);
        await this.classDropdown.adjustInfant(data.infant);
    }

}

class ClassDropdown extends BaseComponent {

    private economyChoiceLocator: Locator = this.element.getByText("ชั้นประหยัด, พรีเมียมอีโคโนมี");
    private businessChoiceLocator: Locator = this.element.getByText("Premium Economy Plus, Business & First");
    private confirmButtonLocator: Locator = this.element.getByRole("button", { name: "ยืนยัน" });

    public async selectClass(flightClass: flightClass): Promise<void> {
        switch (flightClass) {
            case "economy":
                await this.economyChoiceLocator.click();
                break;
            case "business":
                await this.businessChoiceLocator.click();
                break;
        }
    }

    public async adjustAdult(count: number): Promise<void> {
        // Not implemented yet
    }

    public async adjustChild(count: number): Promise<void> {
        // Not implemented yet
    }

    public async adjustInfant(count: number): Promise<void> {
        // Not implemented yet
    }

    public async confirmPassengerClass(): Promise<void> {
        await this.confirmButtonLocator.click();
    }

}
export { monthsEn };

