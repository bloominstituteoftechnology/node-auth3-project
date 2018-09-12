const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const db = require('knex')(require('./knexfile.js').development);

const app = express();
const SALT_ROUNDS = 12;

function generateToken(payload) {
  return jwt.sign(payload, process.env.SECRET || 'secret', { expiresIn: '1h' });
}

function jwtExtractor(req, res, next) {
  if (!req.headers.authorization) return next();

  const token = req.headers.authorization.split(' ')[1];

  if (!token) return next();

  jwt.verify(token, process.env.SECRET || 'secret', function(err, decoded) {
    if (err) return next(err);

    db('users')
      .where('id', decoded.id)
      .first()
      .then(user => {
        if (!user) next();

        req.user = user;
        next();
      })
      .catch(next);
  });
}

function authenticate(req, res, next) {
  if (req.user !== undefined) return next();

  res.json({ error: true, message: 'Request is not authenticated' });
}

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(jwtExtractor);

app.post('/api/register', function(req, res, next) {
  let { username, password, department } = req.body;

  if (!username || !password || !department)
    return res.json({
      error: true,
      message: 'Username, password or department cannot be empty',
    });

  password = bcrypt.hashSync(password, SALT_ROUNDS);

  db('users')
    .insert({ username, password, department })
    .then(([id]) => {
      const token = generateToken({ id });

      res.json({
        error: false,
        message: 'User created successfully',
        token,
      });
    })
    .catch(next);
});

app.post('/api/login', function(req, res, next) {
  const { username, password } = req.body;

  if (!username || !password)
    return res.json({
      error: true,
      message: 'Username or password cannot be empty',
    });

  db('users')
    .where('username', username)
    .first()
    .then(user => {
      if (!user)
        return res.json({
          error: true,
          message: 'Username or password is invalid',
        });

      if (!bcrypt.compareSync(password, user.password))
        return res.json({
          error: true,
          message: 'Username or password is invalid',
        });

      const token = generateToken({ id: user.id });

      res.json({ error: false, message: 'Login successful!', token });
    })
    .catch(next);
});

app.get('/api/users', authenticate, function(req, res, next) {
  db('users')
    .select('id', 'username', 'department')
    .where('department', req.user.department)
    .then(users =>
      res.json({ error: false, message: 'Fetch successful', users })
    )
    .catch(next);
});

app.use(function(err, _, res, _) {
  if (err.errno === 19) {
    return res.json({
      error: true,
      message: 'Username is already taken',
    });
  }

  console.error(err);

  res.json({ error: true, message: 'Something went wrong' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
  console.log(`\n=== Server listening on port ${PORT} ===\n`)
);
