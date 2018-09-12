const helpers = require('../db/helpers');
const express = require('express');
const router = express.Router();

router.post('/register', (req, res, next) => {
  helpers
    .register(req.body)
    .then(response => {
      res.status(201).send(response);
    })
    .catch(next);
});

router.post('/login', (req, res, next) => {
  let body = req.body;
  helpers
    .login(body)
    .then(response => {
      if (response) {
        res.status(200).send(response);
      } else next({ code: 400 });
    })
    .catch(next);
});

module.exports = router;
