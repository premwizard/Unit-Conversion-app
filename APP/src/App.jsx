import React, { useState } from "react";

const units = {
  length: {
    meters: 1,
    kilometers: 0.001,
    centimeters: 100,
    millimeters: 1000,
    miles: 0.000621371,
    yards: 1.09361,
    feet: 3.28084,
    inches: 39.3701,
  },
  mass: {
    kilograms: 1,
    grams: 1000,
    milligrams: 1e6,
    pounds: 2.20462,
    ounces: 35.274,
  },
  temperature: {
    celsius: (value, toUnit) =>
      toUnit === "fahrenheit" ? value * 1.8 + 32 : value + 273.15,
    fahrenheit: (value, toUnit) =>
      toUnit === "celsius" ? (value - 32) / 1.8 : ((value - 32) / 1.8) + 273.15,
    kelvin: (value, toUnit) =>
      toUnit === "celsius" ? value - 273.15 : (value - 273.15) * 1.8 + 32,
  },
  time: {
    seconds: 1,
    minutes: 1 / 60,
    hours: 1 / 3600,
    days: 1 / 86400,
  },
};

function App() {
  const [category, setCategory] = useState("length");
  const [inputValue, setInputValue] = useState("");
  const [fromUnit, setFromUnit] = useState("meters");
  const [toUnit, setToUnit] = useState("kilometers");
  const [result, setResult] = useState("");

  const handleConvert = () => {
    if (!inputValue) return;
    const value = parseFloat(inputValue);

    if (category === "temperature") {
      const converter = units[category][fromUnit];
      const convertedValue = converter(value, toUnit);
      setResult(convertedValue.toFixed(2));
    } else {
      const fromFactor = units[category][fromUnit];
      const toFactor = units[category][toUnit];
      const convertedValue = value * (fromFactor / toFactor);
      setResult(convertedValue.toFixed(2));
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 p-5">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-5">
          Unit Conversion App
        </h1>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Select Category
          </label>
          <select
            className="w-full p-2 border border-gray-300 rounded"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {Object.keys(units).map((key) => (
              <option key={key} value={key}>
                {key.charAt(0).toUpperCase() + key.slice(1)}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Input Value
          </label>
          <input
            type="number"
            className="w-full p-2 border border-gray-300 rounded"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Enter value"
          />
        </div>
        <div className="flex gap-4 mb-4">
          <div className="w-1/2">
            <label className="block text-gray-700 font-medium mb-2">
              To Unit
            </label>
            <select
              className="w-full p-2 border border-gray-300 rounded"
              value={fromUnit}
              onChange={(e) => setFromUnit(e.target.value)}
            >
              {Object.keys(units[category]).map((key) => (
                <option key={key} value={key}>
                  {key}
                </option>
              ))}
            </select>
          </div>
          <div className="w-1/2">
            <label className="block text-gray-700 font-medium mb-2">
              From Unit
            </label>
            <select
              className="w-full p-2 border border-gray-300 rounded"
              value={toUnit}
              onChange={(e) => setToUnit(e.target.value)}
            >
              {Object.keys(units[category]).map((key) => (
                <option key={key} value={key}>
                  {key}
                </option>
              ))}
            </select>
          </div>
        </div>
        <button
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
          onClick={handleConvert}
        >
          Convert
        </button>
        {result && (
          <div className="mt-5 text-center text-lg font-semibold text-gray-800">
            Result: {result}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
