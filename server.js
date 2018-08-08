const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const port = 8002;

const db = require('./data/db');

const server = express();


server.listen(port, () => console.log(`running on port ${port}`));