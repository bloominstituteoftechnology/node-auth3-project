const router = require('express').Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const User = require('../users/User');
const { secret } = require('../secret.json');

router.post('/register', function(req, res) {
  User.create(req.body)
    .then(({ username, race }) => {
      const payload = { username, race };
      const options = { expiresIn: '1h' };
      const token = jwt.sign(payload, secret, options);

      res.status(201).json({ username, race, token });
    })
    .catch(err => res.status(500).json(err));
});

router.post('/login', (req, res) => {
  const { username, password, race } = req.body;
  
  User.findOne()
    .where({ username })
    .exec((err, user) => {
      if (err)
        return res.status(500).json(err);

      if (!user)
        return res.status(404).json({ err: 'No user with that name' });

      bcrypt.compare(password, user.password)
        .then(data => {
            if (!data)
              res.status(401).json({ err: 'Wrong password' });

              
          const payload = { username, race };
          const options = { expiresIn: '1h' };
          const token = jwt.sign(payload, secret, options);
              
          console.log({ username, race, token });
          res.status({ username, race, token });
        })
        .catch(err => res.status(500).json(err));
    })
})

module.exports = router;