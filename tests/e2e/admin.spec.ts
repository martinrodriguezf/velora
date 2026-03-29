import { test, expect } from '@playwright/test';

test.describe('Admin Panel: Gestión Boutique', () => {

  test.beforeEach(async ({ page }) => {
    // 1. Ir a login de administrador
    await page.goto('/admin/login');
    
    // 2. Ingresar credenciales
    await page.fill('input[name="email"]', 'admin@velora.com');
    await page.fill('input[name="password"]', 'admin123');
    await page.click('button:has-text("Entrar al Panel")');

    // 3. Confirmar que llegó al Dashboard
    await expect(page.locator('h1:has-text("Analíticas de Velora")')).toBeVisible();
  });

  test('debe permitir crear un nuevo producto y verlo en el inventario', async ({ page }) => {
    // 1. Ir a Nuevo Producto
    await page.goto('/admin/products/new');
    
    const testId = `TEST-${Math.floor(Math.random() * 9000)}`;
    const testTitle = `Vestido de Seda QA ${testId}`;

    // 2. Completar formulario
    await page.fill('input[name="id"]', testId);
    await page.fill('input[name="title"]', testTitle);
    await page.fill('textarea[name="description"]', 'Este es un producto generado por el Agente de QA Automator.');
    await page.fill('input[name="price"]', '150');
    await page.fill('input[name="image_link"]', 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b');
    
    // 3. Guardar cambios
    await page.click('button:has-text("Guardar Cambios")');

    // 4. Verificar redirección y presencia en la lista
    await expect(page.url()).toContain('/admin/products');
    await expect(page.locator(`text=${testTitle}`)).toBeVisible();
  });

  test('debe permitir crear una nueva categoría dinámica', async ({ page }) => {
    // 1. Ir a Categorías
    await page.goto('/admin/categories');
    
    const catName = 'Estilo Urbano 2026';
    const catId = 'urbano-2026';

    // 2. Completar formulario de categoría
    await page.fill('input[name="name"]', catName);
    await page.fill('input[name="id"]', catId);
    await page.click('button:has-text("Crear Categoría")');

    // 3. Verificar que aparece en la lista
    await expect(page.locator(`text=${catName}`)).toBeVisible();
  });

  test('debe archivar un producto y ocultarlo de la tienda', async ({ page }) => {
      // 1. Ir a un producto existente (ej: Linen Blazer VLR-1001)
      await page.goto('/admin/products/VLR-1001');
      
      // 2. Hacer clic en Archivar
      await page.click('button:has-text("Archivar Producto")');
      
      // 3. Verificar que figura como Archivado en el admin
      await expect(page.locator('text=Archivado').first()).toBeVisible();

      // 4. Verificar que no aparece en la tienda pública
      await page.goto('/shop');
      await expect(page.locator('text=The Oversized Linen Blazer')).not.toBeVisible();
  });

  test('debe verificar el listado de órdenes y encontrar a Valentina', async ({ page }) => {
      // 1. Ir a listado de pedidos
      await page.goto('/admin/orders');
      
      // 2. Verificar que existan pedidos cargados
      await expect(page.locator('h2:has-text("Órdenes y Pedidos")')).toBeVisible();

      // 3. Buscar a Valentina Rossi en la lista (Dato realista de los tests anteriores)
      await expect(page.locator('text=Valentina Rossi')).toBeVisible();
  });

  test('debe verificar la gestión de equipo y staff', async ({ page }) => {
      // 1. Ir a configuración de equipo
      await page.goto('/admin/settings/team');
      
      // 2. Verificar que el administrador actual figure en el staff
      await expect(page.locator('text=Martin Rodriguez')).toBeVisible();
      await expect(page.locator('text=Super Admin')).toBeVisible();
  });

});
