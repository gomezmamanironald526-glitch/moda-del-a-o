// ── 1. LOS ELEMENTOS QUE SE VAN A ESCUCHAR ──────────────────────────────
const buscador = document.querySelector("#buscador");
const filtros = document.querySelector("#filtros");
const resultado = document.querySelector("#resultado");
const formulario = document.querySelector("form");

let categoriaActiva = "todos";
let textoBuscado = "";
let ordenActual = "nombre";

// ── 2. UNA SOLA FUNCIÓN QUE DECIDE QUÉ MOSTRAR ──────────────────────────
// Función auxiliar para búsqueda sin importar tildes ni mayúsculas
function normalizar(texto) {
  return (texto || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

function actualizar() {
  const termino = normalizar(textoBuscado);
  const visibles = productos
    .filter(p => categoriaActiva === "todos" || p.categoria === categoriaActiva)
    .filter(p => normalizar(p.nombre).includes(termino) || normalizar(p.categoria).includes(termino))
    .sort((a, b) => {
      if (ordenActual === "precio-asc") return a.precio - b.precio;
      if (ordenActual === "precio-desc") return b.precio - a.precio;
      if (ordenActual === "stock") return b.stock - a.stock;
      return a.nombre.localeCompare(b.nombre, "es");
    });

  render(visibles);
  if (resultado) {
    resultado.textContent = `${visibles.length} de ${productos.length} productos`;
  }
}

actualizar();

document.addEventListener("preferencias:cambiadas", (event) => {
  ordenActual = event.detail.orden;
  actualizar();
});

// ── 3. EL EVENTO input ──────────────────────────────────────────────────
if (buscador) {
  buscador.addEventListener("input", (event) => {
    textoBuscado = event.target.value;
    actualizar();
  });
}

// ── 4. DELEGACIÓN DE EVENTOS ────────────────────────────────────────────
if (filtros) {
  filtros.addEventListener("click", (event) => {
    const boton = event.target.closest("button");
    if (!boton) return;

    categoriaActiva = boton.dataset.categoria;

    filtros.querySelectorAll("button").forEach(b => b.classList.remove("activo"));
    boton.classList.add("activo");

    actualizar();
  });
}

// ── 5. EL EVENTO submit Y preventDefault ────────────────────────────────
if (formulario) {
  const fecha = formulario.querySelector("#fecha");
  const hoy = new Date().toLocaleDateString("en-CA"); // Formato YYYY-MM-DD en hora local
  if (fecha) {
    fecha.min = hoy;
  }

  formulario.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!formulario.reportValidity()) {
      return;
    }

    const datos = Object.fromEntries(new FormData(formulario));

    // Validación de teléfono usando PATRONES de la sección 6
    if (datos.telefono && typeof PATRONES !== "undefined" && !PATRONES.telefono.test(datos.telefono.trim())) {
      const telInput = formulario.querySelector("#telefono");
      telInput.setCustomValidity("El teléfono debe tener 7 u 8 dígitos.");
      telInput.reportValidity();
      telInput.addEventListener("input", () => telInput.setCustomValidity(""), { once: true });
      return;
    }

    // Validación de fecha
    if (fecha && fecha.value && fecha.value < hoy) {
      fecha.setCustomValidity("La fecha de entrega no puede ser anterior a hoy.");
      fecha.reportValidity();

      fecha.addEventListener("input", () => fecha.setCustomValidity(""), { once: true });
      return;
    }

    console.log("Pedido recibido:", datos);

    // Conexión con datos.js: obtener el precio del producto seleccionado
    const productoElegido = productos.find(p => 
      normalizar(p.categoria) === normalizar(datos.producto) ||
      normalizar(p.nombre).includes(normalizar(datos.producto))
    );
    const precioUnitario = productoElegido ? productoElegido.precio : 50;
    const cantidad = parseInt(datos.cantidad, 10) || 1;

    // Conexión con funciones.js: usar calcularTotal()
    const totalCompra = typeof calcularTotal === "function"
      ? calcularTotal(precioUnitario, cantidad)
      : precioUnitario * cantidad;

    // Conexión con funciones.js: registrar en el contador prendasVendidas()
    let avisoVenta = "";
    if (typeof prendasVendidas === "function") {
      const num = prendasVendidas();
      avisoVenta = ` (Registro #${num})`;
    }

    const mensajePedido = document.querySelector("#mensaje-pedido");
    const textoConfirmacion = `¡Gracias ${datos.nombre}! Tu pedido de ${cantidad} "${datos.producto}" por un total de Bs ${totalCompra.toFixed(2)} ha sido registrado.${avisoVenta} Fecha de entrega: ${datos.fecha}.`;

    if (mensajePedido) {
      mensajePedido.textContent = textoConfirmacion;
      mensajePedido.style.color = "#2e7d32";
      mensajePedido.style.fontWeight = "600";
      mensajePedido.style.marginTop = "0.75rem";
    }

    if (resultado) {
      resultado.textContent = `Último pedido: ${datos.nombre} - ${cantidad} ${datos.producto} (Bs ${totalCompra.toFixed(2)})`;
    }

    formulario.reset();
  });
}

// ── 6. EXPRESIONES REGULARES, LO JUSTO ──────────────────────────────────
const PATRONES = {
  telefono: /^[0-9]{7,8}$/,
  correo: /^[^@\s]+@[^@\s]+\.[a-z]{2,}$/i,
  ci: /^[0-9]{5,10}(-[0-9A-Za-z]{1,3})?$/,
};

console.log("70123456 válido:", PATRONES.telefono.test("70123456"));
console.log("7012 válido:", PATRONES.telefono.test("7012"));
console.log("ana@correo.bo válido:", PATRONES.correo.test("ana@correo.bo"));

// ── 7. LA VALIDACIÓN DE VERDAD NO ESTÁ AQUÍ ─────────────────────────────
