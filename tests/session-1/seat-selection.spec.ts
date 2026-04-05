// spec: specs/playwright-playground-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';
import { SeatBookingPage } from '../pages/seat-booking.page';

test.describe('Session 1 - Seat Booking Locator Practice', () => {
  
  test('Seat selection and deselection behavior', async ({ page }) => {
    const seatBookingPage = new SeatBookingPage(page);

    // 1. Navigate to Session 1 seat booking page
    await seatBookingPage.goto();

    // Verify page loads with seat map visible
    await expect(seatBookingPage.seatMap).toBeVisible();
    
    // Verify all seats initially unselected
    await seatBookingPage.verifyNoSeatsSelected();
    
    // Verify confirm button is disabled
    await seatBookingPage.verifyConfirmButtonDisabled();

    // 2. Click an available seat (Seat 1A)
    await seatBookingPage.selectSeat('1A');
    
    // Verify seat appears in selected seats list
    await seatBookingPage.verifySeatInList('1A');
    
    // Verify price calculation updates (VAT and Total)
    await seatBookingPage.verifyPricing('220', '20');
    
    // Verify confirm button remains disabled (agreement not checked)
    await seatBookingPage.verifyConfirmButtonDisabled();

    // 3. Click the same seat again to deselect
    await seatBookingPage.selectSeat('1A');
    
    // Verify seat disappears from selected seats list
    await seatBookingPage.verifyNoSeatsSelected();
    
    // Verify price resets to 0
    await seatBookingPage.verifyPricing('0', '0');

    // 4. Select multiple available seats
    await seatBookingPage.selectMultipleSeats(['1A', '2B']);
    
    // Verify all seats appear in list
    await seatBookingPage.verifyMultipleSeatsSelected(['1A', '2B']);
    
    // Verify price calculation reflects multiple seats
    await seatBookingPage.verifyPricing('440', '40');
    
    // Verify each seat can be individually deselected
    await seatBookingPage.selectSeat('1A'); // Deselect 1A
    
    // Verify only 2B remains selected
    await seatBookingPage.verifySeatInList('2B');
    await seatBookingPage.verifySeatNotInList('1A');
    
    // Verify price reflects single seat
    await seatBookingPage.verifyPricing('220', '20');
  });
});