import * as uvu from 'uvu';
import * as assert from 'uvu/assert';
import seedrandom from 'seedrandom';

import * as Utils from '../src/utils';

const seed = 'f96d18a4-ebca-4241-8109-f543cafba0ed';

/* Utils - Random Number Tests */
function setupRandomNumberTests(): void {
  const randomNumberTestSuite = uvu.suite('Utils - Random Number');

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

/* Utils - Is Power Of 2 Tests */
function setupIsPowerOf2Tests(): void {
  const testSuite = uvu.suite('Utils - Is Power Of 2');

  testSuite('should return false when provided value is 0', () => {
    const result = Utils.isPowerOf2(0);
    assert.type(result, 'boolean');
    assert.equal(result, false);
  });

  testSuite('should return true when provided value is 1', () => {
    const result = Utils.isPowerOf2(1);
    assert.type(result, 'boolean');
    assert.equal(result, true);
  });

  testSuite('should return false when provided value is not a power of 2', () => {
    let result = Utils.isPowerOf2(3);
    assert.type(result, 'boolean');
    assert.equal(result, false);

    result = Utils.isPowerOf2(6);
    assert.type(result, 'boolean');
    assert.equal(result, false);

    result = Utils.isPowerOf2(10);
    assert.type(result, 'boolean');
    assert.equal(result, false);

    result = Utils.isPowerOf2(31);
    assert.type(result, 'boolean');
    assert.equal(result, false);

    result = Utils.isPowerOf2(87);
    assert.type(result, 'boolean');
    assert.equal(result, false);
  });

  testSuite('should return true when provided value is a power of 2', () => {
    let result = Utils.isPowerOf2(2);
    assert.type(result, 'boolean');
    assert.equal(result, true);

    result = Utils.isPowerOf2(4);
    assert.type(result, 'boolean');
    assert.equal(result, true);

    result = Utils.isPowerOf2(8);
    assert.type(result, 'boolean');
    assert.equal(result, true);

    result = Utils.isPowerOf2(16);
    assert.type(result, 'boolean');
    assert.equal(result, true);

    result = Utils.isPowerOf2(32);
    assert.type(result, 'boolean');
    assert.equal(result, true);

    result = Utils.isPowerOf2(64);
    assert.type(result, 'boolean');
    assert.equal(result, true);

    result = Utils.isPowerOf2(128);
    assert.type(result, 'boolean');
    assert.equal(result, true);

    result = Utils.isPowerOf2(256);
    assert.type(result, 'boolean');
    assert.equal(result, true);
  });

  testSuite.run();
}
setupRandomNumberTests();
setupIsPowerOf2Tests();
