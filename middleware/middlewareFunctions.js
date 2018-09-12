const jwt = require("jsonwebtoken");
// generate token function
const secret = "rosebud";
const generateToken = user => {
  const payload = {
    username: user.username,
  };
  const options = {
    expiresIn: "1h",
    jwtid: "12345",
  };
  return jwt.sign(payload, secret, options);
};
// protected middleware
const protected = (req, res, next) => {
  const token = req.headers.authorization;
  if (token) {
    jwt.verify(token, secret, (err, decodedToken) => {
      if (err) {
        // wrong token
        res.status(401).json({ message: "Invalid Token" });
      } else {
        // good token
        req.user = { username: decodedToken.username };
        next();
      }
    });
  } else {
    res.status(401).json({ message: "Missing Token" });
  }
};

module.exports = {
  generateToken,
  protected,
};
