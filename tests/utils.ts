import * as uvu from 'uvu';
import * as assert from 'uvu/assert';
import seedrandom from 'seedrandom';

import * as Utils from '../src/utils';

const seed = 'f96d18a4-ebca-4241-8109-f543cafba0ed';

/* 2048 - Players Provide Input Tests */
function setupRandomNumberTests(): void {
  const randomNumberTestSuite = uvu.suite('Utils');

  randomNumberTestSuite.before.each(() => {
    seedrandom(seed, { global: true });
  });

  randomNumberTestSuite('should return a random number between the min and max', () => {
    const result = Utils.randomNumber(0, 5);
    assert.type(result, 'number');
    assert.equal(result, 3);
  });

  randomNumberTestSuite('should return multiple random numbers between the min and max', () => {
    let result = Utils.randomNumber(0, 5);
    assert.type(result, 'number');
    assert.equal(result, 3);

    result = Utils.randomNumber(0, 5);
    assert.type(result, 'number');
    assert.equal(result, 0);

    result = Utils.randomNumber(0, 5);
    assert.type(result, 'number');
    assert.equal(result, 2);

    result = Utils.randomNumber(0, 5);
    assert.type(result, 'number');
    assert.equal(result, 0);

    result = Utils.randomNumber(0, 5);
    assert.type(result, 'number');
    assert.equal(result, 2);

    result = Utils.randomNumber(0, 5);
    assert.type(result, 'number');
    assert.equal(result, 5);
  });

  randomNumberTestSuite.run();
}

setupRandomNumberTests();
