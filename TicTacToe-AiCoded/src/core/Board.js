const { DEFAULT_SIZE } = require("./types");

class Board {
  constructor(size = DEFAULT_SIZE) {
    if (!Number.isInteger(size) || size < 3) {
      throw new Error("Board size must be an integer >= 3");
    }

    this.size = size;
    this.cells = new Array(size * size).fill(null);
  }

  reset() {
    this.cells.fill(null);
  }

  isValidIndex(index) {
    return Number.isInteger(index) && index >= 0 && index < this.cells.length;
  }

  isEmptyCell(index) {
    return this.isValidIndex(index) && this.cells[index] === null;
  }

  getCell(index) {
    if (!this.isValidIndex(index)) {
      return null;
    }

    return this.cells[index];
  }

  placeMark(index, mark) {
    if (!this.isValidIndex(index)) {
      return { ok: false, error: "Invalid index" };
    }

    if (!this.isEmptyCell(index)) {
      return { ok: false, error: "Cell is already occupied" };
    }

    this.cells[index] = mark;
    return { ok: true };
  }

  getSnapshot() {
    return [...this.cells];
  }
}

module.exports = Board;
