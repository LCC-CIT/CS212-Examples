const test = require("node:test");
const assert = require("node:assert/strict");
const GameEngine = require("../../src/core/GameEngine");

test("GameEngine alternates turns", () => {
  const game = new GameEngine();

  let result = game.makeMove(0);
  assert.equal(result.ok, true);
  assert.equal(result.state.currentPlayer, "O");

  result = game.makeMove(1);
  assert.equal(result.ok, true);
  assert.equal(result.state.currentPlayer, "X");
});

test("GameEngine detects win", () => {
  const game = new GameEngine();
  game.makeMove(0); // X
  game.makeMove(3); // O
  game.makeMove(1); // X
  game.makeMove(4); // O
  const result = game.makeMove(2); // X wins

  assert.equal(result.state.status, "WIN");
  assert.equal(result.state.winner, "X");
  assert.deepEqual(result.state.winningLine, [0, 1, 2]);
});

test("GameEngine rejects moves after game ends", () => {
  const game = new GameEngine();
  game.makeMove(0); // X
  game.makeMove(3); // O
  game.makeMove(1); // X
  game.makeMove(4); // O
  game.makeMove(2); // X wins

  const result = game.makeMove(5);
  assert.equal(result.ok, false);
});
