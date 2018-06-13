const jwt = require('jsonwebtoken');
const secrets = require('../_secrets/secrets');

module.exports = {
  generateToken: function(data) {
    const options = {
      expiresIn: '1h',
    };
    const payload = { ...data };
    return jwt.sign(payload, secrets.jsk_secret, options);
  },
};
