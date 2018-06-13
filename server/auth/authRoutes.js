const router = require('express').Router();
const User = require('../users/User');
const generateToken = require('../_config/middleware').generateToken;

router
  .post('/register', (req, res) => {
    const { username, password, race } = req.body;
    User.create({ username, password, race })
      .then(({ username, race }) => {
        const token = generateToken({
          username: username,
          race: race
        });
        res.status(201).json({ username: username, token });
      })
      .catch(err => res.status(500).json(err));
  })
  .post('/login', (req, res) => {
    const { username, password } = req.body;

    if(!username || !password){
      res.status(400).json({ error: 'Please include both a username and password' });
      return;
    }

    User.findOne({username})
      .then(user => {
        if(user){
          user.validatePassword(password)
            .then(login => {
              if(login){
                const token = generateToken({
                  username: user.username,
                  race: user.race
                });
                res.status(201).json({ username: user.username, token });
              } else {
                res.status(401).json({ error: 'Invalid credentials' });
              }
            });
        } else {
          res.status(401).json({ error: 'Invalid credentials' });
        }
      })
      .catch(error => {
        res.status(500).json({ error: error.message });
      });
  })

module.exports = router;
