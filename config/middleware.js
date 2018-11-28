const express = require('express');
const cors = require('cors');

const authRouter = require('../routers/authRouter.js');

module.exports = server => {
    server.use(express.json());
    server.use(cors());

    server.use('/api', authRouter);
}