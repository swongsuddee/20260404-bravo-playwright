import { type Locator, type Page, expect } from '@playwright/test';

export class SeatBookingPage {
  readonly page: Page;
  readonly seatMap: Locator;
  readonly selectedSeatsList: Locator;
  readonly confirmButton: Locator;
  readonly agreeCheckbox: Locator;
  readonly movieDropdown: Locator;
  readonly dateInput: Locator;
  readonly redeemInput: Locator;
  readonly discountValue: Locator;
  readonly vatValue: Locator;
  readonly totalValue: Locator;
  readonly noSeatsMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.seatMap = page.getByRole('grid', { name: 'Seat map' });
    this.selectedSeatsList = page.getByTestId('seat-list');
    this.confirmButton = page.getByTestId('confirm-button');
    this.agreeCheckbox = page.getByTestId('agree-checkbox');
    this.movieDropdown = page.getByRole('combobox', { name: 'Movie' });
    this.dateInput = page.getByRole('textbox', { name: 'Date' });
    this.redeemInput = page.getByTestId('redeem-input');
    this.discountValue = page.locator('strong').nth(0); // First strong element (Discount)
    this.vatValue = page.locator('strong').nth(1); // Second strong element (VAT)
    this.totalValue = page.locator('strong').nth(2); // Third strong element (Total)
    this.noSeatsMessage = page.getByText('No seats selected');
  }

  async goto() {
    await this.page.goto('https://swongsuddee.github.io/playwright-playground/sessions/session-1-locators');
  }

  async selectSeat(seatId: string) {
    await this.page.getByTestId(`seat-${seatId}`).click();
  }

  async getSeat(seatId: string) {
    return this.page.getByTestId(`seat-${seatId}`);
  }

  async verifySeatSelected(seatId: string) {
    const seat = this.getSeat(seatId);
    await expect(seat).toHaveAttribute('aria-pressed', 'true');
    await expect(this.selectedSeatsList.getByText(seatId)).toBeVisible();
  }

  async verifySeatDeselected(seatId: string) {
    const seat = this.getSeat(seatId);
    await expect(seat).toHaveAttribute('aria-pressed', 'false');
  }

  async verifyNoSeatsSelected() {
    await expect(this.noSeatsMessage).toBeVisible();
  }

  async verifyPricing(expectedTotal: string, expectedVat: string) {
    await expect(this.totalValue).toHaveText(expectedTotal);
    await expect(this.vatValue).toHaveText(expectedVat);
  }

  async verifyConfirmButtonDisabled() {
    await expect(this.confirmButton).toBeDisabled();
  }

  async verifyConfirmButtonEnabled() {
    await expect(this.confirmButton).toBeEnabled();
  }

  async checkAgreeCheckbox() {
    await this.agreeCheckbox.check();
  }

  async uncheckAgreeCheckbox() {
    await this.agreeCheckbox.uncheck();
  }

  async selectMultipleSeats(seatIds: string[]) {
    for (const seatId of seatIds) {
      await this.selectSeat(seatId);
    }
  }

  async verifyMultipleSeatsSelected(seatIds: string[]) {
    for (const seatId of seatIds) {
      await expect(this.selectedSeatsList.getByText(seatId)).toBeVisible();
    }
  }

  async verifySeatInList(seatId: string) {
    await expect(this.selectedSeatsList.getByText(seatId)).toBeVisible();
  }

  async verifySeatNotInList(seatId: string) {
    await expect(this.selectedSeatsList.getByText(seatId)).not.toBeVisible();
  }
}