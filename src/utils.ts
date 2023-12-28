import { GAME_ERROR, GameConfig } from './types';

/**
 * Generates a number between the two given numbers, inclusive.
 * @param {number} min
 * @param {number} max
 * @returns {number}
 */
export function randomNumber(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export function checkGameConfig(config?: GameConfig): void {
  if (config === undefined) {
    return;
  }

  if (typeof config !== 'object') {
    throw new Error(GAME_ERROR.INVALID_CONFIG);
  }

  if (typeof config === 'object' && Array.isArray(config)) {
    throw new Error(GAME_ERROR.INVALID_CONFIG);
  }

  if (config.cols !== undefined) {
    checkForValidNumber(config.cols);
  }

  if (config.rows !== undefined) {
    checkForValidNumber(config.rows);
  }

  if (config.numberToReachToWin !== undefined) {
    checkForValidNumberToReach(config.numberToReachToWin);
  }
}

function checkForValidNumber(value: number): void {
  if (typeof value !== 'number') {
    throw new Error(GAME_ERROR.INVALID_CONFIG_GRID);
  }

  if (value < 2) {
    throw new Error(GAME_ERROR.INVALID_CONFIG_GRID);
  }

  if (value > 10) {
    throw new Error(GAME_ERROR.INVALID_CONFIG_GRID);
  }
}

function checkForValidNumberToReach(value: number): void {
  if (typeof value !== 'number') {
    throw new Error(GAME_ERROR.INVALID_CONFIG_WIN_CONDITION);
  }

  if (value < 4) {
    throw new Error(GAME_ERROR.INVALID_CONFIG_WIN_CONDITION);
  }

  if (!isPowerOf2(value)) {
    throw new Error(GAME_ERROR.INVALID_CONFIG_WIN_CONDITION);
  }
}

export function isPowerOf2(value: number): boolean {
  if (value === 0) {
    return false;
  }

  return Math.ceil(Math.log(value) / Math.log(2)) == Math.floor(Math.log(value) / Math.log(2));
}
