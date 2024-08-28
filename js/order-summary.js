function displayOrderSummary() {
    const orderSummaryContainer = document.getElementById('order-summary');

    // Recuperar el último pedido guardado en el localStorage
    const lastOrder = JSON.parse(localStorage.getItem('lastOrder'));

    if (lastOrder) {
        // Crear elementos HTML para mostrar el resumen
        const summaryHtml = `
            <p><strong>Nombre:</strong> ${lastOrder.name}</p>
            <p><strong>Dirección:</strong> ${lastOrder.address}, ${lastOrder.city}, ${lastOrder.postalCode}</p>
            <p><strong>País de destino:</strong> ${lastOrder.country}</p>
            <p><strong>Peso del paquete:</strong> ${lastOrder.weight} kg</p>
            <p><strong>Dimensiones:</strong> ${lastOrder.height} x ${lastOrder.width} x ${lastOrder.length} cm</p>
            <p><strong>Costo del envío:</strong> $${lastOrder.cost}</p>
        `;
        orderSummaryContainer.innerHTML = summaryHtml;
    } else {
        orderSummaryContainer.innerHTML = '<p>No hay información de pedido disponible.</p>';
    }
}

// Llamar a la función directamente para que se ejecute al cargar el script
displayOrderSummary();