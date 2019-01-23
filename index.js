const server = require("./api/server.js");

const port = process.env.PORT || 3000;
server.listen(port, () => console.log("\n** Api i running on port 3000 **\n"));
