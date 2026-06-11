#!/usr/bin/env node

/**
 * Node.js CLI Calculator Application
 * 
 * Supported Operations:
 * - Addition (+): Add two or more numbers
 * - Subtraction (-): Subtract numbers sequentially
 * - Multiplication (*): Multiply two or more numbers
 * - Division (/): Divide numbers sequentially
 * - Modulo (%): Calculate remainder of division
 * - Power (^): Raise base to exponent
 * - Square Root (√): Calculate square root of a number
 * 
 * Usage:
 *   calculator.js <operation> <number1> <number2> [number3...]
 * 
 * Examples:
 *   calculator.js add 5 3
 *   calculator.js subtract 10 2 1
 *   calculator.js multiply 4 3 2
 *   calculator.js divide 100 5 2
 *   calculator.js modulo 10 3
 *   calculator.js power 2 3
 *   calculator.js sqrt 16
 */

// Parse command line arguments
const args = process.argv.slice(2);

// Validate input
if (args.length < 2) {
  console.error('Usage: calculator.js <operation> <number1> [number2...]');
  console.error('Operations: add, subtract, multiply, divide, modulo, power, sqrt');
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

/**
 * Modulo operation - calculates the remainder of division
 */
function modulo(a, b) {
  if (b === 0) {
    throw new Error('Error: Modulo by zero is not allowed.');
  }
  return a % b;
}

/**
 * Power operation - raises base to exponent
 */
function power(base, exponent) {
  return Math.pow(base, exponent);
}

/**
 * Square root operation - calculates the square root of a number
 */
function squareRoot(n) {
  if (n < 0) {
    throw new Error('Error: Cannot calculate square root of a negative number.');
  }
  return Math.sqrt(n);
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
    case 'modulo':
    case '%':
      if (numbers.length !== 2) {
        throw new Error('Error: Modulo operation requires exactly 2 numbers.');
      }
      result = modulo(numbers[0], numbers[1]);
      break;
    case 'power':
    case '^':
      if (numbers.length !== 2) {
        throw new Error('Error: Power operation requires exactly 2 numbers (base and exponent).');
      }
      result = power(numbers[0], numbers[1]);
      break;
    case 'sqrt':
    case '√':
      if (numbers.length !== 1) {
        throw new Error('Error: Square root operation requires exactly 1 number.');
      }
      result = squareRoot(numbers[0]);
      break;
    default:
      console.error(`Error: Unknown operation '${operation}'.`);
      console.error('Supported operations: add, subtract, multiply, divide, modulo, power, sqrt');
      process.exit(1);
  }

  console.log(`Result: ${result}`);
} catch (error) {
  console.error(error.message);
  process.exit(1);
}
