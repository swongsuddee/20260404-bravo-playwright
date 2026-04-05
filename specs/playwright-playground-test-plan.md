# Playwright Playground Test Plan

## Application Overview

Comprehensive test design for the Playwright training playground site at https://swongsuddee.github.io/playwright-playground/. This playground contains educational sessions designed to teach Playwright fundamentals through realistic UI interactions. The test plan covers both functional correctness and educational value for Playwright learners.

## Test Scenarios

### 1. Session 1 - Seat Booking Locator Practice

**Seed:** `tests/seed.spec.ts`

#### 1.1. Seat selection and deselection behavior

**File:** `tests/session-1/seat-selection.spec.ts`

**Steps:**
  1. Navigate to Session 1 seat booking page
    - expect: Page loads with seat map visible
    - expect: All seats initially unselected
    - expect: Confirm button is disabled
  2. Click an available seat (e.g., Seat 1A)
    - expect: Seat becomes selected (aria-pressed=true)
    - expect: Seat appears in selected seats list
    - expect: Price calculation updates (VAT and Total)
    - expect: Confirm button remains disabled (agreement not checked)
  3. Click the same seat again to deselect
    - expect: Seat becomes unselected (aria-pressed=false)
    - expect: Seat disappears from selected seats list
    - expect: Price resets to 0
    - expect: Selected seats shows 'No seats selected'
  4. Select multiple available seats
    - expect: All selected seats show aria-pressed=true
    - expect: All seats appear in list
    - expect: Price calculation reflects multiple seats
    - expect: Each seat can be individually deselected

#### 1.2. Taken seat restrictions

**File:** `tests/session-1/taken-seats.spec.ts`

**Steps:**
  1. Attempt to click disabled/taken seats (5C, 5D)
    - expect: Seats remain disabled
    - expect: No selection occurs
    - expect: Seats list unchanged
    - expect: Price unchanged
  2. Verify taken seats visual state
    - expect: Taken seats are visually disabled
    - expect: Taken seats cannot receive focus
    - expect: Hover on taken seats shows no interaction cursor

#### 1.3. Confirm button enablement logic

**File:** `tests/session-1/confirm-logic.spec.ts`

**Steps:**
  1. Check 'I agree' checkbox without selecting seats
    - expect: Confirm button remains disabled
    - expect: Status message explains requirement
  2. Select seat(s) without checking 'I agree'
    - expect: Confirm button remains disabled
    - expect: Status message explains both requirements
  3. Select seat(s) AND check 'I agree'
    - expect: Confirm button becomes enabled
    - expect: Status message updates or disappears
  4. Uncheck 'I agree' after both conditions met
    - expect: Confirm button becomes disabled again

#### 1.4. Movie and date selection

**File:** `tests/session-1/movie-date.spec.ts`

**Steps:**
  1. Change movie selection from default
    - expect: Movie dropdown reflects new selection
    - expect: Selected value updates in form state
  2. Modify date field
    - expect: Date input accepts valid dates
    - expect: Invalid formats are rejected or auto-corrected

#### 1.5. Redeem code functionality

**File:** `tests/session-1/redeem-code.spec.ts`

**Steps:**
  1. Enter a redeem code (e.g., SAVE50)
    - expect: Code is accepted in input field
    - expect: Discount calculation may update (if implemented)
    - expect: Price totals reflect discount
  2. Test various redeem code formats
    - expect: Valid codes are processed
    - expect: Invalid codes are handled gracefully
    - expect: Empty codes are handled properly

#### 1.6. Price calculation accuracy

**File:** `tests/session-1/price-calculation.spec.ts`

**Steps:**
  1. Select 1 seat and verify base price
    - expect: Base price displays correctly
    - expect: VAT (10%) calculates properly
    - expect: Total = base + VAT
  2. Select multiple seats and verify scaling
    - expect: Price scales linearly with seat count
    - expect: VAT percentage remains consistent
    - expect: Total calculation remains accurate
  3. Apply discount code if functional
    - expect: Discount applies to base price
    - expect: VAT recalculates on discounted amount
    - expect: Total reflects all adjustments

### 2. Session 2 - Basic Operations Practice

**Seed:** `tests/seed.spec.ts`

#### 2.1. Click and Mouse Operations (2.1)

**File:** `tests/session-2/click-mouse.spec.ts`

**Steps:**
  1. Navigate to Session 2, section 2.1
    - expect: Click operations interface displays
    - expect: Save, Double-click, and Hover buttons visible
    - expect: Status shows 'Idle'
  2. Click Save button
    - expect: Status text changes from 'Idle' to 'Saved'
    - expect: Button remains enabled for repeated clicks
  3. Double-click the double-click designated button
    - expect: Status updates to reflect double-click action
    - expect: Single clicks are distinguished from double-clicks
  4. Hover over hover-target element
    - expect: Tooltip or hover feedback appears
    - expect: Status may update to show hover state
  5. Toggle 'Enable buttons' checkbox
    - expect: When unchecked, buttons become disabled
    - expect: When checked, buttons become enabled
    - expect: Disabled buttons don't respond to clicks

#### 2.2. Text Input and Keyboard Operations (2.2)

**File:** `tests/session-2/text-input.spec.ts`

**Steps:**
  1. Navigate to section 2.2
    - expect: Text input fields are visible
    - expect: Various input types available for testing
  2. Fill standard text input with sample data
    - expect: Text appears in field as typed
    - expect: Input value is retrievable
    - expect: Placeholder text is replaced
  3. Test keyboard operations (Tab, Enter, Escape)
    - expect: Tab navigates between fields
    - expect: Enter submits or activates default action
    - expect: Escape cancels or clears input
  4. Test special character input
    - expect: Unicode characters are handled
    - expect: Special symbols are preserved
    - expect: Text length limits are enforced

#### 2.3. Reading Text and Values (2.3)

**File:** `tests/session-2/read-values.spec.ts`

**Steps:**
  1. Navigate to section 2.3
    - expect: Elements with readable text/values are present
    - expect: Different content types available (text, input values, attributes)
  2. Read various text content types
    - expect: innerText retrieval works accurately
    - expect: textContent includes hidden elements
    - expect: Input values are readable
  3. Verify attribute value reading
    - expect: data-* attributes are accessible
    - expect: aria-* attributes are readable
    - expect: Standard HTML attributes are available

#### 2.4. Element State and Visibility (2.4)

**File:** `tests/session-2/element-state.spec.ts`

**Steps:**
  1. Navigate to section 2.4
    - expect: Elements in various states (enabled/disabled, visible/hidden)
    - expect: Toggle controls to change states
  2. Test visibility detection
    - expect: Visible elements are detected as visible
    - expect: Hidden elements (display:none, visibility:hidden) detected as hidden
    - expect: Elements outside viewport handled correctly
  3. Test enabled/disabled state detection
    - expect: Enabled elements respond to interactions
    - expect: Disabled elements reject interactions
    - expect: State changes are detectable
  4. Test element presence vs visibility
    - expect: Present but hidden elements are distinguishable
    - expect: Non-existent elements throw appropriate errors
    - expect: Loading states are handled

#### 2.5. Select, Checkbox, Radio and Dropdown (2.5)

**File:** `tests/session-2/form-controls.spec.ts`

**Steps:**
  1. Navigate to section 2.5
    - expect: Form controls interface displays
    - expect: Native select, checkboxes, radio buttons, and custom dropdowns visible
    - expect: Initial state values are readable
  2. Test native select dropdown (Seat type)
    - expect: Options can be selected by value
    - expect: Options can be selected by index
    - expect: Options can be selected by visible text
    - expect: Selected value updates in observed state
  3. Test checkbox (Add meal)
    - expect: Checkbox can be checked/unchecked
    - expect: Checked state reflects in observed state
    - expect: Label click toggles checkbox
  4. Test radio buttons (Payment: Card/Cash)
    - expect: Only one radio can be selected at a time
    - expect: Selecting one deselects others in group
    - expect: Selected value updates in observed state
  5. Test native multiple select (Languages)
    - expect: Multiple options can be selected simultaneously
    - expect: Selected options array is maintained
    - expect: Deselection removes from array
  6. Test custom dropdown (Country)
    - expect: Custom dropdown opens on click
    - expect: Options are selectable
    - expect: Selection updates button text and state
    - expect: Dropdown closes after selection
  7. Test custom multiple dropdown with limit (Tags - max 3)
    - expect: Up to 3 options can be selected
    - expect: 4th selection is ignored/rejected
    - expect: Selected tags are visually indicated
    - expect: Tags can be deselected individually

#### 2.6. Date and Time Picker (2.6)

**File:** `tests/session-2/date-time.spec.ts`

**Steps:**
  1. Navigate to section 2.6
    - expect: Date/time picker interface is visible
    - expect: Current date/time values are displayed
  2. Test date input methods
    - expect: Direct text input accepts valid dates
    - expect: Date picker popup works (if available)
    - expect: Invalid dates are rejected
    - expect: Date format is consistent
  3. Test time input methods
    - expect: Time input accepts valid times
    - expect: 12/24 hour formats are supported
    - expect: Invalid times are handled gracefully

#### 2.7. Toggle Button Custom UI (2.7)

**File:** `tests/session-2/toggle-button.spec.ts`

**Steps:**
  1. Navigate to section 2.7
    - expect: Custom toggle button(s) are visible
    - expect: Initial toggle state is determinable
  2. Toggle button state
    - expect: Visual state changes on click
    - expect: Aria-pressed or similar attribute toggles
    - expect: State persists until changed
    - expect: Multiple toggles operate independently
  3. Test accessibility attributes
    - expect: Screen reader compatible attributes present
    - expect: Keyboard navigation works
    - expect: Focus indicators are visible

#### 2.8. Upload Image (2.8)

**File:** `tests/session-2/upload-image.spec.ts`

**Steps:**
  1. Navigate to section 2.8
    - expect: File upload interface is present
    - expect: Upload button or drag-drop area visible
  2. Test image file upload
    - expect: File selection dialog opens
    - expect: Selected file name is displayed
    - expect: File type validation works
    - expect: Upload progress indication (if applicable)
  3. Test invalid file type upload
    - expect: Non-image files are rejected
    - expect: Error message is displayed
    - expect: Upload area resets appropriately

#### 2.9. Download File/Image (2.9)

**File:** `tests/session-2/download-file.spec.ts`

**Steps:**
  1. Navigate to section 2.9
    - expect: Download interface is visible
    - expect: Download links/buttons are present
  2. Initiate file download
    - expect: Download starts when clicked
    - expect: File is saved to expected location
    - expect: Download completes successfully
  3. Test different file type downloads
    - expect: Various file formats download correctly
    - expect: File names are preserved
    - expect: File sizes match expectations

#### 2.10. Scroll Into View (2.10)

**File:** `tests/session-2/scroll-view.spec.ts`

**Steps:**
  1. Navigate to section 2.10
    - expect: Scrollable area or off-screen elements present
    - expect: Initial viewport position is known
  2. Trigger scroll to specific elements
    - expect: Target element becomes visible in viewport
    - expect: Page scrolls to appropriate position
    - expect: Element is interactable after scroll
  3. Test smooth vs instant scrolling
    - expect: Different scroll behaviors work as expected
    - expect: No elements are missed during scroll
    - expect: Scroll position is stable

#### 2.11. Colossal Carousel (2.11)

**File:** `tests/session-2/carousel.spec.ts`

**Steps:**
  1. Navigate to section 2.11
    - expect: Carousel interface is visible
    - expect: Navigation controls are present
    - expect: Initial slide/item is displayed
  2. Test carousel navigation
    - expect: Next/Previous buttons work correctly
    - expect: Navigation wraps appropriately at boundaries
    - expect: Direct slide navigation works (if available)
    - expect: Current position indicator updates
  3. Test carousel content interaction
    - expect: Items within carousel are interactable
    - expect: Content loads properly for all slides
    - expect: Performance remains smooth with many items
  4. Test carousel accessibility
    - expect: Keyboard navigation works
    - expect: Screen reader compatibility
    - expect: Focus management during navigation
