(function () {
  "use strict";

  const conversionData = {
    length: {
      label: "Length",
      baseUnit: "meter",
      units: {
        millimeter: { label: "Millimeter", short: "mm", toBase: (value) => value / 1000 },
        centimeter: { label: "Centimeter", short: "cm", toBase: (value) => value / 100 },
        meter: { label: "Meter", short: "m", toBase: (value) => value },
        kilometer: { label: "Kilometer", short: "km", toBase: (value) => value * 1000 },
        inch: { label: "Inch", short: "in", toBase: (value) => value * 0.0254 },
        foot: { label: "Foot", short: "ft", toBase: (value) => value * 0.3048 }
      }
    },
    weight: {
      label: "Weight",
      baseUnit: "kilogram",
      units: {
        gram: { label: "Gram", short: "g", toBase: (value) => value / 1000 },
        kilogram: { label: "Kilogram", short: "kg", toBase: (value) => value },
        pound: { label: "Pound", short: "lb", toBase: (value) => value * 0.45359237 },
        ounce: { label: "Ounce", short: "oz", toBase: (value) => value * 0.028349523125 }
      }
    },
    temperature: {
      label: "Temperature",
      baseUnit: "celsius",
      units: {
        celsius: { label: "Celsius", short: "°C", toBase: (value) => value },
        fahrenheit: { label: "Fahrenheit", short: "°F", toBase: (value) => (value - 32) * 5 / 9 },
        kelvin: { label: "Kelvin", short: "K", toBase: (value) => value - 273.15 }
      }
    }
  };

  const fromBase = {
    length: {
      millimeter: (value) => value * 1000,
      centimeter: (value) => value * 100,
      meter: (value) => value,
      kilometer: (value) => value / 1000,
      inch: (value) => value / 0.0254,
      foot: (value) => value / 0.3048
    },
    weight: {
      gram: (value) => value * 1000,
      kilogram: (value) => value,
      pound: (value) => value / 0.45359237,
      ounce: (value) => value / 0.028349523125
    },
    temperature: {
      celsius: (value) => value,
      fahrenheit: (value) => (value * 9 / 5) + 32,
      kelvin: (value) => value + 273.15
    }
  };

  const DEFAULTS = {
    length: { from: "meter", to: "kilometer" },
    weight: { from: "kilogram", to: "gram" },
    temperature: { from: "celsius", to: "fahrenheit" }
  };

  const categorySelect = document.getElementById("categorySelect");
  const valueInput = document.getElementById("valueInput");
  const fromUnit = document.getElementById("fromUnit");
  const toUnit = document.getElementById("toUnit");
  const swapButton = document.getElementById("swapButton");
  const resetButton = document.getElementById("resetButton");
  const resultText = document.getElementById("resultText");
  const formulaText = document.getElementById("formulaText");
  const statusMessage = document.getElementById("statusMessage");

  function convertValue(value, category, sourceUnit, targetUnit) {
    const source = conversionData[category].units[sourceUnit];
    const target = fromBase[category][targetUnit];

    if (!source || !target) {
      throw new Error("Unknown unit selection");
    }

    return target(source.toBase(value));
  }

  function formatNumber(value) {
    if (!Number.isFinite(value)) {
      return "0";
    }

    const absolute = Math.abs(value);
    const maximumFractionDigits = absolute !== 0 && absolute < 0.01 ? 6 : 4;
    return new Intl.NumberFormat("en-IN", { maximumFractionDigits }).format(value);
  }

  function setStatus(text, isError) {
    statusMessage.textContent = text;
    statusMessage.classList.toggle("error", Boolean(isError));
  }

  function populateUnits(category) {
    const units = conversionData[category].units;
    const defaults = DEFAULTS[category];
    fromUnit.replaceChildren();
    toUnit.replaceChildren();

    Object.entries(units).forEach(([key, unit]) => {
      fromUnit.append(new Option(`${unit.label} (${unit.short})`, key));
      toUnit.append(new Option(`${unit.label} (${unit.short})`, key));
    });

    fromUnit.value = defaults.from;
    toUnit.value = defaults.to;
  }

  function renderConversion() {
    const rawValue = valueInput.value.trim();
    const value = Number(rawValue);

    if (rawValue === "" || !Number.isFinite(value)) {
      resultText.textContent = "-";
      formulaText.textContent = "Enter a valid number to convert.";
      setStatus("A valid number is required.", true);
      return null;
    }

    const category = categorySelect.value;
    const converted = convertValue(value, category, fromUnit.value, toUnit.value);
    const source = conversionData[category].units[fromUnit.value];
    const target = conversionData[category].units[toUnit.value];

    resultText.textContent = `${formatNumber(converted)} ${target.short}`;
    formulaText.textContent = `${formatNumber(value)} ${source.label} equals ${formatNumber(converted)} ${target.label}.`;
    setStatus("Converted successfully.", false);
    return converted;
  }

  function resetConverter() {
    categorySelect.value = "length";
    valueInput.value = "1";
    populateUnits("length");
    renderConversion();
  }

  categorySelect.addEventListener("change", () => {
    populateUnits(categorySelect.value);
    renderConversion();
  });

  valueInput.addEventListener("input", renderConversion);
  fromUnit.addEventListener("change", renderConversion);
  toUnit.addEventListener("change", renderConversion);

  swapButton.addEventListener("click", () => {
    const currentFrom = fromUnit.value;
    fromUnit.value = toUnit.value;
    toUnit.value = currentFrom;
    renderConversion();
  });

  resetButton.addEventListener("click", resetConverter);

  populateUnits(categorySelect.value);
  renderConversion();

  window.UnitConverter = {
    conversionData,
    convertValue,
    formatNumber
  };
}());
