# Unit Converter

A small frontend project for converting common length, weight and temperature units. It is built with plain HTML, CSS and JavaScript, with no build step or external dependency.

## Features

- Convert length, weight and temperature values
- Instant result updates while typing or changing units
- Swap source and target units with one button
- Clear result formatting with unit labels
- Input validation with a visible error state
- Reset button for the default converter state
- Responsive layout for desktop and mobile screens

## Files

- `index.html` - page structure and converter controls
- `styles.css` - responsive layout, colors and visual states
- `script.js` - unit data, conversion logic, rendering and events

## How to run

1. Download or clone this repository.
2. Open `index.html` in a modern browser.
3. Choose a category, enter a value and select the units to convert.

No server, package install or account is required.

## How it works

Length and weight values are first converted to a base unit, then converted to the selected target unit. Temperature uses the matching Celsius, Fahrenheit and Kelvin formulas. The JavaScript updates the result whenever the value, category or unit selection changes.

## Testing

The project was checked in a browser with functional tests for length, weight and temperature conversion, invalid input, category changes, unit swapping, reset behavior and page accessibility basics. Desktop and mobile layouts were visually inspected.

## Note

This project was built with the help of an AI assistant (Instinct) as a learning project.
