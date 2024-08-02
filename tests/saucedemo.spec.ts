import { test, expect } from "@playwright/test";
import { LoginPage } from "./pages/LoginPage";

test('purchase an item', async ({ page }) => {
    await page.goto('https://www.saucedemo.com');
    
    /*await page.getByRole('textbox', {name: 'Username', exact: true}).fill('standard_user');
    await page.getByRole('textbox', {name: 'Password', exact: true}).fill('secret_sauce');
    await page.getByRole('button', {name: 'Login', exact: true}).click();*/

    const loginPage = new LoginPage(page);
    await loginPage.loginWithCredentials('standard_user', 'secret_sauce');
    await loginPage.checkSuccesfulLogin();

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

    await page.getByRole('button', {name: 'Checkout'}).click();
    
    await page.getByRole('textbox', {name: 'First Name'}).fill('Frank');
    await page.getByRole('textbox', {name: 'Last Name'}).fill('Atencio Loreth');
    await page.getByRole('textbox', {name: 'Zip/Postal Code'}).fill('055787');
    await page.getByRole('button', {name: ' Continue'}).click();
    await page.getByRole('button', {name: ' Finish'}).click();

    expect(page.getByRole('heading', {name: 'Thank you for your order!'})).toBeVisible();
    const messageCheckoutComplete = await page.getByRole('heading', {name: 'Thank you for your order!'}).innerText();
    
    expect(messageCheckoutComplete).toEqual('Thank you for your order!');

    await page.pause();
});

test('login', async ({ page }) => {

    const loginPage = new LoginPage(page);
    await loginPage.gotoPage(process.env.URL);
    await loginPage.loginWithCredentials('standard_user', 'secret_sauce');
    await loginPage.checkSuccesfulLogin();

});
