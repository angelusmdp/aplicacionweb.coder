// Cargar el formulario cuando la página se carga
window.addEventListener('load', initializeForm);

// Manejar el evento de envío del formulario
document.getElementById('shipping-form').addEventListener('submit', async function(event) {
    event.preventDefault();

    // Obtener los valores de los inputs
    let weight = parseFloat(document.getElementById('weight').value);
    let height = parseFloat(document.getElementById('height').value);
    let width = parseFloat(document.getElementById('width').value);
    let length = parseFloat(document.getElementById('length').value);
    let country = document.getElementById('country').value.toUpperCase();

    // Validar que los campos sean números y mayores que cero
    if (isNaN(weight) || isNaN(height) || isNaN(width) || isNaN(length) || weight <= 0 || height <= 0 || width <= 0 || length <= 0) {
        showElement('error-message');
        updateInnerText('error-message', 'Por favor ingrese valores válidos para peso y dimensiones.');
        return;
    }

    hideElement('error-message'); // Ocultar mensaje de error si no hay problemas

    // Calcular el costo de envío
    let shippingCost = await calculateShippingCost(weight, height, width, length, country);

    // Mostrar el resultado
    updateInnerText('result', `El costo de envío estimado es $${shippingCost.toFixed(2)}`);

    // Guardar en localStorage
    saveToHistory({ weight, height, width, length, country, shippingCost });
    displayHistory();

    clearInputs(); // Limpiar el formulario después del cálculo
});

// Mostrar el historial de envíos en el DOM
function displayHistory() {
    const history = JSON.parse(localStorage.getItem('shippingHistory')) || [];
    const historySection = document.querySelector('.history-section');
    historySection.innerHTML = ''; // Limpiar el historial existente en el DOM

    history.forEach(item => {
        const historyItem = document.createElement('div');
        historyItem.className = 'history-item';
        historyItem.innerHTML = `
            <div>Peso: ${item.weight}kg, Dimensiones: ${item.height}x${item.width}x${item.length}cm, Destino: ${item.country} - Costo: $${item.shippingCost.toFixed(2)}</div>
            <button onclick="deleteHistoryItem(${item.id})">Borrar</button>
        `;
        historySection.appendChild(historyItem);
    });
}

// Eliminar un ítem del historial
function deleteHistoryItem(id) {
    let history = JSON.parse(localStorage.getItem('shippingHistory')) || [];
    history = history.filter(item => item.id !== id);
    localStorage.setItem('shippingHistory', JSON.stringify(history));
    displayHistory();
}

// Borrar todo el historial
function clearHistory() {
    localStorage.removeItem('shippingHistory');
    displayHistory();
}

// Confirmar el envío y mostrar resumen
document.getElementById('confirm-shipping').addEventListener('click', function() {
    const lastEntry = JSON.parse(localStorage.getItem('shippingHistory')).slice(-1)[0];
    if (lastEntry) {
        showElement('confirmation-section');
        updateInnerText('confirmation-details', `
            Detalle del envío:
            Peso: ${lastEntry.weight}kg
            Dimensiones: ${lastEntry.height}x${lastEntry.width}x${lastEntry.length}cm
            Destino: ${lastEntry.country}
            Costo total: $${lastEntry.shippingCost.toFixed(2)}
        `);
    } else {
        alert('No hay envíos recientes para confirmar.');
    }
});