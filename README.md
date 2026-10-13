# [MODA DEL AÑO]

**Estudiante:** [Ronald Gomez, Luz Clara Huanca]
**Cliente:** [Luz clara, moda del año]
**URL publicada:** [DESPUES, PROXIMA SEMANA]

## Qué resuelve
[Este sitio web permite a los clientes conocer los productos que ofrece la heladería Papaleta, como helados y otros postres. También facilita la consulta de precios, la visualización de los productos y el acceso a información del negocio. De esta manera, los clientes pueden conocer mejor la heladería sin necesidad de acudir personalmente al establecimiento.]

## Cómo está construido
- **Semántica:** [qué elementos usaste y dónde]
En mi proyecto web MODA DEL AÑO en HTML para organizar la venta de ropas de 
la página de manera ordenada.

<header>: se encuentra en la parte superior y contiene el nombre de Sport Center, el eslogan y el menú de navegación.
<nav>: contiene los enlaces para acceder a las secciones de productos, precios y pedidos.
<section>: divide la página en diferentes secciones, como la imagen principal, la personalización de colores, los productos, los precios y los pedidos.
<main>: contiene el contenido principal de la página, donde se muestran los productos, la tabla de precios y el formulario de pedidos.
<article>: se utiliza para organizar las tarjetas de los productos, como poleras, zapatillas, shorts, balones, pantalones y accesorios deportivos.
<figure> y <figcaption>: sirven para mostrar las imágenes de los productos y agregarles una descripción.
<table>: se utiliza para presentar los precios y la disponibilidad de los productos de forma organizada.
<form>: permite ingresar los datos personales del cliente, seleccionar el producto, indicar la cantidad y escribir la dirección de entrega.
<footer>: se encuentra al final de la página y contiene los derechos reservados y el eslogan de la tienda.

También utilicé etiquetas para la benta de ropas como <h1>, <h2>, <h3>, <p>, <img> y <a> para organizar los títulos, textos, imágenes y enlaces.

- **Layout:** -[dónde Flexbox, dónde Grid, y por qué]
     Para organizar los elementos de mi página utilicé principalmente Flexbox y CSS Grid, porque permiten distribuir el contenido de manera ordenada y adaptable a diferentes tamaños de pantalla.

Flexbox

Utilicé Flexbox en los siguientes lugares:

Encabezado (header): para colocar el nombre de la tienda y el menú de navegación en una misma fila, distribuyendo el espacio entre ellos.
Menú de navegación (nav ul): para organizar los enlaces de Productos, Precios y Hacer un pedido, dejando espacios entre ellos.
Opciones de colores (.color-option): para alinear el nombre de cada opción con su selector de color.
Tarjetas de productos (#productos article): para organizar el contenido interno de cada tarjeta en una columna.

CSS Grid
Utilicé CSS Grid en estos lugares:

Sección de productos (#productos): para distribuir las tarjetas de los productos en varias columnas y adaptarlas al espacio disponible.
Panel de personalización de colores (.color-controls): para organizar los selectores de colores en columnas que se ajustan automáticamente al tamaño de la pantalla.
También utilicé reglas @media en CSS para adaptar el diseño a celulares y tabletas. Por ejemplo, en pantallas pequeñas, el menú se muestra en forma vertical y los botones ocupan todo el ancho disponible.
De esta manera, Flexbox me permite alinear elementos y CSS Grid me ayuda a organizar el contenido en filas y columnas.

- **Diseño:** [paleta y tipografía, y por qué las elegiste]

      Para el diseño de mi página elegí colores que transmiten una imagen para las benta de ropas.

Paleta de colores

Negro oscuro (#222222): se utiliza en los títulos, el encabezado, los enlaces, los bordes principales y los botones. Representa confianza y profesionalismo.
Rosa frambuesa (#c2185b): se utiliza como color de acento en los efectos al pasar el cursor sobre algunos elementos y en los indicadores de enfoque. Ayuda a destacar las acciones importantes.
Gris muy clarlo (#f6f6f7): se utiliza como fondo general para facilitar la lectura y dar una apariencia limpia.
Blanco (#ffffff): se utiliza en las tarjetas, el encabezado, los formularios y otras superficies para mantener un diseño ordenado.
Gris casi negro (#292929): se utiliza para los textos principales, porque ofrece un buen contraste con los fondos claros.
Verde grisacao claro (#dce5dd): se utiliza en textos secundarios y descripciones.
Además, definí variables CSS dentro de :root, lo que permite cambiar los colores principales desde un solo lugar.

Tipografía

Utilicé la familia tipográfica system-ui, junto con otras fuentes alternativas del sistema, como Segoe UI y Roboto. Esto permite que el texto se vea limpio y legible en diferentes dispositivos sin necesidad de descargar una fuente externa.

También establecí distintos tamaños para los títulos y el texto normal, además de un interlineado de 1.6 para facilitar la lectura.
Personalización de colores

Una característica importante de mi proyecto es que incorporé un panel interactivo que permite cambiar cuatro colores de la página: el principal, el de acento, el de fondo y el de las tarjetas.

Esta función utiliza JavaScript en el archivo colores.js. Los cambios se aplican inmediatamente, se pueden guardar en el navegador y también se pueden restablecer a los colores originales.

En conclusión, el diseño de mode del añocombina una estructura semántica en HTML, una distribución adaptable con Flexbox y CSS Grid, y una paleta de colores personalizable para ofrecer una experiencia de navegación organizada y agradable tanto en computadoras como en celulares.

## Capturas
![Escritorio](C:\Users\UMSA-COLQUENCHA\Documents\proyecto_1\captura de pantalla (13).png)
![Móvil 375px](ruta/a/captura-movil.png) DESPUES, PROXIMA SEMANA

##" Lo más difícil
2["el problema que tuve fue en el colocado de las imegenes que no aparecia en el proyecto" "lo resolvi guardando el codigo y volvi a mi proyectoy ya se avia colocado la imagen"]