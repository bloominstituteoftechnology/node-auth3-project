const express = require("express");
const knex = require("knex");
const knexConfig = require("../knexfile");
const db = knex(knexConfig.development);
const router = express.Router();

router.get('/', (req, res) => {
  db('users')
    .select('id', 'username', 'created_at', 'updated_at', 'department')
    .then(users => res.status(200).json(users))
})
module.exports = router;