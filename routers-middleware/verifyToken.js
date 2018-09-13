const secret = "pair pare pear";
const jwt = require("jsonwebtoken");
const ls = require("local-storage");
function verifyToken(req, res, next) {
  const token = ls.get('token')
  if (token) {
    jwt.verify(token, secret, (err, decodedToken) => {
      if (err) {
        res.status(401).json({ message: "Invalid Token" });
      } else {
        req.user = { username: decodedToken.username };

        next();
      }
    });
  } else {
    res.status(401).json({ message: "no token provided" });
  }
}

module.exports = verifyToken; 