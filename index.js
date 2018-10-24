require('dotenv').config();

const express = require('express')
const helmet = require('helmet')
const cors = require('cors');
const bcrypt = require('bcryptjs')
const db = require('./db/dbConfig.js');
const app = express();
const jwtSecret = process.env.JWT_SECRET

app.use(express.json());
app.use(helmet());
app.use(cors());

app.route('/')
  .get((req, res) => res.send('En Vivo!'))

app.route('/api/register')
  .post((req, res) => {
    const user = req.body
    const hash = bcrypt.hashSync(user.password, 14);
    user.password = hash;
    db('users')
      .insert(user)
      .then(ids => {
        const id = ids[0]
        return res.status(201).json({ newUserId: id });
      })
      .catch(err => res.status(500).json(err));
  })

app.route('/api/login')
  .post((req, res) => {
    const credentials = req.body
    db('users')
      .where({ username: credentials.username })
      .first()
      .then(user => {
        if (user && bcrypt.compareSync(credentials.password, user.password)) {
          const token = generateToken(user);
          return res.status(200).json({ Welcome: user.username, token });
        }
        return res.status(401).json({ Message: 'You shall not pass!' });
      })
      .catch(err => res.status(500).json(err));
  })

app.route('/api/users')
  .get(protected, (req, res) => {
    console.log('\n** decoded token information **\n', req.decodedToken);
    db('users')
      .select('id', 'username', 'password', 'department')
      .then(users => {
        return res.json({ users });
      })
      .catch(err => res.send(err));
  })