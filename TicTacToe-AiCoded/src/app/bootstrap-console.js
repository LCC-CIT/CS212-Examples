const config = require("./config");
const GameEngine = require("../core/GameEngine");
const ConsoleController = require("../ui/console/ConsoleController");

async function main() {
  const engine = new GameEngine(config.game);
  const controller = new ConsoleController(engine);
  await controller.run();
}

main().catch((error) => {
  // eslint-disable-next-line no-console
  console.error("Fatal error:", error);
  process.exit(1);
});
