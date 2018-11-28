require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const db = require('./database/dbConfig.js');

server.use(express.json());
server.use(cors());

const secret = process.env.JWT_SECRET;
