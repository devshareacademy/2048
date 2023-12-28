import * as uvu from 'uvu';
import * as assert from 'uvu/assert';

import * as Core from '../src';

const suite = uvu.suite('Core');

suite('Should expose the 2048 class', () => {
  assert.type(Core.Game2048, 'function');
});

suite.run();
