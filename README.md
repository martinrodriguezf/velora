# Velora Boutique: Solución E-commerce Premium 👗✨

Bienvenido a **Velora**, una plataforma de comercio electrónico minimalista y de alto rendimiento diseñada para boutiques de moda de lujo. Este proyecto combina una experiencia de usuario (UX) impecable con un panel administrativo (CMS) de nivel empresarial.

## ✨ Características Principales
- **Storefront Curado**: Diseño responsivo y minimalista optimizado para la conversión.
- **Sistema Multidivisa (USD/UYU)**: Conversión en tiempo real con tasas configurables.
- **CMS Administrativo**: Editor de guías de talles, galerías interactivas y gestión de inventario.
- **Infraestructura de QA**: Cobertura total de tests End-to-End con Playwright.
- **CI/CD Cloud**: Integración continua con GitHub Actions para deploys seguros.

## 🛠️ Stack Tecnológico (Factory Standard)
- **Frontend**: Next.js 15+ (App Router), React, CSS Modules.
- **Estado**: React Context API (Currency, Cart).
- **Backend/Mutaciones**: Server Actions (Node.js FS-DB).
- **Control de Versiones**: Git & GitHub.
- **E2E Testing**: Playwright (TypeScript) & CI GitHub Actions.

## 🚀 Inicio Rápido

### Instalación
```bash
# Instalar dependencias
npm install

# Instalar navegadores de Playwright para QA
npx playwright install --with-deps
```

### Desarrollo
```bash
# Iniciar servidor local
npm run dev
```
Accede a `http://localhost:3000` para la tienda y `http://localhost:3000/admin` para la gestión.

### Ejecución de Tests
```bash
# Correr suite completa de QA
npx playwright test
```

## 📚 Ecosistema de Documentación Técnica
Para una comprensión profunda del sistema, consulta nuestros manuales especializados:

1.  🏛️ **[Arquitectura y Diseño](file:///Users/martinrodriguez/Antigravity_projects/velora/docs/ARCHITECTURE.md)**: Estructura, flujo de datos y seguridad.
2.  📊 **[Modelos de Datos](file:///Users/martinrodriguez/Antigravity_projects/velora/docs/DATA_MODELS.md)**: Esquemas JSON y estructura de persistencia.
3.  🛠️ **[Manual del Admin (CMS)](file:///Users/martinrodriguez/Antigravity_projects/velora/docs/CMS_HANDBOOK.md)**: Guía de gestión de inventario y categorías.
4.  🛡️ **[Automatización de QA](file:///Users/martinrodriguez/Antigravity_projects/velora/docs/QA_AUTOMATION.md)**: Manual de testing, Agentes y CI/CD.

---
**Velora Boutique** – Desarrollado con ❤️ y estándares de calidad de *Software Factory*.
