import { test, expect } from "@playwright/test";

test('purchase an item', async ({ page }) => {
    await page.goto('https://www.saucedemo.com');
    await page.getByRole('textbox', {name: 'Username', exact: true}).fill('standard_user');
    await page.getByRole('textbox', {name: 'Password', exact: true}).fill('secret_sauce');
    await page.getByRole('button', {name: 'Login', exact: true}).click();

    const itemsContainer = await page.locator('#inventory_container .inventory_item').all();
    const randomIndex = Math.floor(Math.random() * itemsContainer.length);
    const randomItem = itemsContainer[randomIndex];

    const expectTitle = await randomItem.locator('.inventory_item_name').innerText();
    const expectDesc = await randomItem.locator('.inventory_item_desc').innerText();
    const expectPrice = await randomItem.locator('.inventory_item_price').innerText();

    console.log(`Title: ${expectTitle}\nDesc: ${expectDesc}\nPrice: ${expectPrice}`);

    await randomItem.getByRole('button', {name: 'Add to cart', exact: true}).click();
    await page.locator('a.shopping_cart_link').click();
    
    await expect(page.getByRole('button', {name: 'Checkout'})).toBeVisible();


    const actualTitle = await page.locator('.inventory_item_name').innerText();
    const actualDesc = await page.locator('.inventory_item_desc').innerText();
    const actualPrice = await page.locator('.inventory_item_price').innerText();
   
    expect(actualTitle).toEqual(expectTitle);
    expect(actualDesc).toEqual(expectDesc);
    expect(actualPrice).toEqual(expectPrice);

    await page.pause();
});
