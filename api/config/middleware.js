const cors = require("cors");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const helmet = require("helmet");

module.exports = server => {
  server.use(cors());
  server.use(bodyParser.json());
  server.use(morgan("short"));
  server.use(helmet());
};
