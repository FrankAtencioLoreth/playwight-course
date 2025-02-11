import { test, expect } from "@playwright/test";

test('webtables', async ({ page }) => {

    await page.goto('https://cosmocode.io/automation-practice-webtable');
    const tableContainer = await page.locator('xpath=//table[@id="countries"]');
    const rows = await tableContainer.locator('xpath=.//tr').all();
    const countries: Country[] = [];
   
    console.log(rows.length);
    
    for(let row of rows) {
        let country : Country = {
            name: await row.locator('xpath=.//td[2]').innerText(),
            capital: await row.locator('xpath=.//td[3]').innerText(),
            currency: await row.locator('xpath=.//td[4]').innerText(),
            primaryLanguage: await row.locator('xpath=.//td[5]').innerText()
        }

        countries.push(country);
    }


    //All conuntries
    for(let country of countries) {
        console.log(country);
    }

    //All countries by portuguese language
    const countryPortuguese = countries.filter(country => country.primaryLanguage === 'Portuguese');
    console.log('Portuguese: ',countryPortuguese)

});

interface Country {
    name: string;
    capital: string;
    currency: string;
    primaryLanguage: string;
}