/**
 * Unit Tests for Calculator CLI Application
 * 
 * Tests all four basic arithmetic operations:
 * - Addition
 * - Subtraction
 * - Multiplication
 * - Division
 * 
 * Also includes edge case testing for division by zero
 */

const { spawn } = require('child_process');
const path = require('path');

const calculatorPath = path.join(__dirname, '..', 'calculator.js');

/**
 * Helper function to run the calculator CLI with arguments
 */
function runCalculator(operation, ...numbers) {
  return new Promise((resolve, reject) => {
    const calculator = spawn('node', [calculatorPath, operation, ...numbers]);
    let stdout = '';
    let stderr = '';

    calculator.stdout.on('data', (data) => {
      stdout += data.toString();
    });

    calculator.stderr.on('data', (data) => {
      stderr += data.toString();
    });

    calculator.on('close', (code) => {
      if (code === 0) {
        const result = stdout.trim();
        const match = result.match(/Result: (.+)/);
        resolve(match ? match[1] : null);
      } else {
        reject(new Error(stderr.trim()));
      }
    });
  });
}

describe('Calculator CLI Application', () => {
  describe('Addition Tests', () => {
    test('should add two positive numbers: 2 + 3 = 5', async () => {
      const result = await runCalculator('add', '2', '3');
      expect(parseFloat(result)).toBe(5);
    });

    test('should add multiple numbers: 2 + 3 + 5 = 10', async () => {
      const result = await runCalculator('add', '2', '3', '5');
      expect(parseFloat(result)).toBe(10);
    });

    test('should add negative numbers: 5 + (-3) = 2', async () => {
      const result = await runCalculator('add', '5', '-3');
      expect(parseFloat(result)).toBe(2);
    });

    test('should add decimal numbers: 2.5 + 1.5 = 4', async () => {
      const result = await runCalculator('add', '2.5', '1.5');
      expect(parseFloat(result)).toBe(4);
    });

    test('should add zero: 10 + 0 = 10', async () => {
      const result = await runCalculator('add', '10', '0');
      expect(parseFloat(result)).toBe(10);
    });

    test('should work with symbol +: 7 + 8 = 15', async () => {
      const result = await runCalculator('+', '7', '8');
      expect(parseFloat(result)).toBe(15);
    });
  });

  describe('Subtraction Tests', () => {
    test('should subtract two positive numbers: 10 - 4 = 6', async () => {
      const result = await runCalculator('subtract', '10', '4');
      expect(parseFloat(result)).toBe(6);
    });

    test('should subtract multiple numbers: 20 - 5 - 3 = 12', async () => {
      const result = await runCalculator('subtract', '20', '5', '3');
      expect(parseFloat(result)).toBe(12);
    });

    test('should handle negative results: 5 - 10 = -5', async () => {
      const result = await runCalculator('subtract', '5', '10');
      expect(parseFloat(result)).toBe(-5);
    });

    test('should subtract decimal numbers: 10.5 - 2.5 = 8', async () => {
      const result = await runCalculator('subtract', '10.5', '2.5');
      expect(parseFloat(result)).toBe(8);
    });

    test('should subtract zero: 15 - 0 = 15', async () => {
      const result = await runCalculator('subtract', '15', '0');
      expect(parseFloat(result)).toBe(15);
    });

    test('should work with symbol -: 10 - 4 = 6', async () => {
      const result = await runCalculator('-', '10', '4');
      expect(parseFloat(result)).toBe(6);
    });
  });

  describe('Multiplication Tests', () => {
    test('should multiply two positive numbers: 45 * 2 = 90', async () => {
      const result = await runCalculator('multiply', '45', '2');
      expect(parseFloat(result)).toBe(90);
    });

    test('should multiply multiple numbers: 2 * 3 * 4 = 24', async () => {
      const result = await runCalculator('multiply', '2', '3', '4');
      expect(parseFloat(result)).toBe(24);
    });

    test('should multiply with negative numbers: 5 * (-2) = -10', async () => {
      const result = await runCalculator('multiply', '5', '-2');
      expect(parseFloat(result)).toBe(-10);
    });

    test('should multiply decimal numbers: 2.5 * 4 = 10', async () => {
      const result = await runCalculator('multiply', '2.5', '4');
      expect(parseFloat(result)).toBe(10);
    });

    test('should multiply by zero: 100 * 0 = 0', async () => {
      const result = await runCalculator('multiply', '100', '0');
      expect(parseFloat(result)).toBe(0);
    });

    test('should work with symbol *: 7 * 6 = 42', async () => {
      const result = await runCalculator('*', '7', '6');
      expect(parseFloat(result)).toBe(42);
    });
  });

  describe('Division Tests', () => {
    test('should divide two positive numbers: 20 / 5 = 4', async () => {
      const result = await runCalculator('divide', '20', '5');
      expect(parseFloat(result)).toBe(4);
    });

    test('should divide with decimal result: 10 / 4 = 2.5', async () => {
      const result = await runCalculator('divide', '10', '4');
      expect(parseFloat(result)).toBe(2.5);
    });

    test('should divide multiple numbers: 100 / 5 / 2 = 10', async () => {
      const result = await runCalculator('divide', '100', '5', '2');
      expect(parseFloat(result)).toBe(10);
    });

    test('should divide with negative numbers: 20 / (-4) = -5', async () => {
      const result = await runCalculator('divide', '20', '-4');
      expect(parseFloat(result)).toBe(-5);
    });

    test('should divide decimal numbers: 7.5 / 2.5 = 3', async () => {
      const result = await runCalculator('divide', '7.5', '2.5');
      expect(parseFloat(result)).toBe(3);
    });

    test('should work with symbol /: 20 / 5 = 4', async () => {
      const result = await runCalculator('/', '20', '5');
      expect(parseFloat(result)).toBe(4);
    });
  });

  describe('Edge Cases', () => {
    test('should reject division by zero', async () => {
      expect.assertions(1);
      try {
        await runCalculator('divide', '10', '0');
      } catch (error) {
        expect(error.message).toContain('Division by zero');
      }
    });

    test('should reject division by zero in chain: 100 / 5 / 0', async () => {
      expect.assertions(1);
      try {
        await runCalculator('divide', '100', '5', '0');
      } catch (error) {
        expect(error.message).toContain('Division by zero');
      }
    });

    test('should handle very large numbers', async () => {
      const result = await runCalculator('multiply', '1000000', '1000000');
      expect(parseFloat(result)).toBe(1000000000000);
    });

    test('should handle very small decimal numbers', async () => {
      const result = await runCalculator('add', '0.0001', '0.0002');
      expect(parseFloat(result)).toBeCloseTo(0.0003, 5);
    });

    test('should reject invalid operation', async () => {
      expect.assertions(1);
      try {
        await runCalculator('modulo', '10', '3');
      } catch (error) {
        expect(error.message).toContain('Unknown operation');
      }
    });

    test('should reject insufficient arguments', async () => {
      expect.assertions(1);
      try {
        await runCalculator('add', '5');
      } catch (error) {
        expect(error.message).toContain('Usage');
      }
    });

    test('should reject non-numeric arguments', async () => {
      expect.assertions(1);
      try {
        await runCalculator('add', 'abc', '5');
      } catch (error) {
        expect(error.message).toContain('valid numbers');
      }
    });
  });

  describe('Image-Based Test Cases', () => {
    test('Example from image: 2 + 3 = 5', async () => {
      const result = await runCalculator('add', '2', '3');
      expect(parseFloat(result)).toBe(5);
    });

    test('Example from image: 10 - 4 = 6', async () => {
      const result = await runCalculator('subtract', '10', '4');
      expect(parseFloat(result)).toBe(6);
    });

    test('Example from image: 45 * 2 = 90', async () => {
      const result = await runCalculator('multiply', '45', '2');
      expect(parseFloat(result)).toBe(90);
    });

    test('Example from image: 20 / 5 = 4', async () => {
      const result = await runCalculator('divide', '20', '5');
      expect(parseFloat(result)).toBe(4);
    });
  });
});
