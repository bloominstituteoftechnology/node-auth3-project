const { secret } = require("./routers/usersRouter");
const jwt = require("jsonwebtoken");

module.exports = {
  protect: (req, res, next) => {
    const token = req.headers.authorization;

    if (token) {
      jwt.verify(token, secret, (err, decodedToken) => {
        if (err) {
          res
            .status(401)
            .json({ message: "You shall not pass!/Invalid token" });
        } else {
          next();
        }
      });
    } else {
      res
        .status(401)
        .json({ message: "You shall not pass!/No token provided" });
    }
  },
  generateToken: (user) => {
    const payload = {
      username: user.username
    };
    const options = {
      expiresIn: "1h",
      jwtid: user.id
    };
    return jwt.sign(payload, secret, options);
  }
};
