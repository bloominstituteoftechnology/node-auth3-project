const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const cors = require('cors');

const db = require('../data/db.js');

const router = express.Router();


router.use(express.json());
router.use(cors());

const secret = 'antidisestablishmentarionism'

function protected(req, res, next) {
  const token = req.headers.authorization;

  if (token) {
    jwt.verify(token, secret, (err, decodedToken) => {
      if (err) {
        return res
          .status(401)
          .json({ error: ' token invalid' })
      }

      req.jwtToken = decodedToken;
      next();
    })
  } else {
    return res.status(401).json({ error: 'no token found' })
  }
}

function generateToken(user) {
  const payload = {
    username: user.username,
  }

  const options = {
    expiresIn: '1h',
    jwtid: '8728391',
  }

  return jwt.sign(payload, secret, options)
}

router.get('/users', protected, (req, res) => {
  db('users')
  .then(response => {
    res.status(200).json(response);
  })
  .catch(error => {
    console.log(error.message)
    res.status(404).send('error fetching users...')
  })
})

router.post('/register', (req, res) => {
  req.body.password = bcrypt.hashSync(req.body.password, 14)

  let { username, password, department } = req.body;
  let user = {
    username,
    password,
    department
  }
  db('users')
    .insert(user)
    .then(ids => {
      // save the record then send back the saved record
      // db('users')
      //   .first()
      //   .where({ id: ids[0] })
      //   .then(user => {
      //     res.status(201).json({ token });
      //   })
      //   .catch(err => {
      //     res.status(500).json(err);
      //   });
    })
    .catch(err => res.status(500).json(err));

    const token = generateToken(user);
    res.status(200).json(token)
});

  router.post('/login', (req, res) => {
    let { username, password } = req.body;
    let credentials = {
      username,
      password
    }

    db('users')
    .where('username', credentials.username).first()
    .then(user => {
      if (!user || !bcrypt.compareSync(credentials.password, user.password)) {
        return res.status(401).json({ error: 'invalid username or password' })
      } else {
        const token = generateToken(user)
        return res.send(token);
      }
    })
  })

module.exports = router;
