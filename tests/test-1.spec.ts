import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://www.mercadolibre.com.co/');
  await page.getByPlaceholder('Buscar productos, marcas y má').click();
  await page.getByPlaceholder('Buscar productos, marcas y má').fill('suzuki gn');
  await page.keyboard.press('Enter');
  await page.getByRole('link', { name: 'Suzuki Gn 125 Imagen - 1/' }).click();
});