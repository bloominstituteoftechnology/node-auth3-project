const jwt = require('jsonwebtoken');

const config = require('../config/authConfig.js');

module.exports = (req, res, next) => {
  const token = req.headers.authorization;
  if (token) {
    jwt.verify(token, config.secret, (err, decodedToken) => {
      if (err) {
        res.status(401).json({ message: 'Invalid token' });
      } else {
        req.user = {username: decodedToken.username};
        next();
      }
    });
  } else {
    res.status(401).json({ message: 'No token provided' });
  }
}