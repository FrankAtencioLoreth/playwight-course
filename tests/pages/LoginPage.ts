import { expect, Locator, Page } from "@playwright/test";

export class LoginPage {

    private readonly page: Page;
    private readonly usernameTextBox: Locator;
    private readonly passwordTextBox: Locator;
    private readonly loginButton: Locator;
    private readonly shoppingCartIcon: Locator;

    constructor(page: Page) {
        this.page = page;
        this.usernameTextBox = page.getByRole('textbox', {name: 'Username', exact: true});
        this.passwordTextBox = page.getByRole('textbox', {name: 'Password', exact: true});
        this.loginButton = page.getByRole('button', {name: 'Login', exact: true});
        this.shoppingCartIcon = page.locator('xpath=//a[contains(@class, \'shopping_cart_link\')]');
    }

    async fillUsername(username: string) {
        await this.usernameTextBox.fill(username);
    }

    async fillPassword(password: string) {
        await this.passwordTextBox.fill(password);
    }

    async clickOnLogin() {
        await this.loginButton.click();
    }

    async loginWithCredentials(username:string, password:string) {
        await this.fillUsername(username);
        await this.fillPassword(password);
        await this.clickOnLogin();
    }

    async checkSuccesfulLogin() {
        await expect(this.shoppingCartIcon).toBeVisible();
    }

    async gotoPage(url:string) {
        await this.page.goto(url);
    }
}