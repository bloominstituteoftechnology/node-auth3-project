const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../dbConfig.js');

function generateToken(id) {
  const secret = 'Something cool ya know';
  const payload = {
    id,
  };
  const options = {
    expiresIn: '1h',
    jwtid: '12345',
    subject: `${id}`,
  };

  return jwt.sign(payload, secret, options);
}

module.exports = {
  register: function(user) {
    const hash = bcrypt.hashSync(user.password, 10);
    user.password = hash;

    return db('users')
      .insert(user)
      .then(ids => {
        const id = ids[0];
        return (token = generateToken(id));
      });
  },

  login: function(user) {
    return db('users')
      .where({ username: user.username })
      .first()
      .then(res => {
        if (res && bcrypt.compareSync(user.password, res.password)) {
          const token = generateToken(user.id);
          return token;
        } else return null;
      });
  },
};
