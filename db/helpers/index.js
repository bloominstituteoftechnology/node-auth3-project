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
      .insert({
        username: user.username,
        password: user.password,
      })
      .then(ids => {
        const id = ids[0];
        console.log(id);
        db('user_department')
          .insert({ user_id: id, department_id: user.department })
          .then(res => {
            if (res) return id;
          })
          .catch(next);
      })
      .catch(next);
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
