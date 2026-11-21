
// Name: Martin Angel S. Padon
// Section: IV-BSIT B
// Activity: N2 - Modular Calculator
// File: index.js

const operations = require('./operations');
const formatResult = require('./formatter');
const os = require('os');

// Get operation and numbers from terminal
const operation = process.argv[2];
const num1 = Number(process.argv[3]);
const num2 = Number(process.argv[4]);

// Validate inputs
if (
    !operation ||
    process.argv[3] === undefined ||
    process.argv[4] === undefined ||
    !Number.isFinite(num1) ||
    !Number.isFinite(num2)
) {
    console.log("Usage: node index.js add 12 8");
    process.exitCode = 1;

} else {

    try {
        let result;

        switch (operation) {
            case "add":
                result = operations.add(num1, num2);
                break;

            case "subtract":
                result = operations.subtract(num1, num2);
                break;

            case "multiply":
                result = operations.multiply(num1, num2);
                break;

            case "divide":
                result = operations.divide(num1, num2);
                break;

            case "average":
                result = operations.average(num1, num2);
                break;

            default:
                throw new Error("Unknown operation.");
        }

        console.log(
            formatResult(operation, num1, num2, result)
        );

        console.log("Operating System:", os.platform());

    } catch (error) {
        console.log("Error:", error.message);
        process.exitCode = 1;
    }
}
