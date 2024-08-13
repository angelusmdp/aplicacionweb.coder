let citiesData = [];
let packagesData = [];
let previousShipmentsData = [];

document.addEventListener('DOMContentLoaded', () => {
    // Cargar datos desde el JSON usando Fetch
    fetch('shipping-data.json')
        .then(response => response.json())
        .then(data => {
            citiesData = data.cities;
            packagesData = data.standardPackages;
            previousShipmentsData = data.previousShipments;
            populateCityOptions();
            loadFromLocalStorage();
        })
        .catch(error => console.error('Error al cargar el archivo JSON:', error));
    
    document.getElementById('shipping-form').addEventListener('submit', calculateShipping);
});

function populateCityOptions() {
    const selectElement = document.getElementById('country');
    selectElement.innerHTML = ''; // Limpiar las opciones actuales

    citiesData.forEach(city => {
        const option = document.createElement('option');
        option.value = city.code;
        option.textContent = city.name;
        selectElement.appendChild(option);
    });
}

function calculateShipping(event) {
    event.preventDefault();

    let weight = parseFloat(document.getElementById('weight').value);
    let height = parseFloat(document.getElementById('height').value);
    let width = parseFloat(document.getElementById('width').value);
    let length = parseFloat(document.getElementById('length').value);
    let country = document.getElementById('country').value;

    if (isNaN(weight) || isNaN(height) || isNaN(width) || isNaN(length) || weight <= 0 || height <= 0 || width <= 0 || length <= 0) {
        displayError('Por favor ingrese valores válidos para peso y dimensiones.');
        return;
    } else {
        clearError();
    }

    let shippingCost = calculateShippingCost(weight, height, width, length, country);
    saveToLocalStorage(weight, height, width, length, country, shippingCost);

    document.getElementById('result').innerText = `El costo de envío estimado es $${shippingCost.toFixed(2)}`;
}

function calculateShippingCost(weight, height, width, length, country) {
    let cost = weight * 0.1 + (height + width + length) * 0.05;

    const selectedCity = citiesData.find(city => city.code === country);
    if (selectedCity) {
        cost *= selectedCity.shippingMultiplier;
    }

    return cost;
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