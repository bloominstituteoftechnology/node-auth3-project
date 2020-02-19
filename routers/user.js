const router = require('express').Router();
const Users = require('../users/model');
const restricted = require('../middleware/restricted');
const department = require('../middleware/department');
