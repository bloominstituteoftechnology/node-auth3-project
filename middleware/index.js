const jwt = require('jsonwebtoken');

const secret = "AHHHHHHHHHHHHHHHHHHHHHHHH!!!!!!!!!!!!!!!!!";

const generateToken = (user) => {
  const payload = { username: user.username };
  const options = { expiresIn: '1h' };
  return jwt.sign(payload, secret, options);
}

const checkRestricted = (req, res, next) => {
  const token = req.headers.authorization;
  if (token) {
    jwt.verify(token, secret, (error, decodedToken) => {
      if (error) { return res.status(401).json({ message: "Token not valid." }) };
      req.jwtToken = decodedToken;
      next();
    });
  } else {
    return res.status(401).json({ message: "Token not found." });
  }
}

module.exports.secret = secret;
module.exports.generateToken = generateToken;
module.exports.checkRestricted = checkRestricted;
