const express = require("express");
const port = 9001;
const server = express();

server.listen(port, () =>
  console.log(`\n === API running on port ${port} ===\n`)
);
