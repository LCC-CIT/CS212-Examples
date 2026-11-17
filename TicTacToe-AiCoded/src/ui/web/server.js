const express = require("express");
const path = require("node:path");
const createGameRoutes = require("./routes/gameRoutes");
const GameSessionStore = require("./GameSessionStore");

function createServer(config) {
  const app = express();
  const sessionStore = new GameSessionStore(config.game);

  app.use(express.json());

  app.use("/api", createGameRoutes(sessionStore));
  app.use(express.static(path.join(__dirname, "public")));

  return app;
}

module.exports = createServer;
