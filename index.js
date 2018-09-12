const express = require('express');
const jwt = require('jsonwebtoken');
const express_jwt = require('express-jwt');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const PORT = 8080;

const app = express();

app.use(express.json());
app.use(cors());

const secret = 'somesecret';

app.listen(PORT, console.log(`Listening on port ${PORT}`)
);