const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (authorization) {
    const secret = require("../config/secrets.js");
    jwt.verify(authorization, secret.jwtSecret, function(error, decodedToken) {
      if (error) {
        res.status(404).json({
          message: "Invalid Token"
        });
      } else {
        req.token = decodedToken;
        next();
      }
    });
  } else {
    res.status(400).json({
      message: "Please login and try again"
    });
  }
};
