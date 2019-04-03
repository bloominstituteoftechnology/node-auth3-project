const server = require("./api/server");

const port = process.env.PORT || 6500;
server.listen(port, () => console.log(`\n** Running on port ${port} **\n`));
