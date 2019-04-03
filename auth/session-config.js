const session = require('express-session');
const KnexSessionStore =require('connect-session-knex')(session);
const configureKnex = require('../database/dbConfig.js');
module.exports ={
  name   : 'monster',
  secret : 'keep it secret, keep it safe',
  cookie :{
      maxAge : 1000 * 60 * 10,
      secure : false, // use cookie over https
      httpOnly : true, // can js access the cookie on the cookie
  },
  resave : false, //avoid rcreating unchanged session
  savedUninitialized : false, //gdpr compliance
  store: new KnexSessionStore({
    knex: configureKnex,
    tablename : 'sessions',
    sidefieldName: 'sid',
    createtable: true ,
    clearInterval: 1000 * 60 * 30, // delete expire session
  })
}