# 2048 - JS

A NPM package that contains the core game logic for the game 2048.

## Installation

```bash
# npm
npm install -E @devshareacademy/js-2048

# yarn
yarn add -E @devshareacademy/js-2048

# pnpm
pnpm add -E @devshareacademy/js-2048
```

## Usage

```typescript
import { Game2048 } from '@devshareacademy/js-2048';

const game = new Game2048();

// get the board state
console.log(game.board);
/*
[
  [0, 0, 0, 0],
  [0, 0, 2, 0],
  [2, 0, 0, 0],
  [0, 0, 0, 0],
]
*/

// slide the tiles in a valid direction (DOWN, UP, LEFT, RIGHT)
game.makeMove('DOWN');

// example board state after move was made
/*
[
  [0, 0, 0, 0],
  [4, 0, 0, 0],
  [0, 0, 0, 0],
  [2, 0, 2, 0],
]
*/
```

For more details on the library and the available methods, please see the documentation and examples below.

## API Documentation

The game of 2048 is represented by a 2D array that is made up of 4 columns and 4 rows. When you retrieve the board state, each tile in the table will have a number value representing what tile is placed in that location. If no tile is preset, `0` will be returned.

The `Game2048` class allows for you to configure the following settings for your game by passing in configuration object when you create an instance of the class. Each of the properties and the configuration object are optional.

| Name | Type | Default Value | Description |
|---|---|---|
| rows | number | 4 | The number of rows that will be created for the board. Valid values are `2 - 10`. |
| cols | number | 4 | The number of cols that will be created for the board. Valid values are `2 - 10`. |
| numberToReachToWin | number | 2048 | The max tile number that must be reached for the player to win the game. The number must be a power of `2` and must be at least `4`. |

Example:

```typescript
import { Game2048 } from '@devshareacademy/js-2048';

const game = new Game2048({ cols: 2, rows: 2, numberToReachToWin: 8 });

// example initial board state
/*
[
  [0, 2],
  [2, 0],
]
*/
```

When creating a new instance of the `Game2048` class, an error will be thrown if an invalid configuration is not provided.

### Methods

#### .makeMove(direction)

Allows the player to slide all tiles in the provided direction on the game board. This method will throw an error in the following scenarios:

- The game is already over
- An invalid direction is provided

##### Parameters

| Name | Type | Description |
|---|---|---|
| direction | string | The direction the tiles should be moved on the game board. Valid values are `UP, DOWN, LEFT, RIGHT` |

#### .resetGame()

Allows the player to reset the game, and start a brand new game.

### Properties

| Property | Description | Type |
|---|---|---|
| board | A 2D array that represents the current board state.  | number[][] |
| score | The current score of the game.  | number |
| isGameOver | A boolean flag that represents if the current game instance is finished. The game is considered finished when a player has won the game by getting the required tile value, or when the board is filled and no valid moves are left. | boolean |
| didPlayerWin | A boolean flag that represents if the player won the current game. The player wins by getting the required tile value | boolean |

## Examples

### Simple Game

```typescript
import { Game2048 } from '@devshareacademy/js-2048';

const game = new Game2048();
game.makeMove('DOWN');
game.makeMove('DOWN');

console.log(game.isGameOver); // false
console.log(game.didPlayerWin); // false
console.log(connectFour.score); // 4
console.log(connectFour.board);
/*
[
  [0, 0, 0, 0],
  [0, 0, 2, 0],
  [0, 0, 0, 0],
  [4, 2, 0, 0],
]
*/
```

## Local Development

This project uses [pnpm](https://pnpm.io/) as a package manager, however you can use `NPM` to run this project locally.

### Install Project Dependencies

```bash
pnpm install --frozen-lockfile
```

If you are using `npm`, run the following command:

```bash
npm install
```

### Run Tests

```bash
pnpm test
```

If you are using `npm`, run the following command:

```bash
npm run test
```

### Run Linting

```bash
pnpm lint
```

If you are using `npm`, run the following command:

```bash
pnpm run lint
```

### Testing Changes Locally

#### NPM Link

In order to test changes locally, you can can create a symlink to this npm package folder and then reference this folder in another project locally.

To create a symlink:

```bash
# run the following command from this projects directory
npm link
# change to the directory of the project you want to use this package in
cd ../../../some-other-project
# link-install the package
npm link @devshareacademy/js-2048
```

Please see the official documentation on [npm link](https://docs.npmjs.com/cli/v8/commands/npm-link) for more information.

#### Verdaccio

Another option for testing changes locally is to use [Verdaccio](https://verdaccio.org/), which is a lightweight private proxy registry. With Verdaccio, you can publish this npm package to a local registry and then in another project you can install this package by pointing to the local registry.

There are a variety of ways to run Verdaccio, but in the following example we will be using [Docker](https://www.docker.com/).

##### Instructions

To setup and run Verdaccio:

```bash
docker run -it --rm --name verdaccio -p 4873:4873 verdaccio/verdaccio
```

To create a user and login:

```bash
npm adduser --registry http://localhost:4873
```

To publish a package:

```bash
npm publish --registry http://localhost:4873
```

To install the local package in another project:

```bash
NPM_CONFIG_REGISTRY=http://localhost:4873 npm install @devshareacademy/js-2048
```

## Project Structure

In the project folder, there is a variety of files and folders. At a high level, here is a quick summary of what each folder and file is used for:

```text
.
├── .vscode          this folder contains configuration files for the VSCode editor, which will add auto linting and custom launch configurations for running tests (if you are not using VSCode, you can remove this folder from your project)
├── config           this folder contains configuration files for ESLint and TSC (the TypeScript Compiler)
├── dist             a dynamically generated folder which will contain the compiled source code of the finished library (generated when you run the build script)
├── node_modules     a dynamically generated folder which contains the project developer dependencies when working on the library (generated when you run the install script)
├── src              this folder will contain the core code for our library (currently contains a placeholder Class for the Connect Four library)
├── tests            this folder will contain the custom tests for our library
├── .gitignore       this file is used for telling git to ignore certain files in our project (mainly used for our project dependencies and dynamically generated files)
├── package.json     a configuration file for npm that contains metadata about your project
├── tsconfig.json    a configuration file for TSC
├── yarn.lock        a configuration file that contains the exact tree structure of the project dependencies and their versions (helps with repeatable project builds)
```
