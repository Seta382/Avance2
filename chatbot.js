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

/* ==========================================================
   BASE DE CONOCIMIENTO
   ========================================================== */

const TEMAS = [
    {
        claves: ["sismo", "terremoto", "temblor"],
        respuesta: "Durante un sismo: manten la calma, alejate de ventanas y objetos que puedan caer, ubicate bajo un mueble resistente y no uses el ascensor."
    },
    {
        claves: ["incendio", "fuego", "quemadura"],
        respuesta: "Ante un incendio: evacua de inmediato, no uses el ascensor, agachate si hay humo y usa un extintor solo si el fuego es pequeno y controlable."
    },
    {
        claves: ["inundacion", "inundaciones", "desborde"],
        respuesta: "En caso de inundacion: desconecta la electricidad, evita caminar o conducir por zonas anegadas y dirigete a un lugar alto."
    },
    {
        claves: ["tsunami", "maremoto"],
        respuesta: "Si sientes un sismo fuerte cerca de la costa, alejate del mar y dirigete a zonas altas de inmediato; no esperes una alerta oficial."
    },
    {
        claves: ["robo", "roban", "robaron", "asalto", "ladron", "ladrones", "hurto"],
        respuesta: "Para prevenir robos: instala cerraduras seguras, alarmas y buena iluminacion exterior, y evita mostrar objetos de valor cerca de ventanas."
    },
    {
        claves: ["fuga de gas", "olor a gas", "gas"],
        respuesta: "Si detectas olor a gas: no enciendas luces ni fosforos, cierra la llave de paso, ventila el ambiente y sal de la vivienda antes de llamar a emergencias."
    },
    {
        claves: ["primeros auxilios", "herida", "botiquin"],
        respuesta: "Todo hogar debe tener un botiquin con gasas, alcohol, vendas y medicamentos basicos. Ante una emergencia medica grave, llama de inmediato a los servicios de emergencia."
    },
    {
        claves: ["numero de emergencia", "bomberos", "policia", "ambulancia"],
        respuesta: "Numeros de emergencia en Peru: 105 Policia, 116 Bomberos, 106 SAMU (ambulancia)."
    },
    {
        claves: ["cableado", "cortocircuito", "electric"],
        respuesta: "Revisa periodicamente el cableado electrico y evita sobrecargar los tomacorrientes: un cableado en mal estado es una de las principales causas de incendios."
    },
    {
        claves: ["plan de evacuacion", "ruta de evacuacion", "evacuacion"],
        respuesta: "Disena un plan familiar de evacuacion: define rutas de salida, un punto de encuentro y practica el simulacro al menos una vez al ano."
    },
    {
        claves: ["encuesta"],
        respuesta: "Puedes evaluar la seguridad de tu vivienda en nuestra encuesta: ve a la seccion Encuesta del menu."
    },
];

const SALUDOS = ["hola", "buenas", "buenos dias", "buenas tardes", "buenas noches"];
const DESPEDIDAS = ["adios", "chao", "hasta luego", "nos vemos"];
const AGRADECIMIENTOS = ["gracias"];
const PALABRAS_AYUDA = ["ayuda", "menu", "opciones", "que sabes hacer"];

/* Quita tildes para que se reconozca igual */
function normalizar(texto) {

    return texto
        .toLowerCase()
        .normalize("NFD")
        .replace(/[̀-ͯ]/g, "");
}

function incluyeAlguna(texto, lista) {

    return lista.some(palabra => texto.includes(normalizar(palabra)));
}

/* RESPUESTAS */

function responder(texto) {

    const t = normalizar(texto);

    if(incluyeAlguna(t, PALABRAS_AYUDA)) {

        const temas = TEMAS.map(tema => tema.claves[0]).join(", ");

        return "Puedo ayudarte con: " + temas + ". Escribe cualquiera de estas palabras para saber mas.";
    }

    if(incluyeAlguna(t, DESPEDIDAS)) {

        return "Hasta luego! Cuida tu hogar.";
    }

    if(incluyeAlguna(t, AGRADECIMIENTOS)) {

        return "De nada! Estoy para ayudarte.";
    }

    if(incluyeAlguna(t, SALUDOS)) {

        return "Hola! En que puedo ayudarte? Escribe 'ayuda' para ver los temas disponibles.";
    }

    const tema = TEMAS.find(tema => incluyeAlguna(t, tema.claves));

    if(tema) return tema.respuesta;

    return "No entiendo tu pregunta todavia. Escribe 'ayuda' para ver los temas que conozco.";
}
