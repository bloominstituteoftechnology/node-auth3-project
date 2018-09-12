const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('knex')(require('../knexfile').development);

const secret = '[)super*totallySECRET(secret_goes-here@]';

const generateToken = ({ id, name }) => {
  const payload = { id, name };
  const options = {
    expiresIn: '1h',
    jwtid: '1234',
    subject: String(id)
  };
  return jwt.sign(payload, secret, options);
};

const protect = (req, res, next) => {
  const token = req.headers.authorization;
  if (token) {
    jwt.verify(token, secret, (err, decoded) => {
      if (err) res.status(401).json({ message: 'You shall not pass!' });
      else next();
    });
  } else {
    res.status(403).json({ message: 'You shall not pass!' });
  }
};

router.use('/restricted', protect);

router.post('/register', (req, res) => {
  let { name, pass } = req.body;
  if (!name || !pass) {
    res.status(404).json({ message: 'You need to provide a unique username and password!' }).end();
  }
  pass = bcrypt.hashSync(pass, 10);
  db('users').insert({ name, pass })
    .then(id => {
      id = id[0];
      const token = generateToken({ id, name });
      res.status(201).json({ id, token });
    })
    .catch(err => res.status(500).json({ error: 'Something went wrong when registering.' }));
});

router.post('/login', (req, res) => {
  let { name, pass } = req.body;
  if (!name || !pass) {
    res.status(404).json({ message: 'You need to provide a username and password!' }).end();
  }
  db('users').where({ name }).first()
    .then(user => {
      if (!user || !bcrypt.compareSync(pass, user.pass)) {
        res.status(401).json({ message: 'You shall not pass!' }).end();
      }
      const token = generateToken(user);
      res.status(303).json({ token });
    })
    .catch(err => res.status(500).json({ error: 'Something went wrong when logging in.' }));
});

router.get('/restricted', (req, res) => {
  db('users').where({ id: req.session.userId }).first()
    .then(user => {
      res.status(200).json({ message: `You, ${user.name}, have access!` });
    })
    .catch(err => res.status(500).json({ error: err }));
});

router.get('/restricted/users', (req, res) => {
  db('users')
    .then(users => res.status(200).json(users))
    .catch(err => res.status(500).json({ error: 'Something went wrong fetching the users.' }));
});

module.exports = router;
