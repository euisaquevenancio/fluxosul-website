// Formulário
const NAME_INPUT = document.querySelector("#name");
const CITY_SELECT = document.querySelector("#city");
const PREFFERED_SERVICE_DATE = document.querySelector("#preferredServiceDate");
const PREFERRED_SERVICE_SELECT = document.querySelector("#preferredService");
const MESSAGE_TEXTAREA = document.querySelector("#message");
const SUBMIT_FORM_BUTTON = document.querySelector("#submitForm");

const AVAILABLE_CITIES_ARRAY = ["Curitiba",  "São José dos Pinhais", "Colombo", "Pinhais", "Araucária", "Fazenda Rio Grande", "Campo Largo", "Campina Grande do Sul", "Quatro Barras", "Almirante Tamandaré"];
const AVAILABLE_SERVICES_ARRAY = ["Desentupimento de pia / ralo", "Desentupimento de vaso sanitário",  "Desentupimento de esgoto",  "Hidrojateamento", "Limpeza de caixa de gordura",  "Manutenção preventiva"];

let day = new Date().getDate();
if (day < 10) {
    day = "0" + day;
}

let month = new Date().getMonth() + 1;
if (month < 10) {
    month = "0" + month;
}

let year = new Date().getFullYear();
const TODAY = year + "-" + month + "-" + day;
const MAX_DATE = year + "-" + 12 + "-" + 31;

PREFFERED_SERVICE_DATE.value = TODAY;
PREFFERED_SERVICE_DATE.setAttribute("min", TODAY);
PREFFERED_SERVICE_DATE.setAttribute("max", MAX_DATE);

SUBMIT_FORM_BUTTON.addEventListener("click", function() {
    validateForm()
});

function validateForm() {
    const ERRORS = [];

    if (NAME_INPUT.value.trim() == null || NAME_INPUT.value.trim() == "" || !NAME_INPUT.checkValidity()) {                
        ERRORS.push("Digite um nome");
    }

    if (CITY_SELECT.value == null || CITY_SELECT.value == "" || !AVAILABLE_CITIES_ARRAY.includes(CITY_SELECT.value)) {
        ERRORS.push("Selecione uma cidade válida");
    }
            
    if (PREFFERED_SERVICE_DATE.value == null || PREFFERED_SERVICE_DATE.value == "" || PREFFERED_SERVICE_DATE.value < TODAY || PREFFERED_SERVICE_DATE.value > MAX_DATE || !PREFFERED_SERVICE_DATE.checkValidity()) {
        ERRORS.push("Selecione uma data válida");
    }

    if (PREFERRED_SERVICE_SELECT.value == null || PREFERRED_SERVICE_SELECT.value == "" || !AVAILABLE_SERVICES_ARRAY.includes(PREFERRED_SERVICE_SELECT.value)) {
        ERRORS.push("Selecione um serviço válido");
    }

    if (ERRORS.length > 0) {
        Swal.fire({
            toast: true,
            position: "top-end",
            icon: "warning",
            html: `<ul style="margin:0; padding-left:18px; text-align:left">
                ${ERRORS.map(e => `<li>${e}</li>`).join("")}
                </ul>`,
            timer: 4000,
            timerProgressBar: true,
            showConfirmButton: false
        });
        return;
    }

    // Link para conversa WhatsApp
    let whatsAppChatLink = "*Nome:* " + NAME_INPUT.value.trim() + "\n"
                         + "*Cidade:* " + CITY_SELECT.value.trim() + "\n"
                         + "*Data desejada:* " + new Date(PREFFERED_SERVICE_DATE.value + "T00:00").toLocaleDateString("pt-BR") + "\n"
                         + "*Serviço desejado:* " + PREFERRED_SERVICE_SELECT.value.trim();

    if (MESSAGE_TEXTAREA.value.trim() != "") {
        whatsAppChatLink += "\n*Mensagem:* " + MESSAGE_TEXTAREA.value.trim();
    }

    whatsAppChatLink = "https://wa.me/5513997978218?text=" + encodeURIComponent(whatsAppChatLink);
    window.open(whatsAppChatLink);
}

// Escondendo sidebar quando o link é clicado
const OFFCANVAS_NAVBAR = document.querySelector("#offcanvasNavbar");
document.querySelectorAll(".nav-link").forEach(function (linkNavbar) {
    linkNavbar.addEventListener("click", function () {
        const OFFCANVAS_INSTANCE = bootstrap.Offcanvas.getInstance(OFFCANVAS_NAVBAR) || new bootstrap.Offcanvas(OFFCANVAS_NAVBAR);
        OFFCANVAS_INSTANCE.hide();
    });
});