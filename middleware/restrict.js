const jwt = require("jsonwebtoken");
require("dotenv").config();

function restrict() {
  const authError = {
    message: "Invalid credentials"
  };

  return async (req, res, next) => {
    try {
      console.log(req.cookies);
      const { token } = req.cookies;
      if (!token) {
        return res.status(401).json(authError);
      }

      jwt.verify(token, process.env.SECRET, (err, decoded) => {
        if (err) {
          return res.status(401).json(authError);
        }
        req.token = decoded;

        next();
      });
    } catch (err) {
      next(err);
    }
  };
}

module.exports = restrict;
