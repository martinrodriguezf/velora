# Arquitectura del Sistema: Velora Boutique 🏛️

Este documento describe la estructura técnica, flujo de datos y decisiones de diseño de la plataforma Velora, siguiendo estándares de escalabilidad y mantenibilidad.

## Stack Tecnológico 💻
- **Framework**: Next.js 15+ (App Router).
- **Lenguaje**: JavaScript / React.
- **Estilos**: Vanilla CSS Modules (Layouts dinámicos y responsive).
- **Persistencia**: Local JSON Storage (Estandarizado para catálogos locales).
- **Testing**: Playwright (E2E) & GitHub Actions (CI/CD).

## Estructura de Directorios 📂
El proyecto sigue el patrón modular de Next.js:

```bash
├── src/
│   ├── actions/      # Lógica del lado del servidor (Mutaciones JSON, Auth)
│   ├── app/          # Estructura de rutas (Pages, Layouts)
│   ├── components/   # Componentes UI (Atómicos y de Negocio)
│   ├── context/      # Estado Global (CurrencyContext, CartContext)
│   ├── data/         # Base de Datos Local (Archivos .json)
│   └── middleware.js # Control de acceso y sesiones
├── tests/            # Suite de Testing QA (Escenarios y Automatización)
└── docs/             # Documentación Técnica Proyectual
```

## Gestión de Estado Global (Context API) 🧠
Velora utiliza el patrón Provider para inyectar lógica reactiva en toda la aplicación:

1.  **`CurrencyContext`**: Gestiona el cambio de divisa (USD/UYU). Utiliza una tasa de conversión fija (1:43) y persiste la preferencia del usuario en `localStorage`.
2.  **`CartContext`**: Orquesta el flujo de compras. Maneja la adición de productos, cálculo de subtotales y la sincronización con el `CartDrawer`.

## Flujo de Datos y Persistencia 🔄
Actualmente, el sistema utiliza una arquitectura **Filesystem-as-a-Database**. 
- Las lecturas se realizan mediante imports directos (`import catalogue from '@/data/catalogue.json'`).
- Las escrituras se gestionan a través de **Server Actions** (`src/actions/`), las cuales utilizan el módulo `fs/promises` de Node.js para atomicidad en las actualizaciones.

## Seguridad y Acceso 🛡️
- **Middleware**: Ubicado en `src/middleware.js`, protege las rutas de `/admin/*`. Verifica la existencia de `admin_session` en las cookies para prevenir accesos no autorizados.
- **Sesiones de Cliente**: Se gestionan mediante cookies (`velora_session`), permitiendo que el usuario mantenga su carrito y perfil activo durante la navegación.

---
**Nota para Desarrolladores**: Para migrar a una base de datos relacional (SQL), solo es necesario reemplazar los métodos dentro de `src/actions/` por llamadas a un ORM como Prisma o Supabase Client.
