const jwt = require("jsonwebtoken");

const secret = process.env.SECRET;

function tokenGenerator(user) {
  const jwtPayload = {
    ...user,
    hello: "DECADEV",
    roles: ["admin", "root", "user"]
  };
  const jwtOptions = {
    expiresIn: "1h"
  };

  console.log("token from process.env", jwtSecret);
  return jwt.sign(jwtPayload, jwtSecret, jwtOptions);
}

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
