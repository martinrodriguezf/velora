import { test, expect } from '@playwright/test';

test.describe('Checkout & Cupones: Flujo de Venta Segura', () => {

  test('Valentina Rossi debe poder comprar con cupón de bienvenida', async ({ page }) => {
    // 1. Ir a un producto destacado (ej: Linen Blazer VLR-1001)
    await page.goto('/product/vlr-1001');
    
    // 2. Seleccionar talle y agregar
    await page.click('button:has-text("S")');
    await page.click('button:has-text("Sumar al Carrito")');
    
    // 3. Confirmar que llegó al Drawer
    await expect(page.locator('text=Tu Bolsa de Compras')).toBeVisible();

    // 4. Ir directamente al Checkout
    await page.click('a:has-text("Finalizar Pedido Seguro")');

    // 5. Completar Información de Envío (Datos Realistas)
    await page.fill('input[placeholder="Email o teléfono celular"]', 'valentina.rossi@gmail.com');
    await page.fill('input[placeholder="Nombre"]', 'Valentina');
    await page.fill('input[placeholder="Apellido"]', 'Rossi');
    await page.fill('input[placeholder="Dirección"]', 'Av. 18 de Julio 1234, Montevideo');
    await page.fill('input[placeholder="Ciudad"]', 'Montevideo');

    // 6. Aplicar Cupón "BIENVENIDA10" (Si existiera en la UI del checkout)
    // Suponemos que hay un input de cupón
    await page.fill('input[placeholder="Código de descuento"]', 'BIENVENIDA10');
    await page.click('button:has-text("Aplicar")');

    // 7. Verificar reducción del total
    // Aquí el test esperaría que el componente CheckoutSummary se actualizara
    await expect(page.locator('text=10% OFF')).toBeVisible();
    await expect(page.locator('text=BIENVENIDA10')).toBeVisible();
  });

});
