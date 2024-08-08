
document.getElementById('shipping-form').addEventListener('submit', function(event) {
  event.preventDefault();

  // Obtener los valores de los inputs
  let weight = parseFloat(document.getElementById('weight').value);
  let height = parseFloat(document.getElementById('height').value);
  let width = parseFloat(document.getElementById('width').value);
  let length = parseFloat(document.getElementById('length').value);
  let country = document.getElementById('country').value;

  // Validar que los campos sean números y mayores que cero
  if (isNaN(weight) || isNaN(height) || isNaN(width) || isNaN(length) || weight <= 0 || height <= 0 || width <= 0 || length <= 0) {
      displayError('Por favor ingrese valores válidos para peso y dimensiones.');
      return;
  } else {
      clearError();
  }

  // Calcular el costo de envío
  let shippingCost = calculateShippingCost(weight, height, width, length, country);

  // Guardar en localStorage
  saveToLocalStorage(weight, height, width, length, country, shippingCost);

  // Mostrar el resultado
  document.getElementById('result').innerText = `El costo de envío estimado es $${shippingCost.toFixed(2)}`;
});

function calculateShippingCost(weight, height, width, length, country) {
  let cost = weight * 0.1 + (height + width + length) * 0.05;

  switch(country) {
      case 'CABA':
          cost *= 1.2;
          break;
      case 'ROS':
          cost *= 1.5;
          break;
      case 'COR':
          cost *= 1.3;
          break;
      default:
          cost *= 1.1;
  }

  return cost;
}

function displayError(message) {
    document.getElementById('error-message').innerText = message;
}

function clearError() {
    document.getElementById('error-message').innerText = '';
}

function saveToLocalStorage(weight, height, width, length, country, shippingCost) {
    const shipmentData = {
        weight: weight,
        height: height,
        width: width,
        length: length,
        country: country,
        shippingCost: shippingCost
    };
    localStorage.setItem('lastShipment', JSON.stringify(shipmentData));
}

function loadFromLocalStorage() {
    const shipmentData = JSON.parse(localStorage.getItem('lastShipment'));
    if (shipmentData) {
        document.getElementById('weight').value = shipmentData.weight;
        document.getElementById('height').value = shipmentData.height;
        document.getElementById('width').value = shipmentData.width;
        document.getElementById('length').value = shipmentData.length;
        document.getElementById('country').value = shipmentData.country;
        document.getElementById('result').innerText = `El costo de envío estimado es $${shipmentData.shippingCost.toFixed(2)}`;
    }
}

// Cargar los datos guardados al iniciar
loadFromLocalStorage();