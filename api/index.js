const express = require('express');

const authRoutes = require('./auth');
const userRoutes = require('./users');

const router = express.Router();

router.use('/', authRoutes);
router.use('/users', userRoutes);

module.exports = router;
