const secret = "pair pare pear";
const jwt = require("jsonwebtoken");
const ls = require("local-storage");
function verifyToken(req, res, next) {
  //const token = req.headers.authorization;
  const token = ls.get('token')
  console.log(req.headers, "console logged headers")
  if (token) {
    jwt.verify(token, secret, (err, decodedToken) => {
      if (err) {
        console.log(err.message)
        res.status(401).json({ message: "Invalid Token" });
      } else {
        console.log(decodedToken);
        req.user = { username: decodedToken.username };

        next();
      }
    });
  } else {
    console.log("no token provided")
    res.status(401).json({ message: "no token provided" });
  }
}

module.exports = verifyToken; 