const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const authenticationRoutes = require("./routes/authenticationRoutes");

const server = express();

server.use(cors(), helmet(), express.json());
server.use("/api", authenticationRoutes);

server.listen(9000, () => console.log(`\n*** API running on PORT 9000 ***\n`));
