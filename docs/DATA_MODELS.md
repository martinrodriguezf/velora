# Modelos de Datos y Esquemas JSON 📊💎

Velora Boutique utiliza una arquitectura de datos basada en JSON para persistencia local. Este documento define los esquemas (schemas) de los objetos principales para asegurar la integridad de la información.

## 🛍️ Productos (`src/data/catalogue.json`)
El catálogo es el núcleo de la tienda. Los productos pueden estar en estado `active` o `archived`.

| Campo | Tipo | Descripción |
| :--- | :--- | :--- |
| `id` | String | Identificador único (ej: `VLR-1001`). |
| `title` | String | Nombre comercial de la prenda. |
| `price` | Number | Precio base en USD. |
| `category` | String | ID de la categoría relacionada. |
| `status` | Enum | `active` (visible) o `archived` (oculto). |
| `size_guide` | Object | Tabla estructurada con `headers` y `rows`. |
| `additional_image_links` | Array | Lista de URLs para el carrusel de galería. |

## 👗 Categorías (`src/data/categories.json`)
Define los segmentos de ropa que aparecen en los filtros de la tienda.

```json
{
  "id": "blazers",
  "name": "Blazers & Chaquetas",
  "count": 5
}
```

## 👤 Clientes CRM (`src/data/users.json`)
Almacena la información de los usuarios registrados y sus perfiles de envío.

| Campo | Tipo | Descripción |
| :--- | :--- | :--- |
| `email` | String | Identificador de login (único). |
| `name` | String | Nombre de pila. |
| `address` | String | Dirección de envío por defecto. |
| `status` | String | Nivel de fidelización (ej: "Suscripto"). |

## 🏷️ Cupones e Incentivos (`src/data/coupons.json`)
Controla la lógica de descuentos aplicables en el carrito.

```json
{
  "code": "BIENVENIDA10",
  "discount": 0.10,
  "type": "percentage",
  "status": "active"
}
```

## 🛡️ Equipo y Staff (`src/data/staff.json`)
Define los roles administrativos y permisos del panel.

| Campo | Tipo | Descripción |
| :--- | :--- | :--- |
| `role` | String | `Super Admin`, `Editor de Catálogo`, etc. |
| `status` | String | Estado de cuenta (`Active` / `Inactive`). |
| `lastLogin` | ISO Date | Registro de la última actividad. |

## 📦 Órdenes y Pedidos (`src/data/mock_orders.json`)
Historial de transacciones de la boutique.

| Campo | Tipo | Descripción |
| :--- | :--- | :--- |
| `orderId` | String | ID de transacción. |
| `customer` | String | Nombre del cliente (ej: `Valentina Rossi`). |
| `total` | Number | Monto final de la compra. |
| `status` | Enum | `Pendiente`, `Enviado`, `Entregado`. |

---
**Nota técnica**: Para añadir nuevos campos a la aplicación, se recomienda actualizar primero el esquema en este documento antes de realizar la migración en los archivos JSON.
