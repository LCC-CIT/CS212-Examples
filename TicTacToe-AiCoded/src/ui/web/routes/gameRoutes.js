const express = require("express");

function createGameRoutes(sessionStore) {
  const router = express.Router();

  router.post("/games", (req, res) => {
    const { id, engine } = sessionStore.createSession();
    res.status(201).json({ id, state: engine.getState() });
  });

  router.get("/games/:id", (req, res) => {
    const engine = sessionStore.getSession(req.params.id);
    if (!engine) {
      res.status(404).json({ error: "Game not found" });
      return;
    }

    res.json({ id: req.params.id, state: engine.getState() });
  });

  router.post("/games/:id/moves", (req, res) => {
    const engine = sessionStore.getSession(req.params.id);
    if (!engine) {
      res.status(404).json({ error: "Game not found" });
      return;
    }

    const { index } = req.body;
    if (!Number.isInteger(index)) {
      res.status(400).json({ error: "index must be an integer" });
      return;
    }

    const result = engine.makeMove(index);
    if (!result.ok) {
      res.status(400).json({ error: result.error, state: result.state });
      return;
    }

    res.json({ id: req.params.id, state: result.state });
  });

  router.post("/games/:id/reset", (req, res) => {
    const engine = sessionStore.getSession(req.params.id);
    if (!engine) {
      res.status(404).json({ error: "Game not found" });
      return;
    }

    const state = engine.reset();
    res.json({ id: req.params.id, state });
  });

  return router;
}

module.exports = createGameRoutes;
