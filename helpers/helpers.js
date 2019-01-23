require("dotenv").config();
const jwt = require("jsonwebtoken");

module.exports = {
  generateToken,
  protected
};

function generateToken(user) {
  const payload = {
    username: user.username,
    name: user.name,
    department: user.department
  };

  const secret = process.env.JWT_SECRET;

  const options = {
    expiresIn: "30m"
  };

  return jwt.sign(payload, secret, options);
}

function protected(req, res, next) {
  // the auth token is normally sent in the Authorization header
  const token = req.headers.authorization;

  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
      if (err) {
        res.status(401).json({ message: "Invalid token" });
      } else {
        req.decodedToken = decodedToken;
        next();
      }
    });
  } else {
    res.status(401).json({ message: "Please provide a token" });
  }
}
