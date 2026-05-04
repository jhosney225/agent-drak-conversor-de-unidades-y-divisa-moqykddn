```javascript
#!/usr/bin/env node

const readline = require('readline');

// Tasas de cambio (simuladas, en producción se traerían de una API)
const exchangeRates = {
  'USD': 1,
  'EUR': 0.92,
  'GBP': 0.79,
  'JPY': 149.50,
  'MXN': 17.05,
  'COP': 3924.50,
  'ARS': 835.50,
  'CHF': 0.88
};

// Conversiones de unidades de longitud
const lengthConversions = {
  'mm': 0.001,
  'cm': 0.01,
  'm': 1,
  'km': 1000,
  'in': 0.0254,
  'ft': 0.3048,
  'yd': 0.9144,
  'mi': 1609.34
};

// Conversiones de unidades de peso
const weightConversions = {
  'mg': 0.000001,
  'g': 0.001,
  'kg': 1,
  'oz': 0.0283495,
  'lb': 0.453592,
  't': 1000
};

// Conversiones de temperatura
const temperatureConversions = {
  'celsius_to_fahrenheit': (c) => (c * 9/5) + 32,
  'fahrenheit_to_celsius': (f) => (f - 32) * 5/9,
  'celsius_to_kelvin': (c) => c + 273.15,
  'kelvin_to_celsius': (k) => k - 273.15,
  'fahrenheit_to_kelvin': (f) => ((f - 32) * 5/9) + 273.15,
  'kelvin_to_fahrenheit': (k) => ((k - 273.15) * 9/5) + 32
};

// Conversiones de volumen
const volumeConversions = {
  'ml': 0.001,
  'l': 1,
  'gal': 3.78541,
  'pt': 0.473176,
  'cup': 0.236588,
  'tsp': 0.00492892,
  'tbsp': 0.0147868,
  'm3': 1000
};

// Conversiones de área
const areaConversions = {
  'mm2': 0.000001,
  'cm2': 0.0001,
  'm2': 1,
  'km2': 1000000,
  'in2': 0.00064516,
  'ft2': 0.092903,
  'yd2': 0.836127,
  'mi2': 2589988
};

class UnitConverter {
  convertCurrency(amount, fromCurrency, toCurrency) {
    fromCurrency = fromCurrency.toUpperCase();
    toCurrency = toCurrency.toUpperCase();

    if (!exchangeRates[fromCurrency] || !exchangeRates[toCurrency]) {
      return {
        success: false,
        error: `Moneda no soportada. Monedas disponibles: ${Object.keys(exchangeRates).join(', ')}`
      };
    }

    const amountInUSD = amount / exchangeRates[fromCurrency];
    const result = amountInUSD * exchangeRates[toCurrency];

    return {
      success: true,
      original: amount,
      fromCurrency,
      toCurrency,
      result: Math.round(result * 100) / 100
    };
  }

  convertLength(value, fromUnit, toUnit) {
    fromUnit = fromUnit.toLowerCase();
    toUnit = toUnit.toLowerCase();

    if (!lengthConversions[fromUnit] || !lengthConversions[toUnit]) {
      return {
        success: false,
        error: `Unidad de longitud no soportada. Unidades: ${Object.keys(lengthConversions).join(', ')}`
      };
    }

    const valueInMeters = value * lengthConversions[fromUnit];
    const result = valueInMeters / lengthConversions[toUnit];

    return {
      success: true,
      original: value,
      fromUnit,
      toUnit,
      result: Math.round(result * 100000) / 100000
    };
  }

  convertWeight(value, fromUnit, toUnit) {
    fromUnit = fromUnit.toLowerCase();
    toUnit = toUnit.toLowerCase();

    if (!weightConversions[fromUnit] || !weightConversions[toUnit]) {
      return {
        success: false,
        error: `Unidad de peso no soportada. Unidades: ${Object.keys(weightConversions).join(', ')}`
      };
    }

    const valueInKg = value * weightConversions[fromUnit];
    const result = valueInKg / weightConversions[toUnit];

    return {
      success: true,
      original: value,
      fromUnit,
      toUnit,
      result: Math.round(result * 100000) / 100000
    };
  }

  convertTemperature(value, fromTemp, toTemp) {
    fromTemp = fromTemp.toLowerCase();
    toTemp = toTemp.toLowerCase();
    const conversionKey = `${fromTemp}_to_${toTemp}`;

    if (!temperatureConversions[conversionKey]) {
      return {
        success: false,
        error: `Conversión de temperatura no soportada. Disponibles: C (Celsius), F (Fahrenheit), K (Kelvin)`
      };
    }

    const result = temperatureConversions[conversionKey](value);

    return {
      success: true,
      original: value,
      fromTemp: fromTemp.charAt(0).toUpperCase(),
      toTemp: toTemp.charAt(0