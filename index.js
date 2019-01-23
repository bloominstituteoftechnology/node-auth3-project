const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const db = require('./data/dbConfig');

const server = express();
const PORT = 4200;


