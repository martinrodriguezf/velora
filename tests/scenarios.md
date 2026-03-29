# Fase Agente 1: Diseño de Escenarios QA (Velora Boutique)

Este documento define la base de pruebas críticas para asegurar la estabilidad de la tienda en cada lanzamiento.

## Escenarios de Usuario (E2E) - Storefront

### 1. Conversión de Moneda y Precios (Vital)
- **Escenario:** El usuario cambia de USD a UYU en el Header.
- **Acciones:**
  1. Abrir `/shop`.
  2. Verificar que los precios iniciales estén en `$ X,XX USD`.
  3. Hacer clic en el selector "USD/UYU".
  4. Seleccionar "UYU".
- **Validaciones:**
  - Los productos deben mostrar el símbolo `$`.
  - El valor numérico debe multiplicarse por 43 (tasa fija).
  - Los precios tachados (`compare_at_price`) deben actualizarse proporcionalmente.

### 2. Flujo de Compra y Carrito (Conversión)
- **Escenario:** Agregar un producto al carrito y verificar persistencia.
- **Acciones:**
  1. Abrir la página de un producto (ej: `/product/vlr-1001`).
  2. Seleccionar un talle (obligatorio).
  3. Hacer clic en "Sumar al Carrito".
- **Validaciones:**
  - Debe abrirse el `CartDrawer` automáticamente.
  - El contador del carrito en el Header debe subir a 1.
  - El total estimado debe ser correcto.
  - Al recargar la página, el producto debe seguir ahí (`localStorage`).

## Escenarios de Gestión (E2E) - Admin Panel

### 3. Autenticación Administrativa
- **Escenario:** El administrador inicia sesión con sus credenciales.
- **Acciones:**
  1. Ir a `/admin/login`.
  2. Ingresar `admin@velora.com` y `admin123`.
  3. Hacer clic en "Entrar al Panel".
- **Validaciones:**
  - Debe redirigir a `/admin` (Dashboard).
  - Debe mostrar las analíticas de ventas.

### 4. Gestión de Productos (CRUD)
- **Escenario:** Crear un nuevo producto y verificar que aparezca en la tienda.
- **Acciones:**
  1. Ir a `/admin/products/new`.
  2. Completar: Título ("Test Automation Dress"), Precio (99), Categoría ("Vestidos").
  3. Guardar cambios.
  4. Ir a `/shop` y buscar el producto.
- **Validaciones:**
  - El producto debe aparecer en la lista de inventario.
  - El producto debe ser visible en la tienda pública si está en estado "Activo".

### 5. Gestión de Categorías
- **Escenario:** Crear una nueva categoría y verificar su disponibilidad.
- **Acciones:**
  1. Ir a `/admin/categories`.
  2. Crear categoría "Tendencias 2026" (ID: tendencias-2026).
- **Validaciones:**
  - La nueva categoría debe aparecer en la lista de categorías.
  - Debe estar disponible en el selector al editar cualquier producto.

### 6. Archivado de Productos
- **Escenario:** Ocultar un producto de la tienda pública sin borrarlo.
- **Acciones:**
  1. Editar un producto existente.
  2. Cambiar su estado a "Archivado".
  3. Guardar.
- **Validaciones:**
  - El producto ya no debe aparecer en `/shop`.
  - Debe figurar como "Archivado" en la lista de inventario.

---
**Firmado:** *Agente Test Designer (IA)*
