const config = require("./config");
const createServer = require("../ui/web/server");

const app = createServer(config);
const port = config.web.port;

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Web UI running at http://localhost:${port}`);
});
