function convertWeight() {
    // Beolvasás az input mezőből
    const value = parseFloat(document.getElementById('weight-input').value);
    const fromUnit = document.getElementById('weight-from').value;
    const toUnit = document.getElementById('weight-to').value;

    // Mértékegységek átváltási tényezői
    const conversionRates = {
        // Tömeg
        kilogram: 1,
        gram: 1000,
        pound: 2.20462,
        ounce: 35.274,

        // Hossz
        kilometer: 0.001,
        meter: 1,
        decimeter: 10,
        centimeter: 100,
        millimeter: 1000,
        inch: 39.3701,
        foot: 3.28084,
        yard: 1.09361,

        // Térfogat
        liter: 1,
        milliliter: 1000,
        deciliter: 10,
        centiliter: 100,
        hectoliter: 0.01,
        cubicMeter: 1,
        cubicCentimeter: 1000000,

        // Terület
        squareKilometer: 0.000001,
        squareMeter: 1,
        squareDecimeter: 100,
        squareCentimeter: 10000,
        hectare: 0.0001,
        are: 0.01,

        // Digitális mértékegységek
        bit: 1 / 8, // 1 byte = 8 bit
        byte: 1,
        kilobyte: 1024,
        megabyte: 1024 * 1024,
        gigabyte: 1024 * 1024 * 1024,
        terabyte: 1024 * 1024 * 1024 * 1024,
        petabyte: 1024 * 1024 * 1024 * 1024 * 1024,
        exabyte: 1024 * 1024 * 1024 * 1024 * 1024 * 1024,
       // zettabyte: 1024 * 1024 * 1024 * 1024 * 1024 * 1024 * 1024,
       // yottabyte: 1024 * 1024 * 1024 * 1024 * 1024 * 1024 * 1024 * 1024,
    };

    // Ellenőrzés, hogy az érték érvényes-e
    if (isNaN(value) || value < 0) {
        document.getElementById('weight-result').innerText = "Kérlek, adj meg egy érvényes számot!";
        return;
    }

    // Digitális mértékegységek átváltása
    if (isDigitalUnit(fromUnit) && isDigitalUnit(toUnit)) {
        const result = convertDigital(value, fromUnit, toUnit);
        document.getElementById('weight-result').innerText = `${value} ${fromUnit} = ${result.toFixed(2)} ${toUnit}`;
        return;
    }

    // Átváltás többi mértékegységre
    const resultInKilograms = value / conversionRates[fromUnit]; // Átváltás kilogrammra
    const result = resultInKilograms * conversionRates[toUnit]; // Átváltás a kívánt mértékegységre

    // Eredmény kiírása
    document.getElementById('weight-result').innerText = `${value} ${fromUnit} = ${result.toFixed(2)} ${toUnit}`;
}

function isDigitalUnit(unit) {
    return ['bit', 'byte', 'kilobyte', 'megabyte', 'gigabyte', 'terabyte', 'petabyte', 'exabyte', 'zettabyte', 'yottabyte'].includes(unit);
}

function convertDigital(value, fromUnit, toUnit) {
    const digitalUnits = {
        'bit': 1,
        'byte': 8,
        'kilobyte': 8 * 1024,
        'megabyte': 8 * 1024 * 1024,
        'gigabyte': 8 * 1024 * 1024 * 1024,
        'terabyte': 8 * 1024 * 1024 * 1024 * 1024,
        'petabyte': 8 * 1024 * 1024 * 1024 * 1024 * 1024,
        'exabyte': 8 * 1024 * 1024 * 1024 * 1024 * 1024 * 1024,
       // 'zettabyte': 8 * 1024 * 1024 * 1024 * 1024 * 1024 * 1024 * 1024,
       // 'yottabyte': 8 * 1024 * 1024 * 1024 * 1024 * 1024 * 1024 * 1024 * 1024,
    };

    // Először átváltjuk bitekre
    const totalBits = value * digitalUnits[fromUnit];
    
    // Majd a célmértékegységre váltjuk
    return totalBits / digitalUnits[toUnit];
}
