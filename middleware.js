const jwt = require("jsonwebtoken");

module.exports = {
  passCheck: user => {
    let worthy = true;
    const pwArr = user.password.split("").filter(item => {
      item === "!" ||
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
    const secret = "thissecretisunbreakable!";
    const options = {
      expiresIn: "3h",
      jwtid: "12345"
    };
    return jwt.sign(payload, secret, options);
  },

  protected: (req, res, next) => {
    const token = req.headers.authorization;

    jwt.verify(token, secret, (err, decodedToken) => {
      if (err) {
        res.status(401).json({ message: "Invalid token" });
      } else {
        next();
      }
    });
  }
};
