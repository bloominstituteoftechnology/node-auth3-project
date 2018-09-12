const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

module.exports = {
  errorHandler: function(err, req, res, next) {
    console.log(err);
    switch (err.code) {
      case 404:
        res.json({
          404: 'The requested file does not exist.',
        });
        break;
      case 400:
        res.json({
          400: 'There was an error regarding your input.',
        });
        break;
      case 403:
        res.json({
          403: 'You are unathorized to view this content.',
        });
        break;
      default:
        res.status(500).json({
          message: 'There was an error performing the required operation',
        });
        break;
    }
  },
  restricted: function(req, res, next) {
    const secret = 'Something cool ya know';
    const token = req.headers.authorization;
    if (token) {
      jwt.verify(token, secret, (err, decodedToken) => {
        console.log('err', err);
        if (err) return res.status(401).json({ msg: 'Invalid Token' });

        console.log(decodedToken);
        req.user = { id: decodedToken.id };
        next();
      });
    } else {
      next({ code: 403 });
    }
  },
};
