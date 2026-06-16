/* =============================================================
   encuesta.js — Lógica del carrusel de encuesta (CasaSegura)
   =============================================================
   CONFIGURACIÓN RÁPIDA:
   - TOTAL_PAGINAS   → número total de páginas del carrusel
   - RADIO_POR_PAG   → lista de nombres de radio-buttons por página
                       (uno por pregunta obligatoria de opción múltiple)
   ============================================================= */

// ── [CONFIG] ── Ajusta estos valores si agregas o quitas páginas ──────────
const TOTAL_PAGINAS = 3;

// Nombres de los radio-buttons que deben responderse en cada página.
// Si una página no tiene radios obligatorios, deja su arreglo vacío: []
const RADIO_POR_PAG = {
    1: ["estructura", "zona", "cableado"],   // [PÁGINA 1 — radios obligatorios]
    2: ["alarma", "extintores", "humo", "botiquin"], // [PÁGINA 2 — radios obligatorios]
    3: ["salidas", "cerraduras", "plan"],    // [PÁGINA 3 — radios obligatorios]
};
// ─────────────────────────────────────────────────────────────────────────

let paginaActual = 1;

/* ---------- Navegar entre páginas ---------- */
function cambiarPagina(direccion) {
    // Validar antes de avanzar
    if (direccion === 1 && !validarPagina(paginaActual)) {
        mostrarAlerta(true);
        return;
    }
    mostrarAlerta(false);

    // Si estamos en la última página y el usuario presiona "Enviar"
    if (direccion === 1 && paginaActual === TOTAL_PAGINAS) {
        enviarEncuesta();
        return;
    }

    // Ocultar página actual
    document.getElementById(`pagina-${paginaActual}`).classList.remove("activa");

    // Calcular nueva página
    paginaActual = Math.min(Math.max(paginaActual + direccion, 1), TOTAL_PAGINAS);

    // Mostrar nueva página
    document.getElementById(`pagina-${paginaActual}`).classList.add("activa");

    actualizarUI();
    window.scrollTo({ top: 0, behavior: "smooth" });
}

/* ---------- Actualizar barra de progreso y botones ---------- */
function actualizarUI() {
    // Barra de progreso
    const porcentaje = (paginaActual / TOTAL_PAGINAS) * 100;
    document.getElementById("fill-progreso").style.width = `${porcentaje}%`;
    document.getElementById("texto-progreso").textContent =
        `Página ${paginaActual} de ${TOTAL_PAGINAS}`;

    // Botón anterior
    document.getElementById("btn-anterior").disabled = (paginaActual === 1);

    // Botón siguiente / enviar
    const btnSig = document.getElementById("btn-siguiente");
    if (paginaActual === TOTAL_PAGINAS) {
        btnSig.textContent = "Enviar encuesta ✔";
        btnSig.classList.remove("btn-siguiente");
        btnSig.classList.add("btn-enviar");
        btnSig.setAttribute("onclick", "cambiarPagina(1)");
    } else {
        btnSig.textContent = "Siguiente →";
        btnSig.classList.remove("btn-enviar");
        btnSig.classList.add("btn-siguiente");
        btnSig.setAttribute("onclick", "cambiarPagina(1)");
    }
}

/* ---------- Validar que todos los radios de la página estén marcados ---------- */
function validarPagina(num) {
    const radios = RADIO_POR_PAG[num] || [];
    for (const nombre of radios) {
        const seleccionado = document.querySelector(`input[name="${nombre}"]:checked`);
        if (!seleccionado) return false;
    }
    return true;
}

/* ---------- Mostrar / ocultar alerta ---------- */
function mostrarAlerta(visible) {
    const el = document.getElementById("alerta");
    if (visible) {
        el.classList.add("visible");
    } else {
        el.classList.remove("visible");
    }
}

/* ---------- Calcular puntaje y redirigir ---------- */
function enviarEncuesta() {
    let total = 0;
    const respuestas = document.querySelectorAll('input[type="radio"]:checked');
    respuestas.forEach(r => { total += parseInt(r.value, 10); });

    // Guardar datos en localStorage
    localStorage.setItem("puntajeTotal", total);
    localStorage.setItem("nombreEncuestado", document.getElementById("nombre")?.value || "");
    localStorage.setItem("direccionEncuestado", document.getElementById("direccion")?.value || "");
    localStorage.setItem("comentariosEncuesta", document.getElementById("comentarios")?.value || "");

    window.location.href = "resultado.html";
}
