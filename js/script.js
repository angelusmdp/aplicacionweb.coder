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


    // Array de productos (ciudades)
    const ciudades = [ "capitalFederal","Rosario","Córdoba" ]
        
    // Mostrar las opciones al usuario
    System.out.println("Seleccione una ciudad:")
    for (int; i = 0;) i < ciudadeslength; i++; {
      System.out.println((i + 1) + "." + ciudades[i]);
  }

    // Leer la entrada del usuario
    Scanner = newScanner(System.in);
      int. opcion = scanner.nextInt();

    // Validar la entrada y mostrar la ciudad seleccionada
    if (opcion >= 1 && opcion <= ciudades.length) {
      System.out.println("Ha seleccionado: " + ciudades[opcion - 1]);
    } else {
      System.out.println("Opción inválida.");
  }

    // Cerrar el escáner
  scanner.close();

import.java;util;Arrays ciudades;
import.java.util.List;
import.java.util.function.Predicate;

public. class; Main(); {
  public. static ; void main (String[ciudades] , args ) ;
    // Lista de ciudades
    List<String> ciudades ; Arrays.asList("CABA", "Rosario", "Córdoba");

    // Uso de forEach para imprimir todas las ciudades
    System.out.println("Todas las ciudades:");
    ciudades.forEach(System.out , println);

    // Uso de filter para filtrar ciudades que contienen la letra 'a'
    System.out.println("\nCiudades que contienen la letra 'a':");
    Predicate <String> contieneLetraA ; ciudad => ciudad.toLowerCase().contains("a");
    ciudades.stream()
      .filter(contieneLetraA)
      .forEach(System.out,println);
    }

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
