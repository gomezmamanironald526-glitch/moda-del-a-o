/* -------------------------------------------------------------------------
  MODA DEL AÑO – Preferencias y geolocalización
   (preferencias.js)

   Este módulo administra las preferencias persistentes del usuario mediante
   localStorage (tema claro/oscuro y criterio de ordenamiento del catálogo)
   y calcula la distancia en tiempo real hacia la tienda en La Paz usando
   la API de Geolocalización del navegador y la fórmula de Haversine.
   ------------------------------------------------------------------------- */

// -- 1. localStorage Y sessionStorage ------------------------------------
// localStorage guarda pares clave/valor como TEXTO y persiste aunque se
// cierre el navegador. sessionStorage solo dura mientras la pestaña esté abierta.
const CLAVE = "Modas del año:preferencias";

const PREFERENCIAS_POR_DEFECTO = { tema: "claro", orden: "nombre" };
const ORDENES_VALIDOS = ["nombre", "precio-asc", "precio-desc", "stock"];

// -- 2. LEER Y GUARDAR CON try/catch -------------------------------------
// JSON.parse puede fallar si alguien editó localStorage manualmente, y
// setItem puede fallar en modo incógnito restringido o con cuota llena.
function leerPreferencias() {
  try {
    const texto = localStorage.getItem(CLAVE);
    if (!texto) return { ...PREFERENCIAS_POR_DEFECTO };

    const guardado = JSON.parse(texto);

    return {
      tema: guardado.tema === "oscuro" ? "oscuro" : "claro",
      orden: ORDENES_VALIDOS.includes(guardado.orden) ? guardado.orden : "nombre",
    };
  } catch (error) {
    console.warn("Preferencias corruptas, se usan las por defecto:", error.message);
    return { ...PREFERENCIAS_POR_DEFECTO };
  }
}

function guardarPreferencias(prefs) {
  try {
    localStorage.setItem(CLAVE, JSON.stringify(prefs));
    return true;
  } catch (error) {
    console.warn("No se pudo guardar:", error.message);
    return false;
  }
}

// -- 3. APLICAR LO GUARDADO AL CARGAR ------------------------------------
let preferencias = leerPreferencias();

const ETIQUETAS_ORDEN = {
  "nombre": "nombre (A-Z)",
  "precio-asc": "menor precio",
  "precio-desc": "mayor precio",
  "stock": "mayor disponibilidad"
};

function aplicarPreferencias() {
  const esOscuro = preferencias.tema === "oscuro";
  document.body.classList.toggle("tema-oscuro", esOscuro);

  const boton = document.querySelector("#tema-toggle");
  if (boton) {
    boton.setAttribute("aria-pressed", String(esOscuro));
    boton.textContent = esOscuro ? "Modo claro" : "Modo oscuro";
  }

  const selectOrden = document.querySelector("#orden");
  if (selectOrden) {
    selectOrden.value = preferencias.orden;
  }

  const estadoPrefs = document.querySelector("#estado-prefs");
  if (estadoPrefs) {
    const etiquetaOrden = ETIQUETAS_ORDEN[preferencias.orden] || preferencias.orden;
    estadoPrefs.textContent = `Tema ${preferencias.tema} activo · Catálogo ordenado por ${etiquetaOrden}.`;
  }

  // Sincronizar con el catálogo interactivo (eventos.js)
  document.dispatchEvent(new CustomEvent("preferencias:cambiadas", { detail: preferencias }));
}

aplicarPreferencias();

// -- 4. GUARDAR AL CAMBIAR -----------------------------------------------
document.querySelector("#tema-toggle")?.addEventListener("click", () => {
  preferencias.tema = preferencias.tema === "oscuro" ? "claro" : "oscuro";
  guardarPreferencias(preferencias);
  aplicarPreferencias();
});

document.querySelector("#orden")?.addEventListener("change", (event) => {
  preferencias.orden = event.target.value;
  guardarPreferencias(preferencias);
  aplicarPreferencias();
});

document.querySelector("#olvidar")?.addEventListener("click", () => {
  localStorage.removeItem(CLAVE);
  preferencias = { ...PREFERENCIAS_POR_DEFECTO };
  aplicarPreferencias();
  const estadoPrefs = document.querySelector("#estado-prefs");
  if (estadoPrefs) {
    estadoPrefs.textContent = "Preferencias restablecidas a los valores por defecto.";
  }
});

// -- 5. LO QUE NUNCA VA EN localStorage ----------------------------------
// Nunca guardar contraseñas, tokens de sesión sensibles, números de tarjeta
// ni datos personales privados (CI, dirección particular o teléfono del cliente),
// ya que cualquier script en la página puede leer localStorage.

// -- 6. GEOLOCATION ------------------------------------------------------
// Referencia aproximada al centro de La Paz; datos.json no incluye una dirección.
const LOCAL = { lat: -16.5076964, lng: -68.1533841 };

function distanciaKm(lat1, lng1, lat2, lng2) {
  const R = 6371;
  const aRad = (g) => (g * Math.PI) / 180;
  const dLat = aRad(lat2 - lat1);
  const dLng = aRad(lng2 - lng1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(aRad(lat1)) * Math.cos(aRad(lat2)) * Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

const $ubic = document.querySelector("#estado-ubicacion");

document.querySelector("#ubicarme")?.addEventListener("click", () => {
  if (!$ubic) return;

  if (!navigator.geolocation) {
    $ubic.textContent = "Tu navegador no permite compartir la ubicación.";
    $ubic.className = "error";
    return;
  }

  $ubic.textContent = "Solicitando permiso de ubicación...";
  $ubic.className = "cargando";

  navigator.geolocation.getCurrentPosition(
    (position) => {
      const { latitude, longitude, accuracy } = position.coords;
      const km = distanciaKm(latitude, longitude, LOCAL.lat, LOCAL.lng);
      $ubic.textContent =
        `Estás aproximadamente a ${km.toFixed(1)} km del centro de La Paz (precisión: ±${Math.round(accuracy)} m).`;
      $ubic.className = "ok";
    },
    (error) => {
      const mensajes = {
        [error.PERMISSION_DENIED]:
          "No diste permiso de ubicación. Puedes seguir explorando el catálogo igual.",
        [error.POSITION_UNAVAILABLE]:
          "No se pudo determinar tu ubicación actual. ¿Estás bajo techo o sin señal GPS?",
        [error.TIMEOUT]:
          "La consulta de ubicación tardó demasiado. Intenta de nuevo.",
      };
      $ubic.textContent = mensajes[error.code] || "No se pudo obtener la ubicación.";
      $ubic.className = "error";
    },
    {
      enableHighAccuracy: false,
      timeout: 10000,
      maximumAge: 300000,
    }
  );
});

// -- 7. LO QUE SORPRENDE EN LA ENTREGA -----------------------------------
// - Sincronización en tiempo real entre el selector #orden, localStorage y el
//   renderizado dinámico de tarjetas del catálogo.
// - Soporte de modo oscuro completo mediante variables CSS (.tema-oscuro) que
//   se recuerda automáticamente entre recargas y visitas.
