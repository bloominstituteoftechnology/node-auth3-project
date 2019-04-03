const server = require("./api/server.js");

const port = process.env.PORT || 6500;

server.listen(port, () => {
  console.log(`\n*** The Server is Running on Port ${port}! ***\n`);
});
