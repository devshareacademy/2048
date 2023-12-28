/**
 * Generates a number between the two given numbers, inclusive.
 * @param {number} min
 * @param {number} max
 * @returns {number}
 */
export function randomNumber(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
