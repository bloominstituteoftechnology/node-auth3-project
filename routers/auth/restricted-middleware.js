const jwt = require("jsonwebtoken");
const secrets = require("../../api/secrets");

module.exports = (req, res, next) => {
  const token = req.headers.authorization;

  jwt.verify(token, secrets.jwtSecret, (err, decodedToken) => {
    if (err) {
      res.status(403).json({ mess: "chill bro token broken or missing" });
    } else {
      req.decodedToken = decodedToken;
      next();
    }
  });
};
