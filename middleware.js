const jwt = require("jsonwebtoken");

const secret = "thissecretisunbreakable!";

module.exports = {
  passCheck: user => {
    let worthy = true;
    const pwArr = user.password.split("").filter(item => {
      return item === "!" ||
        item === "@" ||
        item === "#" ||
        item === "$" ||
        item === "%" ||
        item === "^" ||
        item === "&" ||
        item === "*";
    });
    if (
      user.password.length < 8 ||
      pwArr.length === 0 ||
      user.password === user.username
    ) {
      worthy = false;
    }
    return worthy;
  },

  generateToken: user => {
    const payload = {
      userID: user.id
    };
    const options = {
      expiresIn: "3h",
      jwtid: "12345"
    };
    return jwt.sign(payload, secret, options);
  },

  protected: (req, res, next) => {
    const token = req.headers.authorization;

    if (token) {
      jwt.verify(token, secret, (err, decodedToken) => {
        if (err) {
          res.status(401).json({ message: "Invalid token" });
        } else {
          next();
        }
      });
    } else {
      res.status(401).json({ message: "No token provided" });
    }
  }
};
