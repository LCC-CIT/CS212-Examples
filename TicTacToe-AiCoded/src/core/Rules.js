const { WIN_LINES_3X3 } = require("./types");

class Rules {
  static getWinningLine(cells) {
    for (const [a, b, c] of WIN_LINES_3X3) {
      if (cells[a] && cells[a] === cells[b] && cells[a] === cells[c]) {
        return [a, b, c];
      }
    }

    return null;
  }

  static getWinner(cells) {
    const line = Rules.getWinningLine(cells);
    if (!line) {
      return null;
    }

    return cells[line[0]];
  }

  static isDraw(cells) {
    return !Rules.getWinner(cells) && cells.every((cell) => cell !== null);
  }
}

module.exports = Rules;
