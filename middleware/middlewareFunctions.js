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
        try {
          throw new Error();
        } catch (err) {
          err.code = 401;
          next(err);
        }
      } else {
        // good token
        req.user = { username: decodedToken.username };
        next();
      }
    });
  } else {
    try {
      throw new Error();
    } catch (err) {
      err.code = 400;
      next(err);
    }
  }
};

module.exports = {
  generateToken,
  protected,
};
