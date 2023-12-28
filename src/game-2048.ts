import { Tile } from './tile';
import { Coordinate, DIRECTION, Direction, GAME_ERROR, GameConfig } from './types';
import { checkGameConfig, randomNumber } from './utils';

export default class Game2048 {
  #numberOfRows: number;
  #numberOfCols: number;
  #numberToReachToWin: number;
  #grid: Tile[][];
  #score: number;
  #isGameOver: boolean;
  #didPlayerWin: boolean;

  constructor(config?: GameConfig) {
    checkGameConfig(config);

    this.#grid = [];
    this.#score = 0;
    this.#isGameOver = false;
    this.#didPlayerWin = false;

    this.#numberOfCols = config?.cols || 4;
    this.#numberOfRows = config?.rows || 4;
    this.#numberToReachToWin = config?.numberToReachToWin || 2048;

    this.#createGrid();
    this.#populateGrid();
  }

  get board(): number[][] {
    return this.#grid.map((row) => {
      return row.map((tile) => tile.value);
    });
  }

  get score(): number {
    return this.#score;
  }

  get isGameOver(): boolean {
    return this.#isGameOver;
  }

  get didPlayerWin(): boolean {
    return this.#didPlayerWin;
  }

  public makeMove(direction: Direction): void {
    if (this.#isGameOver) {
      throw new Error(GAME_ERROR.INVALID_MOVE_GAME_IS_OVER);
    }

    this.#unlockAllTiles();
    const tileMoved = this.#handlePlayerInput(direction);
    if (!tileMoved) {
      return;
    }
    this.#addNewTile();
    this.#checkForGameFinished();
  }

  #handlePlayerInput(direction: Direction): boolean {
    if (direction === DIRECTION.DOWN) {
      return this.#handleDownMovement();
    }

    if (direction === DIRECTION.UP) {
      return this.#handleUpMovement();
    }

    if (direction === DIRECTION.LEFT) {
      return this.#handleLeftMovement();
    }

    return this.#handleRightMovement();
  }

  #createGrid(): void {
    this.#grid = [];
    for (let row = 0; row < this.#numberOfRows; row += 1) {
      const gridRow: Tile[] = [];
      for (let col = 0; col < this.#numberOfCols; col += 1) {
        gridRow.push(new Tile(0));
      }
      this.#grid.push(gridRow);
    }
  }

  #populateGrid(): void {
    this.#addNewTile();
    this.#addNewTile();
  }

  #handleDownMovement(): boolean {
    let tileMoved = false;

    for (let row = this.#numberOfRows - 2; row >= 0; row -= 1) {
      for (let col = this.#numberOfCols - 1; col >= 0; col -= 1) {
        if (this.#isTileEmpty({ row, col })) {
          continue;
        }

        for (let rowToMoveTo = row + 1; rowToMoveTo < this.#numberOfRows; rowToMoveTo += 1) {
          const canMove = this.#isTileEmpty({ row: rowToMoveTo, col });
          const canMerge = this.#canMergeTiles({ col, row: rowToMoveTo - 1 }, { row: rowToMoveTo, col });

          if (!canMove && !canMerge) {
            break;
          }
          if (canMove) {
            this.#moveTile({ col, row: rowToMoveTo - 1 }, { col, row: rowToMoveTo });
            tileMoved = true;
            continue;
          }
          if (canMerge) {
            this.#mergeTile({ col, row: rowToMoveTo - 1 }, { col, row: rowToMoveTo });
            tileMoved = true;
            continue;
          }
        }
      }
    }

    return tileMoved;
  }

  #handleUpMovement(): boolean {
    let tileMoved = false;

    for (let row = 1; row < this.#numberOfRows; row += 1) {
      for (let col = this.#numberOfCols - 1; col >= 0; col -= 1) {
        if (this.#isTileEmpty({ row, col })) {
          continue;
        }

        for (let rowToMoveTo = row - 1; rowToMoveTo >= 0; rowToMoveTo -= 1) {
          const canMove = this.#isTileEmpty({ row: rowToMoveTo, col });
          const canMerge = this.#canMergeTiles({ col, row: rowToMoveTo + 1 }, { row: rowToMoveTo, col });

          if (!canMove && !canMerge) {
            break;
          }
          if (canMove) {
            this.#moveTile({ col, row: rowToMoveTo + 1 }, { col, row: rowToMoveTo });
            tileMoved = true;
            continue;
          }
          if (canMerge) {
            this.#mergeTile({ col, row: rowToMoveTo + 1 }, { col, row: rowToMoveTo });
            tileMoved = true;
            continue;
          }
        }
      }
    }

    return tileMoved;
  }

  #handleLeftMovement(): boolean {
    let tileMoved = false;

    for (let col = 1; col < this.#numberOfCols; col += 1) {
      for (let row = this.#numberOfRows - 1; row >= 0; row -= 1) {
        if (this.#isTileEmpty({ row, col })) {
          continue;
        }

        for (let colToMoveTo = col - 1; colToMoveTo >= 0; colToMoveTo -= 1) {
          const canMove = this.#isTileEmpty({ row, col: colToMoveTo });
          const canMerge = this.#canMergeTiles({ col: colToMoveTo + 1, row }, { row, col: colToMoveTo });

          if (!canMove && !canMerge) {
            break;
          }
          if (canMove) {
            this.#moveTile({ col: colToMoveTo + 1, row }, { row, col: colToMoveTo });
            tileMoved = true;
            continue;
          }
          if (canMerge) {
            this.#mergeTile({ col: colToMoveTo + 1, row }, { row, col: colToMoveTo });
            tileMoved = true;
            continue;
          }
        }
      }
    }

    return tileMoved;
  }

  #handleRightMovement(): boolean {
    let tileMoved = false;

    for (let col = this.#numberOfCols - 2; col >= 0; col -= 1) {
      for (let row = this.#numberOfRows - 1; row >= 0; row -= 1) {
        if (this.#isTileEmpty({ row, col })) {
          continue;
        }

        for (let colToMoveTo = col + 1; colToMoveTo < this.#numberOfCols; colToMoveTo += 1) {
          const canMove = this.#isTileEmpty({ row, col: colToMoveTo });
          const canMerge = this.#canMergeTiles({ col: colToMoveTo - 1, row }, { row, col: colToMoveTo });

          if (!canMove && !canMerge) {
            break;
          }
          if (canMove) {
            this.#moveTile({ col: colToMoveTo - 1, row }, { row, col: colToMoveTo });
            tileMoved = true;
            continue;
          }
          if (canMerge) {
            this.#mergeTile({ col: colToMoveTo - 1, row }, { row, col: colToMoveTo });
            tileMoved = true;
            continue;
          }
        }
      }
    }

    return tileMoved;
  }

  #isTileEmpty({ row, col }: Coordinate): boolean {
    return this.#grid[row][col].value === 0;
  }

  #canMergeTiles(tileCoordinate: Coordinate, targetCoordinate: Coordinate): boolean {
    const tRow = targetCoordinate.row;
    const tCol = targetCoordinate.col;
    if (this.#grid[tRow][tCol].wasMerged || this.#grid[tRow][tCol].value === 0) {
      return false;
    }

    const { row, col } = tileCoordinate;
    return this.#grid[row][col].value === this.#grid[tRow][tCol].value;
  }

  #addNewTile(): void {
    const eligibleTiles: Tile[] = [];
    this.#grid.forEach((row) => {
      row.forEach((tile) => {
        if (tile.value !== 0) {
          return;
        }
        eligibleTiles.push(tile);
      });
    });

    if (eligibleTiles.length === 0) {
      return;
    }

    const randomTileIndex = randomNumber(0, eligibleTiles.length - 1);
    const randomValue = randomNumber(0, 1) === 0 ? 2 : 4;
    eligibleTiles[randomTileIndex].value = randomValue;
  }

  #moveTile(tileCoordinate: Coordinate, targetCoordinate: Coordinate): void {
    const tRow = targetCoordinate.row;
    const tCol = targetCoordinate.col;
    const { row, col } = tileCoordinate;

    this.#grid[tRow][tCol].value = this.#grid[row][col].value;
    this.#grid[row][col].value = 0;
  }

  #mergeTile(tileCoordinate: Coordinate, targetCoordinate: Coordinate): void {
    const tRow = targetCoordinate.row;
    const tCol = targetCoordinate.col;
    const { row, col } = tileCoordinate;

    this.#grid[tRow][tCol].value += this.#grid[row][col].value;
    this.#grid[row][col].value = 0;
    this.#grid[tRow][tCol].wasMerged = true;
    this.#score += this.#grid[tRow][tCol].value;
  }

  #unlockAllTiles(): void {
    for (let row = 0; row < this.#numberOfRows; row += 1) {
      for (let col = 0; col < this.#numberOfCols; col += 1) {
        this.#grid[row][col].wasMerged = false;
      }
    }
  }

  #checkForGameFinished(): boolean {
    const playerWon = this.#checkIfPlayerWon();
    if (playerWon) {
      this.#didPlayerWin = true;
      this.#isGameOver = true;
      return true;
    }
    const areMovesStillAvailable = this.#grid.some((row) => row.some((tile) => tile.value === 0));
    if (areMovesStillAvailable) {
      return false;
    }
    const areAnyValidMovesLeft = this.#isAnyValidMovesLeft();
    if (areAnyValidMovesLeft) {
      return false;
    }

    this.#isGameOver = true;
    return true;
  }

  #checkIfPlayerWon(): boolean {
    const didPlayerWin = this.#grid.some((row) => row.some((tile) => tile.value === this.#numberToReachToWin));
    return didPlayerWin;
  }

  #isAnyValidMovesLeft(): boolean {
    const areValidMovesLeft = this.#grid.some((row, rowIndex) => {
      return row.some((tile, colIndex) => {
        // check for valid merge down
        if (rowIndex < this.#numberOfRows - 1 && tile.value === this.#grid[rowIndex + 1][colIndex].value) {
          return true;
        }

        // check for valid merge right
        if (colIndex < this.#numberOfCols - 1 && tile.value === this.#grid[rowIndex][colIndex + 1].value) {
          return true;
        }

        return false;
      });
    });
    return areValidMovesLeft;
  }
}
