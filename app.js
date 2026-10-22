// ── 1. CONSTANTES ───────────────────────────────────────────────────────
const negocio = "Moda del año";
const anioFundacion = 1998;

// ── 2. VARIABLES ────────────────────────────────────────────────────────
let poleraDeNiñosEnVitrina = 50;
poleraDeNiñosEnVitrina = 35;

let pantalonEnVitrina = 120;
pantalonEnVitrina = 35;

let poleronEnVitrina = 150;
poleronEnVitrina = 35;

let vestidosEnVitrina = 180;
vestidosEnVitrina = 35;

// ── 3. TIPOS ────────────────────────────────────────────────────────────
const precioPolera = 50;
const precioPantalon = 120;
const precioPoleron = 150;
const precioVestidos = 180;
const abiertoHoy = true;
const promocionDelDia = null;
let telefono;

console.log("tipos:", typeof negocio, typeof precioPantalon, typeof abiertoHoy);
console.log("null es", promocionDelDia, "| sin asignar es", telefono);

// ── 4. TEMPLATE LITERAL ─────────────────────────────────────────────────
const resumen = `${negocio} abrió en ${anioFundacion} y hoy quedan ${poleraDeNiñosEnVitrina} poleras de niños.`;
console.log(resumen); 


// ── 5. COMPARACIÓN ──────────────────────────────────────────────────────
console.log("120" == precioPantalon);
console.log("120" === precioPantalon);

// ── 6. PRIMER CAMBIO EN LA PÁGINA ───────────────────────────────────────
const subtitulo = document.querySelector("#aviso-stock");
subtitulo.textContent = `Hoy quedan ${poleraDeNiñosEnVitrina} poleras de niños.`;

// ── LA PREGUNTA DEL DÍA ─────────────────────────────────────────────────
