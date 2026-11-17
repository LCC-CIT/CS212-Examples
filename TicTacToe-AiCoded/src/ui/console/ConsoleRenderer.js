const { GAME_STATUS } = require("../../core/types");

class ConsoleRenderer {
  static renderBoard(state) {
    const { board, size } = state;
    const rows = [];

    for (let row = 0; row < size; row += 1) {
      const rowValues = [];
      for (let col = 0; col < size; col += 1) {
        const index = row * size + col;
        rowValues.push(board[index] ?? String(index));
      }
      rows.push(` ${rowValues.join(" | ")} `);
    }

    const divider = `\n${"---+".repeat(size - 1)}---\n`;
    return rows.join(divider);
  }

  static renderStatus(state) {
    if (state.status === GAME_STATUS.WIN) {
      return `Player ${state.winner} wins!`;
    }

    if (state.status === GAME_STATUS.DRAW) {
      return "Game ended in a draw.";
    }

    return `Current turn: ${state.currentPlayer}`;
  }
}

module.exports = ConsoleRenderer;
