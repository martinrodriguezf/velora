# Suite de Testing e Integración Continua (QA) 🛡️🚀

Velora utiliza una arquitectura de Aseguramiento de Calidad (QA) de nivel empresarial para garantizar la estabilidad del negocio en cada despliegue de código.

## 🤖 El Modelo de 2 Agentes (QA Workflow)
Para escalar la cobertura, el sistema opera con dos roles integrados:

1.  **Agente Test Designer**: Analiza los requerimientos de negocio y genera el documento **`tests/scenarios.md`**. Este plano define qué probar (ej: ¿Sigue funcionando el carrito con USD/UYU?).
2.  **Agente Test Automator**: Traduce los escenarios a código ejecutable en **Playwright** (`tests/e2e/*.spec.ts`).

## 🛠️ Herramientas de Testing
- **Framework**: [Playwright](https://playwright.dev/).
- **Lenguaje**: TypeScript/JS.
- **Tipos de Tests**: End-to-End (E2E), Integración y UI.

## 🏃 Cómo ejecutar los Tests Localmente
Asegúrate de tener el servidor de desarrollo corriendo (`npm run dev`) antes de ejecutar:

```bash
# Ejecutar todos los tests (Modura)
npx playwright test

# Ver la interfaz visual (Modo Interactivo)
npx playwright test --ui

# Ver reporte de errores detallado
npx playwright show-report
```

## ☁️ Integración Continua (GitHub Actions)
Cada vez que se realiza un `git push` o `pull request` a las ramas `main` o `master`, se activa el pipeline de CI:
- **Archivo**: `.github/workflows/playwright.yml`.
- **Qué hace**: Instala dependencias, levanta un servidor de prueba, ejecuta la suite de E2E y sube un reporte de artefactos (playwright-report) en caso de fallo.

## 📈 Cobertura de Módulos (Full Coverage)
La suite actual cubre el 100% de los flujos críticos:
- **Storefront**: Navegación, Colección, Filtrado.
- **Checkout**: Formulario de envío, Cupones, Totales.
- **CRM**: Registro de clientes, Login, Perfil.
- **Admin**: Gestión de Inventario, Órdenes, Categorías, Staff.

---
**Nota de Calidad**: Si un test falla en el servidor de CI, el código no debe fusionarse hasta que el Agente Automator corrija la regresión detectada.
