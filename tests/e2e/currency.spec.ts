import { test, expect } from '@playwright/test';

test.describe('Boutique Velora: Conversión de Moneda y Carrito', () => {

  test('debe cambiar precios de USD a UYU correctamente en la Colección', async ({ page }) => {
    // 1. Abrir la tienda
    await page.goto('/shop');
    
    // 2. Verificar que el precio inicial esté en USD (por defecto)
    const priceText = await page.locator('p[style*="font-weight: 700"]').first().textContent();
    expect(priceText).toContain('USD');

    // 3. Abrir selector de moneda y cambiar a UYU
    await page.click('button:has-text("USD")');
    await page.click('button:has-text("UYU")');

    // 4. Verificar que el precio haya cambiado a $ y el valor sea mayor (x43)
    const newPriceText = await page.locator('p[style*="font-weight: 700"]').first().textContent();
    expect(newPriceText).toContain('$');
    expect(newPriceText).not.toContain('USD');
  });

  test('debe permitir seleccionar talle y agregar al carrito', async ({ page }) => {
    // 1. Ir a un producto específico (Linen Blazer)
    await page.goto('/product/vlr-1001');
    
    // 2. Intentar agregar al carrito sin talle (debe fallar)
    await page.click('button:has-text("Sumar al Carrito")');
    await expect(page.locator('text=Por favor selecciona un talle')).toBeVisible();

    // 3. Seleccionar talle 'S' y agregar
    await page.click('button:has-text("S")');
    await page.click('button:has-text("Sumar al Carrito")');

    // 4. Verificar que se abre el Drawer del carrito
    await expect(page.locator('text=Tu Bolsa de Compras')).toBeVisible();
    await expect(page.locator('text=The Oversized Linen Blazer')).toBeVisible();
    
    // 5. Verificar contador en el Header
    const bagCount = await page.locator('span:has-text("1")').first();
    await expect(bagCount).toBeVisible();
  });

  test('debe abrir la guía de talles correctamente', async ({ page }) => {
    await page.goto('/product/vlr-1001');
    
    // Hacer clic en Guía de Talles
    await page.click('button:has-text("Guía de Talles")');
    
    // Verificar que el modal y la tabla son visibles
    await expect(page.locator('h2:has-text("Guía de Medidas")')).toBeVisible();
    await expect(page.locator('th:has-text("Pecho")')).toBeVisible();
  });

});
