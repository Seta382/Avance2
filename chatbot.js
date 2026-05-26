const botonChat = document.getElementById("abrir-chat");

const chat = document.getElementById("chat");

const enviar = document.getElementById("enviar");

const input = document.getElementById("input-chat");

const mensajes = document.getElementById("mensajes");

/* ABRIR CHAT */

botonChat.addEventListener("click", () => {

    if(chat.style.display === "flex") {

        chat.style.display = "none";

    } else {

        chat.style.display = "flex";
    }

});

/* ENVIAR MENSAJE */

enviar.addEventListener("click", enviarMensaje);

input.addEventListener("keypress", function(e){

    if(e.key === "Enter") {

        enviarMensaje();
    }

});

function enviarMensaje() {

    const texto = input.value;

    if(texto.trim() === "") return;

    /* MENSAJE USUARIO */

    const mensajeUsuario = document.createElement("div");

    mensajeUsuario.classList.add("usuario");

    mensajeUsuario.textContent = texto;

    mensajes.appendChild(mensajeUsuario);

    /* RESPUESTA BOT */

    const mensajeBot = document.createElement("div");

    mensajeBot.classList.add("bot");

    mensajeBot.textContent = responder(texto);

    mensajes.appendChild(mensajeBot);

    /* LIMPIAR INPUT */

    input.value = "";

    /* SCROLL */

    mensajes.scrollTop = mensajes.scrollHeight;
}

/* RESPUESTAS */

function responder(texto) {

    texto = texto.toLowerCase();

    if(texto.includes("sismo")) {

        return "Durante un sismo debes mantener la calma y ubicar zonas seguras.";

    } else if(texto.includes("incendio")) {

        return "En un incendio debes evacuar y usar extintores si es seguro.";

    } else if(texto.includes("inundacion")) {

        return "Evita zonas inundadas y desconecta la electricidad.";

    } else if(texto.includes("hola")) {

        return "Hola 👋 ¿Cómo puedo ayudarte?";

    } else {

        return "No entiendo tu pregunta todavía.";
    }
}