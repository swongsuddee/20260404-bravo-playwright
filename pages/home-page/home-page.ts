import { Locator } from "@playwright/test";
import { BasePage } from "../base-page";
import { SearchComponent } from "./flight-search-component";

export class HomePage extends BasePage {
    private searchLocator: Locator = this.page.getByTitle("จองเที่ยวบิน");

    public flightSearch: SearchComponent = new SearchComponent(this.page, this.searchLocator);
}
