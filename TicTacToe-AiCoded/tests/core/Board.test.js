const test = require("node:test");
const assert = require("node:assert/strict");
const Board = require("../../src/core/Board");

test("Board initializes with 9 empty cells", () => {
  const board = new Board();
  assert.equal(board.getSnapshot().length, 9);
  assert.ok(board.getSnapshot().every((cell) => cell === null));
});

test("Board rejects move on occupied cell", () => {
  const board = new Board();
  assert.equal(board.placeMark(0, "X").ok, true);
  assert.equal(board.placeMark(0, "O").ok, false);
});

test("Board reset clears all cells", () => {
  const board = new Board();
  board.placeMark(0, "X");
  board.placeMark(1, "O");

  board.reset();

  assert.ok(board.getSnapshot().every((cell) => cell === null));
});
