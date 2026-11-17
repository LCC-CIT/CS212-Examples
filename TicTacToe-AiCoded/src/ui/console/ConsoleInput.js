const readline = require("node:readline/promises");
const { stdin: input, stdout: output } = require("node:process");

class ConsoleInput {
  constructor() {
    this.rl = readline.createInterface({ input, output });
  }

  async ask(promptText) {
    return this.rl.question(promptText);
  }

  close() {
    this.rl.close();
  }
}

module.exports = ConsoleInput;
