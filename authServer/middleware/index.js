const jwt = require("jsonwebtoken");

const secret =
  "lorem ipsum dolor sit amet i feel like chicken tonite, like chicken tonite!";

const tokenGenerator = user => {
  const payload = { username: user.username };
  const options = { expiresIn: "2h" };
  return jwt.sign(payload, secret, options);
};

const restrictionMiddleware = (req, res, next) => {
  const token = req.headers.authorization;
  if (token) {
    jwt.verify(token, secret, (error, decodedToken) => {
      if (error) {
        return res.status(401).json({ message: "Token is not valid!" });
      }
      req.jwtToken = decodedToken;
      next();
    });
  } else {
    return res.status(401).json({ message: "Token can not be found!" });
  }
};

module.exports.secret = secret;
module.exports.generateToken = tokenGenerator;
module.exports.checkRestricted = restrictionMiddleware;
