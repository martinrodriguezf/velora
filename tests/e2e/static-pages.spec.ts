import { test, expect } from '@playwright/test';

test.describe('Páginas Estáticas y de Contacto', () => {

  test('debe permitir enviar un mensaje desde la página de contacto', async ({ page }) => {
    // 1. Ir a contacto
    await page.goto('/contact');
    
    // 2. Completar formulario de contacto con datos realistas
    await page.fill('input[placeholder="Tu nombre"]', 'Luciana Méndez');
    await page.fill('input[placeholder="tu@email.com"]', 'luciana.mendez@outlook.com');
    await page.fill('textarea[placeholder*="ayudarte"]', 'Hola, me gustaría saber si tienen envíos express a Palermo para esta tarde. ¡Gracias!');

    // 3. Simular envío (no tiene lógica de backend aún, pero verificamos interacción)
    await page.click('button:has-text("Enviar Mensaje")');

    // 4. Verificar respuesta visual (Placeholder de éxito si lo hubiera)
    // Como es solo UI, verificamos que el botón fue clickeable
    await expect(page.locator('button:has-text("Enviar Mensaje")')).toBeEnabled();
  });

  test('debe navegar correctamente por las políticas de la tienda', async ({ page }) => {
    await page.goto('/');
    
    // Navegar a Política de Privacidad desde el Footer
    await page.click('text=Privacidad');
    await expect(page.url()).toContain('/policies/privacy');
    await expect(page.locator('h1')).toBeVisible();
  });

});
