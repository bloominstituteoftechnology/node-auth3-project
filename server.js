const express = require ('express');
const authnRouter = require('./authn/authnRouter');
const getuserRouter = require('./authn/getuserRouter');
const cors =require('cors');

const db = require ('./data/dbConfig');



const server = express()

server.use(express.json());
server.use(cors());
server.use ('/authn', authnRouter);
server.use('/getuser', getuserRouter);

module.exports = server;
