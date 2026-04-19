import { Locator, Page } from "@playwright/test";
import { BasePage } from "./base-page";

export class BaseComponent extends BasePage {

    protected element: Locator;

    constructor(page: Page, element: Locator) {
        super(page);
        this.element = element;
    }

}