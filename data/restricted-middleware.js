const jwt = require('jsonwebtoken'); 

const secrets = require('../router/secrets.js');

module.exports = (req, res, next) => {
  const token = req.headers.authorization;

  if (token) {
    jwt.verify(token, secrets.jwtSecret, (error, decodedToken) => {
      if (error) {
        // the token is not valid
        res.status(401).json({ message: 'Invalid Credentials' });
      } else {
        req.decodedJwt = decodedToken;

        next();
      }
    });
  } else {
    res.status(401).json({ message: 'No token provided' });
  }
};
