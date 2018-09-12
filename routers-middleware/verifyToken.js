const secret = "pair pare pear";
const jwt = require("jsonwebtoken");
function verifyToken(req, res, next) {
  const token = req.headers.authorization;
  if (token) {
    jwt.verify(token, secret, (err, decodedToken) => {
      if (err) {
        res.status(401).json({ message: "Invalid Token" });
      } else {
        console.log(decodedToken);
        req.user = { username: decodedToken.username };

        next();
      }
    });
  } else {
    res.status(401).json({ message: "no token provided" });
  }
}

module.exports = verifyToken; 