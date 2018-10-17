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
  .get((req, res) => {
    return res.send('En Vivo!')
  })

app.listen(port, () => console.log(`\n===${port} is live!===\n`))