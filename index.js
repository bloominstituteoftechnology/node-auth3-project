const express=require('express');
const morgan=require('morgan');
const helmet=require('helmet');
const bcrypt=require('bcryptjs');
const knex=require('knex');
const knexConfig=require('./knexfile');
const cors=require('cors');
const db=knex(knexConfig.development);
const jwt=require('jsonwebtoken');
const server=express();

server.use(morgan('dev')).use(helmet()).use(cors()).use(express.json());