import * as uvu from 'uvu';
import * as assert from 'uvu/assert';
import seedrandom from 'seedrandom';

import Game2048 from '../src/game-2048';
import { DIRECTION } from '../src/types';

let game: Game2048;
const seed = 'f96d18a4-ebca-4241-8109-f543cafba0ed';

const initialBoardState = [
  [0, 0, 0, 0],
  [0, 0, 2, 0],
  [2, 0, 0, 0],
  [0, 0, 0, 0],
];

/* 2048 - Game Initialization Tests */
function setupInitializationTests(): void {
  const gameInitializationSuite = uvu.suite('2048 - Initialization');

  gameInitializationSuite.before.each(() => {
    seedrandom(seed, { global: true });
    game = new Game2048();
    assert.equal(initialBoardState, game.board);
  });

  gameInitializationSuite('should initialize the game state with a 4x4 board', () => {
    const doesBoardHave4Rows = game.board.length === 4;
    assert.equal(doesBoardHave4Rows, true);

    const doesEachRowHave4Cols = game.board.every((row) => row.length === 4);
    assert.equal(doesEachRowHave4Cols, true);
  });

  gameInitializationSuite('should initialize the board with 2 non empty tiles', () => {
    let doesBoardHave2PopulatedTiles = false;
    let numberOfNonEmptyTiles = 0;
    game.board.forEach((row) => {
      row.forEach((cell) => {
        if (cell === 0) {
          return;
        }
        numberOfNonEmptyTiles += 1;
      });
    });
    doesBoardHave2PopulatedTiles = numberOfNonEmptyTiles === 2;
    assert.equal(doesBoardHave2PopulatedTiles, true);
  });

  gameInitializationSuite('should initialize the game with no score', () => {
    const score = game.score;
    assert.type(score, 'number');
    assert.equal(score, 0);
  });

  gameInitializationSuite('should initialize the game with the game over status set to false', () => {
    const isGameOver = game.isGameOver;
    assert.type(isGameOver, 'boolean');
    assert.equal(isGameOver, false);
  });

  gameInitializationSuite('should initialize the game with the did player win status set to false', () => {
    const didPlayerWin = game.didPlayerWin;
    assert.type(didPlayerWin, 'boolean');
    assert.equal(didPlayerWin, false);
  });

  gameInitializationSuite('should initialize the game with a customize grid size', () => {
    game = new Game2048({ cols: 2, rows: 2 });

    const boardState = [
      [0, 4],
      [0, 2],
    ];
    assert.equal(boardState, game.board);
    assert.equal(game.score, 0);
  });

  gameInitializationSuite.run();
}

/* 2048 - Players Provide Input Tests */
function setupPlaceGamePieceTests(): void {
  const gamePlayersInputSuite = uvu.suite('2048 - Players Provide Input');

  gamePlayersInputSuite.before.each(() => {
    seedrandom(seed, { global: true });
    game = new Game2048();
    assert.equal(initialBoardState, game.board);
  });

  gamePlayersInputSuite('should move all tiles down when the player presses the down button and add a new tile', () => {
    game.makeMove(DIRECTION.DOWN);

    const boardState = [
      [0, 0, 0, 0],
      [4, 0, 0, 0],
      [0, 0, 0, 0],
      [2, 0, 2, 0],
    ];
    assert.equal(boardState, game.board);
    assert.equal(game.score, 0);
  });

  gamePlayersInputSuite(
    'should move all tiles down and merge when the player presses the down button and add a new tile',
    () => {
      game.makeMove(DIRECTION.DOWN);
      game.makeMove(DIRECTION.DOWN);

      const boardState = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [4, 0, 0, 0],
        [2, 2, 2, 0],
      ];
      assert.equal(boardState, game.board);
      assert.equal(game.score, 0);
    },
  );

  gamePlayersInputSuite('should not add a new tile if the player presses the down button and no tiles move', () => {
    game.makeMove(DIRECTION.DOWN);
    game.makeMove(DIRECTION.DOWN);
    game.makeMove(DIRECTION.DOWN);

    const boardState = [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [4, 0, 0, 0],
      [2, 2, 2, 0],
    ];
    assert.equal(boardState, game.board);
    assert.equal(game.score, 0);
  });

  gamePlayersInputSuite(
    'should move all tiles to the right when the player presses the right button and add a new tile',
    () => {
      game.makeMove(DIRECTION.DOWN);
      game.makeMove(DIRECTION.DOWN);
      game.makeMove(DIRECTION.DOWN);
      game.makeMove(DIRECTION.RIGHT);

      const boardState = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 4, 0, 4],
        [0, 0, 2, 4],
      ];
      assert.equal(boardState, game.board);
      assert.equal(game.score, 4);
    },
  );

  gamePlayersInputSuite('should move all tiles to the right when the player presses the right button again', () => {
    game.makeMove(DIRECTION.DOWN);
    game.makeMove(DIRECTION.DOWN);
    game.makeMove(DIRECTION.DOWN);
    game.makeMove(DIRECTION.RIGHT);
    game.makeMove(DIRECTION.RIGHT);

    const boardState = [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 2, 8],
      [0, 0, 2, 4],
    ];

    assert.equal(boardState, game.board);
    assert.equal(game.score, 12);
  });

  gamePlayersInputSuite('should move all tiles to the right when the player presses the right button again 2', () => {
    game.makeMove(DIRECTION.DOWN);
    game.makeMove(DIRECTION.DOWN);
    game.makeMove(DIRECTION.DOWN);
    game.makeMove(DIRECTION.RIGHT);
    game.makeMove(DIRECTION.RIGHT);
    game.makeMove(DIRECTION.RIGHT);

    const boardState = [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 2, 8],
      [0, 0, 2, 4],
    ];

    assert.equal(boardState, game.board);
    assert.equal(game.score, 12);
  });

  gamePlayersInputSuite('should move all tiles to the down when the player presses the down button again 2', () => {
    game.makeMove(DIRECTION.DOWN);
    game.makeMove(DIRECTION.DOWN);
    game.makeMove(DIRECTION.DOWN);
    game.makeMove(DIRECTION.RIGHT);
    game.makeMove(DIRECTION.RIGHT);
    game.makeMove(DIRECTION.RIGHT);
    game.makeMove(DIRECTION.DOWN);

    const boardState = [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [4, 0, 0, 8],
      [0, 0, 4, 4],
    ];

    assert.equal(boardState, game.board);
    assert.equal(game.score, 16);
  });

  gamePlayersInputSuite.only('should move all tiles to the up when the player presses the up button', () => {
    game.makeMove(DIRECTION.DOWN);
    game.makeMove(DIRECTION.DOWN);
    game.makeMove(DIRECTION.DOWN);
    game.makeMove(DIRECTION.RIGHT);
    game.makeMove(DIRECTION.RIGHT);
    game.makeMove(DIRECTION.RIGHT);
    game.makeMove(DIRECTION.DOWN);
    game.makeMove(DIRECTION.UP);

    const boardState = [
      [4, 0, 4, 8],
      [0, 0, 0, 4],
      [0, 0, 2, 0],
      [0, 0, 0, 0],
    ];

    assert.equal(boardState, game.board);
    assert.equal(game.score, 16);
  });

  gamePlayersInputSuite.only('should move all tiles to the up when the player presses the up button again', () => {
    game.makeMove(DIRECTION.DOWN);
    game.makeMove(DIRECTION.DOWN);
    game.makeMove(DIRECTION.DOWN);
    game.makeMove(DIRECTION.RIGHT);
    game.makeMove(DIRECTION.RIGHT);
    game.makeMove(DIRECTION.RIGHT);
    game.makeMove(DIRECTION.DOWN);
    game.makeMove(DIRECTION.UP);
    game.makeMove(DIRECTION.UP);

    const boardState = [
      [4, 2, 4, 8],
      [0, 0, 2, 4],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ];

    assert.equal(boardState, game.board);
    assert.equal(game.score, 16);
  });

  gamePlayersInputSuite.only('should move all tiles to the left when the player presses the left button', () => {
    game.makeMove(DIRECTION.DOWN);
    game.makeMove(DIRECTION.DOWN);
    game.makeMove(DIRECTION.DOWN);
    game.makeMove(DIRECTION.RIGHT);
    game.makeMove(DIRECTION.RIGHT);
    game.makeMove(DIRECTION.RIGHT);
    game.makeMove(DIRECTION.DOWN);
    game.makeMove(DIRECTION.UP);
    game.makeMove(DIRECTION.UP);
    game.makeMove(DIRECTION.LEFT);

    const boardState = [
      [4, 2, 4, 8],
      [2, 4, 0, 0],
      [0, 0, 0, 4],
      [0, 0, 0, 0],
    ];

    assert.equal(boardState, game.board);
    assert.equal(game.score, 16);
  });

  gamePlayersInputSuite.only('should move all tiles to the left when the player presses the left button again', () => {
    game.makeMove(DIRECTION.DOWN);
    game.makeMove(DIRECTION.DOWN);
    game.makeMove(DIRECTION.DOWN);
    game.makeMove(DIRECTION.RIGHT);
    game.makeMove(DIRECTION.RIGHT);
    game.makeMove(DIRECTION.RIGHT);
    game.makeMove(DIRECTION.DOWN);
    game.makeMove(DIRECTION.UP);
    game.makeMove(DIRECTION.UP);
    game.makeMove(DIRECTION.LEFT);
    game.makeMove(DIRECTION.LEFT);

    const boardState = [
      [4, 2, 4, 8],
      [2, 4, 0, 0],
      [4, 0, 0, 0],
      [0, 2, 0, 0],
    ];

    assert.equal(boardState, game.board);
    assert.equal(game.score, 16);
  });

  gamePlayersInputSuite.only('should update tile positions based on button input 1', () => {
    game.makeMove(DIRECTION.DOWN);
    game.makeMove(DIRECTION.DOWN);
    game.makeMove(DIRECTION.DOWN);
    game.makeMove(DIRECTION.RIGHT);
    game.makeMove(DIRECTION.RIGHT);
    game.makeMove(DIRECTION.RIGHT);
    game.makeMove(DIRECTION.DOWN);
    game.makeMove(DIRECTION.UP);
    game.makeMove(DIRECTION.UP);
    game.makeMove(DIRECTION.LEFT);
    game.makeMove(DIRECTION.LEFT);
    game.makeMove(DIRECTION.RIGHT);

    const boardState = [
      [4, 2, 4, 8],
      [0, 0, 2, 4],
      [4, 0, 0, 4],
      [0, 0, 0, 2],
    ];

    assert.equal(boardState, game.board);
    assert.equal(game.score, 16);
  });

  gamePlayersInputSuite.only('should update tile positions based on button input 2', () => {
    game.makeMove(DIRECTION.DOWN);
    game.makeMove(DIRECTION.DOWN);
    game.makeMove(DIRECTION.DOWN);
    game.makeMove(DIRECTION.RIGHT);
    game.makeMove(DIRECTION.RIGHT);
    game.makeMove(DIRECTION.RIGHT);
    game.makeMove(DIRECTION.DOWN);
    game.makeMove(DIRECTION.UP);
    game.makeMove(DIRECTION.UP);
    game.makeMove(DIRECTION.LEFT);
    game.makeMove(DIRECTION.LEFT);
    game.makeMove(DIRECTION.RIGHT);
    game.makeMove(DIRECTION.LEFT);

    const boardState = [
      [4, 2, 4, 8],
      [2, 4, 0, 0],
      [8, 0, 4, 0],
      [2, 0, 0, 0],
    ];

    assert.equal(boardState, game.board);
    assert.equal(game.score, 24);
  });

  gamePlayersInputSuite.run();
}

/* 2048 - Game Over Tests */
function setupGameOverTests(): void {
  const gameGameOverSuite = uvu.suite('2048 - Game Over');

  gameGameOverSuite.before.each(() => {
    seedrandom(seed, { global: true });
  });

  gameGameOverSuite('should update game over status if no valid moves are left', () => {
    game = new Game2048({ cols: 2, rows: 2 });
    let boardState = [
      [0, 2],
      [2, 0],
    ];
    assert.equal(boardState, game.board);
    assert.equal(game.score, 0);
    assert.equal(game.isGameOver, false);
    assert.equal(game.didPlayerWin, false);

    game.makeMove(DIRECTION.RIGHT);

    boardState = [
      [4, 2],
      [0, 2],
    ];
    assert.equal(boardState, game.board);
    assert.equal(game.score, 0);
    assert.equal(game.isGameOver, false);
    assert.equal(game.didPlayerWin, false);

    game.makeMove(DIRECTION.DOWN);

    boardState = [
      [0, 2],
      [4, 4],
    ];
    assert.equal(boardState, game.board);
    assert.equal(game.score, 4);
    assert.equal(game.isGameOver, false);
    assert.equal(game.didPlayerWin, false);

    game.makeMove(DIRECTION.RIGHT);

    boardState = [
      [0, 2],
      [4, 8],
    ];
    assert.equal(boardState, game.board);
    assert.equal(game.score, 12);
    assert.equal(game.isGameOver, false);
    assert.equal(game.didPlayerWin, false);

    game.makeMove(DIRECTION.UP);

    boardState = [
      [4, 2],
      [2, 8],
    ];
    assert.equal(boardState, game.board);
    assert.equal(game.score, 12);
    assert.equal(game.isGameOver, true);
    assert.equal(game.didPlayerWin, false);
  });

  gameGameOverSuite('should update game over status if player reached the goal', () => {
    game = new Game2048({ cols: 2, rows: 2, numberToReachToWin: 8 });
    game.makeMove(DIRECTION.RIGHT);
    game.makeMove(DIRECTION.DOWN);
    game.makeMove(DIRECTION.RIGHT);

    const boardState = [
      [0, 2],
      [4, 8],
    ];
    assert.equal(boardState, game.board);
    assert.equal(game.score, 12);
    assert.equal(game.isGameOver, true);
    assert.equal(game.didPlayerWin, true);
  });

  gameGameOverSuite('should throw an error if the game is already over and the player tries to make a new move', () => {
    game = new Game2048({ cols: 2, rows: 2, numberToReachToWin: 8 });
    game.makeMove(DIRECTION.RIGHT);
    game.makeMove(DIRECTION.DOWN);
    game.makeMove(DIRECTION.RIGHT);

    let boardState = [
      [0, 2],
      [4, 8],
    ];
    assert.equal(boardState, game.board);
    assert.equal(game.score, 12);
    assert.equal(game.isGameOver, true);
    assert.equal(game.didPlayerWin, true);

    assert.throws(() => game.makeMove(DIRECTION.UP), /has already ended/);

    boardState = [
      [0, 2],
      [4, 8],
    ];
    assert.equal(boardState, game.board);
    assert.equal(game.score, 12);
    assert.equal(game.isGameOver, true);
    assert.equal(game.didPlayerWin, true);
  });

  gameGameOverSuite.run();
}

setupInitializationTests();
setupPlaceGamePieceTests();
setupGameOverTests();
