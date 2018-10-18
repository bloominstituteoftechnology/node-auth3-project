const jwt = require("jsonwebtoken");

const secret = process.env.SECRET;

const tokenGenerator = user => {
  const payload = { username: user.username };
  const options = { expiresIn: 60 * 60 };
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
module.exports.tokenGenerator = tokenGenerator;
module.exports.restrictionMiddleware = restrictionMiddleware;
