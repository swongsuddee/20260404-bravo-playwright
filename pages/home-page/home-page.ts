import { Locator } from "@playwright/test";
import { BasePage } from "../base-page"
import { BookingComponent } from "./booking-component";

export class HomePage extends BasePage {

    private bookingComponentElement: Locator = this.page.locator("css=.tg-tabs-custom-main-tab-container");

    public bookingComponent: BookingComponent = new BookingComponent(this.page, this.bookingComponentElement);


}