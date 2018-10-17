const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('./db/dbConfig.js');
const app = express();
const port = 9000;

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

app.listen(port, () => console.log(`\n===${port} is live!===\n`))