import { test, expect } from '@playwright/test';

test.describe('Customer CRM: Flujo de Registro y Perfil', () => {

  test('Luciana Méndez debe registrarse con éxito y editar su perfil', async ({ page }) => {
    // 1. Ir a la página de registro
    await page.goto('/account/register');
    
    // 2. Completar formulario de registro con datos realistas
    await page.fill('input[name="firstName"]', 'Luciana');
    await page.fill('input[name="lastName"]', 'Méndez');
    await page.fill('input[name="email"]', 'luciana.mendez@outlook.com');
    await page.fill('input[name="password"]', 'velora2026');
    await page.click('button:has-text("Crear Cuenta")');

    // 3. Confirmar que redirige a Cuenta (Account)
    await expect(page.url()).toContain('/account');
    await expect(page.locator('h1:text("Hola, Luciana")')).toBeVisible();

    // 4. Editar información de perfil (Dirección)
    await page.click('button:has-text("Editar Perfil")');
    await page.fill('input[name="address"]', 'Guatemala 4567, Palermo Soho, Buenos Aires');
    await page.fill('input[name="currentPassword"]', 'velora2026'); // Security check
    await page.click('button:has-text("Guardar Cambios")');

    // 5. Verificar que los cambios de dirección persisten
    await expect(page.locator('text=Guatemala 4567, Palermo Soho, Buenos Aires')).toBeVisible();
  });

  test('Valentina Rossi debe poder iniciar sesión y ver sus órdenes', async ({ page }) => {
    // 1. Ir a login
    await page.goto('/account/login');
    
    // 2. Login con Valentinna Rossi (asumimos que existe o la creamos)
    await page.fill('input[name="email"]', 'valentina.rossi@gmail.com');
    await page.fill('input[name="password"]', 'valen123');
    await page.click('button:has-text("Iniciar Sesión")');

    // 3. Verificar acceso
    await expect(page.locator('h1:text("Hola, Valentina")')).toBeVisible();
    
    // 4. Ir a la sección de Órdenes (si existe esa pestaña en la UI)
    // Supongamos que hay un enlace de "Mis Compras"
    await expect(page.locator('text=Mis Pedidos')).toBeVisible();
  });

});
