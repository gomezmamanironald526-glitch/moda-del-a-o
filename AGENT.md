# 🧠 MEMORIA DEL PROYECTO: MODA DEL AÑO

Este documento define la estructura, arquitectura, convenciones y estado actual del proyecto **"Moda del Año"**. Sirve como memoria permanente para el asistente de IA y el desarrollador.

---

## 1. 📌 Información General

* **Nombre del negocio:** Moda del Año
* **Año de fundación:** 1998
* **Propósito:** Catálogo web y sistema interactivo de pedidos de prendas de vestir.
* **Stack tecnológico:** HTML5 semántico, CSS3 moderno (Custom Properties, Grid, Flexbox), JavaScript Vanilla modular (ES6+) y jQuery v3.7.1.

---

## 2. 🗂️ Arquitectura de Archivos

| Archivo | Responsabilidad Principal |
| :--- | :--- |
| [`index.html`](./index.html) | Estructura semántica: encabezado, navegación, catálogo `#productos`, tabla `#precios`, formulario `#pedido`, sección `#comparacion` (Vanilla vs jQuery) y pie de página. |
| [`estilos.css`](./estilos.css) | Sistema de diseño: variables CSS `:root`, tipografía del sistema, reset universal, estilos de tablas, formularios, tarjetas, clases dinámicas (`.resaltado`, `.destacado`, `.resultado`) y botón flotante `#btn-volver-arriba`. |
| [`datos.js`](./datos.js) | Fuente de verdad de los productos: array `productos` con propiedades (`nombre`, `precio`, `categoria`, `stock`, `disponible`, `imagen`), métodos de arrays (`map`, `filter`, `reduce`, `find`, `some`, `every`) y clases `Producto` y `ProductoConDescuento`. |
| [`app.js`](./app.js) | Inicialización: constantes del negocio, tipos de datos, template literals y mensaje inicial en `#aviso-stock`. |
| [`funciones.js`](./funciones.js) | Lógica pura: cálculo de totales (`calcularTotal`), descuentos (`aplicarDescuento`), impuestos (`conImpuesto`), funciones de orden superior (`aplicarATodos`) y closures (`crearContador`, `prendasVendidas`). |
| [`render.js`](./render.js) | Renderizado dinámico: función `crearTarjeta(producto)` y `render(lista)` para poblar `#lista-productos` a partir de `datos.js`. |
| [`eventos.js`](./eventos.js) | Interactividad Vanilla JS: buscador en vivo con normalización de acentos, delegación de eventos en filtros de categoría, validación con expresiones regulares (`PATRONES`), y captura del formulario con confirmación de pedido. |
| [`jquery-3.7.1.min.js`](./jquery-3.7.1.min.js) | Librería local minificada de jQuery 3.7.1. |
| [`jquery-comparado.js`](./jquery-comparado.js) | Comparativa pedagógica Vanilla JS vs jQuery y mejoras interactivas (desplazamiento suave, animaciones `fadeIn`/`slideDown`, botón flotante scroll-to-top). |

---

## 3. 🎨 Sistema de Diseño y Tokens CSS

En [`estilos.css`](./estilos.css):
* `--color-principal`: `#222222` (Tono oscuro para títulos, fondos de cabecera y botones principales)
* `--color-acento`: `#c2185b` (Magenta/rosa para enlaces en hover, bordes de enfoque y detalles destacados)
* `--color-texto`: `#292929` (Color de texto principal)
* `--color-suave`: `#c2185b` (Color de contraste secundario)
* `--color-fondo`: `#f6f6f7` (Fondo general de la página)
* `--color-superficie`: `#ffffff` (Fondo de tarjetas, tablas y bloques)
* `--borde`: `#dce5dd` (Borde sutil para contenedores)
* `--radio`: `8px` (Bordes redondeados de tarjetas y controles)

---

## 4. ⚙️ Convenciones y Reglas de Código

1. **Orden de Carga de Scripts en HTML:**
   `jquery-3.7.1.min.js` ➔ `app.js` ➔ `funciones.js` ➔ `datos.js` ➔ `render.js` ➔ `eventos.js` ➔ `jquery-comparado.js`.
2. **HTML Semántico:**
   * Exactamente un `<h1>` por página.
   * Navegación clara con etiquetas `<a>` accesibles dentro de `<nav>`.
   * Atributos `alt` descriptivos en todas las etiquetas `<img>`.
3. **Manejo de Datos y Renderizado:**
   * Las tarjetas nunca se hardcodean en HTML; se generan dinámicamente mediante `render(productos)`.
   * El filtrado y búsqueda opera sobre el array `productos` y llama a `render(visibles)`.
4. **Coexistencia Vanilla + jQuery:**
   * La lógica principal y modular del negocio se mantiene en Vanilla JS para preservar su integridad didáctica.
   * jQuery se utiliza para manipulación enriquecida, animaciones (`fadeIn`, `slideDown`), navegación suave y ejercicios comparativos.
