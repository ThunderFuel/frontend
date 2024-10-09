/**
 * Returns the number of decimal places in a numeric string, handling scientific notation.
 * This is NOT ideal. Ideally everything should be handled in Fuel's BN. It was methods like eq (equals) bt (bigger than) etc
 * @param numStr - The numeric string to evaluate.
 * @returns The count of decimal places.
 */
export const getDecimalPlaces = (numStr: string): number => {
  // Convert scientific notation to decimal
  const num = Number(numStr);
  if (Number.isNaN(num)) {
    throw new Error("Invalid number string");
  }

  const decimalStr = num.toString().split(".")[1];

  return decimalStr ? decimalStr.length : 0;
};

// Example Usage:
const numberStr = "1.23e-4";
const decimals = getDecimalPlaces(numberStr);
console.log(decimals); // Outputs: 5
