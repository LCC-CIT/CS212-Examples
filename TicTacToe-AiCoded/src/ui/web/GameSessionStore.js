const crypto = require("node:crypto");
const GameEngine = require("../../core/GameEngine");

class GameSessionStore {
  constructor(gameConfig) {
    this.gameConfig = gameConfig;
    this.sessions = new Map();
  }

  createSession() {
    const id = crypto.randomUUID();
    const engine = new GameEngine(this.gameConfig);
    engine.startGame();
    this.sessions.set(id, engine);

    return { id, engine };
  }

  getSession(id) {
    return this.sessions.get(id) || null;
  }
}

module.exports = GameSessionStore;
