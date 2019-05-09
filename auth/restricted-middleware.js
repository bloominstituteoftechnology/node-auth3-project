const jwt = require('jsonwebtoken');

const secrets = require('../config/secrets.js');

module.exports = (req, res, next) => {
  const token = req.headers.authorization;

  jwt.verify(token, secrets.jwtSecret, (err, decodedToken) => {
    if (err) {
      // token is not valid or expired
      res.status(401).json({ you: 'shall not pass!!!' });
    } else {
      // the token is valid and we can read the decodedToken
      req.decodedToken = decodedToken;

      next();
    }
  });
};

// users *----* roles *---* permissions
