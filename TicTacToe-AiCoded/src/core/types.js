const MARKS = Object.freeze({
  X: "X",
  O: "O",
});

const GAME_STATUS = Object.freeze({
  IN_PROGRESS: "IN_PROGRESS",
  WIN: "WIN",
  DRAW: "DRAW",
});

const DEFAULT_SIZE = 3;

const WIN_LINES_3X3 = Object.freeze([
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
]);

module.exports = {
  MARKS,
  GAME_STATUS,
  DEFAULT_SIZE,
  WIN_LINES_3X3,
};
