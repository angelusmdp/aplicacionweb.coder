// Funciones relacionadas con la manipulación del DOM
function showElement(elementId) {
    document.getElementById(elementId).style.display = 'block';
}

function hideElement(elementId) {
    document.getElementById(elementId).style.display = 'none';
}

function updateInnerText(elementId, text) {
    document.getElementById(elementId).innerText = text;
}

function clearInputs() {
    document.getElementById('shipping-form').reset();
    clearError();
}

// Función para inicializar el formulario
function initializeForm() {
    loadFromLocalStorage();
    // Ocultar mensajes de error si no hay errores al cargar la página
    hideElement('error-message');
}

// Llamar a initializeForm cuando se carga la página
document.addEventListener('shipping-form').addEventListener('submit', initializeForm);