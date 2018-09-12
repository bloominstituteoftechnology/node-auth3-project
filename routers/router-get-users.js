const express = require("express");
const bcrypt = require("bcryptjs");
const generateToken = require("../routers-middleware/generateToken.js")
const usersRouter = express.Router(); 

const db = require("../db/dbConfig.js");