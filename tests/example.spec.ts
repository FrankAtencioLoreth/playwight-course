import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
});

test('get started link', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Click the get started link.
  await page.getByRole('link', { name: 'Get started' }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});

test('search product', async ({ page }) => {

  await page.goto('https://www.mercadolibre.com.co/');
  await page.locator('input[id=\'cb1-edit\']').fill('iphone');

  await page.keyboard.press('Enter');
  await expect(page.locator('//ol[contains(@class, \'ui-search-layout\')]')).toBeVisible();
  //await page.pause();

  const titles = await page.locator('//ol[contains(@class, \'ui-search-layout\')]//li//h2').allInnerTexts();
  
  for( let title of titles ) {
    console.log(`The title is ${title}`);
  }

});

test('locators pt 1', async ({ page }) => {

  await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
  await page.locator('(//input[contains(@class,\'oxd-input\')])[1]').fill('Admin');
  await page.pause();

});

test('locators pt 2', async ({ page }) => {

  await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
  await page.getByPlaceholder('Username').fill('Admin');
  await page.pause();

});

test('locators pt 3', async ({ page }) => {

  await page.goto('https:www.mercadolibre.com.co');
  await page.getByRole('link', {name: 'Mis compras', exact: true}).click();
  await page.pause();

});