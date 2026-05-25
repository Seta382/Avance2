document.getElementById("form-encuesta").addEventListener("submit", function(e) {
    e.preventDefault();

    let total = 0;
    const respuestas = document.querySelectorAll('input[type="radio"]:checked');
    respuestas.forEach(r => total += parseInt(r.value));

    // Guardar puntaje en localStorage para mostrarlo en resultado.html
    localStorage.setItem("puntajeTotal", total);

    // Redirigir a la página de resultados
    window.location.href = "resultado.html";
});
