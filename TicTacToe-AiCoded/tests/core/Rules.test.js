const test = require("node:test");
const assert = require("node:assert/strict");
const Rules = require("../../src/core/Rules");

test("Rules detects winner for row", () => {
  const cells = ["X", "X", "X", null, "O", null, "O", null, null];
  assert.equal(Rules.getWinner(cells), "X");
  assert.deepEqual(Rules.getWinningLine(cells), [0, 1, 2]);
});

test("Rules detects draw", () => {
  const cells = ["X", "O", "X", "X", "O", "O", "O", "X", "X"];
  assert.equal(Rules.getWinner(cells), null);
  assert.equal(Rules.isDraw(cells), true);
});
