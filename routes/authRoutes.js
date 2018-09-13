const helpers = require('../db/helpers');
const express = require('express');
const router = express.Router();
const db = require('../db/dbConfig');

router.post('/register', (req, res, next) => {
  let body = req.body;
  if (!(body.username && body.password && body.department)) next({ code: 400 });
  helpers
    .register(body)
    .then(response => {
      res.status(201).send(response);
    })
    .catch(next);
});

router.post('/login', (req, res, next) => {
  let body = req.body;
  if (!(body.username && body.password)) next({ code: 400 });
  helpers
    .login(body)
    .then(token => {
      if (token) {
        res.status(200).send({ token, user: body.username });
      } else next({ code: 400 });
    })
    .catch(next);
});

router.get('/departments', (req, res, next) => {
  db('departments')
    .then(departments => {
      console.log(departments);
      return res.json(departments);
    })
    .catch(err => res.send(err));
});

module.exports = router;
