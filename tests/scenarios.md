# Fase Agente 1: Diseño de Escenarios QA (Velora Boutique) - COBERTURA TOTAL

Este documento define la base de pruebas críticas para asegurar la estabilidad de la tienda en cada lanzamiento.

## 🛍️ Escenarios de Usuario (Storefront & Checkout)

### 1. Conversión de Moneda y Precios (Vital)
- **Escenario:** El usuario cambia de USD a UYU en el Header.
- **Validaciones:** Multiplicación x43, actualización de símbolos y precios tachados.

### 2. Flujo de Compra y Carrito (Conversión)
- **Escenario:** Agregar productos con persistencia.
- **Validaciones:** Apertura de Drawer, contador en Header, mantenimiento de productos tras recargar.

### 3. Proceso de Checkout y Envío (Nuevo)
- **Escenario:** "Valentina Rossi" realiza una compra desde Montevideo.
- **Acciones:**
  1. Carrito -> Checkout.
  2. Completar: `valentina.rossi@gmail.com`, Dirección `Av. 18 de Julio 1234, Montevideo`.
- **Validaciones:**
  - El resumen de compra debe mostrar los subtotales correctos.

### 4. Aplicación de Cupones de Descuento (Nuevo)
- **Escenario:** Uso del cupón "BIENVENIDA10" (10% OFF).
- **Acciones:**
  1. Ingresar cupón en el checkout.
- **Validaciones:**
  - El total debe reducirse en un 10%.

## 👤 Escenarios de Cuenta (Customer CRM)

### 5. Registro y Perfil de Cliente (Nuevo)
- **Escenario:** "Luciana Méndez" se registra en la boutique.
- **Acciones:**
  1. Registrar: `luciana.mendez@outlook.com`, Password `velora2026`.
  2. Editar perfil: Cambiar dirección a `Guatemala 4567, Palermo Soho, Buenos Aires`.
- **Validaciones:**
  - Los datos deben persistir en `users.json`.

## ⚙️ Escenarios de Gestión (Admin Panel)

### 6. Autenticación Administrativa
- **Escenario:** Login con `admin@velora.com`.

### 7. Gestión de Productos (CRUD Avanzado)
- **Escenario:** Crear un "Tapado de Lana Edición Limitada" (Precio: 250 USD).
- **Acciones:** Subir 3 fotos al carrusel, definir tabla de talles (S, M, L).

### 8. Administración de Órdenes y Clientes (Nuevo)
- **Escenario:** El administrador verifica el pedido de Valentina.
- **Acciones:** Ir a `/admin/orders`.
- **Validaciones:** El pedido de Valentina Rossi debe figurar con el estado "Pendiente".

### 9. Control de Equipo (Nuevo)
- **Escenario:** Verificar el listado de Staff.
- **Acciones:** Ir a `/admin/settings/team`.
- **Validaciones:** "Martin Rodriguez" (Super Admin) debe figurar como usuario activo.

---
**Firmado:** *Agente Test Designer (IA)*
