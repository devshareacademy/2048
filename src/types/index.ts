export type GameConfig = {
  rows?: number;
  cols?: number;
  numberToReachToWin?: number;
};

export const GAME_ERROR = {
  INVALID_CONFIG: 'Game config must be an object.',
  INVALID_CONFIG_GRID: 'Number of rows and cols must be a number between 2 and 10.',
  INVALID_CONFIG_WIN_CONDITION: 'The number to reach to win must be a number and be a power of 2.',
  INVALID_MOVE_GAME_IS_OVER: 'Game has already ended, please reset the game.',
} as const;
export type GameError = keyof typeof GAME_ERROR;

export type Coordinate = {
  col: number;
  row: number;
};

export const DIRECTION = {
  UP: 'UP',
  DOWN: 'DOWN',
  LEFT: 'LEFT',
  RIGHT: 'RIGHT',
} as const;
export type Direction = keyof typeof DIRECTION;
