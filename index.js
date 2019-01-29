const server = require("./api/server.js");

const port = process.env.PORT || 4000;
server.listen(port, () => console.log("\n** api up on port 4k **\n"));
