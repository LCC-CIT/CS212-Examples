const ConsoleInput = require("./ConsoleInput");
const ConsoleRenderer = require("./ConsoleRenderer");
const { GAME_STATUS } = require("../../core/types");

class ConsoleController {
  constructor(engine) {
    this.engine = engine;
    this.input = new ConsoleInput();
  }

  async run() {
    // eslint-disable-next-line no-console
    console.log("Welcome to Tic-Tac-Toe");

    this.engine.startGame();

    let keepPlaying = true;

    while (keepPlaying) {
      await this.#playSingleGame();
      keepPlaying = await this.#askReplay();
      if (keepPlaying) {
        this.engine.reset();
      }
    }

    this.input.close();
    // eslint-disable-next-line no-console
    console.log("Thanks for playing!");
  }

  async #playSingleGame() {
    while (true) {
      const state = this.engine.getState();
      // eslint-disable-next-line no-console
      console.log(`\n${ConsoleRenderer.renderBoard(state)}\n`);
      // eslint-disable-next-line no-console
      console.log(ConsoleRenderer.renderStatus(state));

      if (state.status !== GAME_STATUS.IN_PROGRESS) {
        break;
      }

      const answer = await this.input.ask("Choose a cell index: ");
      const index = Number(answer);

      if (!Number.isInteger(index)) {
        // eslint-disable-next-line no-console
        console.log("Please enter a whole number.");
        continue;
      }

      const result = this.engine.makeMove(index);
      if (!result.ok) {
        // eslint-disable-next-line no-console
        console.log(result.error);
      }
    }
  }

  async #askReplay() {
    const answer = await this.input.ask("Play again? (y/n): ");
    return answer.trim().toLowerCase() === "y";
  }
}

module.exports = ConsoleController;
