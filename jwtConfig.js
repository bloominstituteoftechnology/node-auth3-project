const jwt = require('jsonwebtoken');

const config = {
  SECRET: 'part and parcel',
  generateToken: function(user) {
    const payload = {
      username: user.username,
      department: user.department,
      id: user.id
    };
    const options = {
      expiresIn: '1hr',
      jwtid: '1234'
    };
    return jwt.sign(payload, this.SECRET, options);
  },
}

module.exports = config;
