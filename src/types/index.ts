export const GAME_ERROR = {
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
