import { test, expect } from '@playwright/test';

// See here how to get started:
// https://playwright.dev/docs/intro
test('visits the app root url', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByText('Monthly SummarySelect Month:')).toBeVisible();
  await expect(page.getByText('Transaction ListDateDescriptionAmountTypeNo Data')).toBeVisible();
})

test('test add transaction', async ({ page }) => {

  // Generate random description value
  const description = Math.random().toString(36).substring(7);

  // Go to the app
  await page.goto('/');

  // Click on the add transaction menu
  await page.getByRole('menuitem', { name: 'Add Transaction' }).click();

  // Fill the form
  await page.locator('label').filter({ hasText: 'Income' }).locator('span').nth(1).click();
  await page.getByRole('spinbutton', { name: '* Amount (R$)' }).fill('123');
  await page.getByRole('textbox', { name: '* Description' }).fill(description);
  await page.getByRole('combobox', { name: '* Date' }).fill('2025-01-01');

  // Submit the form
  await page.getByRole('button', { name: 'Submit' }).click();

  // Check if the transaction was added
  await expect(page.getByText('Transaction added successfully')).toBeVisible();
  
  // Check if the transaction is in the list
  await page.getByRole('menuitem', { name: 'Summary' }).click();
  await page.getByRole('textbox', { name: 'Search by description' }).fill(description);
  await expect(page.getByRole('cell', { name: '-01-01' })).toBeVisible();

})