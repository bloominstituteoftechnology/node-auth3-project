// DEPENDENCIES
// ==============================================
const jwt = require('jsonwebtoken');

const keys = require('./config/keys');
const config = require('./authConfig');

// AUTH MIDDLEWARE
// ==============================================
module.exports = {
  generateToken: function(user) {
    const payload = {
      subject: user.id,
      username: user.username,
      department: user.department
    };
    const secret = keys.jwtSecret;
    const options = { expiresIn: '1m' };
    return jwt.sign(payload, secret, options);
  },
  protected: function(req, res, next) {
    const token = req.headers.authorization;
    if (token) {
      jwt.verify(token, keys.jwtSecret, (err, decodedToken) => {
        if (err) {
          res.status(401).json({ message: config.TOKEN_INVALID });
        } else {
          req.decodedToken = decodedToken;
          next();
        }
      });
    } else res.status(401).json({ message: config.TOKEN_UNAVAILABLE });
  },
  checkRole: function(role) {
    return function(req, res, next) {
      if (req.decodedToken && req.decodedToken.roles.includes(role)) {
        next();
      } else res.status(403).json({ message: ZERO_RESOURCE_ACCESS });
    };
  }
};
