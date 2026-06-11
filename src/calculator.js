#!/usr/bin/env node

/**
 * Node.js CLI Calculator Application
 * 
 * Supported Operations:
 * - Addition (+): Add two or more numbers
 * - Subtraction (-): Subtract numbers sequentially
 * - Multiplication (*): Multiply two or more numbers
 * - Division (/): Divide numbers sequentially
 * 
 * Usage:
 *   calculator.js <operation> <number1> <number2> [number3...]
 * 
 * Examples:
 *   calculator.js add 5 3
 *   calculator.js subtract 10 2 1
 *   calculator.js multiply 4 3 2
 *   calculator.js divide 100 5 2
 */

// Parse command line arguments
const args = process.argv.slice(2);

// Validate input
if (args.length < 3) {
  console.error('Usage: calculator.js <operation> <number1> <number2> [number3...]');
  console.error('Operations: add, subtract, multiply, divide');
  process.exit(1);
}

const operation = args[0].toLowerCase();
const numbers = args.slice(1).map(arg => parseFloat(arg));

// Validate that all arguments are valid numbers
if (numbers.some(num => isNaN(num))) {
  console.error('Error: All arguments after the operation must be valid numbers.');
  process.exit(1);
}

/**
 * Addition operation - adds all numbers together
 */
function add(...nums) {
  return nums.reduce((sum, num) => sum + num, 0);
}

/**
 * Subtraction operation - subtracts numbers sequentially
 */
function subtract(...nums) {
  return nums.reduce((result, num) => result - num);
}

/**
 * Multiplication operation - multiplies all numbers together
 */
function multiply(...nums) {
  return nums.reduce((product, num) => product * num, 1);
}

/**
 * Division operation - divides numbers sequentially
 */
function divide(...nums) {
  return nums.reduce((result, num) => {
    if (num === 0) {
      throw new Error('Error: Division by zero is not allowed.');
    }
    return result / num;
  });
}

// Execute the requested operation
try {
  let result;

  switch (operation) {
    case 'add':
    case '+':
      result = add(...numbers);
      break;
    case 'subtract':
    case '-':
      result = subtract(...numbers);
      break;
    case 'multiply':
    case '*':
      result = multiply(...numbers);
      break;
    case 'divide':
    case '/':
      result = divide(...numbers);
      break;
    default:
      console.error(`Error: Unknown operation '${operation}'.`);
      console.error('Supported operations: add, subtract, multiply, divide');
      process.exit(1);
  }

  console.log(`Result: ${result}`);
} catch (error) {
  console.error(error.message);
  process.exit(1);
}
