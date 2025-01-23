import { test, expect } from '@playwright/test';

test.describe('Users Component', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to users page before each test
    await page.goto('/users');
    // Wait for the table to be visible
    await expect(page.getByTestId('user-list-table')).toBeVisible();
  });

  test('should display user list with all elements', async ({ page }) => {
    // Check if main container exists
    await expect(page.getByTestId('user-list-entry')).toBeVisible();

    // Verify filter section
    await expect(page.getByTestId('filter-field')).toBeVisible();
    await expect(page.getByTestId('filter-label')).toBeVisible();
    await expect(page.getByTestId('filter-input')).toBeVisible();

    // Verify table headers
    await expect(page.getByTestId('first-name-header')).toBeVisible();
    await expect(page.getByTestId('last-name-header')).toBeVisible();
    await expect(page.getByTestId('age-header')).toBeVisible();
    await expect(page.getByTestId('address-header')).toBeVisible();

    // Verify paginator
    await expect(page.getByTestId('user-list-paginator')).toBeVisible();

    // Verify that table rows exist
    const rows = page.getByTestId('user-list-row');
    await expect(rows.first()).toBeVisible();
    expect(await rows.count()).toBeGreaterThan(0);
  });

  test('should filter users by name', async ({ page }) => {
    const filterInput = page.getByTestId('filter-input');

    // Type search term
    await filterInput.fill('Michael');
    await filterInput.press('Enter');
    await page.waitForTimeout(500); // Wait for filter to apply

    // Check if filtered results are displayed
    const rows = page.getByTestId('user-list-row');
    await expect(rows.first()).toBeVisible();
    expect(await rows.count()).toBe(1); // Assuming one user named Michael

    // Verify the filtered row contains 'Michael'
    const firstNameCell = page.getByTestId('first-name-cell').first();
    await expect(firstNameCell).toContainText('Michael');

    // Clear filter and verify all users are shown
    await filterInput.clear();
    await filterInput.press('Enter');
    await page.waitForTimeout(500); // Wait for filter to apply

    // Verify original number of rows is restored
    expect(await page.getByTestId('user-list-row').count()).toBe(10);
  });

  test('should display no data message when filter has no matches', async ({
    page,
  }) => {
    const filterInput = page.getByTestId('filter-input');

    // Type non-existing name
    await filterInput.fill('NonExistentUser123');
    await filterInput.press('Enter');

    // Verify no data message
    await expect(page.getByTestId('no-data-row')).toBeVisible();
    await expect(page.getByTestId('no-data-row')).toContainText(
      'No data matching the filter'
    );
  });

  test('should sort table columns', async ({ page }) => {
    // Get initial first name
    const firstNameCells = page.getByTestId('first-name-cell');
    const initialName = await firstNameCells.first().textContent();

    // Sort by first name
    await page.getByTestId('first-name-header').click();

    // Sort in opposite direction
    await page.getByTestId('first-name-header').click();

    // Get new first name
    const newFirstName = await firstNameCells.first().textContent();

    // Verify sort changed the order
    expect(initialName).not.toEqual(newFirstName);
  });

  test('should handle pagination', async ({ page }) => {
    const paginator = page.getByTestId('user-list-paginator');

    // Get initial page data
    const rows = page.getByTestId('user-list-row');
    const initialCount = await rows.count();
    await expect(rows.first()).toBeVisible();

    // Go to next page
    await paginator.getByRole('button', { name: 'Next page' }).click();

    // Verify page changed
    const newRows = page.getByTestId('user-list-row');
    await expect(newRows.first()).toBeVisible();
    expect(await newRows.count()).toBeGreaterThan(0);

    // Change page size using mat-select

    await page.getByRole('combobox').click({ force: true });

    await page.getByRole('option', { name: '20' }).click();

    // Verify more rows are shown
    const expandedRowCount = await page.getByTestId('user-list-row').count();
    expect(expandedRowCount).toBeGreaterThan(initialCount);
  });

  test('should preserve filter and sort state on pagination', async ({
    page,
  }) => {
    // Apply filter
    const filterInput = page.getByTestId('filter-input');
    await filterInput.fill('a');
    await filterInput.press('Enter');

    // Sort by age
    await page.getByTestId('age-header').click();

    // Verify initial state
    const rows = page.getByTestId('user-list-row');
    await expect(rows.first()).toBeVisible();
    const initialCount = await rows.count();

    // Change page
    await page
      .getByTestId('user-list-paginator')
      .getByRole('button', { name: 'Next page' })
      .click();

    // Verify filter is still applied
    await expect(filterInput).toHaveValue('a');

    // Verify we still have rows visible
    const newRows = page.getByTestId('user-list-row');
    await expect(newRows.first()).toBeVisible();
    expect(await newRows.count()).toBeGreaterThan(0);
  });
});
