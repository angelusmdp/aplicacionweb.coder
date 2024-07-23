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
      alert('Por favor ingrese valores válidos para peso y dimensiones.');
      return;
    }

    // Calcular el costo de envío (simulación simple)
    let shippingCost = calculateShippingCost(weight, height, width, length, country);
    
    // Mostrar el resultado
    document.getElementById('result').innerText = `El costo de envío estimado es $${shippingCost.toFixed(2)}`;
  });

  function calculateShippingCost(weight, height, width, length, country) {
    // Simulación simple del costo de envío (fórmula arbitraria)
    let cost = weight * 0.1 + (height + width + length) * 0.05;
    
    // Ajustar el costo según la ciudad de destino (simulación)
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
