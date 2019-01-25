const knex = require('knex');

const knexConfig = require('../knexfile.js');

const db = knex(knexConfig.development);

function insertUser(user){
  return db('users').insert(user)
}

function findUsers(){
  return db('users').select('id', 'username', 'department');
}

function findByUsername(username){
  return db('users').where('username', username);
}

function findByUserId(id){
  return db('users').where({id}).first()
}


module.exports = {
   insertUser, findByUsername, findUsers
}