# Manual de Usuario: Panel Administrativo Velora 🛠️👑

Este manual guía a los administradores de la boutique en la gestión diaria del inventario, categorías y analíticas de la tienda.

## 1. Acceso y Seguridad 🔐
- **URL**: [https://velora.com/admin/login](http://localhost:3000/admin/login).
- **Credenciales por defecto**: `admin@velora.com` / `admin123`.
- **Sesión**: El sistema utiliza cookies seguras para mantener el acceso. Si la sesión expira, serás redirigido automáticamente al login.

## 2. Gestión de Productos (Catálogo) 👗
Desde el botón **"Gestionar Inventario"**, puedes realizar las siguientes acciones:

### 📸 Editor de Carrusel (Galería)
Velora permite subir múltiples fotos para cada prenda. 
- **Cómo usar**: Pega la URL de la imagen en el campo correspondiente. Puedes añadir o quitar filas para expandir la galería que verán tus clientes.

### 📏 Editor de Guía de Talles (Tabla Interactiva)
Ya no necesitas subir imágenes estáticas de tablas de talles. 
- **Cómo usar**: Utiliza el botón "+ Fila" o "+ Columna" para construir tu tabla de medidas personalizada (Pecho, Cintura, Largo) para cada producto específico.
- **Visualización**: El cliente verá esta tabla formateada profesionalmente en un modal al pulsar "Guía de Talles" en la página del producto.

### 📦 Archivado vs Borrado
En Velora seguimos la política de **"Borrado Securo"**. 
- **Botón Archivar**: Cambia el estado del producto a `archived`. Esto lo oculta instantáneamente de la tienda pública y de los resultados de búsqueda, pero mantiene su historial en el admin.
- **Recomendación**: Usa el archivado para productos fuera de temporada; podrás reactivarlos con un solo clic en el futuro.

## 3. Gestor de Categorías 🏷️
- **URL**: [Gestión de Categorías](http://localhost:3000/admin/categories).
- **Función**: Permite crear nuevas secciones (ej: "Sastrería", "Sale", "Básicos").
- **Sincronización**: Al crear una categoría aquí, esta aparecerá automáticamente en el selector de productos y en los filtros laterales de la tienda `/shop`.

## 4. Analíticas y Reportes 📊
El **Dashboard Principal** muestra indicadores clave (KPIs) en tiempo real:
- **Facturación Bruta**: Seguimiento diario de ventas.
- **Ranking de Productos**: Lista de los artículos más vendidos para ajustar el stock.
- **Alertas de Stock**: Notificaciones de prendas con inventario bajo o en estado de urgencia.

## 5. Gestión de Clientes (CRM) 👤
- **URL**: `/admin/users`.
- **Función**: Ver la lista de clientes registrados, su historial de compras y direcciones de entrega. 

---
**Soporte Técnico**: En caso de errores en la carga de imágenes o discrepancias en los totales, contactar al equipo de IT o de QA Automation para revisar los logs de transacciones.
