// ── 1. COMPROBAR QUE CARGÓ ──────────────────────────────────────────────
console.log("jQuery versión:", $.fn.jquery);

// ── 2. ESPERAR AL DOM ───────────────────────────────────────────────────
$(document).ready(function () {
  console.log("DOM completamente listo con jQuery ($(document).ready)");
});

// ── 3. SELECCIONAR ──────────────────────────────────────────────────────
const vanillaP = document.querySelector("#salida-vanilla");
const jqueryP = $("#salida-jquery");

console.log("vanilla es un elemento:", vanillaP instanceof HTMLElement);
console.log("jQuery es una colección de", jqueryP.length);

if (vanillaP) {
  console.log("mismo elemento:", $(vanillaP)[0] === vanillaP);
}

// ── 4. LEER Y ESCRIBIR CONTENIDO ────────────────────────────────────────
if (vanillaP) {
  vanillaP.textContent = "Cambiado con vanilla: document.querySelector + textContent";
}
jqueryP.text("Cambiado con jQuery: $() + .text()");

// ── 5. CLASES ───────────────────────────────────────────────────────────
if (vanillaP) {
  vanillaP.classList.add("resultado");
}
jqueryP.addClass("resultado");

// ── 6. EVENTOS ──────────────────────────────────────────────────────────
const botonVanilla = document.querySelector("#boton-vanilla");
if (botonVanilla && vanillaP) {
  botonVanilla.addEventListener("click", () => {
    vanillaP.classList.toggle("resaltado");
  });
}

$("#boton-jquery").on("click", function () {
  $(this).closest("section").find("#salida-jquery").toggleClass("resaltado");
});

// ── 7. CHAINING (ENCADENAMIENTO) ─────────────────────────────────────────
$("#salida-jquery")
  .addClass("destacado")
  .attr("data-origen", "jquery")
  .css("cursor", "pointer");

if (vanillaP) {
  vanillaP.classList.add("destacado");
  vanillaP.setAttribute("data-origen", "vanilla");
  vanillaP.style.cursor = "pointer";
}

// ── 8. LA COMPARACIÓN QUE IMPORTA ───────────────────────────────────────
console.log("Tarjetas que ve jQuery:", $(".tarjeta").length);
console.log("Tarjetas que ve vanilla:", document.querySelectorAll(".tarjeta").length);

// ── 9. IMPLEMENTACIONES PRÁCTICAS DE JQUERY EN LA TIENDA ────────────────
$(function () {
  // A. Desplazamiento suave (Smooth Scroll) al hacer clic en el menú
  $('nav a[href^="#"]').on("click", function (evento) {
    const destinoId = $(this).attr("href");
    const $destino = $(destinoId);
    if ($destino.length) {
      evento.preventDefault();
      $("html, body").stop().animate(
        {
          scrollTop: $destino.offset().top - 20,
        },
        600
      );
    }
  });

  // B. Animación con jQuery en el aviso de stock
  $("#aviso-stock").hide().fadeIn(800);

  // C. Animación fluida con jQuery al interactuar con los filtros de categoría
  $("#filtros").on("click", "button", function () {
    $("#lista-productos .tarjeta").hide().fadeIn(350);
  });

  // D. Animación en el mensaje de confirmación del pedido
  $("form").on("submit", function () {
    setTimeout(function () {
      $("#mensaje-pedido").hide().slideDown(400);
    }, 100);
  });

  // E. Botón flotante 'Subir' con jQuery (aparece con scroll y desplaza arriba)
  const $btnSubir = $(
    '<button type="button" id="btn-volver-arriba" title="Volver al inicio">↑ Subir</button>'
  )
    .appendTo("body")
    .hide();

  $(window).on("scroll", function () {
    if ($(this).scrollTop() > 300) {
      $btnSubir.fadeIn(300);
    } else {
      $btnSubir.fadeOut(300);
    }
  });

  $btnSubir.on("click", function () {
    $("html, body").animate({ scrollTop: 0 }, 500);
  });
});

