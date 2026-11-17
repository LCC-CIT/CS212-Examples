const Board = require("./Board");
const Rules = require("./Rules");
const { GAME_STATUS, MARKS } = require("./types");

class GameEngine {
  constructor({ size = 3, startingMark = MARKS.X } = {}) {
    this.board = new Board(size);
    this.startingMark = startingMark;
    this.currentPlayer = startingMark;
    this.status = GAME_STATUS.IN_PROGRESS;
    this.winner = null;
    this.winningLine = null;
    this.moveCount = 0;
  }

  startGame(startingMark = this.startingMark) {
    this.reset(startingMark);
    return this.getState();
  }

  reset(startingMark = this.startingMark) {
    this.board.reset();
    this.startingMark = startingMark;
    this.currentPlayer = startingMark;
    this.status = GAME_STATUS.IN_PROGRESS;
    this.winner = null;
    this.winningLine = null;
    this.moveCount = 0;
    return this.getState();
  }

  makeMove(index) {
    if (this.status !== GAME_STATUS.IN_PROGRESS) {
      return {
        ok: false,
        error: "Game is already finished",
        state: this.getState(),
      };
    }

    const result = this.board.placeMark(index, this.currentPlayer);
    if (!result.ok) {
      return {
        ok: false,
        error: result.error,
        state: this.getState(),
      };
    }

    this.moveCount += 1;
    this.#updateStatus();

    if (this.status === GAME_STATUS.IN_PROGRESS) {
      this.currentPlayer = this.currentPlayer === MARKS.X ? MARKS.O : MARKS.X;
    }

    return {
      ok: true,
      state: this.getState(),
    };
  }

  getAvailableMoves() {
    const cells = this.board.getSnapshot();
    return cells
      .map((value, index) => (value === null ? index : null))
      .filter((value) => value !== null);
  }

  getState() {
    return {
      board: this.board.getSnapshot(),
      size: this.board.size,
      currentPlayer: this.currentPlayer,
      status: this.status,
      winner: this.winner,
      winningLine: this.winningLine ? [...this.winningLine] : null,
      moveCount: this.moveCount,
      availableMoves: this.getAvailableMoves(),
    };
  }

  #updateStatus() {
    const cells = this.board.getSnapshot();
    const winner = Rules.getWinner(cells);

    if (winner) {
      this.status = GAME_STATUS.WIN;
      this.winner = winner;
      this.winningLine = Rules.getWinningLine(cells);
      return;
    }

    if (Rules.isDraw(cells)) {
      this.status = GAME_STATUS.DRAW;
      return;
    }

    this.status = GAME_STATUS.IN_PROGRESS;
  }
}

module.exports = GameEngine;
